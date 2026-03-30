# Athene AI — Syllabus to Email

Developed by: Lisa Hazel Dsouza

## Project Overview
The project is a streamlined application designed to process syllabus documents and generate actionable email drafts for students.

## Task Workflow

The application operates in two distinct stages to ensure clear separation of concerns and a progressive user experience.

### Task 1: Backend RAG Chunker
*   **Trigger**: Initiated when the "Process & Draft Email" button is clicked.
*   **Process**: 
    1.  The document text is sent to the backend (`/api/process-document?task=chunk`).
    2.  The engine segments the text into manageable semantic chunks (50 words with 10-word overlap).
    3.  Chunks are simulated as being saved to a document database (`chunks-db.json`).
*   **Result**: The frontend receives and immediately displays the processed chunks in the UI sidebar.

### Task 2: HITL (Human-In-The-Loop) Email Generation
*   **Trigger**: Automatically fires upon the successful completion of Task 1.
*   **Process**:
    1.  The frontend makes a subsequent request to (`/api/process-document?task=hitl`).
    2.  The AI generates a personalized email draft based on the context of the processed document.
*   **Result**: An interactive "Pending Action Card" appears, allowing the user to review, edit, or approve the final email draft.

---

## Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState)
- **API**: Next.js Route Handlers

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
