import logging
import time
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from .api import highlight

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

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
