# src/backend/__init__.py
import asyncpg
from fastapi.concurrency import asynccontextmanager
from .etransfer import get_all_transactions, move_from_inbox
from .db import count_students_by_module_batch, insert_student, Student
from fastapi import FastAPI, Query ,Response,status,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, field_validator
from datetime import date
from typing import Annotated
from pydantic.types import StringConstraints
import os
from dotenv import load_dotenv

load_dotenv()

class StudentIn(BaseModel):
    name: Annotated[str, StringConstraints(min_length=1, max_length=255)]
    email: Annotated[str, StringConstraints(min_length=1, max_length=255)]
    dob: date
    parent_name: Annotated[str, StringConstraints(min_length=1, max_length=255)]
    phone: Annotated[str, StringConstraints(min_length=1, max_length=50)]
    batch: Annotated[str, StringConstraints(min_length=2, max_length=2)]  # 'b1' or 'b2'
    module: Annotated[str, StringConstraints(min_length=2, max_length=2)] # 'm1' or 'm2'
    eref_number: Annotated[str, StringConstraints(min_length=1, max_length=15)]
    amount: int

    @field_validator('dob')
    @classmethod
    def validate_age(cls, v: date) -> date:
        today = date.today()
        age = today.year - v.year - ((today.month, today.day) < (v.month, v.day))
        if age < 13:
            raise ValueError('Student must be at least 13 years old')
        return v

    @field_validator('batch')
    @classmethod
    def validate_batch(cls, v: str) -> str:
        if v not in ('b1', 'b2'):
            raise ValueError('Batch must be one of "b1" or "b2"')
        return v

    @field_validator('module')
    @classmethod
    def validate_module(cls, v: str) -> str:
        if v not in ('m1', 'm2'):
            raise ValueError('Module must be one of "m1" or "m2"')
        return v


pool = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global pool
    db_url = os.getenv("DB_URL")
    if not db_url:
        raise RuntimeError("DB_URL environment variable is missing!")
    print(f"Connecting to database...")
    pool = await asyncpg.create_pool(dsn=db_url)
    yield
    await pool.close()

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def root():
    return {"message": "healthy"}


@app.get("/verify/{reference_number}")
def verify_transaction(reference_number: str, response: Response):
    transactions = get_all_transactions()
    print(transactions)
    for txn in transactions:
        if txn.reference_number == reference_number:
            return {"transaction": txn}
    response.status_code = status.HTTP_404_NOT_FOUND
    return {"message": "Transaction not found"}

@app.post("/students/{mailId}")
async def create_student(mailId: str, student_in: StudentIn):
    student = Student(**student_in.model_dump())
    new_id = await insert_student(pool, student)
    if new_id is None:
        raise HTTPException(status_code=500, detail="Failed to insert student")
    move_from_inbox(mailId,"Camp-Codezilla")
    return {"id": new_id}

@app.get("/pdf")
async def get_pdf():
    filepath = "./curriculum.pdf"  # Path to your PDF file on disk
    return FileResponse(filepath, media_type="application/pdf", filename="curriculum.pdf")


@app.get("/slots")
async def get_slots(
    module: str = Query(..., description="Module ID, e.g. 'm1'"),
    batch: str = Query(..., description="Batch ID, e.g. 'b1'"),
):
    count = await count_students_by_module_batch(pool,module, batch)
    if count is None:
        raise HTTPException(status_code=500, detail="Failed to count students")
    return {"count": count}

dist_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "dist"))

app.mount("/", StaticFiles(directory=dist_path, html=True), name="static")