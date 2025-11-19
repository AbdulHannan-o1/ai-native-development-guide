import logging
import time
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from .api import highlight
from fastapi.middleware.cors import CORSMiddleware

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"Request: {request.method} {request.url.path} - "
                f"Status: {response.status_code} - Time: {process_time:.4f}s")
    return response

@app.get("/")
async def root():
    return {"message": "FastAPI backend for Highlight AI Dialogue is running!"}
