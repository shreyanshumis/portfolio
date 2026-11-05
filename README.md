# Shreyanshu M — Portfolio

Black / white / red. JetBrains Mono. Silhouette-aware text reflow. Live GitHub repos.

---

## Project structure

```
portfolio/
├── index.html          ← HTML entry point
├── vite.config.js      ← Vite config
├── vercel.json         ← Vercel SPA routing
├── package.json
└── src/
    ├── main.jsx        ← React root mount
    ├── index.css       ← Global reset + CSS vars
    └── App.jsx         ← Everything (components + logic)
```

---

## 1 — Prerequisites

- **Node.js 18+** → https://nodejs.org  
- **Git** → https://git-scm.com  
- **Vercel CLI** → install once:

```bash
npm install -g vercel
```

---

## 2 — Install dependencies

```bash
cd portfolio
npm install
```

---

## 3 — Run locally

```bash
npm run dev
```

Open → http://localhost:5173

Hot-reloads on every save. The GitHub API fetches repos on mount.  
If you hit rate limits (60 req/hr unauthenticated), add a token:

```bash
# .env.local  (never commit this)
VITE_GH_TOKEN=ghp_your_token_here
```

Then in App.jsx, pass it as a header:

```js
fetch(url, { headers: { Authorization: `Bearer ${import.meta.env.VITE_GH_TOKEN}` } })
```

---

## 4 — Customise

Everything is in `src/App.jsx`. The things you'll want to change:

| Constant / element          | Line to find                     | What to set                  |
|-----------------------------|----------------------------------|------------------------------|
| GitHub username             | `const GITHUB_USERNAME`          | Already set to `shreyanshumis` |
| Bio text                    | `const ABOUT_TEXT`               | Your own words               |
| Skills pills                | `const SKILLS = [...]`           | Your actual stack            |
| Role tagline                | the `"MCA Student · ..."` string | Your title                   |
| Email                       | `your@email.com`                 | Your real email              |
| LinkedIn URL                | `linkedin.com/in/shreyanshu`     | Your LinkedIn slug           |
| Status badge text           | `AVAILABLE FOR OPPORTUNITIES`    | Whatever you want            |

---

## 5 — Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally first:

```bash
npm run preview
```

---

## 6 — Deploy to Vercel

### First time

```bash
vercel login        # opens browser, authenticate with GitHub
vercel              # from inside the portfolio/ directory
```

Vercel will ask:
- **Set up and deploy?** → Y
- **Which scope?** → your account
- **Link to existing project?** → N
- **Project name?** → shreyanshu-portfolio (or anything)
- **In which directory is your code?** → ./  (just press Enter)
- **Want to modify settings?** → N

It detects Vite automatically. Done — you get a live URL instantly.

### Every future deploy

```bash
vercel --prod
```

Or push to GitHub and connect the repo in vercel.com → auto-deploys on every push.

### Custom domain (optional)

In vercel.com → your project → Settings → Domains → add `shreyanshu.dev` (or whatever you own).

---

## 7 — How the text reflow works

1. `buildSilhouetteMap()` rasterises the cup's SVG path onto a 160×190 offscreen canvas, then scans every row pixel-by-pixel to record `{ left, right }` edges of the actual cup shape.

2. `prepareChars()` measures every character in the about text individually using `canvas.measureText()` — same approach as [@chenglou/pretext](https://github.com/chenglou/pretext).

3. `layoutChars()` runs on every drag frame. For each text row it looks up the silhouette row, converts the pixel edges to container coordinates, and places characters one-by-one into the available segments. Mid-word breaks are allowed — letters split freely at the cup boundary.

4. The result is an array of `{ ch, x, y }` glyphs rendered as individual SVG `<text>` elements — no DOM layout, no reflow.

---

## 8 — Switching to starred repos

In `App.jsx`, change one URL:

```js
// public repos (current)
fetch(`${GITHUB_API}/repos?sort=updated&per_page=100`)

// starred repos
fetch(`${GITHUB_API}/starred?per_page=100`)
```

---

## Stack

- React 18 (no router needed — single page)
- Vite 5
- JetBrains Mono (Google Fonts)
- GitHub REST API v3 (no auth needed for public data)
- Canvas API for silhouette rasterisation + text measurement
- SVG for per-glyph text rendering
- Vercel for hosting
