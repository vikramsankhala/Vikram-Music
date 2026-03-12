# Home Band & Jam Room — Website

Comprehensive website for the Home Band & Jam Room setup guide. Includes equipment specs, wiring diagrams, audio theory, gig suggestions, similar setups, YouTube videos, and Pune sourcing information.

## Deploy to Netlify

### Option 1: Drag & Drop
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the `website` folder (or the folder containing `index.html`, `styles.css`, `script.js`) into the Netlify deploy area
3. Your site will be live in seconds

### Option 2: Netlify CLI
```bash
cd website
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: Git Connect
1. Push this folder to a Git repository (GitHub, GitLab, Bitbucket)
2. In Netlify: New site → Import from Git
3. Set build settings:
   - Publish directory: `website` (or `.` if repo root is the website)
   - Build command: (leave empty for static site)

## Contents

- **Equipment list** — Full specs for PA, mixer, drums, guitar, mics, etc.
- **Wiring diagrams** — SVG diagrams for signal flow and cable routing
- **Audio theory** — Balanced vs unbalanced, gain staging, connectors
- **Gig suggestions** — Café, pub, house party, community events
- **Musical suggestions** — Genres, setlists, practice routines
- **Similar setups** — Bedroom producers, home jam bands
- **YouTube videos** — Tutorials and setup guides
- **Pune sourcing** — Stores, pricing, tips

## Files

- `index.html` — Main page
- `styles.css` — Styling
- `script.js` — Navigation and interactions
- `netlify.toml` — Netlify config (optional, for root deploy)
