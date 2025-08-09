from dataclasses import dataclass
from datetime import date
from typing import Optional

@dataclass
class Student:
    name: str
    email: str
    dob: date
    parent_name: str
    phone: str
    batch: str   # 'b1' or 'b2'
    module: str  # 'm1' or 'm2'
    eref_number: str
    amount: int  # 0-999


# add student
async def insert_student(pool, student: Student) -> Optional[int]:
    try:
        async with pool.acquire() as conn: # type: ignore
            query = """
                INSERT INTO student (name, email, dob, parent_name, phone, batch, module, eref_number, amount)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id;
            """
            new_id = await conn.fetchval(
                query,
                student.name,
                student.email,
                student.dob,
                student.parent_name,
                student.phone,
                student.batch,
                student.module,
                student.eref_number,
                student.amount,
            )
            return new_id
    except Exception as e:
        print(f"Error inserting student: {e}")
        return None

# slots
async def count_students_by_module_batch(pool, module_id: str, batch_id: str) -> Optional[int]:
    try:
        async with pool.acquire() as conn:  # type: ignore
            query = """
                SELECT COUNT(*) FROM student
                WHERE module = $1 AND batch = $2;
            """
            count = await conn.fetchval(query, module_id, batch_id)
            return count
    except Exception as e:
        print(f"Error counting students: {e}")
        return None
