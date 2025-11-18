import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Configuration for Google Gemini via OpenAI-compatible endpoint
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "https://generativelanguage.googleapis.com/v1beta/openai")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set.")

# Initialize the OpenAI client to interact with the Gemini-compatible endpoint
client = OpenAI(
    base_url=OPENAI_API_BASE,
    api_key=GEMINI_API_KEY,
)

# Placeholder for agent definition.
# The actual agent logic will be implemented in ai_agent.py (T020).
# This file primarily handles the client configuration.
