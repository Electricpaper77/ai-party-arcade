# AI Party Arcade

AI Party Arcade is a browser-based MVP for quick AI-style party games. The core loop is simple: create a room, invite friends, play a generated-style challenge, and compare scores.

This public MVP is intentionally local-only. It does not include real AI APIs, realtime multiplayer, Supabase, login, payments, ads, or global leaderboards yet.

## Features

- Modern arcade-style homepage with a 60-second reviewer demo path
- Games page with Prompt Battle, AI Trivia Duel, AI Story Chain, Mystery Room, and Reaction Duel
- Local MVP demos for Prompt Battle, AI Trivia Duel, and AI Story Chain
- Random six-character room codes
- Copyable invite links
- Local browser room state and localStorage leaderboard
- Sample leaderboard rows when no local scores exist
- Terms, Privacy, and Safety pages
- App Router sitemap and robots files for Vercel deployment

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Browser localStorage for demo-only persistence

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
5. Do not add environment variables for the current MVP.
6. Deploy.
7. After deploy, smoke-check `/`, `/games`, `/create-room`, `/leaderboard`, `/terms`, `/privacy`, and `/safety`.

## Environment Variables

No environment variables are required for the MVP. See `.env.example` for the current placeholder.

## MVP Limitations

- Gameplay is local/demo-only and not synchronized between devices.
- Invite links share a room route, but do not create realtime multiplayer sessions.
- Scores are stored only in the current browser.
- AI behavior is represented with sample prompts, sample trivia, and placeholder scoring.
- Mystery Room and Reaction Duel are marked as coming soon.
- No real-money gambling, payments, adult-content focus, or ad features are included.

## Next Roadmap

- Realtime room synchronization
- Real AI-generated prompts, trivia, and story continuations
- Moderation and stronger safety controls
- Optional accounts or host controls
- Persistent leaderboards
- Expanded game library

