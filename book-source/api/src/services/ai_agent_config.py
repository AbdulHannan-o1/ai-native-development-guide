import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Configuration for Google Gemini via OpenAI-compatible endpoint
# The base URL should point to the Gemini-compatible API endpoint
# For example, if using a proxy or a specific service that exposes Gemini
# through an OpenAI-compatible interface.
# If using Google's official SDK, this part would be different.
# For this task, we assume an OpenAI-compatible endpoint is available.
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "https://api.openai.com/v1")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set.")

# Initialize the OpenAI client to interact with the Gemini-compatible endpoint
# The 'api_key' here would be the GEMINI_API_KEY if the endpoint expects it
# as a standard OpenAI API key.
client = OpenAI(
    base_url=OPENAI_API_BASE,
    api_key=GEMINI_API_KEY,
)

# Placeholder for agent definition.
# The actual agent logic will be implemented in ai_agent.py (T020).
# This file primarily handles the client configuration.
