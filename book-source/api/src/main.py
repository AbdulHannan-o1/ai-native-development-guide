import time
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from .api import highlight
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(root_path="/api")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(highlight.router, prefix="/ai", tags=["AI Highlight"])

@app.get("/")
async def root():
    return {"message": "FastAPI backend for Highlight AI Dialogue is running!"}
