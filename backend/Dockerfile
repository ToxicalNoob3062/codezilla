# Use a slim Python base image for a smaller final image size.
FROM python:3.10-slim

# Set the working directory in the container.
WORKDIR /app

# Install Poetry, the dependency management tool.
# We'll use this to install our project dependencies.
RUN pip install poetry

# Copy the pyproject.toml and poetry.lock files.
# This allows Docker to use a cached layer for dependency installation if these files haven't changed.
COPY pyproject.toml poetry.lock ./

# Install project dependencies.
# We use "--no-root" to skip installing the project itself as an editable package,
# and "--no-dev" to skip development dependencies.
RUN poetry install --no-root

# Copy the entire application source code and the dist folder containing static frontend files.
# The `dist` folder will be served by the backend.
COPY src ./src
COPY dist ./dist
COPY curriculum.pdf .

# Expose port 8000, which is the port Uvicorn will listen on.
EXPOSE 8000

# Define the command to run the application.
# We use `poetry run` to ensure Uvicorn is executed within the project's virtual environment.
# The `--host 0.0.0.0` makes the application accessible from outside the container.
# The `--app-dir src` tells Uvicorn to look for modules inside the `src` directory.
# The `backend:app` specifies the module (`backend`) and the application object (`app`) to run.
CMD ["poetry", "run", "uvicorn", "backend:app", "--host", "0.0.0.0", "--port", "8000", "--app-dir", "src"]
