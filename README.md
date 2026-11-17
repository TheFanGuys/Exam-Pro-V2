# Fan Guys Exam Pro

Study app for the NASCLA Accredited Trade Examination for Electrical Contractors (Master/Unlimited). React + Vite.

Version 2. Built from `TheFanGuys/ExamPro` (v1, live at https://exam-pro-theta.vercel.app/) plus the Nov 2026 audit fixes. v1 is unchanged.

**Live:** https://thefanguys.github.io/Exam-Pro-V2/ — GitHub Pages. `.github/workflows/deploy.yml` builds and publishes automatically on every push to `main` (repo Settings › Pages › Source must be **GitHub Actions**).

## What changed in the Nov 2026 audit
- Timed exam no longer scores 0% when the clock runs out; clock uses wall time so a locked phone can't stretch it.
- Answer choices and question order are shuffled every run (the old key followed an A-B-C-D pattern ~90% of the time).
- Progress is saved on the device (localStorage key `fgExamPro.progress`, versioned with a migration path): practice history, spaced review, starred questions, exam best scores and attempts, paused exams. Back up / restore from **My Progress**.
- Exams can be paused and resumed; flag-for-review and a question list; confirm before scoring with blanks.
- 35 question corrections, 6 duplicates retired, 33 new calculation-heavy questions (see `audit/`). Explanations no longer name answer letters, so shuffling is safe.
- Images moved out of the code into `public/img` (app code went from 10.9 MB to 0.65 MB) and an offline cache (`public/sw.js`) so it works with weak or no signal after the first visit.
- Home Screen support on iPhone (manifest, icons, safe areas), 44-pt touch targets, focus outlines, screen-reader labels.
- About page shows the 2027 outline change and the current 19-agency list.

## Run it
```
npm install
npm run dev        # local preview
npm run build      # static files in dist/
node audit/study.test.mjs   # unit checks for the study engine
```
`vite.config.js` uses `base: "./"`, so `dist/` also works on GitHub Pages under a sub-path (e.g. thefanguys.github.io/ExamPro/).

## Release checklist
1. Bump `VERSION` in `public/sw.js` so phones pick up the new build.
2. If the saved-progress format changes, raise `STORE_VERSION` in `src/study.js` and extend `migrate()` — never drop old fields without converting them.

## File map
- `index.html` — page shell, Home Screen tags, service-worker registration
- `src/main.jsx` — boots the app
- `src/App.jsx` — screens and the question bank
- `src/study.js` — saving, spaced review, shuffling, backup/restore
- `public/img/` — images; `public/sw.js` — offline cache; `public/manifest.webmanifest`
- `audit/` — question correction register, new questions, unit tests
