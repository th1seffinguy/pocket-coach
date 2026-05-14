# Insights Section — Collapsible Design

**Date:** 2026-05-14
**Status:** Approved

## Problem

The "Why This Drill" insight cards are always visible, text is truncated (horizontal scroll + 38px max-height clamp), and the section label is verbose. The primary user is a coaching parent glancing mid-drill — they need it non-obtrusive by default and fully readable on demand.

## Design

### Label
`WHY THIS DRILL` → `INSIGHTS`

### Collapsed state (default)
Single header row: `INSIGHTS` label + `▾` chevron. Full-width tap target (min-height 34px). Visible only when a drill has insights (existing `.open` class behavior unchanged).

### Expanded state
Tapping the header toggles an `.expanded` class on `.b-insights`. Cards render as a vertical stack — full text, no truncation. Chevron rotates 180°.

### Persistence
`.expanded` state is NOT reset on drill change — the parent's preference persists through the session to avoid surprise layout shifts mid-drill.

## Changes (all in `index.html`)

| Area | Change |
|------|--------|
| HTML label | `"Why This Drill"` → `"Insights"` |
| HTML structure | Wrap label in `.b-insights-header` div with chevron `▾` span |
| CSS `.b-insights-row` | Remove horizontal scroll/snap; add `flex-direction:column` |
| CSS `.b-insight-card` | Remove `max-height` and overflow clamp; natural height |
| CSS new `.b-insights-header` | Flex row, pointer cursor, full-width, min-height 34px |
| CSS `.b-insights.expanded .b-insights-body` | Show cards |
| CSS chevron | Rotate 180° on `.expanded` |
| JS | Click handler on header toggles `.expanded`; `renderNowPlaying` does not reset it |
