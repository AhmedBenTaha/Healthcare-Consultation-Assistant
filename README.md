# Clinova — AI-Powered Clinical Consultation Assistant

**Smarter Clinical Workflows. Better Patient Communication.**

Clinova is an AI-powered clinical documentation assistant designed to help healthcare professionals transform consultation notes into structured clinical summaries, actionable next steps, and patient-friendly email drafts.

By combining a modern web interface with Large Language Models (LLMs), Clinova streamlines documentation workflows while keeping healthcare professionals in control of reviewing and approving generated content.

**Live Demo:** [Clinova — Consultation Assistant](https://clinova-nwvj7hf57-taha-0208.vercel.app/product)

---

## Overview

Clinical documentation can be time-consuming, especially when healthcare professionals need to organize consultation notes, prepare follow-up actions, and communicate information to patients.

Clinova provides an AI-assisted workflow that takes consultation information and generates three structured outputs:

1. **Clinical Visit Summary** — A concise summary of the consultation for medical records.
2. **Next Steps** — Organized follow-up actions for the healthcare professional.
3. **Patient Email Draft** — A patient-friendly email based on the provided consultation notes.

The system is designed to preserve the information supplied by the healthcare professional and instructs the AI not to invent missing medical details.

---

## Key Features

- **AI-Powered Clinical Summarization:** Converts consultation notes into structured medical documentation.
- **Actionable Next Steps:** Generates organized follow-up points based on the provided information.
- **Patient-Friendly Communication:** Drafts clear and understandable patient email communications.
- **Streaming AI Responses:** Displays generated content progressively using Server-Sent Events (SSE).
- **Authentication:** Secure user authentication and session management through Clerk.
- **Subscription-Based Access:** Integrates Clerk's subscription protection and pricing components.
- **Modern SaaS Interface:** Responsive user interface with a dark navy, teal, and cyan visual identity.

---

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Python, FastAPI |
| AI Integration | Groq API, OpenAI Python SDK |
| Language Model | OpenAI GPT-OSS 120B via Groq |
| Authentication | Clerk |
| Streaming | Server-Sent Events (SSE) |
| Deployment | Vercel |

---

## Architecture

Clinova follows a frontend-backend architecture:

```text
                 User
                  |
                  v
          Next.js Frontend
                  |
          Clerk Authentication
                  |
                  v
          FastAPI Backend
                  |
          Consultation Notes
                  |
                  v
             Groq API
          GPT-OSS 120B
                  |
          Streaming Response
                (SSE)
                  |
                  v
          React Markdown UI
                  |
                  v
       Structured AI-Generated
              Output
```

### Request Workflow

1. The user signs in through Clerk.
2. The user enters the patient's name, consultation date, and clinical notes.
3. The frontend obtains an authentication token.
4. The consultation data is sent to the FastAPI endpoint.
5. The backend validates the request and authentication.
6. The backend sends the structured prompt to the Groq API.
7. The model generates the response incrementally.
8. The backend streams the generated content to the frontend using SSE.
9. The frontend renders the response with Markdown formatting.

---

## Project Structure

```text
saas/
│
├── api/
│   └── index.py
│
├── pages/
│   ├── index.tsx
│   ├── product.tsx
│   └── _app.tsx
│
├── styles/
│   └── globals.css
│
├── public/
│
├── requirements.txt
├── package.json
├── next.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- Python 3.11+
- A Clerk account
- A Groq API key
- Vercel CLI

### 1. Clone the Repository

```bash
git clone <https://github.com/AhmedBenTaha/Healthcare-Consultation-Assistant>
cd saas
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it:

**macOS / Linux**

```bash
source .venv/bin/activate
```

**Windows**

```bash
.venv\Scripts\activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_JWKS_URL=your_clerk_jwks_url

# Groq AI
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-120b
```

Replace the placeholder values with your actual credentials.

**Important:** Never commit API keys, authentication secrets, or environment files to GitHub.

### 5. Run the Application Locally

Start the application using Vercel's local development environment:

```bash
vercel dev
```

Open the local URL provided by Vercel in your browser.

### 6. Build for Production

```bash
npm run build
```

Deploy to Vercel:

```bash
vercel --prod
```

Make sure the required environment variables are configured in your Vercel project settings.

---

## API Reference

### Generate Consultation Summary

**Endpoint:**

```http
POST /api
```

**Authentication:**

```http
Authorization: Bearer <CLERK_JWT_TOKEN>
```

**Request Body:**

```json
{
  "patient_name": "John Doe",
  "date_of_visit": "2026-11-12",
  "notes": "Patient reported..."
}
```

**Response:**

The endpoint returns a streaming response using:

```http
Content-Type: text/event-stream
```

The generated content contains three sections:

- Summary of visit for the doctor's records
- Next steps for the doctor
- Draft of email to patient in patient-friendly language

---

## Responsible AI & Medical Disclaimer

Clinova is an AI-assisted documentation tool, not a medical diagnostic system.

- Generated content must be reviewed and approved by a qualified healthcare professional.
- The AI is instructed not to invent diagnoses, medications, medical recommendations, or missing patient information.
- AI-generated summaries and email drafts may contain inaccuracies.
- Clinova should not replace professional medical judgment or clinical decision-making.

**Privacy Notice:** This project should not be used with real patient information unless appropriate security, privacy, data-protection, and regulatory requirements have been independently reviewed and satisfied.

---

## Future Improvements

Potential areas for future development include:

- Conversation history and consultation management.
- Exporting generated reports to PDF.
- Editable AI-generated summaries before approval.
- Additional language support, including Arabic.
- More advanced clinical prompt customization.
- Audit logs and improved monitoring.
- Enhanced data privacy and access controls.

---

**Clinova — Smarter Clinical Workflows. Better Patient Communication.**
