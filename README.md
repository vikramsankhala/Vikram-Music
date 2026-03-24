# Live Stage — Concert & Love Songs Curation

An interactive website curating the best 4K live concert videos and love songs from Celine Dion, Shakira, Enrique Iglesias, and world music performers. Includes an AI chat assistant powered by Anthropic Claude.

## Features

- **50+ curated videos** across 9 categories
- **YouTube embeds** — click any video card to watch in a modal
- **Sortable table** — by date, duration, title
- **Search** — filter by title, artist, or description
- **Category tabs** — Celine Dion, Shakira, Enrique Iglesias, Love Songs, African & Afrobeat, Latin & Cuban, Flamenco & Spanish
- **Shakira 4K Playlist** — embedded YouTube playlist (34 videos)
- **Best Love Songs** — Elvis Presley, Neil Diamond, Lobo, Bryan Adams, Whitney Houston, Eric Clapton, Lionel Richie, Luther Vandross & Mariah Carey, and Grammy winners
- **AI Assistant** — chat with Claude to get recommendations and answers about the content (requires backend + `ANTHROPIC_API_KEY`)

## How to Run Locally

```bash
npm install
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
npm start
```

Then open http://localhost:3333

## Deploy on Render (Web Service)

1. Connect this repo at [Render Dashboard](https://dashboard.render.com)
2. Choose **Web Service** (not Static Site)
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. **Environment:** Add `ANTHROPIC_API_KEY` with your Anthropic API key

## Structure

- `server.js` — Express server, serves static files and `/api/chat` endpoint
- `index.html` — Page structure and sections
- `style.css` — Concert-stage dark theme with gold accent
- `data.js` — Video metadata (videoId, title, duration, date, views)
- `app.js` — Tabs, search, sort, modal, table logic
- `chat.js` — AI chat UI and API calls

## Playlist

The Shakira Best 4K playlist is embedded from:
https://youtube.com/playlist?list=PLl1nGeQ1UIbw0lAfx8bVlPcF61i_jV5Ec
