# Perkin AI - Voice Motor Screening Dashboard

A production-ready Next.js application for voice motor screening focused on Parkinson's disease detection.

## Features

- Voice recording and analysis
- Speech rate, pause ratio, pitch variance, and loudness variance metrics
- Clinical dashboard with trend analysis
- Session history tracking
- No authentication required
- Prepared for MongoDB Atlas, Gemini API, and ElevenLabs integration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Audio**: MediaRecorder API
- **Database**: MongoDB (structure prepared, not active)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
/app
  ├── layout.tsx              # Root layout
  ├── page.tsx                # Landing page
  ├── consent/page.tsx        # Informed consent
  ├── task/page.tsx           # Instructions
  ├── record/page.tsx         # Recording interface
  ├── processing/page.tsx     # Analysis loading
  ├── results/page.tsx        # Results dashboard
  ├── history/page.tsx        # Session history
  └── /api
      └── /session
          ├── start/route.ts   # Start session
          ├── upload/route.ts  # Upload audio
          ├── analyze/route.ts # Analyze session
          └── history/route.ts # Fetch history

/components
  ├── Navbar.tsx              # Navigation bar
  ├── StepIndicator.tsx       # Progress indicator
  ├── AudioRecorder.tsx       # Audio recording component
  ├── ScriptReader.tsx        # Reading passage display
  ├── ResultSummary.tsx       # Score summary card
  ├── FeatureMetricsTable.tsx # Detailed metrics table
  ├── FeatureBarChart.tsx     # Feature bar chart
  └── TrendChart.tsx          # Trend line chart

/lib
  ├── apiClient.ts            # API client functions
  ├── mockAnalysis.ts         # Mock data generation
  ├── scoring.ts              # Scoring algorithms
  └── db.ts                   # MongoDB connection (prepared)

/types
  └── session.ts              # TypeScript interfaces
```

## User Flow

1. **Landing** (`/`) - Overview and system information
2. **Consent** (`/consent`) - Informed consent agreement
3. **Instructions** (`/task`) - Recording instructions
4. **Recording** (`/record`) - Voice recording session
5. **Processing** (`/processing`) - Analysis in progress
6. **Results** (`/results`) - Detailed results dashboard
7. **History** (`/history`) - All previous sessions

## API Routes

### POST `/api/session/start`
Starts a new session and returns a session ID.

### POST `/api/session/upload`
Uploads audio file and returns transcript.

### POST `/api/session/analyze`
Analyzes session and returns voice motor metrics.

### GET `/api/session/history`
Retrieves session history.

## Future Enhancements

Currently using mock data. To enable full functionality:

1. **MongoDB Atlas**: Uncomment MongoDB connection code in `lib/db.ts` and add `MONGODB_URI` to environment variables
2. **Gemini API**: Integrate for speech-to-text transcription
3. **ElevenLabs**: Integrate for voice feature extraction
4. **Authentication**: Add user authentication system
5. **Data Persistence**: Store sessions in MongoDB

## Environment Variables

Copy `.env.example` to `.env.local` and add your API keys (optional for current mock version):

```bash
cp .env.example .env.local
```

## Clinical Disclaimer

This is a SCREENING TOOL ONLY and is NOT a diagnostic device. Results should be reviewed by qualified healthcare professionals. Do not use as a replacement for professional medical evaluation.

## License

Proprietary - All rights reserved
