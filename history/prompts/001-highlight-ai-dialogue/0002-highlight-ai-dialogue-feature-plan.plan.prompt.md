---
id: 0002
title: Highlight AI Dialogue Feature Plan
stage: plan
date: 2025-11-16T00:00:00Z
surface: CLI
model: Gemini
feature: 001-highlight-ai-dialogue
branch: 001-highlight-ai-dialogue
user: abdulhannan
command: /sp.plan Create a Highlight-AI-Dialogue feature for the Docusaurus project located in the book-source/ folder using OpenAI Agent SDK with Python and FastAPI. The agent must use Google's Gemini model via the OpenAI-compatible endpoint. The feature should handle both the default API key (limit 10 requests per user) and optional user-provided API key with the same agent logic.

Requirements:

1. Agent Behavior:
   - Accept highlighted content (text, code, or image) from frontend.
   - Always return "explanation" using simple terms and analogy-based approach.
   - Conditionally return "implementation" if content requires step-by-step guidance.
   - Conditionally return "example" if content benefits from examples (e.g., code).
   - Enforce input guardrails:
       - Highlighted content must not be empty.
       - Content type must be supported (text, code, image).
   - Enforce output guardrails:
       - JSON structure must include "explanation" always, "implementation" and "example" optionally.
       - Reject requests exceeding 10 turns for default API key with informative message.
   - Track request count for the default API key using api_key_manager.py.

2. Backend (Vercel-ready):
   - Implement FastAPI backend in book-source/api/.
   - Endpoint accepts:
     {
       "content": "<highlighted_content>",
       "apiKey": "<default_or_user_key>"
     }
   - Response returns JSON:
     {
       "explanation": "...",
       "implementation": "...", (optional)
       "example": "..." (optional)
     }
   - Use OpenAI Agent SDK to handle agent workflow, guardrails, and API call to Gemini endpoint.
   - Persist default key usage counts per user (in-memory or lightweight DB).
   - Validate user-provided API key if provided.

3. Frontend Integration:
   - Implement Highlight-AI components in book-source/src/components/:
       - HighlightPopup.jsx (confirmation popup)
       - HighlightDialog.jsx (main AI dialogue)
   - Hooks in book-source/src/hooks/useHighlight.js to detect selection & Ctrl+Shift+G shortcut.
   - Services in book-source/src/services/aiService.js to call backend FastAPI endpoint.
   - Dialogue box aligned with Docusaurus theme, scrollable and responsive.
   - Popups:
       - Enter → submit request
       - Esc → cancel
   - Include highlighted content, explanation, implementation (if applicable), and example (if applicable).

4. AI Configuration Page:
   - Allow user to set their own API key to override default key.
   - User key usage is unlimited.

5. UI/UX:
   - Match Docusaurus theme.
   - Popups/dialogs non-intrusive and user-friendly.
   - Include a close button for the dialogue.

6. Optional Enhancements:
   - Syntax highlighting for code examples.
   - Persistent history of previous AI responses.
   - Multi-language support for explanation.

7. Deliverables:
   - FastAPI backend endpoint with OpenAI Agent SDK in book-source/api/.
   - Frontend React components, hooks, and services inside book-source/src/.
   - Input/output guardrails enforcing content validation, output formatting, and request limits.
   - API key management logic (default vs user key).
   - Full integration with Docusaurus theme, Vercel-ready deployment.

The agent must fully encapsulate the AI-native approach: intelligent response generation adaptive to content type, seamless integration with Docusaurus UI, and safe API key usage.
labels: [plan, feature, AI, dialogue, highlight]
links:
  spec: specs/001-highlight-ai-dialogue/spec.md
  ticket: 
  adr: 
  pr: 
files:
- path: specs/001-highlight-ai-dialogue/plan.md
  action: updated
- path: specs/001-highlight-ai-dialogue/research.md
  action: created
- path: specs/001-highlight-ai-dialogue/data-model.md
  action: created
- path: specs/001-highlight-ai-dialogue/contracts/highlight_ai_api.yaml
  action: created
- path: specs/001-highlight-ai-dialogue/quickstart.md
  action: created
- path: GEMINI.md
  action: updated
tests:

---

## Prompt

/sp.plan Create a Highlight-AI-Dialogue feature for the Docusaurus project located in the book-source/ folder using OpenAI Agent SDK with Python and FastAPI. The agent must use Google's Gemini model via the OpenAI-compatible endpoint. The feature should handle both the default API key (limit 10 requests per user) and optional user-provided API key with the same agent logic.

Requirements:

1. Agent Behavior:
   - Accept highlighted content (text, code, or image) from frontend.
   - Always return "explanation" using simple terms and analogy-based approach.
   - Conditionally return "implementation" if content requires step-by-step guidance.
   - Conditionally return "example" if content benefits from examples (e.g., code).
   - Enforce input guardrails:
       - Highlighted content must not be empty.
       - Content type must be supported (text, code, image).
   - Enforce output guardrails:
       - JSON structure must include "explanation" always, "implementation" and "example" optionally.
       - Reject requests exceeding 10 turns for default API key with informative message.
   - Track request count for the default API key using api_key_manager.py.

2. Backend (Vercel-ready):
   - Implement FastAPI backend in book-source/api/.
   - Endpoint accepts:
     {
       "content": "<highlighted_content>",
       "apiKey": "<default_or_user_key>"
     }
   - Response returns JSON:
     {
       "explanation": "...",
       "implementation": "...", (optional)
       "example": "..." (optional)
     }
   - Use OpenAI Agent SDK to handle agent workflow, guardrails, and API call to Gemini endpoint.
   - Persist default key usage counts per user (in-memory or lightweight DB).
   - Validate user-provided API key if provided.

3. Frontend Integration:
   - Implement Highlight-AI components in book-source/src/components/:
       - HighlightPopup.jsx (confirmation popup)
       - HighlightDialog.jsx (main AI dialogue)
   - Hooks in book-source/src/hooks/useHighlight.js to detect selection & Ctrl+Shift+G shortcut.
   - Services in book-source/src/services/aiService.js to call backend FastAPI endpoint.
   - Dialogue box aligned with Docusaurus theme, scrollable and responsive.
   - Popups:
       - Enter → submit request
       - Esc → cancel
   - Include highlighted content, explanation, implementation (if applicable), and example (if applicable).

4. AI Configuration Page:
   - Allow user to set their own API key to override default key.
   - User key usage is unlimited.

5. UI/UX:
   - Match Docusaurus theme.
   - Popups/dialogs non-intrusive and user-friendly.
   - Include a close button for the dialogue.

6. Optional Enhancements:
   - Syntax highlighting for code examples.
   - Persistent history of previous AI responses.
   - Multi-language support for explanation.

7. Deliverables:
   - FastAPI backend endpoint with OpenAI Agent SDK in book-source/api/.
   - Frontend React components, hooks, and services inside book-source/src/.
   - Input/output guardrails enforcing content validation, output formatting, and request limits.
   - API key management logic (default vs user key).
   - Full integration with Docusaurus theme, Vercel-ready deployment.

The agent must fully encapsulate the AI-native approach: intelligent response generation adaptive to content type, seamless integration with Docusaurus UI, and safe API key usage.
## Response snapshot

The implementation plan for "Highlight AI Dialogue" has been successfully generated, and all design artifacts have been created.
- Branch Name: `001-highlight-ai-dialogue`
- Implementation Plan File: `/home/abdulhannan/data/development/openAi/ai-native/specs/001-highlight-ai-dialogue/plan.md`
- Generated Artifacts:
    - `research.md`
    - `data-model.md`
    - `contracts/highlight_ai_api.yaml`
    - `quickstart.md`
    - `GEMINI.md` (agent context updated)
The feature is now ready for task breakdown.

## Outcome

- ✅ Impact: Created a detailed implementation plan and design artifacts for the new feature.
- 🧪 Tests: N/A
- 📁 Files: Created `plan.md`, `research.md`, `data-model.md`, `contracts/highlight_ai_api.yaml`, `quickstart.md`, and updated `GEMINI.md`.
- 🔁 Next prompts: /sp.tasks
- 🧠 Reflection: Successfully generated a detailed implementation plan and design artifacts, incorporating specific file paths and Vercel-ready aspects. The agent context was also updated.

## Evaluation notes (flywheel)

- Failure modes observed: Warning about multiple spec directories with prefix '001' from `setup-plan.sh` and `update-agent-context.sh` scripts, but did not prevent successful execution. User cancelled `research.md` creation once.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A