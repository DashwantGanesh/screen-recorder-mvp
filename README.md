# Screen Recorder MVP

A minimal Loom-like screen recording application built as part of an MVP assignment to demonstrate browser media handling, backend processing, and product thinking.

The application allows users to record their screen and microphone directly in the browser, trim the recording, upload it, generate a public share link, and track basic analytics such as views and completion rate.

---

## Features

### Screen Recording
- Record screen + microphone using the MediaRecorder API
- Start and stop controls
- Output saved as `.webm`
- Local preview after recording

### Video Trimming
- User-defined start and end time (in seconds)
- Server-side trimming using FFmpeg
- Preview trimmed video
- Export trimmed video as `.webm`

### Upload & Share
- Upload final (trimmed) video to server (mocked local storage)
- Generate a public shareable link
- Public page with embedded video player

### Basic Analytics
- Track view count when share page loads
- Track completion when video finishes playing
- Persistent analytics stored in a JSON file

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **MediaRecorder API**
- **Node.js API Routes**
- **FFmpeg (server-side)**
- **Local file system storage**
- **JSON-based analytics persistence**

---

## Project Structure

screen-recorder-mvp/
├── app/
│   ├── page.tsx                  # Home / recorder UI
│   └── share/
│       └── [id]/
│           └── page.tsx          # Public share page
│
├── components/
│   └── Recorder.tsx              # Recording, trimming, upload UI
│
├── lib/
│   └── recorder.ts               # MediaRecorder logic
│
├── pages/
│   └── api/
│       ├── upload.ts             # Upload API
│       ├── trim.ts               # Video trimming API
│       └── analytics.ts          # Analytics API
│
├── data/
│   └── analytics.json            # Persistent analytics storage
│
├── public/
│   └── uploads/                  # Stored video files
│
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/DashwantGanesh/screen-recorder-mvp
cd screen-recorder-mvp
```


### 2. Install Dependencies
```bash
npm install
```

### 3. Install FFmpeg (Required for Trimming)

Windows

Download from: https://www.gyan.dev/ffmpeg/builds/
Extract and add the bin folder to PATH

### 4. Run the Development Server
```bash
npm run dev
```

## Application Flow
User starts screen recording

Browser captures screen and microphone

Recording is stopped and previewed locally

User enters trim start and end time

Server trims video using FFmpeg

Trimmed video is previewed

User uploads the final video

Public share link is generated

Share page tracks views and completion

## Analytics Logic
View Count

Incremented when the public share page loads

Completion Count

Incremented when the video finishes playing

Completion Percentage

(completed / views) * 100


Analytics data persists in:

data/analytics.json


## Architecture Decisions
Why MediaRecorder API?

Native browser API

No external libraries required

Best choice for in-browser screen recording

Why Server-Side FFmpeg?

More reliable and faster than browser-based processing

Handles large files efficiently

Cleaner separation between frontend and video processing

Why Local Storage Instead of Cloud?

Keeps MVP simple

Avoids cloud configuration overhead

Easily replaceable with S3 or Cloudflare R2

Why JSON for Analytics?

Lightweight and persistent

Sufficient for MVP validation

Clear upgrade path to a database

## 🚧 Limitations

No authentication or private videos

No duplicate view protection

FFmpeg trimming runs locally (not deployed)

Limited Safari support due to MediaRecorder API

Basic analytics only

## Improvements for Production
If this were production-ready, the following improvements would be made:

User authentication and private videos

Cloud storage (S3 / R2)

Background jobs for video processing

Chunked uploads for large files

Database-backed analytics (PostgreSQL / Prisma)

Advanced analytics (watch time, drop-off)

Rate limiting and security hardening

Better cross-browser support

UI/UX enhancements

## Demo
A 2–3 minute screen recording demonstrating:

Screen recording

Video trimming

Upload & share

Public playback

Analytics tracking

🔗 Demo Video Link:
https://drive.google.com/file/d/1gfNRbqtGe7axV9FEtFhin3P6R_QNhnqo/view?usp=sharing