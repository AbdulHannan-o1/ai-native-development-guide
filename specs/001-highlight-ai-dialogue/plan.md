# Implementation Plan: Highlight AI Dialogue

**Branch**: `001-highlight-ai-dialogue` | **Date**: 2025-11-16 | **Spec**: specs/001-highlight-ai-dialogue/spec.md
**Input**: Feature specification from `/specs/001-highlight-ai-dialogue/spec.md`

## Summary

The "Highlight AI Dialogue" feature will enable users to highlight content (text, code, images) within the Docusaurus application and receive AI-generated explanations, implementation guidance, and examples. The solution will comprise a FastAPI backend utilizing an OpenAI Agent SDK with Google Gemini (via an OpenAI-compatible endpoint), supporting both a default API key with a request limit and user-provided API keys for unlimited usage. The Docusaurus frontend will integrate highlight detection, a confirmation pop-up, a `Ctrl+Shift+G` shortcut, and a Docusaurus-themed AI dialogue box to display the AI's responses.

## Technical Context

**Language/Version**: Python 3.x (for FastAPI backend), TypeScript/JavaScript (for Docusaurus frontend).  
**Primary Dependencies**: FastAPI, OpenAI Agent SDK, Google Gemini API (via OpenAI-compatible endpoint), Docusaurus.  
**Storage**: Lightweight DB or in-memory solution for tracking default API key usage per user (e.g., using `api_key_manager.py`).  
**Testing**: `pytest` for backend unit and integration tests; `Jest` and `React Testing Library` for frontend unit tests; `Cypress` or `Playwright` for end-to-end (e2e) frontend tests.  
**Target Platform**: Web (Docusaurus application), Vercel-ready backend.
**Project Type**: Web application (frontend + backend).  
**Performance Goals**: AI response within 5 seconds for typical requests. Frontend UI interactions (highlight detection, pop-up display, dialogue box rendering) within 500ms.  
**Constraints**: Default API key limited to 10 requests per user. The UI must seamlessly match the existing Docusaurus theme and styling.  
**Scale/Scope**: Initial release targets individual users of the Docusaurus documentation.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

-   **Specification Primacy**: Pass. The feature specification was created and approved prior to this planning phase.
-   **Progressive Complexity**: Pass. The feature's complexity, involving full-stack development, AI integration, and API key management, is appropriate for the target audience of developers using Docusaurus.
-   **Factual Accuracy & No Hallucinations**: Pass. The plan relies on established technologies (FastAPI, OpenAI Agent SDK, Google Gemini) and does not introduce speculative components.
-   **Coherent Pedagogical Structure**: N/A. This is an implementation plan for a feature, not a chapter. The feature itself aims to enhance the pedagogical structure of the Docusaurus content.
-   **Intelligence Accumulation**: Pass. The plan integrates new AI capabilities into the existing Docusaurus framework, leveraging its structure.
-   **Anti-Convergence Variation**: N/A. This principle applies to teaching patterns across consecutive chapters, not to feature implementation plans.
-   **Minimal Sufficient Content**: Pass. The plan focuses on addressing the core requirements of the feature as defined in the specification, avoiding unnecessary complexity.

## Project Structure

### Documentation (this feature)

```text
specs/001-highlight-ai-dialogue/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
book-source/
├── api/                     # FastAPI backend for AI agent
│   ├── src/
│   │   ├── api/                 # FastAPI endpoints for AI agent interaction
│   │   ├── services/            # Core AI agent logic, Google Gemini integration, API key management (api_key_manager.py)
│   │   └── models/              # Pydantic models for request/response payloads, user API key usage tracking
│   └── tests/
│       ├── unit/                # Unit tests for individual functions/modules
│       └── integration/         # Integration tests for service interactions and API endpoints
└── src/                     # Docusaurus frontend source
    ├── components/          # React components for the confirmation pop-up (HighlightPopup.jsx), AI dialogue box (HighlightDialog.jsx)
    ├── hooks/               # Custom React hooks for highlight detection (useHighlight.js), keyboard shortcuts
    ├── services/            # Frontend service for making API calls to backend (aiService.js)
    └── styles/              # CSS/SCSS modules or utility classes for Docusaurus theme alignment
```

**Structure Decision**: The "Web application" structure is selected to maintain a clear separation of concerns between the backend AI service and the Docusaurus frontend. This modular approach facilitates independent development, testing, and potential scaling of both components. The specific paths within `book-source/` are chosen to align with the Docusaurus project structure and Vercel deployment conventions.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |