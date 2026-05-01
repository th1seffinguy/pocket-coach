# Pocket Coach

A mobile-first youth coaching app for parent-led backyard sessions. Open `index.html` in any browser — no install, no build step, no server required.

---

## What the app does

Pocket Coach gives a parent everything needed to run a structured 15–25 minute backyard practice without any coaching experience. On load it generates a session for the selected age group: a curated sequence of drills, each with a setup diagram (SVG pictogram), step-by-step instructions, a one-line verbal cue for the parent, and a success indicator so you know the rep worked. A countdown timer tracks the session; individual drills can be swapped or shuffled on the fly. Completing all drills records the session in-memory and updates the Progress tab with cumulative stats.

---

## Age groups and developmental focus

| Group | Ages | Ball size | Session | Focus |
|---|---|---|---|---|
| **U4/U6** | 3–5 | Size 2–3 | 15 min | Discovery & Fun — motor skills, dribbling in open space, ball as friend. No passing expectations. Every kid gets their own ball. Chaos is fine. |
| **U6/U8** | 5–7 | Size 3 | 20 min | Ball Mastery & First Shooting — high touch volume, both feet, stopping on command, kicking at goal. Passing introduced only as a reward drill. |
| **U8/U10** | 7–9 | Size 3–4 | 20 min | Technical Foundation — inside/outside of foot dribbling, receiving ground balls, instep shooting, basic 1v1 defending. Small-sided games begin. |
| **U10/U12** | 9–11 | Size 4 | 25 min | Skill Under Pressure — passing combinations, ball mastery at speed, 1v1 attacking and defending, crossing and finishing. Position awareness introduced. |

Each age group has a curated default session and a pool of eligible drills. The session generator avoids repeating the previous session's third drill to keep practice fresh.

---

## Drill catalog (18 drills)

| Drill | Tags | Ages | Fun |
|---|---|---|---|
| Hit the Coach | control · movement · shooting | U4/U6, U6/U8 | ⭐ |
| Shape Dribble | control · movement | U4/U6, U6/U8 | |
| Red Light / Green Light | control · movement | U4/U6 – U8/U10 | ⭐ |
| Clean Your Room | shooting · movement | U4/U6, U6/U8 | ⭐ |
| Toe Taps | control | All ages | |
| Pass and Shoot | shooting · control · passing | U6/U8 – U10/U12 | ⭐ |
| Gate Dribbling | control · shooting | U6/U8 – U10/U12 | ⭐ |
| Goalkeeper's Nightmare | shooting · movement | U6/U8 – U10/U12 | ⭐ |
| Freeze Tag Dribble | control · movement | U4/U6 – U8/U10 | ⭐ |
| Balloon Juggling | control | U4/U6 – U8/U10 | ⭐ |
| 1v1 Target Practice | shooting | U6/U8 – U10/U12 | ⭐ |
| Free Shoot — Finish Strong | shooting | All ages | ⭐ |
| Cone Weave | control · movement | U8/U10, U10/U12 | |
| Inside / Outside | control | U8/U10, U10/U12 | |
| Shield and Turn | control · movement | U8/U10, U10/U12 | ⭐ |
| Triangle Passing | passing · movement | U10/U12 | |
| Keep Away (Rondo) | passing · control | U10/U12 | ⭐ |
| Cross and Finish | shooting · passing · movement | U10/U12 | ⭐ |

Every drill includes: setup instructions, step-by-step execution, a parent verbal cue, and a success indicator. The library view supports full-text search and filter chips (age group, skill category, high-fun).

---

## Tech stack

- **Single-file HTML/CSS/JS** — no framework, no bundler, no dependencies beyond Google Fonts
- **CSS custom properties** — dark-theme design token system (`--bg`, `--surface`, `--blue`, `--green`, `--amber`, `--coral`)
- **Google Fonts** — Bebas Neue (display headings), DM Sans (body), DM Mono (labels/badges)
- **Inline SVG pictograms** — 18 hand-authored drill icons stored as template literals; rendered at any size without raster assets
- **Vanilla JS** — three views (Today, Drills, Progress) rendered via `innerHTML`; no virtual DOM
- **In-memory state** — session history, streak, and cumulative stats live in a `state` object; lost on page refresh

---

## Roadmap

### 1 — localStorage persistence
Serialize the `state` object to `localStorage` on every session save so progress survives page refresh. Requires ~10 lines of JSON read/write around the existing `state` object. Unlocks the Progress tab as a real coaching log.

### 2 — React Native / Expo conversion
Port the data layer (`AGE_GROUPS`, `ALL_DRILLS`, session logic, timer) to TypeScript modules. Rebuild the UI in React Native with Expo, targeting iOS and Android from a single codebase. SVG pictograms migrate to `react-native-svg`. Navigation via Expo Router (tab bar maps directly to the existing three-view layout).

### 3 — App Store release
- Add offline support (Expo's bare workflow or EAS Build)
- Persist data with AsyncStorage or SQLite via Expo
- Add push notifications for session reminders
- Submit to Apple App Store and Google Play via EAS Submit
