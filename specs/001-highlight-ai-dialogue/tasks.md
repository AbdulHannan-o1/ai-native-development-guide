# Tasks: Highlight AI Dialogue

**Input**: Design documents from `/specs/001-highlight-ai-dialogue/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create `book-source/api/` directory.
- [X] T002 Create `book-source/api/src/` directory.
- [X] T003 Create `book-source/api/src/api/` directory.
- [X] T004 Create `book-source/api/src/services/` directory.
- [X] T005 Create `book-source/api/src/models/` directory.
- [X] T006 Create `book-source/api/tests/` directory.
- [X] T007 Create `book-source/api/tests/unit/` directory.
- [X] T008 Create `book-source/api/tests/integration/` directory.
- [X] T009 Create `book-source/src/components/` directory.
- [X] T010 Create `book-source/src/hooks/` directory.
- [X] T011 Create `book-source/src/services/` directory.
- [X] T012 Create `book-source/src/styles/` directory.
- [X] T013 Create `book-source/src/pages/` directory.
- [X] T014 Initialize FastAPI project in `book-source/api/` (create `main.py` and basic app setup).
- [X] T015 Create `requirements.txt` in `book-source/api/` with `fastapi`, `uvicorn`, `openai`, `python-dotenv`.
- [X] T016 Create `.env` file in `book-source/api/` for `GEMINI_API_KEY`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T017 [P] Implement Pydantic models for `HighlightedContent`, `AIRequest`, `AIResponse`, `ErrorResponse` in `book-source/api/src/models/data_models.py`.
- [X] T018 [P] Implement `api_key_manager.py` for default API key usage tracking in `book-source/api/src/services/api_key_manager.py`.
- [X] T019 Configure OpenAI Agent SDK to use Google Gemini via OpenAI-compatible endpoint in `book-source/api/src/services/ai_agent_config.py`.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Highlight Content & Get AI Guidance (Priority: P1) 🎯 MVP

**Goal**: Enable users to highlight content and receive AI-generated guidance.

**Independent Test**: Select various types of content (text, code, image), confirm the action, and verify that the AI Dialogue box appears with relevant and accurate guidance in the specified fields.

### Implementation for User Story 1

- [X] T020 [US1] Implement AI agent logic in `book-source/api/src/services/ai_agent.py` to process highlighted content and generate explanations, implementations, and examples.
- [X] T021 [US1] Implement input guardrails in `book-source/api/src/api/highlight.py` to validate content type and non-empty content.
- [X] T022 [US1] Implement output guardrails in `book-source/api/src/services/ai_agent.py` to ensure correct JSON structure.
- [X] T023 [US1] Create FastAPI endpoint `/ai/highlight` in `book-source/api/src/api/highlight.py` to receive requests and return AI responses.
- [X] T024 [P] [US1] Implement `useHighlight.js` hook in `book-source/src/hooks/useHighlight.js` for detecting text selection and `Ctrl+Shift+G` shortcut.
- [X] T025 [P] [US1] Implement `HighlightPopup.jsx` component in `book-source/src/components/HighlightPopup.jsx` for confirmation.
- [X] T026 [P] [US1] Implement `HighlightDialog.jsx` component in `book-source/src/components/HighlightDialog.jsx` to display AI responses.
- [X] T027 [US1] Implement `aiService.js` in `book-source/src/services/aiService.js` to call the backend API.
- [X] T028 [US1] Integrate `HighlightPopup.jsx` and `HighlightDialog.jsx` into Docusaurus root layout (e.g., `book-source/src/theme/Layout/index.js`).
- [X] T029 [US1] Apply Docusaurus theme styling to `HighlightPopup.jsx` and `HighlightDialog.jsx` in `book-source/src/styles/`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Manage AI API Keys (Priority: P2)

**Goal**: Allow users to manage their AI API keys, using a default limited key or a custom unlimited key.

**Independent Test**: Verify the default API key's request limit and then configure a custom API key to confirm that the limit is bypassed for subsequent requests.

### Implementation for User Story 2

- [X] T030 [US2] Modify `book-source/api/src/services/ai_agent.py` to use user-provided API key if present, otherwise default.
- [X] T031 [US2] Integrate API key validation logic in `book-source/api/src/services/api_key_manager.py`.
- [X] T032 [US2] Implement logic to enforce 10-request limit for default API key in `book-source/api/src/services/api_key_manager.py`.
- [X] T033 [US2] Create AI configuration page in `book-source/src/pages/ai-config.js` for users to input and save their API key.
- [X] T034 [US2] Implement secure storage for user's API key in the browser (e.g., local storage with encryption).
- [X] T035 [US2] Modify `book-source/src/services/aiService.js` to send user's API key to the backend if configured.
- [X] T036 [US2] Implement UI to notify user when default API key limit is reached.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T037 Implement comprehensive error handling across frontend and backend.
- [X] T038 Add logging for backend requests and AI responses in `book-source/api/src/main.py`.
- [X] T039 Implement unit tests for backend components in `book-source/api/tests/unit/`.
- [X] T040 Implement integration tests for backend components in `book-source/api/tests/integration/`.
- [X] T041 Implement unit tests for frontend components and hooks in `book-source/src/components/` and `book-source/src/hooks/`.
- [X] T042 Implement end-to-end tests for the full user flow.
- [X] T043 Refine UI/UX for pop-ups and dialogue boxes.
- [X] T044 Add close button for the main dialogue.
- [X] T045 Run quickstart.md validation.

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
-   **User Stories (Phase 3+)**: All depend on Foundational phase completion
    -   User stories can then proceed in parallel (if staffed)
    -   Or sequentially in priority order (P1 → P2 → P3)
-   **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

-   **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
-   **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable

### Within Each User Story

-   Models before services
-   Services before endpoints
-   Core implementation before integration
-   Story complete before moving to next priority

### Parallel Opportunities

-   All Setup tasks can run in parallel.
-   Tasks T017 and T018 in Foundational phase can run in parallel.
-   Once Foundational phase completes, User Story 1 and User Story 2 can be worked on in parallel by different team members.
-   Within User Story 1, tasks T024, T025, T026 can run in parallel.
-   Within User Story 2, tasks T033, T034 can run in parallel.
-   Testing tasks (T039, T040, T041, T042) can be parallelized.

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
# (No explicit test tasks were requested in the spec, but can be added here if needed)

# Launch all models for User Story 1 together:
# (Models are part of Foundational phase, so no separate model tasks here)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 1
4.  **STOP and VALIDATE**: Test User Story 1 independently
5.  Deploy/demo if ready

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3.  Add User Story 2 → Test independently → Deploy/Demo
4.  Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together
2.  Once Foundational is done:
    -   Developer A: User Story 1
    -   Developer B: User Story 2
3.  Stories complete and integrate independently

---

## Notes

-   [P] tasks = different files, no dependencies
-   [Story] label maps task to specific user story for traceability
-   Each user story should be independently completable and testable
-   Verify tests fail before implementing
-   Commit after each task or logical group
-   Stop at any checkpoint to validate story independently
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence