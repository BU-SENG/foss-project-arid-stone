# Academic Progress Tracker

Modern academic planner for managing courses, calculating GPA/CGPA, and monitoring progress with AI insights.

## Quick Start

```bash
# Using bun
bun install
bun dev

# Or using npm
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Setup

Create `.env.local` in the project root:

```bash
GEMINI_API_KEY=your_api_key_here  # Optional - for AI insights
```

Get API key: [Google AI Studio](https://makersuite.google.com/app/apikey)

## Features

- User authentication (localStorage)
- Course management with validation
- GPA/CGPA calculation (5-point scale)
- Semester performance tracking
- Interactive charts and analytics
- AI-powered insights (Google Gemini)
- Responsive design with mobile support
- WCAG 2.1 AA accessible

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4 + DaisyUI 5
- Valibot (validation)
- Recharts (charts)
- Lucide React (icons)
- Google Generative AI

## Project Structure

```
app/
├── components/      # UI components
├── lib/
│   ├── actions/     # Server functions
│   ├── schemas/     # Validation schemas
│   ├── storage/     # Storage layer
│   ├── utils/       # Utilities
│   └── hooks/       # React hooks
└── (routes)/        # Pages
```

## Scripts

```bash
# Using bun
bun install       # Install dependencies
bun dev           # Development server
bun run build     # Production build
bun start         # Production server
bun run lint      # Lint check
bun test          # Run tests

# Using npm
npm install       # Install dependencies
npm run dev       # Development server
npm run build     # Production build
npm start         # Production server
npm run lint      # Lint check
npm test          # Run tests
```

## Storage

Currently uses localStorage with abstraction layer at `app/lib/storage/`. To migrate to database:

1. Implement async versions of storage functions
2. Update base storage layer
3. No UI changes needed

## License

MIT

---

**Note**: App works without Gemini API key but AI insights won't be available.