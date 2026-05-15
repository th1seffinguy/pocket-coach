# Jukit — Contributing & Development Rules

> See this file at the start of every Claude Code or Codex session.
> Read README.md and CONTRIBUTING.md before starting any work.

---

## Drill Catalog

### Source of Truth

Notion is the single source of truth for all drill content.

- Notion Drills database ID: `dd33ca29-26cb-442b-a9ba-3e0782a25e7f`
- The app reads drills from `/api/drills` (Vercel serverless function that fetches from Notion)
- `drills.json` is a fallback cache only. It is NOT the source of truth.
- Never add or edit drills in `drills.json` without also updating Notion.

### Adding or Editing Drills

ANY time a drill is added, edited, or removed:

1. Make the change in Notion FIRST
2. The app pulls from `/api/drills` which reads from Notion automatically
3. Only update `drills.json` if the API is down and a hotfix is needed. Document this if it happens.
4. After any drill change, verify the live app at https://jukit.vercel.app reflects the update

After editing any drill in Notion, trigger a Vercel redeploy to bust the 1-hour CDN cache. Vercel Dashboard → jukit → Deployments → Redeploy latest. Changes will not appear in the live app until the cache clears or a redeploy runs.

### Drill Schema

Every drill must have all fields populated in Notion before it goes live.

| Field | Type | Notes |
|---|---|---|
| Name | Title | Full display name |
| Slug | Text | lowercase-hyphenated id (e.g. gate-dribbling) |
| Sport | Select | soccer, basketball, baseball |
| Duration | Number | Minutes (integer) |
| Ages | Multi-select | 0, 1, 2, 3 (age group index: 0=Ages 3-5, 1=Ages 5-7, 2=Ages 7-9, 3=Ages 9-11) |
| Tags | Multi-select | control, shooting, movement, passing, speed, agility, defending |
| Setup | Text | 1-2 sentences max |
| How | Text | 2-3 sentences max |
| Cue | Text | One short phrase the coach says out loud |
| Success | Text | One observable signal the coach looks for |
| Fun | Checkbox | true = high-engagement drill |
| Has Video | Checkbox | false until video asset is produced |
| Location | Select | indoor, outdoor, both |
| Equipment Tier | Number | 1 = ball only, 2 = ball + goal, 3 = ball + goal + cones |
| Agility | Number | 0-3 attribute rating |
| Coordination | Number | 0-3 attribute rating |
| Balance | Number | 0-3 attribute rating |
| Speed | Number | 0-3 attribute rating |
| Strength | Number | 0-3 attribute rating |
| Technique | Number | 0-3 attribute rating |
| Vision | Number | 0-3 attribute rating |
| Endurance | Number | 0-3 attribute rating |
| Priority | Number | Display order in the app (lower = higher priority) |
| Insight 1 | Text | Optional coaching insight shown during session |
| Insight 2 | Text | Optional coaching insight |
| Insight 3 | Text | Optional coaching insight |

### Attribute Ratings (0-3 scale)

| Rating | Meaning |
|---|---|
| 0 | Not trained by this drill |
| 1 | Lightly developed |
| 2 | Moderately developed |
| 3 | Primary focus of this drill |

### Style Rules (mandatory for all drill content)

- No em dashes or en dashes anywhere in any field. Use commas, colons, or new sentences instead.
- Setup: 1-2 sentences, plain language, tells the coach exactly what to put where
- How: 2-3 sentences, active voice, describes what happens during the drill
- Cue: one short phrase a parent says out loud during the drill. No punctuation at the end unless it is a question.
- Success: one observable signal. What does good look like at this age?

---

## Deployment

### Stack

| Layer | Technology |
|---|---|
| Frontend | `index.html` (vanilla HTML/CSS/JS) |
| Drill data API | `/api/drills.js` (Vercel serverless, reads from Notion) |
| Hosting | Vercel (auto-deploy from GitHub) |
| Live URL | https://jukit.vercel.app |
| Repo | github.com/th1seffinguy/jukit |
| Branch | main |

### Deployment Workflow

Push to main = live in approximately 15 seconds via Vercel.
Never use GitHub Pages commands.

```bash
git add .
git commit -m "description of change"
git push origin main
```

### Environment Variables (managed in Vercel dashboard)

| Variable | Purpose |
|---|---|
| `NOTION_API_KEY` | Notion integration token for /api/drills |

Never hardcode environment variables in any file in the repo.

### Versioning

Use semantic versioning: `v[major].[minor].[patch]`

- Major: React Native conversion or App Store launch
- Minor: new feature shipped
- Patch: bug fix only

Update `VERSION` constant at the top of `index.html` with each release.
After pushing, tag the release:

```bash
git tag v0.X.0
git push origin v0.X.0
```

---

## Notion Databases

| Database | ID | Purpose |
|---|---|---|
| Drills | `dd33ca29-26cb-442b-a9ba-3e0782a25e7f` | Source of truth for all drill content |
| Build Ideas | `b48e5474-3cd8-49c3-8ee2-a747fe01da43` | Feature backlog |
| Drill Feedback | `a41a9500-bbe4-446c-8adc-9cf172255bd0` | Content refinement requests |

---

## Session Wrap-Up (required after every session)

After every Claude Code or Codex session, complete the following before closing:

- [ ] Push all changes to main
- [ ] Verify live at https://jukit.vercel.app — confirm no console errors
- [ ] Update Notion Build Ideas: mark completed items as Done
- [ ] Log any new bugs or issues to Notion Drill Feedback
- [ ] If any drills were added or edited, confirm they exist in Notion with all fields populated
- [ ] If a new feature shipped, update the VERSION constant and create a git tag
- [ ] Update the VERSION constant at the top of index.html before every push. Use semantic versioning: patch bump (0.3.0 → 0.3.1) for bug fixes, minor bump (0.3.0 → 0.4.0) for new features. Never push to main without updating the version.

---

## Age Group Reference

| Index | Label | Ages | Development Focus |
|---|---|---|---|
| 0 | Ages 3-5 | U4/U6 | Motor skills, discovery, chaos is OK |
| 1 | Ages 5-7 | U6/U8 | Ball mastery, first shooting |
| 2 | Ages 7-9 | U8/U10 | Technical foundation, 1v1 |
| 3 | Ages 9-11 | U10/U12 | Skill under pressure, passing combos |

## Equipment Tier Reference

| Tier | What's Available | Unlocks |
|---|---|---|
| 1 | Ball only | Control, juggling, footwork drills |
| 2 | Ball + goal | All shooting drills |
| 3 | Ball + goal + cones | Gate drills, shape dribbling, passing setups |
