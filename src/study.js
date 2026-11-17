// Study engine: saved progress, spaced review, answer shuffling, backup/restore.
// Plain functions (no React) so they can be tested outside the browser.

export const STORE_KEY = "fgExamPro.progress";
export const STORE_VERSION = 1;
const DAY = 86400000;
// Leitner boxes: box 0 = due now, then 1, 3, 7, 16 days before it comes back.
const BOX_DAYS = [0, 1, 3, 7, 16];

export function emptyProgress(now = Date.now()) {
  return { v: STORE_VERSION, created: now, best: { A: null, B: null }, attempts: [], q: {}, marks: {}, exam: null };
}

// Accepts anything (old, damaged, or foreign data) and returns a valid progress object.
export function migrate(raw, now = Date.now()) {
  const base = emptyProgress(now);
  if (!raw || typeof raw !== "object") return base;
  const out = { ...base };
  if (raw.best && typeof raw.best === "object") {
    for (const k of ["A", "B"]) if (Number.isFinite(raw.best[k])) out.best[k] = Math.max(0, Math.min(100, raw.best[k]));
  }
  if (Array.isArray(raw.attempts)) out.attempts = raw.attempts.filter(a => a && Number.isFinite(a.pct)).slice(-50);
  if (raw.q && typeof raw.q === "object") {
    for (const [id, s] of Object.entries(raw.q)) {
      if (!s || typeof s !== "object") continue;
      out.q[id] = {
        seen: +s.seen || 0, right: +s.right || 0, wrong: +s.wrong || 0,
        last: s.last === true || s.last === false ? s.last : null,
        box: Math.max(0, Math.min(BOX_DAYS.length - 1, +s.box || 0)),
        due: Number.isFinite(s.due) ? s.due : now,
      };
    }
  }
  if (raw.marks && typeof raw.marks === "object") for (const [id, v] of Object.entries(raw.marks)) if (v) out.marks[id] = true;
  if (raw.exam && typeof raw.exam === "object" && Array.isArray(raw.exam.order) && Number.isFinite(raw.exam.leftMs)) out.exam = raw.exam;
  return out;
}

export function loadProgress(storage = safeStorage()) {
  try {
    const txt = storage && storage.getItem(STORE_KEY);
    if (!txt) return emptyProgress();
    return migrate(JSON.parse(txt));
  } catch (e) {
    // Damaged data: keep a copy so nothing is silently lost, then start clean.
    try { storage && storage.setItem(STORE_KEY + ".damaged." + Date.now(), storage.getItem(STORE_KEY) || ""); } catch (_) {}
    return emptyProgress();
  }
}

export function saveProgress(p, storage = safeStorage()) {
  try { storage && storage.setItem(STORE_KEY, JSON.stringify(p)); return true; } catch (e) { return false; }
}

export function safeStorage() {
  try { const s = window.localStorage; const k = "__fg_t"; s.setItem(k, "1"); s.removeItem(k); return s; } catch (e) { return null; }
}

// Record one practice answer and schedule the question's next review.
export function recordAnswer(p, id, correct, now = Date.now()) {
  const s = p.q[id] || { seen: 0, right: 0, wrong: 0, last: null, box: 0, due: now };
  const box = correct ? Math.min(BOX_DAYS.length - 1, s.box + 1) : 0;
  const next = { seen: s.seen + 1, right: s.right + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1), last: correct, box, due: now + BOX_DAYS[box] * DAY };
  return { ...p, q: { ...p.q, [id]: next } };
}

export function toggleMark(p, id) {
  const marks = { ...p.marks };
  if (marks[id]) delete marks[id]; else marks[id] = true;
  return { ...p, marks };
}

// "Mastered" = answered right on at least two separate review steps in a row (box >= 2), not just seen once.
export function questionStatus(s) {
  if (!s || !s.seen) return "new";
  if (s.last === false) return "missed";
  if (s.box >= 2) return "mastered";
  return "learning";
}

// Review pool: last answer wrong, bookmarked, or due by the spaced schedule. Most urgent first.
export function reviewPool(p, questions, now = Date.now()) {
  const items = [];
  for (const q of questions) {
    const s = p.q[q.id];
    const marked = !!p.marks[q.id];
    if (!s && !marked) continue;
    const missed = s && s.last === false;
    const due = s && s.due <= now;
    if (!(missed || marked || due)) continue;
    const score = (missed ? 100 : 0) + (marked ? 20 : 0) + (s ? s.wrong * 5 - s.right : 0);
    items.push({ q, score });
  }
  return items.sort((a, b) => b.score - a.score).map(x => x.q);
}

export function sectionStats(p, questions) {
  const out = {};
  for (const q of questions) {
    const k = q.sectionIdx;
    const o = out[k] || (out[k] = { total: 0, seen: 0, right: 0, answered: 0, mastered: 0, missed: 0 });
    o.total++;
    const s = p.q[q.id];
    if (s && s.seen) {
      o.seen++; o.right += s.right; o.answered += s.right + s.wrong;
      const st = questionStatus(s);
      if (st === "mastered") o.mastered++;
      if (st === "missed") o.missed++;
    }
  }
  return out;
}

// ---- deterministic shuffling (so a saved exam resumes in the same order) ----
export function rng(seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export function shuffle(arr, rand) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const L = ["A", "B", "C", "D"];
// Returns a copy of q with choices in a new order and the answer letter remapped.
export function withChoiceOrder(q, perm) {
  const choices = perm.map(i => q.choices[i]);
  const answer = L[perm.indexOf(L.indexOf(q.answer))];
  return { ...q, choices, answer, perm };
}
export function choicePerm(rand) { return shuffle([0, 1, 2, 3], rand); }

// ---- backup / restore ----
export function exportText(p) {
  return JSON.stringify({ app: "fan-guys-exam-pro", exported: new Date().toISOString(), progress: p }, null, 1);
}
export function importText(txt) {
  const data = JSON.parse(txt);
  if (!data || data.app !== "fan-guys-exam-pro" || !data.progress) throw new Error("This file isn't an Exam Pro backup.");
  return migrate(data.progress);
}
// Merge keeps the stronger record of each question so restoring an older backup never wipes newer work.
export function mergeProgress(a, b) {
  const out = migrate(a);
  for (const k of ["A", "B"]) if (b.best[k] != null) out.best[k] = Math.max(out.best[k] ?? 0, b.best[k]);
  const seen = new Set(out.attempts.map(x => x.at));
  out.attempts = out.attempts.concat(b.attempts.filter(x => !seen.has(x.at))).sort((x, y) => x.at - y.at).slice(-50);
  for (const [id, s] of Object.entries(b.q)) { const cur = out.q[id]; if (!cur || s.seen > cur.seen) out.q[id] = s; }
  Object.assign(out.marks, b.marks);
  return out;
}
