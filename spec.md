# trivia-calendar — spec

Next.js app that shows a daily trivia/event calendar. `/today` (embedded as an
iframe on the homepage) shows today's event by calling
`/api/getdate/[year]/[month]/[day]`, which looks up the date in the SQLite
database at `data/gamerah-calendario.db`.

## Behavior decisions

- **The calendar repeats every year.** `getDate()` matches events by
  month-day only, ignoring the year. The database currently only holds rows
  for 2024, and this is expected — those 366 rows cover every possible
  month-day combination, so the same event resurfaces every year on that
  date. (Decided while fixing #707; the alternative — real per-year data —
  was rejected because it would require backfilling 2025+ data as a separate
  effort.)

## Changelog

- 2026-09-21 — Fix #707: `/today` was broken in production.
  - `route.ts` declared only a `slug` param and tried to split it on `/` to
    recover `month`/`day`, but the route's `[slug]/[month]/[day]` folders
    are separate dynamic segments with no slashes in `slug` — `month`/`day`
    were always `undefined`. Now reads all three segments directly.
  - `getDate()` filtered by exact `date = 'YYYY-MM-DD'`, which never matched
    once the request year moved past 2024 (the only year in the data). Now
    matches on month-day only (see "Behavior decisions" above).
  - Added a test setup (`node --test`, no new dependency) since the project
    had no automated tests — see README for how to run it.
