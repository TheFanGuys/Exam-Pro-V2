// Unit checks for src/study.js
import assert from "node:assert/strict";
import * as S from "../src/study.js";

const mem = () => { const m = {}; return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; }, m }; };
let n = 0; const t = (name, fn) => { fn(); n++; console.log("ok -", name); };

t("empty storage gives fresh progress", () => { const p = S.loadProgress(mem()); assert.equal(p.v, 1); assert.deepEqual(p.q, {}); });
t("damaged JSON is kept aside and app starts clean", () => { const s = mem(); s.setItem(S.STORE_KEY, "{not json"); const p = S.loadProgress(s); assert.deepEqual(p.q, {}); assert.ok(Object.keys(s.m).some(k => k.includes(".damaged."))); });
t("save then load round-trips", () => { const s = mem(); let p = S.emptyProgress(); p = S.recordAnswer(p, "P-S1-1", true, 1000); S.saveProgress(p, s); const back = S.loadProgress(s); assert.equal(back.q["P-S1-1"].right, 1); });
t("migrate drops junk, clamps best", () => { const p = S.migrate({ best: { A: 140, B: "x" }, q: { a: null, b: { seen: 2, right: 1, wrong: 1, last: false, box: 9 } }, marks: { z: 1 } }); assert.equal(p.best.A, 100); assert.equal(p.best.B, null); assert.equal(p.q.b.box, 4); assert.ok(!p.q.a); assert.ok(p.marks.z); });
t("wrong answer resets box and is due now", () => { let p = S.emptyProgress(); p = S.recordAnswer(p, "x", true, 0); p = S.recordAnswer(p, "x", false, 5); assert.equal(p.q.x.box, 0); assert.equal(p.q.x.due, 5); });
t("mastered needs two spaced correct answers", () => { let p = S.emptyProgress(); p = S.recordAnswer(p, "x", true, 0); assert.equal(S.questionStatus(p.q.x), "learning"); p = S.recordAnswer(p, "x", true, 2 * 86400000); assert.equal(S.questionStatus(p.q.x), "mastered"); });
t("review pool puts misses first, excludes not-due correct", () => {
  let p = S.emptyProgress(); const now = 10 * 86400000;
  p = S.recordAnswer(p, "a", true, now); p = S.recordAnswer(p, "b", false, now); p = S.toggleMark(p, "c");
  const pool = S.reviewPool(p, [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }], now + 1000).map(q => q.id);
  assert.deepEqual(pool, ["b", "c"]);
});
t("choice shuffle keeps the right answer text", () => {
  const q = { id: "q", choices: ["w", "RIGHT", "x", "y"], answer: "B" };
  for (let s = 1; s < 200; s++) { const r = S.rng(s); const qq = S.withChoiceOrder(q, S.choicePerm(r)); assert.equal(qq.choices["ABCD".indexOf(qq.answer)], "RIGHT"); }
});
t("shuffle spreads answer position evenly", () => {
  const q = { choices: ["R", "b", "c", "d"], answer: "A" }; const c = { A: 0, B: 0, C: 0, D: 0 }; const r = S.rng(7);
  for (let i = 0; i < 4000; i++) c[S.withChoiceOrder(q, S.choicePerm(r)).answer]++;
  for (const k in c) assert.ok(c[k] > 850 && c[k] < 1150, JSON.stringify(c));
});
t("same seed gives same order (resume)", () => { const a = S.shuffle([1, 2, 3, 4, 5, 6], S.rng(42)), b = S.shuffle([1, 2, 3, 4, 5, 6], S.rng(42)); assert.deepEqual(a, b); });
t("export/import round trip and rejects foreign files", () => { let p = S.recordAnswer(S.emptyProgress(), "x", true); const back = S.importText(S.exportText(p)); assert.equal(back.q.x.right, 1); assert.throws(() => S.importText('{"hello":1}')); });
t("merge never loses newer work", () => {
  let a = S.recordAnswer(S.recordAnswer(S.emptyProgress(), "x", true), "x", true); a.best.A = 80;
  let b = S.recordAnswer(S.emptyProgress(), "x", false); b.best.A = 70; b = S.recordAnswer(b, "y", true);
  const m = S.mergeProgress(a, b); assert.equal(m.q.x.seen, 2); assert.ok(m.q.y); assert.equal(m.best.A, 80);
});
console.log(n, "unit checks passed");
