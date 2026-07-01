# AI Party Arcade

AI Party Arcade is a browser-based MVP for quick AI-generated party games. The core loop is simple: create a room, invite friends, play a generated challenge, and compare scores.

This public MVP uses server-side AI generation when `AI_API_KEY` is configured. It does not include realtime multiplayer, Supabase, login, payments, ads, or global leaderboards yet.

## Features

- Modern arcade-style homepage with a 60-second reviewer demo path
- Games page with Prompt Battle, AI Trivia Duel, AI Story Chain, Mystery Room, and Reaction Duel
- Server-side AI generation for Prompt Battle, AI Trivia Duel, and AI Story Chain
- Labeled demo fallback content when AI generation is unavailable
- API routes for prompt generation, trivia generation, response judging, and story continuation
- Random six-character room codes
- Copyable invite links
- Local browser room state and localStorage leaderboard
- Sample leaderboard rows when no local scores exist
- Terms, Privacy, and Safety pages
- App Router sitemap and robots files for Vercel deployment

## Gaming Data Layer

AI Party Arcade now includes a centralized gaming data layer in `src/lib/gameData.ts`.

- Scalable game chunks describe live, demo, and coming-soon formats.
- SEO landing pages reuse shared game data instead of hardcoding page content.
- Game cards can align around honest AI mode, player mode, replay hooks, target audience, and safety boundaries.
- Status labels stay explicit about what is live, demo-only, or planned.
- Local browser state remains the persistence layer before realtime multiplayer.
- Server-side AI routes use structured JSON outputs and fallback-safe generation.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Browser localStorage for demo-only persistence
- Server-side AI route handlers using `AI_API_KEY`

## Local Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Build Command

```bash
npm run build
```

## Vercel Deployment

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose Add New Project.
3. Import the repository.
4. Use the default Next.js framework settings:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: leave default
5. Add `AI_API_KEY` as a Vercel environment variable for Production, Preview, and Development.
6. Optional: add `AI_MODEL` if you want a model other than the default.
7. Deploy.
8. After deploy, smoke-check `/`, `/games`, `/daily`, `/free-ai-games`, `/ai-party-games`, `/create-room`, `/leaderboard`, `/terms`, `/privacy`, and `/safety`.

## Environment Variables

`AI_API_KEY` is required for real AI-generated rounds. Without it, the app still works by returning labeled demo fallback content from the server.

Local setup:

```bash
cp .env.example .env.local
```

Then set:

```bash
AI_API_KEY=your_server_side_ai_api_key_here
```

Vercel setup:

1. Open the Vercel project.
2. Go to Settings -> Environment Variables.
3. Add `AI_API_KEY`.
4. Redeploy the latest commit.

## MVP Limitations

- Gameplay is local/demo-only and not synchronized between devices.
- Invite links share a room route, but do not create realtime multiplayer sessions.
- Scores are stored only in the current browser.
- AI generation runs through server-side API routes only; browser code never receives `AI_API_KEY`.
- Demo fallback content appears when AI generation is missing, rate-limited, unsafe, invalid, or unavailable.
- Mystery Room and Reaction Duel are marked as coming soon.
- No real-money gambling, payments, adult-content focus, or ad features are included.

## Next Roadmap

- Realtime room synchronization
- Moderation and stronger safety controls
- Optional accounts or host controls
- Persistent leaderboards
- Expanded game library
