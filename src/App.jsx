import React, { useState, useEffect, useRef } from "react";
import { loadProgress, saveProgress, recordAnswer, toggleMark, reviewPool, sectionStats, questionStatus, rng, shuffle, withChoiceOrder, choicePerm, exportText, importText, mergeProgress, emptyProgress } from "./study.js";

// Images live in /public/img so the app code stays small and images load only when needed.
const asset = (p) => import.meta.env.BASE_URL + p;

const LOGO = asset("img/logo.png");
const MASCOT_FULL = asset("img/mascot-full.png");
const MASCOT_BADGE = asset("img/mascot-badge.png");
const MASCOT_POINT = asset("img/mascot-point.png");
const MASCOT_BOOK = asset("img/mascot-book.jpg");
const MASCOT_MEASURE = asset("img/mascot-measure.jpg");
const SEC_PROJECT = asset("img/sec-project.png");
const SEC_THEORY = asset("img/sec-theory.jpg");
const SEC_GENCODE = asset("img/sec-gencode.png");
const SEC_METHODS = asset("img/sec-methods.png");
const SEC_EQUIP = asset("img/sec-equip.png");
const SEC_SPECIAL = asset("img/sec-special.png");
const SEC_COMMS = asset("img/sec-comms.png");
const US_MAP_IMG = asset("img/us-map-img.jpg");
const STATIC_LAYER = asset("img/static-layer.png");
const SCISS_LAYER = asset("img/sciss-layer.png");
const BASKET_LAYER = asset("img/basket-layer.png");
const CHEAT_WIDTHDEPTH = asset("img/cheat-widthdepth.jpg");
const CHEAT_WEAKLINK = asset("img/cheat-weaklink.jpg");
const CHEAT_APPROVED = asset("img/cheat-approved.jpg");
const CHEAT_DEFS = asset("img/cheat-defs.jpg");
const CHEAT_WSTABLE = asset("img/cheat-wstable.jpg");
const CHEAT_WATER = asset("img/cheat-water.jpg");
const CHEAT_PLACE = asset("img/cheat-place.jpg");
const CHEAT_CLASSDIV = asset("img/cheat-classdiv.jpg");
const CHEAT_BOND = asset("img/cheat-bond.jpg");
const CHEAT_PLENUM = asset("img/cheat-plenum.jpg");
const CHEAT_CH8 = asset("img/cheat-ch8.jpg");
const CHEAT_LIEN = asset("img/cheat-lien.jpg");
const CHEAT_BONDS = asset("img/cheat-bonds.jpg");
const CHEAT_RISK = asset("img/cheat-risk.jpg");
const CHEAT_DOCS = asset("img/cheat-docs.jpg");
const CHEAT_VICTIM = asset("img/cheat-victim.jpg");
const CHEAT_LIVEDEAD = asset("img/cheat-livedead.jpg");
const CHEAT_ESWC = asset("img/cheat-eswc.jpg");
const CHEAT_DEENERGIZE = asset("img/cheat-deenergize.jpg");
const CHEAT_LADDER = asset("img/cheat-ladder.jpg");
const CHEAT_BONDPT = asset("img/cheat-bondpt.jpg");
const CHEAT_WHEEL = asset("img/cheat-wheel.jpg");
const CHEAT_GFCIAFCI = asset("img/cheat-gfciafci.jpg");
const CHEAT_COUNT = asset("img/cheat-count.jpg");
const CHEAT_VDROP = asset("img/cheat-vdrop.jpg");
const CHEAT_SMALLCOND = asset("img/cheat-smallcond.jpg");
const CHEAT_BOXFILL = asset("img/cheat-boxfill.jpg");
const CHEAT_ANNEXC = asset("img/cheat-annexc.jpg");
const CHEAT_CONTINUOUS = asset("img/cheat-continuous.jpg");
const CHEAT_SERIES = asset("img/cheat-series.jpg");
const CHEAT_1732 = asset("img/cheat-1732.jpg");

const EXAM = [{"title":"SECTION 1 — PROJECT DESIGN & MANAGEMENT","count":"20 of 258 questions","overview":["This section pulls from the NASCLA Contractors Guide to Business, Law and Project Management and the PMBOK Guide. It is NOT code-book material — so do not waste time flipping through your NEC here. The questions cover bidding, contracts, project scheduling, change orders, and basic estimating.","Most guys lose points here by over-thinking. These are common-sense business questions. Read the question, find the choice that a fair, organized contractor would pick, and move on. Keep your NASCLA Business & Law guide tabbed at the chapters on contracts and project management."],"tip":"Trap to watch: answers that sound 'aggressive' (cut corners, skip documentation, verbal-only agreements) are almost always wrong. The Code and the business guide both reward WRITTEN, documented, by-the-book behavior.","questions":[{"n":1,"stem":"A written change order on a construction project should always include which of the following before work proceeds?","choices":["A description of the change, the price adjustment, and an approval signature","A verbal estimate from the foreman","Only the new completion date","A note added to the original blueprint"],"answer":"A","center":["The clue is the phrase “before work proceeds.” A change order is a legal modification to the contract, so it has to protect both parties.","Scan the answers for the one that is most complete and most documented. “A description of the change, the price adjustment, and an approval signature” has three things: what changed, the new price, and a signature. The others are missing pieces — a verbal estimate protects nobody, a date alone ignores cost, and a blueprint note is not a signed agreement.","When one answer is clearly the most thorough and written down, that is your answer in a business-and-law question."],"math":null,"more":null,"ref":"NASCLA Contractors Guide to Business, Law and Project Management, Ch. on Contract Management / Change Orders.","id":"P-S1-1"},{"n":2,"stem":"In project management, the document that defines the total scope of work, deliverables, and the basis for measuring project success is best described as the:","choices":["Punch list","Project scope statement","Daily log","Material takeoff"],"answer":"B","center":["Key words: “total scope,” “deliverables,” “measuring success.” Those three together point to one document.","A punch list is the end-of-job fix list. A daily log tracks what happened each day. A material takeoff is a count of materials. Only the scope statement defines the whole job and how you will know it is done right."],"math":null,"more":null,"ref":"PMBOK Guide, 7th ed. — Scope / Project Scope Statement.","id":"P-S1-2"},{"n":3,"stem":"When preparing a competitive bid, the practice of adding a percentage to cover unforeseen conditions and risk is called:","choices":["Overhead","Profit margin","Contingency","Markup on labor"],"answer":"C","center":["The phrase to circle is “unforeseen conditions and risk.” Each answer is a real estimating term, so you must match the definition exactly.","Overhead is your ongoing cost of doing business. Profit is what you keep. Labor markup is a specific add-on to labor. Contingency is the money set aside specifically for the unknowns — which is exactly what the question describes."],"math":null,"more":null,"ref":"NASCLA Contractors Guide to Business, Law and Project Management — Estimating.","id":"P-S1-3"},{"n":4,"stem":"A contractor is reviewing the project schedule. The longest sequence of dependent activities that determines the shortest possible project duration is the:","choices":["Float path","Gantt baseline","Milestone chart","Critical path"],"answer":"D","center":["Two clues: “longest sequence of dependent activities” and “shortest possible project duration.” That combination is the textbook definition of one term.","It sounds backwards — the LONGEST chain sets the SHORTEST possible finish — and the exam loves that. If any task on this chain slips, the whole job slips. That is the critical path."],"math":null,"more":null,"ref":"PMBOK Guide, 7th ed. — Schedule Management / Critical Path Method.","id":"P-S1-4"},{"stem":"A contractor who fails to obtain required permits before starting electrical work most directly risks:","choices":["Stop-work orders, fines, and having to uncover completed work","A faster inspection","Lower material costs","Automatic license renewal"],"answer":"A","center":["Common-sense business/law question. The 'aggressive/cut-corners' choices are wrong; the responsible consequence is right.","Skipping permits exposes you to stop-work orders, fines, and tear-out of covered work for inspection. The others are nonsensical perks that never follow from skipping permits."],"math":null,"more":null,"ref":"NASCLA Business, Law & Project Management — Permits & Inspections.","n":5,"id":"P-S1-5"},{"stem":"In estimating, the cost category that includes office rent, insurance, and non-project salaries is:","choices":["Direct labor","Overhead (indirect cost)","Direct materials","Contingency"],"answer":"B","center":["Circle 'office rent, insurance, non-project salaries' — costs not tied to one job. That's overhead.","Direct labor/materials attach to a specific project. Contingency is for unknowns. The ongoing cost of running the business is overhead."],"math":null,"more":null,"ref":"NASCLA Business, Law & Project Management — Estimating / Overhead.","n":6,"id":"P-S1-6","audit":["Medium: Explanation labels direct labor/materials as (A, B); they are A and C (B is the correct answer)."]},{"stem":"A lien filed by a contractor or supplier who has not been paid for labor or materials provided to improve a property is commonly called a:","choices":["Tax lien","Judgment lien","Mechanic's lien","Mortgage lien"],"answer":"C","center":["Circle 'unpaid for labor or materials to improve property.' That's the textbook mechanic's lien.","A mechanic's lien secures payment for those who improve real property. Tax/judgment/mortgage liens arise from completely different causes."],"math":null,"more":null,"ref":"NASCLA Business, Law & Project Management — Liens.","n":7,"id":"P-S1-7"},{"stem":"A subcontractor agreement should clearly define the scope, schedule, payment terms, and:","choices":["The sub's personal finances","Nothing else","The owner's hobbies","Insurance and indemnification responsibilities"],"answer":"D","center":["Sub agreements lock down scope, schedule, payment, and risk transfer (insurance/indemnity)."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Subcontracts.","n":8,"id":"P-S1-8"},{"stem":"The markup added to direct costs to cover both overhead and profit is often expressed as a single combined:","choices":["OH&P percentage","Tax rate","Discount","Retainage"],"answer":"A","center":["Estimators often combine overhead and profit into one 'OH&P' markup percentage."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Estimating.","n":9,"id":"P-S1-9"},{"stem":"A change directive differs from a change order in that a directive:","choices":["Is always cheaper","Instructs the contractor to proceed before final price/terms are agreed","Cancels the contract","Is verbal only"],"answer":"B","center":["A construction change directive tells you to proceed now, with price settled later — unlike a fully-agreed change order."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Changes.","n":10,"id":"P-S1-10"},{"stem":"General liability insurance for a contractor primarily covers:","choices":["Employee injuries","The contractor's own tools","Third-party bodily injury and property damage claims","Lost profit"],"answer":"C","center":["GL covers third-party injury/property damage. (Worker injuries = workers' comp; tools = property/inland marine.)"],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Insurance.","n":11,"id":"P-S1-11"},{"stem":"Critical-path activities have zero:","choices":["Cost","Risk","Labor","Float (slack)"],"answer":"D","center":["Critical-path tasks have zero float — any delay delays the whole project."],"math":null,"more":null,"ref":"PMBOK — Critical Path.","n":12,"id":"P-S1-12"},{"stem":"A bid bond guarantees that the bidder will:","choices":["Enter into the contract and provide the required bonds if awarded","Finish early","Lower the price","Pay taxes"],"answer":"A","center":["A bid bond protects the owner if a winning bidder backs out — it guarantees they'll sign and bond the job."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Bonds.","n":13,"id":"P-S1-13"},{"stem":"The schedule technique that uses bars on a timeline to show activity durations is a:","choices":["Pie chart","Gantt chart","Histogram","Scatter plot"],"answer":"B","center":["Gantt chart — horizontal bars across a timeline."],"math":null,"more":null,"ref":"PMBOK — Scheduling.","n":14,"id":"P-S1-14"},{"stem":"When a contractor records hours, weather, deliveries, and issues each day, this is the:","choices":["Bid","Lien","Daily log / job diary","Submittal"],"answer":"C","center":["The daily log documents what happened on site — invaluable in disputes."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Documentation.","n":15,"id":"P-S1-15"},{"stem":"The contract document that takes precedence when drawings and specifications conflict is usually defined by:","choices":["Coin flip","The contractor","The newest date","The order-of-precedence clause in the contract"],"answer":"D","center":["Contracts include an order-of-precedence clause to resolve conflicts between documents."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Contract Documents.","n":16,"id":"P-S1-16"},{"stem":"A contractor's break-even point is reached when total revenue equals:","choices":["Total costs (fixed + variable)","Profit","Overhead only","Sales tax"],"answer":"A","center":["Break-even = revenue equals all costs; beyond it you profit."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Finance.","n":17,"id":"P-S1-17"},{"n":18,"stem":"Under a lump-sum (fixed-price) contract, who carries the primary risk of cost overruns?","choices":["The owner","The contractor","The architect","The bonding company"],"answer":"B","center":["Fixed price means the contractor eats overruns and keeps savings — the risk sits with the contractor.","Cost-plus shifts that risk back to the owner. Lump-sum = contractor's risk."],"math":null,"more":["Three common types: lump-sum (contractor's risk), cost-plus (owner's risk, contractor reimbursed plus a fee), and unit-price (paid per measured unit). The exam likes to ask who bears the risk — tie it to who absorbs an overrun."],"ref":"NASCLA Business, Law & Project Management.","id":"P-S1-18"},{"n":19,"stem":"Which bond guarantees that the project will be completed according to the contract terms?","choices":["Bid bond","Payment bond","Performance bond","License bond"],"answer":"C","center":["A performance bond guarantees the work gets finished per contract if the contractor defaults.","Bid bond backs the bid; payment bond guarantees subs/suppliers get paid. Completion = performance bond."],"math":null,"more":null,"ref":"NASCLA Business, Law & Project Management.","id":"P-S1-19"},{"n":264,"id":"N-PD-01","domain":"Project Documents","objective":"Use a drawing scale","edition":"Plan reading (blueprint packet)","difficulty":"Easy","type":"Calculation","stem":"An electrical plan is drawn at 1/8 in. = 1 ft. A feeder run measures 6-1/2 in. on the drawing. What is the actual length?","choices":["26 ft","48 ft","52 ft","65 ft"],"answer":"C","math":["At 1/8 in. = 1 ft, every 1 in. on the drawing = 8 ft","6.5 in. × 8 ft/in. = 52 ft"],"center":["26 ft uses 1/4 in. = 1 ft. Read the scale printed on the sheet, not the one on the cover page — sheets can differ."],"ref":"Physical blueprint packet (handed out at the test center); general plan-reading practice.","navTip":"On test day, check the title block of each sheet for its scale before measuring.","status":"Verified","isNew":true}]},{"title":"SECTION 2 — SAFETY (OSHA & NFPA 70E)","count":"21 of 258 questions","overview":["Safety questions come from OSHA 29 CFR 1926 (construction), 29 CFR 1910 (general industry), and NFPA 70E (electrical safety in the workplace). These are about keeping people alive, so the “safest” answer is usually correct.","Tab your NFPA 70E at Article 110 (general work practices), Article 120 (establishing an electrically safe work condition), and Article 130 (energized work / PPE). Tab OSHA 1926 Subpart K (electrical). Most questions are a direct lookup of a number — an approach distance, a lockout step, or a PPE category."],"tip":"Trap to watch: when one answer says 'de-energize and lock out' and another says 'work it hot carefully,' the de-energize answer wins unless the question specifically says de-energizing creates a greater hazard. NFPA 70E's whole philosophy is: establish an electrically safe work condition first.","questions":[{"n":20,"stem":"According to NFPA 70E, the first step in establishing an electrically safe work condition after determining all sources of supply is to:","choices":["Open the disconnecting device(s) for each source","Test the meter on a known live source","Apply temporary protective grounds","Install lockout/tagout devices"],"answer":"A","center":["The clue is “first step…after determining all sources.” NFPA 70E gives an ordered list in Article 120. You cannot guess the order — flip to it.","The sequence is: (1) determine all sources, (2) OPEN the disconnects, (3) visually verify the opening if possible, (4) lockout/tagout, (5) test for absence of voltage, (6) ground if needed. The question already gave you step 1, so the next step is to open the disconnects — “Open the disconnecting device(s) for each source”.","Lockout comes AFTER opening. Testing and grounding come later still. Order matters here."],"math":null,"more":null,"ref":"NFPA 70E 2024, 120.6 — Process for Establishing and Verifying an Electrically Safe Work Condition.","id":"P-S2-20","audit":["Low: Electrically safe work condition process is 120.6 in NFPA 70E 2024 (120.5 was 2021)."]},{"n":21,"stem":"Under OSHA construction standards, the assured equipment grounding conductor program and ground-fault circuit interrupters are two acceptable methods of protecting employees from:","choices":["Arc flash burns","Ground faults on receptacles used with temporary power","Falls from elevation","Overhead power line contact"],"answer":"B","center":["The two named methods — GFCI and the assured grounding program — are the giveaway. OSHA pairs those two specifically for one purpose.","On temporary construction power, OSHA 1926.404 requires you to protect workers from ground faults either by GFCIs or by a documented assured equipment grounding conductor program. The other answers (arc flash, falls, power lines) are covered by completely different OSHA sections."],"math":null,"more":null,"ref":"OSHA 29 CFR 1926.404(b)(1) — Ground-Fault Protection.","id":"P-S2-21"},{"n":22,"stem":"An arc-rated face shield and balaclava, arc-rated coverall, and rubber insulating gloves with leather protectors are examples of:","choices":["Lockout/tagout hardware","Insulated tools","Personal protective equipment (PPE)","Temporary protective grounds"],"answer":"C","center":["Every item listed is something you WEAR on your body. That is the definition of personal protective equipment.","Lockout hardware goes on the disconnect, not on you. Protective grounds go on the conductors. Insulated tools are tools, not worn gear. When everything in the list is worn, the answer is PPE."],"math":null,"more":null,"ref":"NFPA 70E 2024, Article 130 / Table 130.7(C)(15) — PPE.","id":"P-S2-22"},{"n":23,"stem":"OSHA requires that flexible cords and cables used on construction sites be protected from damage. Cords passing through doorways or other pinch points shall be:","choices":["Spliced with electrical tape","Rated for outdoor use only","Limited to 50 feet in length","Protected to avoid damage from sharp edges, projections, and pinching"],"answer":"D","center":["The clue is the situation: cords through “doorways or other pinch points.” The question is asking what OSHA requires to keep the cord from being crushed or cut.","“Protected to avoid damage from sharp edges, projections, and pinching” restates the protection requirement directly. Splicing with tape is actually prohibited for repair of damaged cords. Length and an outdoor-only rating are not the rule here. The plain safety answer wins."],"math":null,"more":null,"ref":"OSHA 29 CFR 1926.405(a)(2)(ii) — Flexible Cords and Cables.","id":"P-S2-23"},{"stem":"Per NFPA 70E (2024) 120.6, after lockout/tagout devices are applied, the next step in establishing an electrically safe work condition is to:","choices":["Test each phase conductor or circuit part at each point of work for absence of voltage, using an adequately rated tester verified before and after","Apply lockout devices","Open the disconnect","Notify the supervisor"],"answer":"A","center":["Circle 'final step' and 'de-energized.' Order from Article 120 again.","After opening, locking out, the LAST verification is to test for absence of voltage with a properly rated, verified meter. You never assume dead — you prove it."],"math":null,"more":["The pro habit this rule encodes is 'live-dead-live': test your meter on a known live source, test the circuit you locked out (should read dead), then test the known live source again to confirm your meter didn't fail mid-test. NFPA 70E requires verifying the test instrument before and after."],"ref":"NFPA 70E 2024, 120.6 (was 120.5 in the 2021 edition).","n":24,"id":"P-S2-24","audit":["Medium: 'Final step' is debatable: NFPA 70E 2024 120.6 lists a step (8) after testing (temporary protective grounding where induced voltage or stored energy may exist). Reference also used 2021 numbering."]},{"stem":"OSHA requires that ground-fault protection for personnel on construction sites apply to which receptacles?","choices":["Only permanently wired receptacles","120-volt, single-phase, 15- and 20-ampere receptacles that are not part of the permanent wiring","Only 240-volt receptacles","Only receptacles over 50 amperes"],"answer":"B","center":["Circle 'OSHA' and 'construction site.' The question is asking for the OSHA rule, not the NEC rule.","29 CFR 1926.404(b)(1)(ii) applies GFCI protection to 120-volt, single-phase, 15- and 20-ampere receptacle outlets that are not part of the permanent wiring of the building. The NEC's temporary-power rule (590.6(A)(1)) is broader — 125-volt, single-phase, 15-, 20-, and 30-ampere — so read which book the question names."],"math":null,"more":null,"ref":"OSHA 29 CFR 1926.404(b)(1)(ii) — GFCI on Construction Sites.","n":25,"id":"P-S2-25","audit":["High: Keyed answer quotes NEC 590.6(A)(1) wording (125 V; 15, 20, 30 A) but the question and reference are OSHA 1926.404(b)(1)(ii), which covers 120-volt, single-phase, 15- and 20-ampere receptacles."]},{"stem":"Lockout/tagout devices used to control hazardous energy must be:","choices":["Removable by any worker on site","Made of tape and marker","Durable, standardized, substantial, and identify the worker who applied them","Shared among the crew"],"answer":"C","center":["Circle 'lockout/tagout devices.' OSHA 1910.147 sets the device requirements.","LOTO devices must be durable, standardized, substantial, and identify who applied them — and only that person removes their own lock. Tape and shared/removable-by-anyone defeat the entire purpose."],"math":null,"more":null,"ref":"OSHA 29 CFR 1910.147 — Control of Hazardous Energy.","n":26,"id":"P-S2-26"},{"stem":"The shock protection boundary that only qualified persons may cross, and only with proper PPE, is the:","choices":["Arc flash boundary","Prohibited zone","Limited approach boundary","Restricted approach boundary"],"answer":"D","center":["NFPA 70E shock boundaries: limited (outer), restricted (inner, qualified + PPE + plan). Crossing the restricted boundary requires being qualified with PPE.","The restricted approach boundary is the close-in line only qualified persons cross with protection."],"math":null,"more":null,"ref":"NFPA 70E 2024, 130.4.","n":27,"id":"P-S2-27","audit":["Low: Cites ANSI Z89.1, which is not a permitted reference."]},{"stem":"A hard hat that protects against electrical shock and burns from contact with energized conductors is:","choices":["Class E (electrical)","Class C","Class G only","Not rated"],"answer":"A","center":["Hard hat classes: E = electrical (high voltage), G = general (low voltage), C = conductive (no electrical protection).","For electrical work you want Class E."],"math":null,"more":null,"ref":"ANSI Z89.1 / OSHA 1926.100.","n":28,"id":"P-S2-28"},{"stem":"Before energizing newly installed equipment, a qualified person should:","choices":["Skip inspection","Verify the installation is complete and conduct appropriate checks","Energize immediately","Remove the cover"],"answer":"B","center":["NFPA 70E / good practice — verify completeness before energizing."],"math":null,"more":null,"ref":"NFPA 70E 2024, 110.","n":29,"id":"P-S2-29"},{"stem":"GFCI protection for personnel operates by detecting:","choices":["Overload","Over-voltage","A current imbalance between the hot and neutral (leakage to ground)","High temperature"],"answer":"C","center":["A GFCI compares hot vs. neutral current; a 4–6 mA imbalance means current is leaking to ground (through a person), so it trips.","It's about the imbalance, not the total load."],"math":null,"more":["A standard breaker protects the WIRE from overload/short (tens of amps). A GFCI protects the PERSON, tripping at 4–6 milliamps of leakage — thousands of times more sensitive. They do completely different jobs, which is why a circuit needs both the breaker and GFCI."],"ref":"NFPA 70E / UL 943.","n":30,"id":"P-S2-30"},{"stem":"When an energized electrical panel must be worked on, an energized electrical work permit is generally required unless the task is:","choices":["Always required regardless","Only for apprentices","Never required","Testing, troubleshooting, or voltage measurement by a qualified person within allowed conditions"],"answer":"D","center":["NFPA 70E 130.2 — certain diagnostic tasks by qualified persons are allowed without a full permit, within conditions.","Testing/troubleshooting has carve-outs; major energized work needs the permit."],"math":null,"more":null,"ref":"NFPA 70E 2024, 130.2(B).","n":31,"id":"P-S2-31"},{"stem":"OSHA requires flexible cords used on construction sites to be of the:","choices":["Hard service or junior hard service type, rated for the use","Indoor lamp type","Cheapest available","Speaker wire type"],"answer":"A","center":["1926.405 — construction cords must be hard-service rated (e.g., types S, SO, ST), not light indoor cords.","Job-site abuse demands hard-service cord."],"math":null,"more":null,"ref":"OSHA 29 CFR 1926.405(g).","n":32,"id":"P-S2-32"},{"stem":"The voltage threshold at which NFPA 70E generally requires shock-protection approach boundaries is:","choices":["12 V","50 V","30 V","120 V"],"answer":"B","center":["NFPA 70E — shock-protection requirements generally apply at 50 V and above."],"math":null,"more":null,"ref":"NFPA 70E 2024, 130.4(A).","n":33,"id":"P-S2-33"},{"stem":"An assured equipment grounding conductor program requires that cords and equipment be tested:","choices":["Never","Once a decade","At regular intervals and visually inspected for damage","Only when new"],"answer":"C","center":["1926.404(b)(1)(iii) — the AEGCP requires periodic testing and inspection of cords/tools."],"math":null,"more":null,"ref":"OSHA 29 CFR 1926.404(b)(1)(iii).","n":34,"id":"P-S2-34"},{"stem":"The safest response to a small energized electrical fire when an extinguisher is available is to:","choices":["Use water","Cover with cloth","Blow on it","Use a Class C (or ABC) extinguisher and de-energize if possible"],"answer":"D","center":["Class C / ABC extinguisher for energized fires; de-energize when safe. Never water on a live circuit."],"math":null,"more":null,"ref":"NFPA 10 / OSHA.","n":35,"id":"P-S2-35"},{"stem":"PPE category levels in NFPA 70E correspond to a minimum:","choices":["Arc rating (cal/cm²) of the protective clothing","Color","Brand","Cost"],"answer":"A","center":["PPE categories map to a minimum arc rating in cal/cm². Higher category = higher arc rating."],"math":null,"more":null,"ref":"NFPA 70E 2024, Table 130.7(C)(15).","n":36,"id":"P-S2-36"},{"stem":"The hierarchy of risk control places the MOST effective method first, which is:","choices":["PPE","Elimination of the hazard","Warning signs","Administrative controls"],"answer":"B","center":["Hierarchy of controls: Elimination > Substitution > Engineering > Administrative > PPE. Elimination is best; PPE is last resort."],"math":null,"more":["The full order top to bottom: Elimination, Substitution, Engineering controls, Awareness/warnings, Administrative controls, and PPE last. NFPA 70E pushes you to de-energize (elimination) precisely because PPE — the bottom of the list — only limits injury, it doesn't remove the hazard."],"ref":"NFPA 70E 2024, 110.5(H).","n":37,"id":"P-S2-37"},{"stem":"Approach boundaries and arc-flash PPE requirements must be communicated to workers through:","choices":["Word of mouth only","Nothing","Labeling, a job briefing, and the energized work permit where applicable","Email only"],"answer":"C","center":["130.5/110.5 — hazards communicated via equipment labels, job briefings, and permits."],"math":null,"more":null,"ref":"NFPA 70E 2024, 110.5.","n":38,"id":"P-S2-38"},{"n":39,"stem":"What is the FIRST step in establishing an electrically safe work condition?","choices":["Apply lockout/tagout devices","Determine all possible sources of supply","Test for absence of voltage","Open the disconnecting means"],"answer":"B","center":["You can't safely kill power you don't know about — step one is identifying every source feeding the equipment.","Then you open disconnects, apply LOTO, and verify with a test. But it starts with finding all sources."],"math":null,"more":["The sequence: determine all sources → properly interrupt the load and open each disconnect → visually verify open where possible → apply lockout/tagout → test for absence of voltage (and test your tester before and after). Verifying absence of voltage is the last confirmation, not the first step."],"ref":"NFPA 70E 2024, 120.6(1).","id":"P-S2-39","audit":["Low: Same 70E numbering issue."]},{"n":40,"stem":"On a construction site, OSHA temporary-power shock protection can be met with GFCI protection or:","choices":["A larger equipment ground","An assured equipment grounding conductor program","Double-insulated tools only","A 30 mA breaker"],"answer":"B","center":["OSHA gives two options for temp power: GFCI protection, or a written Assured Equipment Grounding Conductor Program (AEGCP).","Most sites just use GFCIs because the AEGCP requires documented, scheduled testing."],"math":null,"more":null,"ref":"OSHA 1926.404(b)(1).","id":"P-S2-40","audit":["Medium: Duplicate of P-S2-21 (GFCI or AEGCP)."],"retired":true},{"n":263,"id":"N-SF-01","domain":"Safety","objective":"Absence-of-voltage testing location (70E 2024)","edition":"NFPA 70E 2024","difficulty":"Medium","type":"Concept","stem":"Under NFPA 70E (2024) 120.6, where must the absence of voltage be tested?","choices":["At the upstream disconnect only","At each phase conductor or circuit part at each point of work","At the service equipment","Anywhere on the circuit, if the tester is verified first"],"answer":"B","center":["The 2024 edition added 'at each point of work' — testing upstream or at the panel doesn't prove the parts you will touch are dead. The tester is verified on a known source before and after the test."],"ref":"NFPA 70E 2024, 120.6(7).","navTip":"In the 2024 book the step list moved from 120.5 to 120.6. Re-tab it if your tabs came from a 2021 class.","status":"Verified","isNew":true}]},{"title":"SECTION 3 — ELECTRICAL THEORY & PRINCIPLES","count":"27 of 258 questions","overview":["Theory questions come from Mike Holt's Understanding Electrical Theory and Ugly's Electrical References. This is your math and fundamentals section: Ohm's Law, the power wheel, series vs. parallel circuits, voltage drop, and AC basics.","Your single most valuable open-book page is the Ohm's Law / Power wheel in Ugly's. Tab it. Almost every calculation in this section comes off that wheel: E = I × R, P = E × I, and the combinations. If you can find that page in five seconds, you can solve most of these without memorizing a thing."],"tip":"Trap to watch: single-phase vs. three-phase. Three-phase power formulas add a √3 (1.732) factor. If the question says 'three-phase,' your Ugly's three-phase formula page is the one you want — not the single-phase wheel.","questions":[{"n":41,"stem":"A 240-volt single-phase circuit supplies a resistive load that draws 25 amperes. What is the power consumed by this load?","choices":["6,000 watts","960 watts","5,000 watts","9.6 watts"],"answer":"A","center":["Circle the numbers: 240 volts, 25 amperes. Circle the question word: “power” (watts).","Open Ugly's to the power wheel. You have volts (E) and amps (I), and you want watts (P). The slice of the wheel that uses E and I is P = E × I."],"math":["P = E × I","P = 240 V × 25 A","P = 6,000 watts"],"more":["Why not the other answers? 960 is 240 ÷ 0.25, a decimal-point slip. 9.6 is 240 ÷ 25, dividing instead of multiplying. 5,000 is a distractor with no real formula behind it. The exam builds wrong answers out of the common mistakes, so always confirm which formula you actually need before you punch numbers."],"ref":"Ugly's Electrical References — Ohm's Law / Power Wheel. Mike Holt, Understanding Electrical Theory.","id":"P-S3-41","audit":["High: Worked math ends with '→ Answer X' naming the wrong letter (key and math disagree)."]},{"n":42,"stem":"Three resistors of 4 ohms, 6 ohms, and 10 ohms are connected in series. What is the total resistance of the circuit?","choices":["2.0 ohms","20 ohms","240 ohms","1.9 ohms"],"answer":"B","center":["The key word is “series.” In a series circuit, resistance simply adds up — the easiest math on the whole exam.","If the word had been “parallel,” you would use the reciprocal formula and the answer would be SMALLER than the smallest resistor. The exam puts that small number (1.9, “1.9 ohms”) right there as bait. Read the word, pick the method."],"math":["Series: R_total = R1 + R2 + R3","R_total = 4 + 6 + 10","R_total = 20 ohms"],"more":["How to never mix these up: SERIES adds (resistance goes UP, total is bigger than any single resistor). PARALLEL divides (resistance goes DOWN, total is smaller than the smallest resistor). If you ever calculate a 'parallel' total that is bigger than your smallest resistor, you made an error — stop and recheck."],"ref":"Ugly's Electrical References — Series and Parallel Circuits.","id":"P-S3-42","audit":["High: Worked math ends with '→ Answer X' naming the wrong letter (key and math disagree)."]},{"n":43,"stem":"What is the approximate line current of a 30 kW, 480-volt, three-phase resistive load? (Use 1.732 for √3.)","choices":["108 amperes","62.5 amperes","36.1 amperes","20.8 amperes"],"answer":"C","center":["The trigger word is “three-phase.” The moment you see it, flip to the THREE-PHASE formula page in Ugly's — not the single-phase wheel.","You are given watts (30 kW = 30,000 W) and volts (480), and you want amps. The three-phase formula is I = P ÷ (E × 1.732)."],"math":["I = P ÷ (E × √3)","I = 30,000 W ÷ (480 V × 1.732)","I = 30,000 ÷ 831.4","I = 36.1 amperes"],"more":["Watch the trap: “62.5 amperes” (62.5 A) is what you get if you FORGET the 1.732 and just do 30,000 ÷ 480. That is the single-phase mistake on a three-phase question — the most common error in this section. The 1.732 is the whole reason three-phase carries more power on the same size wire; never leave it out."],"ref":"Ugly's Electrical References — Three-Phase Power Formulas.","id":"P-S3-43","audit":["High: Worked math ends with '→ Answer X' naming the wrong letter (key and math disagree)."]},{"n":44,"stem":"A conductor carries 20 amperes and has a measured resistance of 0.5 ohm for the run. What is the voltage drop across that conductor?","choices":["40 volts","0.025 volts","100 volts","10 volts"],"answer":"D","center":["Circle: 20 amperes, 0.5 ohm, and the word “voltage drop.” Voltage drop is just Ohm's Law applied to the wire itself.","You have current (I) and resistance (R), and you want voltage (E). The wheel slice is E = I × R."],"math":["E = I × R","E = 20 A × 0.5 Ω","E = 10 volts"],"more":["Voltage drop matters in the real world: the NEC recommends keeping it under 3% on a branch circuit (informational note 210.19). On a 120-volt circuit, 3% is only 3.6 volts — so a 10-volt drop here would be a real problem and tell you the wire is too small or the run too long. Same simple E = I × R math, big practical consequence."],"ref":"Ugly's Electrical References — Ohm's Law; NEC 2023, 210.19(A) Informational Note (voltage drop).","id":"P-S3-44","audit":["High: Worked math ends with '→ Answer X' naming the wrong letter (key and math disagree)."]},{"n":45,"stem":"In a 120/240-volt single-phase, three-wire system, the voltage measured between the two ungrounded (hot) conductors is:","choices":["240 volts","208 volts","480 volts","120 volts"],"answer":"A","center":["Picture the system: this is the standard residential service. Hot-to-neutral is 120 V; hot-to-hot is 240 V.","The trap is 208. 208 volts only shows up in a THREE-PHASE wye system (120/208). This question says single-phase, three-wire — so hot to hot is a straight 240."],"math":null,"more":["Why 240 and not 120 + 120 = 240 only sometimes? In a single-phase three-wire system the two hots are 180° out of phase, so they add directly: 120 + 120 = 240. In a three-phase wye, the two hots are only 120° apart, so they DON'T add directly — you multiply 120 × 1.732 = 208. That phase angle is the whole reason 208 and 240 are different. Knowing which system you're in tells you which number is right."],"ref":"Ugly's Electrical References — Single-Phase Systems; Mike Holt, Understanding Electrical Theory.","id":"P-S3-45"},{"stem":"A 120-volt circuit supplies a 1,500-watt resistive heater. What current does it draw?","choices":["10 amperes","12.5 amperes","18 amperes","180 amperes"],"answer":"B","center":["Given watts (1,500) and volts (120), want amps. Power wheel slice: I = P ÷ E.","Flip Ugly's to the power wheel. I = 1500 ÷ 120."],"math":["I = P ÷ E","I = 1,500 W ÷ 120 V","I = 12.5 amperes"],"more":["Real-world tie-in: 12.5A continuous on a heater means you'd want a 20A circuit (12.5 × 1.25 = 15.6A, and heaters are continuous loads), since a 15A circuit's continuous limit is only 12A. The math connects straight to conductor sizing."],"ref":"Ugly's Electrical References — Power Wheel.","n":46,"id":"P-S3-46"},{"stem":"Two 100-ohm resistors are connected in parallel. The total resistance is:","choices":["200 ohms","100 ohms","50 ohms","25 ohms"],"answer":"C","center":["Circle 'parallel.' For two EQUAL resistors in parallel, the shortcut is: divide one of them by 2.","Equal parallel resistors: total = R ÷ number. 100 ÷ 2 = 50. And it's smaller than either resistor, which is the parallel sanity check."],"math":["Two equal R in parallel = R ÷ 2","= 100 ÷ 2 = 50 ohms"],"more":["General parallel formula: 1/Rt = 1/R1 + 1/R2. For 100 & 100: 1/Rt = 1/100 + 1/100 = 2/100, so Rt = 50. The shortcut (R ÷ n) only works when all resistors are equal — handy on the exam, but know the full formula for mixed values."],"ref":"Ugly's Electrical References — Parallel Circuits.","n":47,"id":"P-S3-47"},{"stem":"The power factor of a purely resistive circuit (such as a heating element) is:","choices":["0","0.5","0.8","1.0"],"answer":"D","center":["Circle 'purely resistive.' No inductance or capacitance means voltage and current are in phase.","When current and voltage are perfectly in phase (resistive load), power factor = 1.0 (unity). Motors and other inductive loads drop below 1.0."],"math":null,"more":["Why it matters: power factor = real power (watts) ÷ apparent power (VA). At PF 1.0 every volt-amp does useful work. Motors run at maybe 0.8 PF, meaning the utility delivers more current than the wattage implies — which is why three-phase and PF correction come up in commercial work."],"ref":"Mike Holt, Understanding Electrical Theory — Power Factor.","n":48,"id":"P-S3-48"},{"stem":"A circuit has 12 volts and 4 ohms. The current is:","choices":["3 A","48 A","0.33 A","16 A"],"answer":"A","center":["I = E ÷ R = 12 ÷ 4."],"math":["I = 12 V ÷ 4 Ω = 3 A"],"more":null,"ref":"Ugly's — Ohm's Law.","n":49,"id":"P-S3-49"},{"stem":"The total power consumed by three 60-watt lamps in parallel on the same circuit is:","choices":["20 W","180 W","60 W","600 W"],"answer":"B","center":["Power adds regardless of series/parallel. 60 × 3 = 180 W."],"math":["P_total = 60 + 60 + 60 = 180 W"],"more":null,"ref":"Ugly's — Power.","n":50,"id":"P-S3-50"},{"stem":"If resistance increases while voltage stays constant, current will:","choices":["Increase","Stay the same","Decrease","Double"],"answer":"C","center":["I = E ÷ R. More R, less I (inverse relationship)."],"math":null,"more":null,"ref":"Ugly's — Ohm's Law.","n":51,"id":"P-S3-51"},{"stem":"Kirchhoff's current law states that the current entering a node:","choices":["Is lost","Becomes voltage","Doubles","Equals the current leaving the node"],"answer":"D","center":["What goes in must come out — current in = current out at any junction."],"math":null,"more":null,"ref":"Mike Holt — Circuit Laws.","n":52,"id":"P-S3-52"},{"stem":"A transformer with a 480-volt primary and 120-volt secondary has a turns ratio of:","choices":["4:1","1:4","2:1","1:2"],"answer":"A","center":["Ratio = primary ÷ secondary = 480 ÷ 120 = 4. So 4:1 (step-down)."],"math":["480 ÷ 120 = 4 → 4:1"],"more":["A step-down transformer drops voltage and raises available current by roughly the inverse ratio. 4:1 voltage means the secondary can deliver about 4× the primary current. This is exactly why a primary breaker can't protect secondary conductors — the current transforms."],"ref":"Ugly's — Transformers.","n":53,"id":"P-S3-53"},{"stem":"Power factor is the ratio of:","choices":["Volts to amps","Real power (watts) to apparent power (VA)","Resistance to reactance","Current to voltage"],"answer":"B","center":["PF = watts ÷ VA. Unity (1.0) = purely resistive."],"math":null,"more":null,"ref":"Mike Holt — Power Factor.","n":54,"id":"P-S3-54"},{"stem":"The current in amperes for a 1,200-watt, 120-volt load is:","choices":["100 A","14.4 A","10 A","0.1 A"],"answer":"C","center":["I = P ÷ E = 1200 ÷ 120 = 10 A."],"math":["I = 1200 ÷ 120 = 10 A"],"more":null,"ref":"Ugly's — Power Wheel.","n":55,"id":"P-S3-55"},{"stem":"Voltage drop becomes a bigger concern as conductor run length:","choices":["Decreases","Has no effect","Stays the same","Increases"],"answer":"D","center":["Longer run = more resistance = more voltage drop. Upsize wire on long runs."],"math":null,"more":null,"ref":"Mike Holt — Voltage Drop.","n":56,"id":"P-S3-56"},{"stem":"A 208-volt, three-phase, 10-ampere load draws apparent power of approximately:","choices":["3,600 VA","2,080 VA","1,200 VA","6,240 VA"],"answer":"A","center":["3-phase VA = E × I × 1.732 = 208 × 10 × 1.732."],"math":["VA = 208 × 10 × 1.732 = 3,602 VA ≈ 3,600 VA"],"more":["Three-phase apparent power: VA = √3 × line voltage × line current. The 1.732 shows up again. For real power (watts) you'd also multiply by power factor. Forgetting the 1.732 gives 2,080 — the trap answer."],"ref":"Ugly's — Three-Phase.","n":57,"id":"P-S3-57"},{"stem":"Two equal resistors in series, each 50 ohms, give a total of:","choices":["25 ohms","100 ohms","50 ohms","2,500 ohms"],"answer":"B","center":["Series adds: 50 + 50 = 100 ohms."],"math":["R = 50 + 50 = 100 Ω"],"more":null,"ref":"Ugly's — Series.","n":58,"id":"P-S3-58"},{"stem":"The watt is the unit of:","choices":["Resistance","Voltage","Power","Charge"],"answer":"C","center":["Watt = power. Volt = pressure, ohm = resistance, coulomb = charge."],"math":null,"more":null,"ref":"Ugly's — Units.","n":59,"id":"P-S3-59"},{"stem":"Increasing the cross-sectional area of a conductor (using bigger wire) will cause its resistance to:","choices":["Increase","Become infinite","Stay the same","Decrease"],"answer":"D","center":["R = ρL/A. Bigger area A = lower resistance."],"math":null,"more":null,"ref":"Mike Holt — Conductor Resistance.","n":60,"id":"P-S3-60"},{"stem":"A device that opposes a change in voltage and stores energy in an electric field is a:","choices":["Capacitor","Resistor","Inductor","Transformer"],"answer":"A","center":["Capacitor stores energy in an electric field and opposes voltage change. Inductor opposes current change.","Capacitor = electric field / voltage. Inductor = magnetic field / current."],"math":null,"more":null,"ref":"Mike Holt — Capacitance.","n":61,"id":"P-S3-61"},{"stem":"Power in a purely resistive AC circuit equals:","choices":["Volts ÷ amps","Volts × amps (PF = 1)","Volts + amps","Amps ÷ volts"],"answer":"B","center":["Resistive circuit: PF = 1, so P = E × I straight up."],"math":null,"more":null,"ref":"Ugly's — AC Power.","n":62,"id":"P-S3-62"},{"stem":"Doubling the number of turns on a transformer secondary (with primary fixed) will:","choices":["Halve the secondary voltage","Have no effect","Roughly double the secondary voltage","Stop the transformer"],"answer":"C","center":["Voltage is proportional to turns. More secondary turns = more secondary voltage."],"math":null,"more":null,"ref":"Ugly's — Transformer Turns Ratio.","n":63,"id":"P-S3-63"},{"n":64,"stem":"In a series circuit, the total resistance is equal to:","choices":["The smallest resistance","The largest resistance","The sum of all the resistances","The product over the sum"],"answer":"C","center":["Series resistances simply add: R_total = R1 + R2 + R3 …","Parallel is the one where total drops below the smallest. Series adds up."],"math":null,"more":null,"ref":"Ugly's — Series/Parallel.","id":"P-S3-64"},{"n":65,"stem":"A 240-volt resistive load draws 10 amperes. How much power is it consuming?","choices":["24 W","240 W","2,400 W","24,000 W"],"answer":"C","center":["P = E × I = 240 × 10 = 2,400 W.","Watch your zeros — the trap answers are 240 and 24,000."],"math":["P = E × I","P = 240 V × 10 A","P = 2,400 W"],"more":null,"ref":"Ugly's — Power Wheel (P = E × I).","id":"P-S3-65"},{"n":66,"stem":"A balanced three-phase wye system has a line-to-line voltage of 208 V. The line-to-neutral (phase) voltage is approximately:","choices":["120 V","208 V","360 V","277 V"],"answer":"A","center":["In a wye system, phase voltage = line voltage ÷ 1.732. 208 ÷ 1.732 ≈ 120 V.","That's why a 208Y/120 panel gives you 120 V to neutral and 208 V between phases."],"math":["V_phase = V_line ÷ √3","V_phase = 208 ÷ 1.732","V_phase ≈ 120 V"],"more":null,"ref":"Ugly's — Three-Phase.","id":"P-S3-66"},{"n":262,"id":"N-TH-01","domain":"Electrical Theory & Principles","objective":"Calculate single-phase voltage drop with the K formula","edition":"Ugly's / NEC Chapter 9 Table 8","difficulty":"Medium","type":"Calculation","stem":"A 120-V, 16-A load is 150 ft (one way) from the panel on 12 AWG copper (6,530 cmil). Using K = 12.9, what is the approximate voltage drop?","choices":["3.6 V","4.7 V","9.5 V","19.0 V"],"answer":"C","math":["VD = (2 × K × I × L) ÷ cmil","VD = (2 × 12.9 × 16 × 150) ÷ 6,530","VD = 61,920 ÷ 6,530 = 9.48 V ≈ 9.5 V","9.5 V ÷ 120 V ≈ 7.9% — well over the 3% branch-circuit recommendation"],"center":["4.7 V forgets the 2 (single-phase has two conductors in the loop). For three-phase the 2 becomes 1.732."],"ref":"Ugly's voltage drop formula; Chapter 9, Table 8 (circular mils); 210.19(A) Informational Note (recommendation).","navTip":"Chapter 9 Table 8 gives cmil for each size — tab it next to your Ugly's voltage-drop page.","status":"Verified","isNew":true}]},{"title":"SECTION 4 — GENERAL CODE REQUIREMENTS","count":"35 of 258 questions","overview":["This is one of the two heaviest sections on the real exam, so we weighted it heavily here too. It draws from NEC Chapter 1 (Articles 90, 100, 110) — definitions, general installation rules, working space, and wiring methods basics.","Article 100 (Definitions) and 110.26 (Working Space) are the two pages you will hit most. Tab them. A huge number of code questions are really just definition lookups in disguise — if a question asks 'which of these is defined as…', go straight to Article 100. For working clearances, Table 110.26(A)(1) is your friend; learn to read its three Conditions."],"tip":"Trap to watch: 'voltage to ground' vs. 'voltage between conductors.' The working-space table is organized by voltage TO GROUND. Read which one the question gives you before you pick a row in the table.","questions":[{"n":67,"stem":"Under Condition 1, the minimum depth of clear working space in front of electrical equipment operating at 0–150 volts to ground is:","choices":["3 feet","2 feet","3.5 feet","4 feet"],"answer":"A","center":["Three clues to circle: “Condition 1,” “0–150 volts to ground,” and “depth.” All three point you to one cell in one table.","Flip to Table 110.26(A)(1). Find the voltage row 0–150 V. Slide across to the Condition 1 column. The cell reads 3 ft (900 mm). Do not compute anything — this is a pure table read."],"math":null,"more":["What are the Conditions? Condition 1 = exposed live parts on one side, nothing grounded on the other (least hazard, least space). Condition 2 = live parts on one side, grounded surface on the other. Condition 3 = live parts on BOTH sides of the worker (most hazard, most space). For 0–150 V the depths are 3 ft / 3 ft / 3 ft; the differences grow at higher voltages. Always confirm the Condition number before reading the row."],"ref":"NEC 2023, Table 110.26(A)(1).","id":"P-S4-67"},{"n":68,"stem":"As defined in the NEC, a device whose principal function is to carry current but which does NOT consume the current it carries is best described by which term?","choices":["Appliance","Device","Utilization equipment","Luminaire"],"answer":"B","center":["The question literally says “as defined in the NEC.” That is your cue to go to Article 100, not to guess from job experience.","Look up each term in Article 100. A “Device” is defined as a unit of an electrical system, other than a conductor, that carries or controls electric energy as its principal function — it doesn't use up the current. An appliance and utilization equipment both CONSUME energy. A luminaire is a light fixture. The definition matches “device.”"],"math":null,"more":null,"ref":"NEC 2023, Article 100 — Definitions (Device).","id":"P-S4-68"},{"n":69,"stem":"For equipment rated 1200 amperes or more and over 6 ft wide that contains overcurrent devices, switching devices, or control devices, how many entrances to the working space are generally required?","choices":["Three entrances","One entrance","One entrance at each end of the working space","No entrance is required"],"answer":"C","center":["Circle the two numbers that trigger the rule: “1200 amperes or more” and “over 6 ft wide.” Those exact thresholds appear in 110.26(A).","When both conditions are met, the Code wants a way out from each end so a worker is never trapped next to a fault. That means one entrance at EACH END — “One entrance at each end of the working space” — unless you meet the exceptions (extra working space or a single entrance located to give an unobstructed exit)."],"math":null,"more":null,"ref":"NEC 2023, 110.26(C)(2) — Entrance to and Egress from Working Space.","id":"P-S4-69","audit":["Medium: Garbled stem ('the grade of clear working space ... permit at least one entrance')."]},{"n":70,"stem":"The minimum headroom of working space about service equipment, switchboards, panelboards, or motor control centers is generally:","choices":["6 ft","6 ft 3 in.","6 ft 6 in.","7 ft"],"answer":"C","center":["110.26(A)(3) sets working-space headroom at 6 ft 6 in. (1.98 m) for that equipment — a flat lookup, don't reason it out.","Don't confuse 110.26(A)(3) (headroom) with 110.26(E) (dedicated equipment space above panels). Headroom = 6 ft 6 in."],"math":null,"more":null,"ref":"NEC 2023, 110.26(A)(3).","id":"P-S4-70"},{"n":71,"stem":"Conductors and equipment must be approved for the conditions of use. As used in the NEC, the term 'approved' means:","choices":["Acceptable to the authority having jurisdiction","Labeled by the manufacturer","Listed by a testing laboratory","Installed by a licensed electrician"],"answer":"A","center":["Again the giveaway is a defined term: “approved.” Go to Article 100.","People mix up approved, listed, and labeled all the time — and the exam knows it. Article 100 defines “approved” as acceptable to the authority having jurisdiction (the AHJ — usually the inspector). “Listed” and “labeled” are separate, narrower definitions. Match the exact word to the exact definition."],"math":null,"more":["The three look-alikes: APPROVED = the AHJ accepts it. LISTED = it's on a list published by a recognized testing lab (like UL). LABELED = it carries that lab's mark. Equipment can be listed and labeled but the final say on 'approved' still rests with the inspector. The exam will offer all three as choices on the same question — read the stem's exact word."],"ref":"NEC 2023, Article 100 — Definitions (Approved, Listed, Labeled).","id":"P-S4-71"},{"n":72,"stem":"Per 110.14(C), the conductor temperature rating used to determine ampacity must not exceed the lowest temperature rating of any:","choices":["Raceway fitting","Connected termination, conductor, or device in the circuit","Wirenut used","Support strap"],"answer":"B","center":["The principle being tested is the 'weakest link' rule of temperature ratings. The phrase to circle is “lowest temperature rating of any…”","110.14(C) says the temperature rating of the whole circuit is limited by the lowest-rated termination, conductor, OR device. One 60°C-rated lug downgrades the whole circuit to 60°C even if the wire is rated 90°C. “Connected termination, conductor, or device in the circuit” names all three parts the rule actually covers."],"math":null,"more":["Why this matters for sizing: you may have 90°C THHN wire, but if the breaker lugs are only rated 75°C, you must size the conductor from the 75°C column of Table 310.16, not the 90°C column. The 90°C column is generally used only for derating/adjustment math, not final termination sizing. This single rule trips up a lot of conductor-sizing questions."],"ref":"NEC 2023, 110.14(C) — Temperature Limitations.","id":"P-S4-72","audit":["Medium: Stem says 110.14(C) governs 'maximum permitted ambient operating temperature'; it governs which conductor temperature rating/ampacity column may be used."]},{"n":73,"stem":"Electrical equipment that may require examination, adjustment, servicing, or maintenance while energized must have working space provided and maintained. This requirement is primarily intended to ensure:","choices":["Aesthetic appearance","Faster inspection times","Worker safety and access","Lower installation cost"],"answer":"C","center":["Even when a code question has no number, it usually has a PURPOSE you can reason to. The purpose of working space is right there in the intent of 110.26.","Clearances exist so a worker can stand, move, and escape safely around live equipment. Appearance, cost, and inspection speed are never the Code's stated reason for a safety clearance. The safety answer wins."],"math":null,"more":null,"ref":"NEC 2023, 110.26 — Spaces About Electrical Equipment.","id":"P-S4-73"},{"n":74,"stem":"What is the minimum width of the working space in front of electrical equipment, measured generally as the width of the equipment or a fixed dimension, whichever is greater?","choices":["24 in.","36 in.","42 in.","30 in."],"answer":"D","center":["Number lookup in 110.26(A)(2). Circle the words “minimum width.”","The rule: width of working space is the width of the equipment or 30 in., whichever is greater (and the space must allow the equipment door/cover to open at least 90°). So the minimum fixed dimension is 30 in.. People confuse this 30-in. WIDTH with the 36-in. (3 ft) DEPTH from the earlier question; keep depth and width separate."],"math":null,"more":null,"ref":"NEC 2023, 110.26(A)(2) — Width of Working Space.","id":"P-S4-74","audit":["High: Explanation says 'answer B' but 30 in. is choice D."]},{"stem":"Where electrical equipment is rated 1200 amperes or more, the minimum width of the entrance to the working space, where an unobstructed exit is not provided, is generally:","choices":["24 in. wide, 6 ft 6 in. high","30 in. wide, 6 ft 6 in. high","36 in. wide, 7 ft high","24 in. wide, 6 ft high"],"answer":"A","center":["Circle “1200 amperes or more” and “entrance to the working space.” That sends you to 110.26(C).","The entrance opening must be at least 24 in. wide and 6½ ft (6 ft 6 in.) high. The 30-in. number is the WIDTH of working space, not the entrance — a classic swap the exam sets up."],"math":null,"more":null,"ref":"NEC 2023, 110.26(C)(2) — Entrance to Working Space.","n":75,"id":"P-S4-75"},{"stem":"Electrical equipment likely to require examination while energized must be marked with a field- or factory-applied label warning of potential electric arc-flash hazards. This requirement applies to equipment such as switchboards, panelboards, and motor control centers in:","choices":["Dwelling units only","Other than dwelling units","All occupancies without exception","Agricultural buildings only"],"answer":"B","center":["The trigger is “arc-flash hazard” labeling. Flip to 110.16.","110.16 requires the arc-flash warning marking in OTHER THAN dwelling units. Homes are excluded because the equipment and exposure are different. Read the dwelling vs. non-dwelling wording — it decides the answer."],"math":null,"more":null,"ref":"NEC 2023, 110.16 — Arc-Flash Hazard Warning.","n":76,"id":"P-S4-76"},{"stem":"Conductors of size 1/0 AWG and larger, where run in parallel (electrically joined at both ends), are permitted only where the paralleled conductors in each phase are the same length, same conductor material, same size, and:","choices":["Different insulation types are allowed","Are at least 250 kcmil","Have the same insulation type and are terminated the same way","Are installed in separate buildings"],"answer":"C","center":["Circle “parallel” and “1/0 AWG and larger.” That's the parallel-conductor rule in 310.10(G).","Parallel sets must match in length, material, size, insulation type, and termination method — so current divides evenly. “Have the same insulation type and are terminated the same way” names the matching insulation + termination requirement. The whole point is balance, so every conductor in the set must be a twin."],"math":null,"more":["Why all the matching? If one parallel conductor is shorter or a different metal, it has lower resistance and hogs more than its share of current — overheating while the others loaf. Matching every property forces the current to split evenly. This is also why you can't just parallel a random pair of feeders in the field."],"ref":"NEC 2023, 310.10(G) — Conductors in Parallel.","n":77,"id":"P-S4-77"},{"stem":"The NEC requires illumination for all working spaces about service equipment, switchboards, panelboards, and motor control centers installed:","choices":["Outdoors only","Only where over 600 volts","In dwelling units only","Indoors"],"answer":"D","center":["Circle “illumination” and the equipment list. Go to 110.26(B).","110.26(B) requires illumination for indoor working spaces at that equipment — you can't safely service a panel in the dark. The rule is about indoor locations; “Indoors”."],"math":null,"more":null,"ref":"NEC 2023, 110.26(D) — Illumination.","n":78,"id":"P-S4-78"},{"stem":"As defined in Article 100, a 'qualified person' is one who has skills and knowledge related to the construction and operation of the electrical equipment and installations and has received safety training to:","choices":["Recognize and avoid the hazards involved","Supervise all other workers","Sign off on permits","Design the electrical system"],"answer":"A","center":["Definition question — “qualified person.” Go to Article 100.","The definition hinges on the ability to RECOGNIZE AND AVOID the hazards. It's not about rank, permits, or design — it's about hazard awareness and training. “Recognize and avoid the hazards involved” is the exact language."],"math":null,"more":null,"ref":"NEC 2023, Article 100 — Qualified Person.","n":79,"id":"P-S4-79"},{"stem":"Equipment grounding conductors, where run with circuit conductors, may be identified by a continuous outer finish that is:","choices":["White or gray","Green, or green with one or more yellow stripes, or bare","Red","Blue"],"answer":"B","center":["Circle “equipment grounding conductor” and “identified.” Color code lives in 250.119.","EGCs are green, green-with-yellow-stripe, or bare. White/gray is reserved for the grounded (neutral) conductor (200.6). Don't confuse grounded (white) with grounding (green)."],"math":null,"more":["The look-alike trap: GROUNDED conductor (the neutral) = white or gray. GROUNDING conductor (equipment ground, EGC) = green or bare. They sound almost identical and the exam leans on that. 'Grounded = neutral = white' is worth burning into memory."],"ref":"NEC 2023, 250.119 — Identification of Equipment Grounding Conductors.","n":80,"id":"P-S4-80"},{"stem":"Unused openings in boxes, raceways, cabinets, and equipment enclosures must be:","choices":["Left open for ventilation","Covered with electrical tape","Closed to afford protection substantially equivalent to the wall of the equipment","Filled only if larger than 1 inch"],"answer":"C","center":["Circle “unused openings.” General rule in 110.12(A) (and 408, 312 echo it).","Openings must be closed with a fitting/plug giving protection roughly equal to the enclosure wall — a knockout seal, not tape. Tape is never an approved closure."],"math":null,"more":null,"ref":"NEC 2023, 110.12(A) — Unused Openings.","n":81,"id":"P-S4-81"},{"stem":"Where a raceway or cable passes from a heated interior space to an unheated exterior, and condensation is known to occur, the NEC requires the raceway to be:","choices":["Insulated on the outside","Replaced with conduit only","Painted to resist moisture","Sealed to prevent circulation of warm air to colder sections"],"answer":"D","center":["Circle the temperature-difference clue and “condensation.” Go to 300.7(A).","300.7(A) requires sealing where a raceway runs between very different temperatures, so moist warm air can't circulate inside and condense in the cold section. It's a sealing rule, not insulation or paint."],"math":null,"more":null,"ref":"NEC 2023, 300.7(A) — Sealing.","n":82,"id":"P-S4-82"},{"stem":"The scope of the NEC covers the installation of electrical conductors and equipment, but specifically does NOT cover installations:","choices":["Under exclusive control of an electric utility for generation/transmission/distribution","In dwellings","In commercial buildings","In schools"],"answer":"A","center":["90.2(A) lists what the NEC does NOT cover — utility-owned generation, transmission, and distribution under utility control."],"math":null,"more":null,"ref":"NEC 2023, 90.2(B).","n":83,"id":"P-S4-83"},{"stem":"In the NEC, text in a Note is:","choices":["Mandatory","Explanatory / informational only, not an enforceable requirement","More important than the rule","A penalty"],"answer":"B","center":["Informational Notes explain — they don't require. The word 'shall' makes a rule; notes only clarify.","If a question hinges on whether a note is enforceable, the answer is no — notes are explanatory."],"math":null,"more":null,"ref":"NEC 2023, 90.5(C).","n":84,"id":"P-S4-84"},{"stem":"Where the NEC uses the word 'shall,' the provision is:","choices":["Optional","A recommendation","Mandatory","A note"],"answer":"C","center":["'Shall' = mandatory. 'Shall not' = prohibited. Permissive rules use 'shall be permitted.'"],"math":null,"more":null,"ref":"NEC 2023, 90.5(A).","n":85,"id":"P-S4-85"},{"stem":"Grounded conductors larger than 6 AWG may be identified at terminations by:","choices":["Painting them red","A green tag","Leaving them bare","White or gray marking, or three white/gray stripes, at the termination"],"answer":"D","center":["200.6(D) — a large grounded conductor can be re-identified at the ends with white/gray tape or marking rather than full white insulation."],"math":null,"more":null,"ref":"NEC 2023, 200.6(B).","n":86,"id":"P-S4-86"},{"stem":"The minimum working space depth for equipment operating at 151–600 volts to ground, Condition 1, is:","choices":["3 ft","3.5 ft","4 ft","5 ft"],"answer":"A","center":["Table 110.26(A)(1): 151–600 V, Condition 1 = 3 ft. (Condition 2 = 3.5 ft, Condition 3 = 4 ft.)","The depth only grows in the harder Conditions at this voltage. Condition 1 is still 3 ft."],"math":null,"more":null,"ref":"NEC 2023, Table 110.26(A)(1).","n":87,"id":"P-S4-87"},{"stem":"Conductors must be protected where they pass through a metal enclosure by:","choices":["Tape","A bushing or fitting to protect from abrasion","Paint","Nothing"],"answer":"B","center":["300.4(G)/110.12 — sharp metal edges get a bushing so the insulation isn't cut."],"math":null,"more":null,"ref":"NEC 2023, 300.4(G).","n":88,"id":"P-S4-88"},{"stem":"Identified terminals for connection of grounded conductors (neutrals) must be substantially:","choices":["Red","Green","White or silver in color, or marked","Black"],"answer":"C","center":["200.10 — the neutral terminal is white/silver colored. The hot terminal is brass/dark; ground is green.","Color-coded terminals: white/silver = neutral, brass = hot, green = ground."],"math":null,"more":null,"ref":"NEC 2023, 200.10(B).","n":89,"id":"P-S4-89"},{"stem":"Where ungrounded conductors are increased in size for voltage drop, the equipment grounding conductor must be:","choices":["Left the same","Made smaller","Removed","Increased proportionally in size"],"answer":"D","center":["250.122(D) — upsize the hots, upsize the EGC proportionally. Bigger fault path to match.","If you bump conductors up for a long run, the ground wire has to grow too."],"math":null,"more":["The reasoning: a longer run means higher impedance in the fault path. Upsizing the ungrounded conductors lowers their resistance, so the EGC must be enlarged in proportion to keep the ground-fault path low enough to trip the breaker fast. Forget this and a fault at the far end may not clear."],"ref":"NEC 2023, 250.122(B).","n":90,"id":"P-S4-90"},{"stem":"Equipment must be firmly secured to the surface on which it is mounted. Wooden plugs driven into masonry for support are:","choices":["Not permitted","Permitted","Required","Preferred"],"answer":"A","center":["110.13(B) — wooden plugs in masonry/concrete are NOT a permitted means of support."],"math":null,"more":null,"ref":"NEC 2023, 110.13(A).","n":91,"id":"P-S4-91"},{"stem":"The general rule for guarding live parts requires that live parts operating at how many volts or more be guarded against accidental contact?","choices":["12 volts","50 volts","30 volts","120 volts"],"answer":"B","center":["110.27 / OSHA — live parts at 50 V or more must be guarded.","50 volts is the threshold where the shock hazard becomes regulated."],"math":null,"more":null,"ref":"NEC 2023, 110.27.","n":92,"id":"P-S4-92"},{"stem":"Per 110.14, terminals for more than one conductor and terminals used for aluminum must be:","choices":["Any type","Copper only","Identified/listed for that use","Painted"],"answer":"C","center":["110.14(A) — multi-conductor and aluminum terminations must be identified for the purpose.","Not every lug accepts two wires or aluminum. Use one that's listed for it."],"math":null,"more":null,"ref":"NEC 2023, 110.14(A).","n":93,"id":"P-S4-93"},{"stem":"Conductor insulation type 'THHN' indicates the conductor is rated for:","choices":["Wet locations only","Underground only","Direct burial","Heat-resistant, 90°C, dry/damp locations (thermoplastic, high-heat, nylon)"],"answer":"D","center":["THHN = Thermoplastic High-Heat-resistant Nylon, 90°C dry. (THWN adds W for wet.)","The letters decode the rating: H=heat, HH=high heat (90°C), N=nylon jacket."],"math":null,"more":["Decode insulation letters: T=thermoplastic, H=heat-resistant (75°C), HH=high heat (90°C), W=wet/damp rated, N=nylon outer, X=cross-linked. So THWN-2 = thermoplastic, high-heat, wet, nylon, 90°C wet-and-dry — the most common building wire."],"ref":"NEC 2023, Table 310.4 — Conductor Insulations.","n":94,"id":"P-S4-94"},{"stem":"Equipment grounding conductors of the wire type, where smaller than 6 AWG, must be protected from physical damage where:","choices":["Subject to physical damage, unless run in a raceway or cable","Always","Never","Only outdoors"],"answer":"A","center":["250.120(C) — small EGCs (< 6 AWG) need physical protection if exposed to damage."],"math":null,"more":null,"ref":"NEC 2023, 250.120(C).","n":95,"id":"P-S4-95"},{"stem":"The neutral point of a wye-connected system is the point where:","choices":["All hots tie","The three phase windings are connected together (common point)","The ground rod connects","The meter sits"],"answer":"B","center":["In a wye, the three windings join at a common neutral point. That's where the system neutral is derived.","Wye = common center point of the three windings."],"math":null,"more":null,"ref":"NEC 2023, Article 100 / theory.","n":96,"id":"P-S4-96"},{"stem":"A receptacle outlet box mounted in a wall and exposed to weather must be:","choices":["Standard indoor type","Plastic only","Listed for wet/damp locations with a suitable cover","Open"],"answer":"C","center":["Outdoor box = wet-location-listed enclosure + proper cover."],"math":null,"more":null,"ref":"NEC 2023, 314.15.","n":97,"id":"P-S4-97","audit":["Low: Grammar ('An receptacle')."]},{"stem":"Conductors operating at over 1000 volts require warning signs and guarding to protect against:","choices":["Theft","Corrosion","Weather","Accidental contact by unqualified persons"],"answer":"D","center":["110.34/490 — high voltage gets guarded and signed to keep unqualified people away."],"math":null,"more":null,"ref":"NEC 2023, 110.34.","n":98,"id":"P-S4-98"},{"stem":"The phrase 'readily accessible' means capable of being reached quickly without requiring those to whom ready access is requisite to:","choices":["Climb over or remove obstacles or resort to portable ladders","Use a key","Call ahead","Wear PPE"],"answer":"A","center":["Article 100 — 'readily accessible' = no ladders, no moving obstacles, no climbing. Just walk up to it.","If you need a ladder or have to move boxes, it isn't 'readily' accessible."],"math":null,"more":null,"ref":"NEC 2023, Article 100.","n":99,"id":"P-S4-99"},{"stem":"Unused openings in boxes, enclosures, and fittings must be:","choices":["Left open for ventilation","Effectively closed to afford protection equivalent to the wall of the equipment","Taped only","Painted"],"answer":"B","center":["110.12(A) — unused openings get closed with a listed plug/cover."],"math":null,"more":null,"ref":"NEC 2023, 110.12(A).","n":100,"id":"P-S4-100","audit":["Medium: Duplicate of P-S4-81 (unused openings, 110.12(A))."],"retired":true},{"stem":"Where a raceway or cable passes through a fire-rated wall, the opening must be:","choices":["Left open","Enlarged","Firestopped to maintain the fire rating","Filled with foam of any type"],"answer":"C","center":["300.21 — penetrations of fire-rated assemblies must be firestopped with a listed system."],"math":null,"more":null,"ref":"NEC 2023, 300.21.","n":101,"id":"P-S4-101"},{"n":102,"stem":"Listed or labeled equipment must be installed and used in accordance with:","choices":["The contractor's judgment","Any instructions included in the listing or labeling","Local custom","The owner's preference"],"answer":"B","center":["110.3(B) makes the listing/labeling instructions mandatory — install it the way it's listed.","If the label says a torque value or a clearance, that's now Code, not a suggestion."],"math":null,"more":null,"ref":"NEC 2023, 110.3(B).","id":"P-S4-102"}]},{"title":"SECTION 5 — WIRING & PROTECTION","count":"49 of 258 questions","overview":["The other heaviest section — weighted hard here on purpose. This is NEC Chapter 2: branch circuits (210), feeders (215), services (230), overcurrent protection (240), and grounding & bonding (250). This is where the exam lives, and where most points are won or lost.","Keep four tabs ready and you'll fly: 210 (branch circuits & GFCI/AFCI), 240 (overcurrent + the small-conductor rule in 240.4(D)), 250 (grounding), and Table 310.16 (ampacity). Most questions are a lookup, not a memory test. Your job is to know which tab to flip to, fast."],"tip":"Trap words that change the answer: 'continuous load' (multiply by 125%), 'copper vs. aluminum' (different ampacity columns), 'dwelling vs. other than dwelling' (different GFCI/receptacle rules), and 'overcurrent device' vs. 'conductor ampacity' (the small-conductor rule caps the breaker, not the wire's listed ampacity).","questions":[{"n":103,"stem":"Per the small-conductor rule, the maximum standard overcurrent protection permitted for 12 AWG copper conductors is generally:","choices":["20 amperes","15 amperes","25 amperes","30 amperes"],"answer":"A","center":["Circle “12 AWG copper” and “overcurrent protection.” That points to one specific list, not to the ampacity table.","Flip to 240.4(D). It's a short list: 14 AWG Cu = 15 A, 12 AWG Cu = 20 A, 10 AWG Cu = 30 A. Read the 12 AWG line — 20 A."],"math":null,"more":["Why this exists: Table 310.16 might show 12 AWG THHN at 30 A, which tempts you to pick D. But 240.4(D) overrides that and caps the breaker at 20 A for small conductors, because small wires can't safely handle the heat of a higher fault for long. The rule protects the wire. Whenever you see 14/12/10 AWG and the word 'overcurrent,' go to 240.4(D) first — don't get baited by the ampacity table."],"ref":"NEC 2023, 240.4(D)(5) — Small Conductors.","id":"P-S5-103"},{"n":104,"stem":"A branch circuit supplies a continuous load of 16 amperes. The minimum rating of the branch-circuit conductors and overcurrent device, before applying any other adjustments, must be at least:","choices":["16 amperes","20 amperes","25 amperes","18 amperes"],"answer":"B","center":["The trigger word is “continuous.” The second you read it, one rule fires: continuous loads are taken at 125%.","Flip to 210.20(A) (and 210.19(A)). Multiply the continuous load by 1.25 to size the conductor and the breaker."],"math":["16 A × 1.25 = 20 A","Conductor and overcurrent device ≥ 20 A"],"more":["The flip side they also ask: 'How much continuous load can a 20 A breaker carry?' Answer: 20 ÷ 1.25 = 16 A. Same rule, run backwards. A 'continuous load' is one expected to run 3 hours or more (Article 100). The 25% cushion keeps the breaker from nuisance-tripping and the wire from overheating on long runs."],"ref":"NEC 2023, 210.20(A) and 210.19(A) — Continuous Loads.","id":"P-S5-104","audit":["High: Worked math ends with '→ Answer X' naming the wrong letter (key and math disagree)."]},{"n":105,"stem":"In a dwelling unit, which of the following receptacle outlets is required to have GFCI protection for personnel?","choices":["A receptacle in a bedroom","A receptacle in a hallway","A receptacle serving a kitchen countertop surface","A receptacle in a clothes closet"],"answer":"C","center":["The whole dwelling GFCI list is in one place: 210.8(A). Tab it. The question is just asking 'is this location ON the list?'","Kitchen countertop receptacles are explicitly on the 210.8(A) list. Bedrooms, hallways, and closets are NOT (those fall under AFCI rules in 210.12 — a deliberate mix-up). When the question's wording matches the Code's list wording, that's your answer."],"math":null,"more":["GFCI vs. AFCI — don't swap them. GFCI (210.8) protects PEOPLE from shock in wet/grounded areas: bathrooms, kitchens, garages, outdoors, basements, laundry, etc. AFCI (210.12) protects the BUILDING from arcing-fault fires in living areas: bedrooms, living rooms, hallways, closets, etc. The exam loves to put a bedroom on a GFCI question to see if you'll bite."],"ref":"NEC 2023, 210.8(A) — GFCI Protection, Dwelling Units.","id":"P-S5-105"},{"n":106,"stem":"The ampacity of a single 8 AWG copper THHN conductor (90°C column), at an ambient of 30°C with no adjustments, per Table 310.16 is:","choices":["40 amperes","60 amperes","50 amperes","55 amperes"],"answer":"D","center":["Circle the exact coordinates: “8 AWG copper,” “90°C column,” “Table 310.16.” This is a pure table read.","Open Table 310.16. Find the 8 AWG row on the copper side. Slide to the 90°C column (the right-most of the three copper columns). It reads 55 A."],"math":null,"more":["Caution before you USE that 55 A: the 90°C column is mostly for derating math, not final termination sizing (remember 110.14(C)). If the terminals are rated 75°C, you'd size from the 75°C column, where 8 AWG Cu = 50 A. The exam may ask for the raw table value (90°C = 55 A) OR the usable value after the termination rule (75°C = 50 A). Read which one the stem wants — here it explicitly said the 90°C column, so 55 A."],"ref":"NEC 2023, Table 310.16 — Ampacities.","id":"P-S5-106"},{"n":107,"stem":"A grounding electrode conductor connects the grounded system conductor (or equipment) to the:","choices":["Grounding electrode","Main bonding jumper only","Service neutral only","Nearest receptacle"],"answer":"A","center":["This is a definition-style question. The name of the conductor tells you the answer: a GROUNDING ELECTRODE conductor connects to the grounding ELECTRODE.","Article 100 and 250.4 confirm it: the GEC ties the system/equipment to the grounding electrode (ground rod, water pipe, Ufer, etc.). The name and the definition match — “Grounding electrode”. Don't overthink it."],"math":null,"more":null,"ref":"NEC 2023, Article 100 and 250.62 — Grounding Electrode Conductor.","id":"P-S5-107"},{"n":108,"stem":"A conductor's ampacity (800 A or less) does not match a standard overcurrent device rating, and the circuit is not a multioutlet branch circuit supplying receptacles for cord-and-plug loads. Per 240.4(B), which is permitted?","choices":["The next-lower standard rating is required","The next-higher standard rating is permitted","Only the exact ampacity may be used","Twice the conductor ampacity"],"answer":"B","center":["This is the 'next size up' rule, 240.4(A). Circle the conditions: ampacity “800 A or less,” “doesn't correspond to a standard size,” and not feeding receptacles.","When all those are true, 240.4(A) lets you round UP to the next standard breaker size from the 240.6 list. So “The next-higher standard rating is permitted” is correct. Above 800 A (240.4(C)) you must round DOWN instead — a classic exam contrast."],"math":null,"more":["Standard sizes (240.6) you'll round to: 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200… Example: a conductor good for 115 A, not feeding receptacles, may be protected at the next size up = 125 A. But if that ampacity were over 800 A, you'd go DOWN to the next standard size instead. Always check the 800 A line."],"ref":"NEC 2023, 240.4(B) and 240.6(A) — Overcurrent Device Ratings.","id":"P-S5-108","audit":["Medium: Stem asks for a 'maximum standard ampere rating' but the choices are rules, not ratings."]},{"n":109,"stem":"Service-entrance conductors must have an ampacity not less than the:","choices":["Largest motor on the premises","Size of the largest feeder","Maximum load to be served, per the service calculation","Rating of the utility transformer"],"answer":"C","center":["Circle “service-entrance conductors” and “not less than.” The Code sizes service conductors to the calculated LOAD.","Article 230 ties service conductor sizing to the load calculated under Article 220. The largest motor and largest feeder are parts of the calc, not the whole answer; the utility transformer is the power company's concern, not your sizing basis. The complete, correct basis is the maximum load served — “Maximum load to be served, per the service calculation”."],"math":null,"more":null,"ref":"NEC 2023, Article 230.42 — Minimum Size and Rating; Article 220 (load calc).","id":"P-S5-109"},{"n":110,"stem":"Branch circuits recognized by Article 210 for general use are rated according to the:","choices":["Length of the circuit","Number of receptacles installed","Color of the conductor insulation","Rating of the overcurrent device protecting the circuit"],"answer":"D","center":["The phrase “rated according to” points at how the Code names a branch circuit. 210.3 answers it directly.","A branch circuit's rating equals the rating of its overcurrent device — a '20-amp circuit' is one protected by a 20-amp breaker, regardless of how long it is or how many outlets it has. Length, color, and outlet count don't define the circuit's rating."],"math":null,"more":null,"ref":"NEC 2023, 210.3 — Rating of Branch Circuits.","id":"P-S5-110"},{"stem":"A dwelling unit is required to have at least how many 20-ampere small-appliance branch circuits supplying receptacle outlets in the kitchen, pantry, breakfast room, and dining room?","choices":["Two","One","Three","Four"],"answer":"A","center":["Circle “small-appliance” and “kitchen/dining.” That's 210.11(C)(1).","A minimum of TWO 20-amp small-appliance circuits is required for those areas. The exam likes 'one' as the bait for guys thinking of a single kitchen counter. It's two."],"math":null,"more":["Related minimums in the same section worth tabbing: at least one 20-amp LAUNDRY branch circuit (210.11(C)(2)) and at least one 20-amp BATHROOM branch circuit (210.11(C)(3)). The exam often asks all three in different questions — know the trio."],"ref":"NEC 2023, 210.11(C)(1) — Small-Appliance Branch Circuits.","n":111,"id":"P-S5-111"},{"stem":"What is the maximum distance permitted between receptacle outlets measured along the floor line of any wall space in a dwelling, so that no point is more than 6 ft from a receptacle?","choices":["6 ft","12 ft","10 ft","20 ft"],"answer":"B","center":["The 'no point more than 6 ft' rule means spacing can be up to 12 ft apart (6 ft reach each direction). Circle the 6-ft reach; the spacing is double. 210.52(A).","If a receptacle is at 0 ft and the next at 12 ft, the midpoint (6 ft) is exactly within reach of each — so 12 ft max spacing satisfies the 6-ft rule."],"math":["Reach each way = 6 ft","Max spacing = 6 + 6 = 12 ft"],"more":["The logic behind it: the rule exists so a lamp or appliance with a standard ~6-ft cord can reach a receptacle from anywhere along the wall without an extension cord. So the measurement is about REACH (6 ft), and the spacing that produces is 12 ft. Wall spaces 2 ft or wider count."],"ref":"NEC 2023, 210.52(A)(1) — Receptacle Spacing.","n":112,"id":"P-S5-112","audit":["High: Worked math ends with '→ Answer X' naming the wrong letter (key and math disagree)."]},{"stem":"Service disconnecting means for each service must be installed so that the number of disconnects for each service does not exceed:","choices":["Two","Four","Six","Eight"],"answer":"C","center":["Circle “service disconnecting means” and “number.” This is the 'six disconnect' rule, 230.71.","A service is limited to a maximum of six disconnects (and in the 2020+ Code each must be in a separate enclosure or be a listed assembly). The old 'six throws of the hand' idea."],"math":null,"more":["Note the 2020 change that the 2023 carries forward: the six disconnects can no longer share one enclosure as 'six handles in a panel' — they generally must be separate enclosures or a listed disconnect assembly. So 'six' is still the max count, but how they're arranged got stricter. Watch for that nuance on newer-edition questions."],"ref":"NEC 2023, 230.71 — Maximum Number of Service Disconnects.","n":113,"id":"P-S5-113"},{"stem":"Feeder conductors must have an ampacity not less than the larger of the noncontinuous load plus what factor of the continuous load?","choices":["100% of continuous","115% of continuous","150% of continuous","125% of continuous"],"answer":"D","center":["Circle “feeder” and “continuous load.” Same 125% rule as branch circuits, here in 215.2(A)(1).","Feeders, like branch circuits, are sized at noncontinuous load + 125% of continuous load. The 125% is the recurring safety factor for continuous loads."],"math":["Min feeder ampacity = noncontinuous + (1.25 × continuous) → 125%"],"more":null,"ref":"NEC 2023, 215.2(A)(1) — Feeder Minimum Rating.","n":114,"id":"P-S5-114"},{"stem":"Where a grounding electrode system includes a made (driven rod) electrode that does not have a resistance to earth of 25 ohms or less, the NEC requires the rod to be:","choices":["Augmented by one additional electrode","Replaced with a plate electrode","Driven to 16 ft depth","Bonded to the gas line"],"answer":"A","center":["Circle “25 ohms or less” and “single rod.” That's the 250.53(B)(2) Exception.","A single rod that can't hit 25 ohms must be supplemented by ONE additional electrode. You don't have to keep adding rods chasing a number — just add one more."],"math":null,"more":["The practical takeaway field guys love: you almost never measure ground resistance on a house. The Code lets you skip the 25-ohm test entirely if you just drive TWO rods at least 6 ft apart from the start. That's why you see two ground rods on most services — it sidesteps the testing requirement."],"ref":"NEC 2023, 250.53(A)(2) Exception — Supplemental Electrode.","n":115,"id":"P-S5-115"},{"stem":"The maximum overcurrent protection for a 10 AWG copper conductor, per the small-conductor rule, is generally:","choices":["20 amperes","30 amperes","25 amperes","40 amperes"],"answer":"B","center":["Circle “10 AWG copper” + “overcurrent.” Straight to the 240.4(D) short list.","14 Cu = 15A, 12 Cu = 20A, 10 Cu = 30A. The 10 AWG line is 30A. (The 30A table ampacity and the 30A small-conductor cap happen to match here, but always confirm via 240.4(D).)"],"math":null,"more":null,"ref":"NEC 2023, 240.4(D)(7) — Small Conductors.","n":116,"id":"P-S5-116"},{"stem":"In a dwelling, GFCI protection is required for 125-volt receptacles installed to serve:","choices":["A detached garage with no receptacles","Inside a bedroom closet","Within 6 ft of the outside edge of a sink","A dedicated freezer in a finished living room"],"answer":"C","center":["GFCI list is 210.8(A). Circle 'within 6 ft of a sink' — that's a specific listed trigger.","210.8(A) requires GFCI for receptacles within 6 ft of the outside edge of a sink. Bedroom closets aren't on the list; the others don't match the wording. When the stem matches the Code's exact distance, that's the answer."],"math":null,"more":null,"ref":"NEC 2023, 210.8(A)(7) — Receptacles Near Sinks.","n":117,"id":"P-S5-117"},{"stem":"An equipment grounding conductor for a 40-ampere branch circuit, sized from Table 250.122, must be a minimum copper size of:","choices":["14 AWG","12 AWG","8 AWG","10 AWG"],"answer":"D","center":["Circle '40-ampere' and 'equipment grounding conductor.' This is a pure Table 250.122 lookup.","Open Table 250.122. Find the overcurrent-device row for 40 A; the copper EGC column reads 10 AWG. Don't size the EGC like a current-carrying conductor — it has its own table."],"math":null,"more":["Table 250.122 ranges to memorize: up to 15A = 14 AWG Cu, 20A = 12, 60A = 10, 100A = 8, 200A = 6. The EGC is sized by the BREAKER protecting the circuit, not the load current. And if you upsize the ungrounded conductors (for voltage drop), you must proportionally upsize the EGC too — 250.122(B)."],"ref":"NEC 2023, Table 250.122 — EGC Sizing.","n":118,"id":"P-S5-118"},{"stem":"A receptacle outlet must be installed in a dwelling hallway that is at least how long?","choices":["10 ft","8 ft","5 ft","15 ft"],"answer":"A","center":["210.52(H) — dwelling hallways 10 ft or longer need at least one receptacle.","Measure the hall; 10 ft is the trigger."],"math":null,"more":null,"ref":"NEC 2023, 210.52(H).","n":119,"id":"P-S5-119"},{"stem":"GFCI protection is required for receptacles in a dwelling-unit unfinished basement and:","choices":["Bedrooms","Garages, outdoors, crawl spaces at or below grade","Living rooms","Closets"],"answer":"B","center":["210.8(A) list — garages, outdoors, crawl spaces, unfinished basements are all GFCI areas (wet/grounded).","These are the damp/grounded zones. Bedrooms/living rooms/closets are AFCI, not GFCI."],"math":null,"more":null,"ref":"NEC 2023, 210.8(A).","n":120,"id":"P-S5-120"},{"stem":"The maximum number of receptacles permitted on a 20-ampere general-purpose branch circuit in a DWELLING is:","choices":["10","13","No specific limit (dwellings)","20"],"answer":"C","center":["In dwellings, the Code does not set a numeric limit on receptacles per branch circuit — outlets are assumed at random use.","The '180 VA per outlet' counting rule applies to non-dwelling/commercial. Dwellings have no fixed count."],"math":null,"more":["In non-dwelling occupancies, 220.14(I) counts each receptacle outlet at 180 VA, so a 20 A (2400 VA) circuit caps at about 13 receptacles. Dwellings don't use that count because residential use is intermittent and unpredictable — a key distinction the exam tests."],"ref":"NEC 2023, 210.52 / 220.14(I).","n":121,"id":"P-S5-121"},{"stem":"Service-entrance conductors for a one-family dwelling with a 200-ampere service, using the dwelling service conductor table, may use what minimum copper size?","choices":["6 AWG","4 AWG","250 kcmil","2/0 AWG"],"answer":"D","center":["Table 310.12 (dwelling services) — 200 A service = 2/0 copper. This dwelling table is more generous than 310.16.","Don't use 310.16 here — dwellings get their own table. 200 A = 2/0 Cu."],"math":null,"more":["Table 310.12 gives dwelling services/feeders a reduced conductor size based on the idea that an entire dwelling rarely pulls full rated current. It's roughly 83% of the standard ampacity. For 200 A: 2/0 Cu or 4/0 aluminum. This table saves money on the most common residential job and shows up often."],"ref":"NEC 2023, Table 310.12.","n":122,"id":"P-S5-122"},{"stem":"Overcurrent devices must not be located in the vicinity of easily ignitible material, such as in:","choices":["A clothes closet","A bedroom","A hallway","A kitchen"],"answer":"A","center":["240.24(D) — no overcurrent devices in clothes closets (ignitible material nearby).","Panels can't go in clothes closets or bathrooms."],"math":null,"more":null,"ref":"NEC 2023, 240.24(D).","n":123,"id":"P-S5-123"},{"stem":"A 120/240-volt single-phase dwelling service neutral carries:","choices":["The full load current","Only the unbalanced (difference) current between the two hot legs","No current ever","Twice the hot current"],"answer":"B","center":["The neutral on a 3-wire single-phase system carries only the imbalance between L1 and L2.","If both legs draw equally, the neutral current is near zero. It carries the difference."],"math":null,"more":null,"ref":"NEC 2023, 220.61 — Neutral Load.","n":124,"id":"P-S5-124"},{"stem":"The disconnecting means for a service must be installed at a readily accessible location either outside the building or:","choices":["Anywhere in the building","In the attic","Inside nearest the point of entrance of the service conductors","50 ft inside"],"answer":"C","center":["230.70(A)(1) — the service disconnect goes outside, or inside nearest the point where the service conductors enter.","You can't run service conductors deep into a building before the disconnect."],"math":null,"more":null,"ref":"NEC 2023, 230.70(A)(1).","n":125,"id":"P-S5-125"},{"stem":"When sizing the grounding electrode conductor from Table 250.66, the size is based on the:","choices":["Branch circuit rating","Number of circuits","Smallest conductor","Largest ungrounded service-entrance conductor or equivalent area"],"answer":"D","center":["Table 250.66 sizes the GEC by the largest ungrounded service conductor. Bigger service, bigger GEC.","It scales with the service-entrance conductor size (with the rod/pipe/plate caps applying)."],"math":null,"more":null,"ref":"NEC 2023, Table 250.66.","n":126,"id":"P-S5-126"},{"stem":"Tamper-resistant and weather-resistant requirements aside, a receptacle installed outdoors in a wet location and used for a portable tool while attended must at minimum be:","choices":["GFCI protected","Rated 50 A","On a dedicated 240 V circuit","Hospital grade"],"answer":"A","center":["Outdoor receptacles are GFCI-protected (210.8). Wet location + portable tool = shock risk.","The constant for outdoor receptacles is GFCI."],"math":null,"more":null,"ref":"NEC 2023, 210.8(A)(3).","n":127,"id":"P-S5-127"},{"stem":"A feeder tap not over 25 ft long must have an ampacity not less than what fraction of the rating of the overcurrent device protecting the feeder?","choices":["1/2","1/3","1/4","Equal to it"],"answer":"B","center":["240.21(B)(2) — the 25-ft tap rule: tap ampacity ≥ 1/3 of the feeder OCPD.","10-ft rule and 25-ft rule differ. The 25-ft tap must be at least one-third the feeder breaker."],"math":["Tap ampacity ≥ (1/3) × feeder OCPD rating"],"more":["The tap rules in order: 10-ft tap (ampacity ≥ the load and the device supplied, stays in the enclosure), 25-ft tap (≥ 1/3 of feeder OCPD, terminates in a single device that protects it), and outside taps of unlimited length under specific conditions. Match the LENGTH in the question to the correct ratio."],"ref":"NEC 2023, 240.21(B)(2).","n":128,"id":"P-S5-128"},{"stem":"Under the 2023 NEC, a receptacle outlet on a dwelling kitchen island or peninsula is:","choices":["Required based on the countertop square footage","Required only if the short dimension is 12 in. or more","Optional, but a provision for a future receptacle must be made if none is installed","Prohibited"],"answer":"C","center":["Big 2023 change: island/peninsula receptacles are no longer required. They're optional — but if you don't install one, you must leave a provision to add one later.","The old square-footage and 12-in. rules were removed in 2023. Optional + future provision is the current answer."],"math":null,"more":["This is one of the most-tested recent changes. Earlier codes (2017) required a receptacle for islands with a long dimension ≥ 24 in. and short ≥ 12 in.; 2020 switched to square footage; 2023 removed the requirement entirely because of the cord-across-the-counter hazard. If a receptacle IS installed, it must be on, above (not more than 20 in. above), or in the countertop — below-counter side receptacles serving the top are no longer permitted.","Edition check: the 2020 NEC still required at least one receptacle at an island or peninsula. If you bring a 2020 book, this rule reads differently — know which edition you tabbed."],"ref":"NEC 2023, 210.52(C)(2),(3).","n":129,"id":"P-S5-129","audit":["Medium: Edition-sensitive: correct for 2023 only. The 2020 NEC required at least one island/peninsula receptacle. The exam accepts either edition."]},{"stem":"Per 240.6(A), the next standard fuse or fixed-trip circuit breaker rating above 90 amperes is:","choices":["95 A","125 A","110 A","100 A"],"answer":"D","center":["240.6 standard sizes: … 80, 90, 100, 110… The size above 90 is 100."],"math":null,"more":["The 240.6(A) standard ratings to know cold: 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200, 225, 250, 300, 350, 400, 450, 500, 600… These are the only sizes you round to in the 'next size up/down' rules."],"ref":"NEC 2023, 240.6(A).","n":130,"id":"P-S5-130","audit":["Medium: Stem contradicts itself ('below 100 amperes' ... answer 100 A)."]},{"stem":"An equipment grounding conductor for a 100-ampere circuit, copper, per Table 250.122 is:","choices":["8 AWG","10 AWG","6 AWG","4 AWG"],"answer":"A","center":["Table 250.122 — 100 A overcurrent device = 8 AWG copper EGC.","Memorize the rungs: 60A=10, 100A=8, 200A=6."],"math":null,"more":null,"ref":"NEC 2023, Table 250.122.","n":131,"id":"P-S5-131"},{"stem":"A receptacle installed within 6 ft of a wet bar sink in a dwelling requires:","choices":["AFCI only","GFCI protection","No protection","A 30 A rating"],"answer":"B","center":["210.8(A)(7) — within 6 ft of any sink = GFCI."],"math":null,"more":null,"ref":"NEC 2023, 210.8(A)(7).","n":132,"id":"P-S5-132"},{"stem":"Each disconnect of a service with multiple disconnects must be marked to indicate:","choices":["The installer's name","The price","The load served","Nothing"],"answer":"C","center":["230.2/408.4 — disconnects and circuits must be legibly marked with what they serve."],"math":null,"more":null,"ref":"NEC 2020/2023, 110.22(A) (marked to indicate purpose) and 230.70(B).","n":133,"id":"P-S5-133","audit":["Low: Reference does not support the answer; the 'mark its purpose' rule is 110.22(A)."]},{"stem":"Receptacles serving dwelling kitchen countertops require GFCI and must be supplied by the:","choices":["Lighting circuit","A 15 A circuit","Bathroom circuit","Small-appliance branch circuits (two 20 A minimum)"],"answer":"D","center":["210.52(C) requires the kitchen counter receptacles; 210.11(C)(1) requires the two 20 A small-appliance circuits; GFCI per 210.8(A)."],"math":null,"more":null,"ref":"NEC 2023, 210.52(B).","n":134,"id":"P-S5-134"},{"stem":"Where service conductors pass over a roof, minimum clearances apply. Conductors must also be protected from:","choices":["Physical damage and maintain required clearances from windows, doors, and decks","Sunlight only","Wind only","Birds"],"answer":"A","center":["230.9/230.24 — service conductor clearances from openings (windows, doors, porches) and roofs."],"math":null,"more":null,"ref":"NEC 2023, 230.9 / 230.24.","n":135,"id":"P-S5-135"},{"stem":"A grounding electrode system at a building must include a made electrode (rod, pipe, plate) where no other electrode is present, and a single rod with resistance over 25 ohms must be:","choices":["Removed","Supplemented by an additional electrode","Painted","Ignored"],"answer":"B","center":["250.53(A)(2) — a single rod over 25 ohms needs a second electrode. Two rods 6 ft apart usually solves it.","If the rod can't get to 25 ohms or less, drive a second one."],"math":null,"more":["The 25-ohm rule applies to a SINGLE rod/pipe/plate. Drive two rods spaced at least 6 ft apart and the Code stops requiring you to measure resistance at all — the supplemental electrode is deemed sufficient. That's why you so often see two ground rods at a service."],"ref":"NEC 2023, 250.53(A)(2).","n":136,"id":"P-S5-136"},{"stem":"Per 220.61(B), the portion of the feeder or service unbalanced (neutral) load in excess of 200 amperes is permitted to be calculated at what percentage?","choices":["100%","50%","70%","35%"],"answer":"C","center":["220.61(C) — the neutral demand may be taken at 70% for the portion of the feeder neutral over 200 A on these loads."],"math":null,"more":null,"ref":"NEC 2023, 220.61(B).","n":137,"id":"P-S5-137","audit":["Medium: Stem merges two different rules: 220.61(B)(1) (70% for ranges, ovens, cooktops, dryers) and 220.61(B)(2) (70% of the unbalanced load over 200 A)."]},{"stem":"GFCI protection is now required for receptacles serving dwelling-unit:","choices":["Only bathrooms","Closets","Bedrooms","Kitchens, including those serving the countertop and within 6 ft of the sink"],"answer":"D","center":["210.8(A) — kitchen receptacles (countertop and within 6 ft of a sink) require GFCI."],"math":null,"more":null,"ref":"NEC 2023, 210.8(A)(6),(7).","n":138,"id":"P-S5-138"},{"stem":"The disconnecting means rating for a service must be not less than the:","choices":["Calculated load, and not less than required by 230.79","Smallest branch circuit","Number of circuits","Voltage"],"answer":"A","center":["230.79 — the service disconnect must be rated for the calculated load with stated minimums (e.g., 100 A for a one-family dwelling)."],"math":null,"more":null,"ref":"NEC 2023, 230.79.","n":139,"id":"P-S5-139"},{"n":140,"stem":"On a 20-ampere branch circuit serving two or more receptacles, the receptacles may be rated:","choices":["20 A only","15 A or 20 A","15 A only","30 A"],"answer":"B","center":["On a multi-outlet 20 A circuit, receptacles can be 15 A or 20 A — the 15 A duplex is allowed because the load is shared.","A SINGLE receptacle alone on a 20 A circuit, though, must be rated 20 A (210.21(B)(1))."],"math":null,"more":null,"ref":"NEC 2023, 210.21(B)(3) / Table.","id":"P-S5-140"},{"n":141,"stem":"The standard overcurrent device protecting 12 AWG copper (small-conductor rule) is limited to a maximum of:","choices":["15 A","20 A","25 A","30 A"],"answer":"B","center":["240.4(D) caps the small conductors regardless of ampacity: 14 Cu = 15 A, 12 Cu = 20 A, 10 Cu = 30 A.","These are hard ceilings even when a table shows more. 12 Cu = 20 A."],"math":null,"more":null,"ref":"NEC 2023, 240.4(D)(5).","id":"P-S5-141","audit":["Medium: Duplicate of P-S5-103 (12 AWG = 20 A)."],"retired":true},{"n":232,"id":"N-WP-01","domain":"Wiring & Protection","objective":"Apply bundling adjustment and the termination limit together","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Calculation","stem":"Six current-carrying 10 AWG THHN copper conductors are installed in one EMT run longer than 24 in. Ambient is 30°C and all terminations are rated 75°C. What is the conductors' allowable ampacity?","choices":["28 A","32 A","35 A","40 A"],"answer":"B","math":["Start at the 90°C column (THHN): 10 AWG Cu = 40 A","Adjustment for 4–6 current-carrying conductors = 80%","40 A × 0.80 = 32 A","Termination check (75°C column): 10 AWG Cu = 35 A","Allowable ampacity = the lower of 32 A and 35 A = 32 A"],"center":["Derate from the insulation's own temperature column (90°C for THHN), then check that the result does not exceed the termination column (75°C). Here 32 A is below 35 A, so 32 A stands.","28 A is the trap: it applies the 80% to the 75°C value. 40 A forgets the adjustment. 35 A forgets the adjustment but applies the termination limit."],"more":["This answer is the conductor's ampacity, not its breaker size. 240.4(D)(7) still caps 10 AWG copper at 30 A — see the next question."],"ref":"Table 310.16; Table 310.15(C)(1); 110.14(C); 310.15(C)(1) (2020 and 2023).","navTip":"Tab Table 310.16 and the adjustment table, Table 310.15(C)(1), so you can flip between them quickly.","status":"Verified","isNew":true},{"n":233,"id":"N-WP-02","domain":"Wiring & Protection","objective":"Apply the small-conductor rule after derating","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Calculation","stem":"The 10 AWG copper conductors in the previous question have an adjusted ampacity of 32 A. What is the largest standard overcurrent device permitted to protect them (no special exceptions apply)?","choices":["25 A","30 A","35 A","40 A"],"answer":"B","math":["Adjusted ampacity = 32 A","240.4(B) 'next size up' would allow 35 A","But 240.4(D)(7): 10 AWG copper max = 30 A","Maximum OCPD = 30 A"],"center":["240.4(D) overrides the 'next size up' rule for 14, 12 and 10 AWG. Even though 32 A would normally round up to 35 A, 10 AWG copper is capped at 30 A."],"ref":"240.4(B); 240.4(D)(7); 240.6(A).","navTip":"240.4(D) sits right after the 'next size up' rule in 240.4(B) — read them as a pair.","status":"Verified","isNew":true},{"n":234,"id":"N-WP-03","domain":"Wiring & Protection","objective":"Apply ambient temperature correction","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Calculation","stem":"Three current-carrying 6 AWG THWN-2 copper conductors run in conduit where the ambient temperature is 40°C (104°F). Using the 90°C column, what is the corrected ampacity?","choices":["57 A","65 A","68 A","75 A"],"answer":"C","math":["90°C column: 6 AWG Cu = 75 A","Correction factor, 36–40°C, 90°C column = 0.91","75 A × 0.91 = 68.25 A ≈ 68 A"],"center":["Three conductors means no bundling adjustment (that starts at four). Only the ambient correction applies.","57 A uses the 75°C column and its 0.88 factor; 65 A is the uncorrected 75°C value; 75 A ignores the heat."],"more":["With 75°C terminations the circuit would still be limited to 65 A (110.14(C)), because 68 A is above the 75°C column value."],"ref":"Table 310.16; ambient correction table — NEC 2020 Table 310.15(B)(1); NEC 2023 Table 310.15(B)(1)(1).","navTip":"In the 2023 book the 30°C-based correction table is labeled 310.15(B)(1)(1); a second table based on 40°C follows it. Use the one that matches the ampacity table you are reading.","status":"Verified (2023 table label: confirm on your page)","isNew":true},{"n":235,"id":"N-WP-04","domain":"Wiring & Protection","objective":"Size feeder overcurrent protection for mixed loads","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Calculation","stem":"A feeder supplies 100 A of continuous load and 40 A of noncontinuous load. What is the minimum standard rating of the feeder overcurrent device?","choices":["140 A","150 A","175 A","200 A"],"answer":"C","math":["Continuous × 125%: 100 A × 1.25 = 125 A","Noncontinuous × 100%: 40 A","Minimum rating = 125 + 40 = 165 A","Next standard size (240.6(A)) = 175 A"],"center":["Only the continuous part gets the 125%. 140 A forgets the factor entirely; 150 A is below the 165 A minimum."],"ref":"215.3; 215.2(A)(1); 240.6(A).","navTip":"Feeders are Article 215 — the 125% continuous rule is in 215.2 (conductors) and 215.3 (overcurrent device).","status":"Verified","isNew":true},{"n":236,"id":"N-WP-05","domain":"Wiring & Protection","objective":"Size an equipment grounding conductor","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Easy","type":"Code lookup","stem":"A feeder is protected by a 200-A circuit breaker. What is the minimum size copper equipment grounding conductor?","choices":["8 AWG","6 AWG","4 AWG","3 AWG"],"answer":"B","center":["Table 250.122 is read by the rating of the overcurrent device ahead of the conductor: 200 A → 6 AWG copper (4 AWG aluminum)."],"more":["If the ungrounded conductors were upsized for voltage drop, 250.122(B) would require the EGC to be increased proportionally."],"ref":"Table 250.122.","navTip":"Two grounding tables trip people: 250.122 = EGC (by breaker size); 250.66 = GEC (by service conductor size). Tab them in different colors.","status":"Verified","isNew":true},{"n":237,"id":"N-WP-06","domain":"Wiring & Protection","objective":"Size a grounding electrode conductor","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Easy","type":"Code lookup","stem":"A service uses 3/0 AWG copper service-entrance conductors. What is the minimum size copper grounding electrode conductor to a metal underground water pipe electrode?","choices":["6 AWG","4 AWG","2 AWG","1/0 AWG"],"answer":"B","center":["Table 250.66: 2/0 or 3/0 copper service conductors → 4 AWG copper GEC.","6 AWG is the cap only for the portion going to rod, pipe, or plate electrodes (250.66(A)). A water pipe electrode doesn't get that reduction."],"ref":"Table 250.66; 250.66(A).","navTip":"Read Table 250.66 by the largest ungrounded service conductor (or equivalent area for parallel sets).","status":"Verified","isNew":true},{"n":238,"id":"N-WP-07","domain":"Wiring & Protection","objective":"Size a main bonding jumper","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Code lookup","stem":"A service has a single set of 500 kcmil copper ungrounded conductors. What is the minimum size copper main bonding jumper?","choices":["2 AWG","1/0 AWG","2/0 AWG","3/0 AWG"],"answer":"B","center":["250.28(D) sends you to Table 250.102(C)(1). Over 350 through 600 kcmil copper → 1/0 AWG copper.","Above 1100 kcmil copper, the jumper must be at least 12.5% of the area of the largest ungrounded conductor instead of using the table rows."],"ref":"250.28(D)(1); Table 250.102(C)(1).","navTip":"Main bonding jumper, system bonding jumper, supply-side bonding jumper and the minimum service neutral all use Table 250.102(C)(1).","status":"Verified","isNew":true},{"n":239,"id":"N-WP-08","domain":"Wiring & Protection","objective":"Apply the dwelling general lighting load and demand factors","edition":"NEC 2020 or 2023 — 2020: 220.12 and Table 220.42; 2023: 220.41 and Table 220.45","difficulty":"Hard","type":"Calculation","stem":"A 2,000 sq ft dwelling has the general lighting load plus the two required small-appliance circuits and one laundry circuit. After applying the lighting demand factors, what is the demand load for these items?","choices":["3,675 VA","5,625 VA","6,000 VA","10,500 VA"],"answer":"B","math":["General lighting: 2,000 sq ft × 3 VA = 6,000 VA","Small-appliance: 2 × 1,500 VA = 3,000 VA","Laundry: 1 × 1,500 VA = 1,500 VA","Total before demand = 10,500 VA","First 3,000 VA at 100% = 3,000 VA","Remaining 7,500 VA at 35% = 2,625 VA","Demand load = 3,000 + 2,625 = 5,625 VA"],"center":["Small-appliance and laundry loads are added to the lighting load BEFORE the demand factors are applied (220.52).","3,675 VA applies 35% to everything; 10,500 VA skips the demand step; 6,000 VA counts only the lighting."],"more":["Edition map: 2020 puts the 3 VA/sq ft in Table 220.12 and the demand factors in Table 220.42. The 2023 NEC moved them to 220.41 and Table 220.45. Same numbers, different pages — tab whichever book you bring."],"ref":"220.52(A),(B); NEC 2020 Table 220.12 and Table 220.42; NEC 2023 220.41 and Table 220.45.","navTip":"In a 2023 book, dwelling feeder/service calcs start at Part III (220.40). Don't hunt for the 3 VA in Table 220.12 — in 2023 that table is non-dwelling only (now 220.42).","status":"Verified","isNew":true},{"n":240,"id":"N-WP-09","domain":"Wiring & Protection","objective":"Apply Table 220.55 Note 1 for a range over 12 kW","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Hard","type":"Calculation","stem":"What is the demand load for one 14-kW household range, using Table 220.55 Column C and its notes?","choices":["8.0 kW","8.8 kW","11.2 kW","14.0 kW"],"answer":"B","math":["Column C, 1 appliance = 8 kW (for ranges up to 12 kW)","Amount over 12 kW: 14 − 12 = 2 kW","Note 1: increase 5% per kW over 12 → 2 × 5% = 10%","8 kW × 1.10 = 8.8 kW"],"center":["Column C assumes ranges of 12 kW or less. Note 1 bumps the Column C value 5% for each kW (or major fraction) over 12 kW."],"ref":"Table 220.55, Column C and Note 1.","navTip":"The table notes are where the real rules live. Highlight Note 1 the same color as Column C.","status":"Verified","isNew":true},{"n":241,"id":"N-WP-10","domain":"Wiring & Protection","objective":"Recall the optional dwelling calculation percentages","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Code lookup","stem":"Under the optional dwelling calculation in 220.82(B), the first 10 kVA of 'general load' is taken at 100%. The remainder is taken at:","choices":["25%","35%","40%","50%"],"answer":"C","center":["220.82(B): first 10 kVA at 100%, remainder at 40%. Heating and air-conditioning are added separately under 220.82(C).","35% is the standard-method lighting demand factor — a different table."],"ref":"220.82(B) and (C).","navTip":"Optional method is Part IV of Article 220 (220.82). Tab it separately from the standard method.","status":"Verified","isNew":true},{"n":242,"id":"N-WP-11","domain":"Wiring & Protection","objective":"Size one-family dwelling service conductors with the 83% rule","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Calculation","stem":"A 200-A service supplies the entire load of a one-family dwelling. Using the 83% rule of 310.12 and the 75°C column, what is the minimum copper service conductor?","choices":["1/0 AWG","2/0 AWG","3/0 AWG","4/0 AWG"],"answer":"B","math":["200 A × 0.83 = 166 A","Table 310.16, 75°C copper: 1/0 = 150 A (too small), 2/0 = 175 A","Minimum = 2/0 AWG copper"],"center":["310.12 lets 100–400 A one-family dwelling service conductors carry only 83% of the service rating. 3/0 AWG is what you'd get at 100% (200 A in the 75°C column)."],"ref":"310.12(A); Table 310.16.","navTip":"310.12 applies only to dwelling services and main feeders that carry the entire load. Don't use it for subpanels that serve part of the load.","status":"Verified","isNew":true}]},{"title":"SECTION 6 — WIRING METHODS & MATERIALS","count":"40 of 258 questions","overview":["A big section drawn from NEC Chapter 3: boxes (314), conductors (310), and the raceway articles — EMT (358), RMC (344), PVC (352), flexible conduits, and conduit fill (Chapter 9 tables + Annex C). Lots of straightforward lookups and a few fill calculations.","Your power tabs here: Chapter 9 Table 1 (the 40% fill rule), Chapter 9 Table 4 (raceway areas), Chapter 9 Table 5 (conductor areas), and Annex C (the quick 'how many wires fit' tables). For box fill, tab 314.16 and its Table 314.16(B). Most fill questions can be answered straight from Annex C without any math — learn to use it."],"tip":"Trap to watch: conduit fill percentages. The magic numbers are 1 wire = 53%, 2 wires = 31%, 3 or more wires = 40%. The exam loves to give you three identical conductors (use 40%) or exactly two (use 31%). Read how many conductors before you pick the percentage.","questions":[{"n":142,"stem":"The maximum number of quarter (90°) bends permitted in one run of conduit between pull points (such as boxes or conduit bodies) totals not more than:","choices":["360 degrees","180 degrees","270 degrees","450 degrees"],"answer":"A","center":["Circle “between pull points” and “total.” Every raceway article repeats this same number; for EMT it's 358.26.","The cap is 360 degrees total between pull points — the equivalent of four 90° bends. More than that and you can't pull the wire without damaging it."],"math":["Four 90° bends = 4 × 90° = 360° maximum"],"more":["This same 360° rule appears in nearly every raceway article: EMT 358.26, RMC 344.26, PVC 352.26, IMC 342.26, and so on. So you don't have to remember which article — just know the number is always 360° total. If a job needs more, you add a pull box or conduit body to reset the count."],"ref":"NEC 2023, 358.26 (EMT) — and parallel sections in every raceway article.","id":"P-S6-142","audit":["High: Worked math ends with '→ Answer X' naming the wrong letter (key and math disagree)."]},{"n":143,"stem":"When a raceway contains three or more conductors, the maximum permitted conductor fill, based on the total cross-sectional area of the conductors, is:","choices":["31 percent","40 percent","53 percent","60 percent"],"answer":"B","center":["Circle the count: “three or more conductors.” That count selects the percentage from Chapter 9, Table 1.","Table 1 sets it out: 1 conductor = 53%, 2 conductors = 31%, 3 or more = 40%. The question says three or more, so 40%."],"math":null,"more":["Why the percentages drop and then settle at 40%: a single wire can fill 53% and still pull easily; two wires can wedge against each other, so it drops to 31%; with three or more, 40% gives room for them to slide past one another and for heat to dissipate. Memorize 53 / 31 / 40 — it's one of the highest-value facts in this whole section."],"ref":"NEC 2023, Chapter 9, Table 1 — Percent of Cross Section for Conductors.","id":"P-S6-143"},{"n":144,"stem":"Using NEC Annex C (Table C.1), how many 12 AWG THHN conductors are permitted in 3/4-inch EMT?","choices":["9 conductors","16 conductors","22 conductors","26 conductors"],"answer":"B","center":["When the question names a wire size, a wire type (THHN), and a conduit size and type, you don't calculate — you look it up in Annex C.","Open Annex C, Table C.1 (EMT). Find the 12 AWG THHN row and the 3/4” column: it reads 16. Annex C already did the 40% fill math for you. Answer: 16."],"math":null,"more":["For reference, 12 THHN in EMT runs about 9 in 1/2”, 16 in 3/4”, and 26 in 1”. Use the table — don't guess."],"ref":"NEC 2023, Annex C, Table C.1 (EMT).","id":"P-S6-144"},{"n":145,"stem":"For a single 14 AWG conductor, the volume allowance required for box-fill calculations per Table 314.16(B) is:","choices":["2.50 cubic inches","1.50 cubic inches","2.25 cubic inches","2.00 cubic inches"],"answer":"D","center":["Circle “14 AWG” and “volume allowance.” This is a direct read of Table 314.16(B), the box-fill table.","Find the 14 AWG row: each 14 AWG conductor counts as 2.00 cubic inches. (For reference the next rows are 12 AWG = 2.25 and 10 AWG = 2.50 — the exam parks those right next to the answer as bait.)"],"math":null,"more":["How box fill works: you count conductors, devices (each counts as 2), clamps (count as 1 of the largest conductor), and grounds (all grounds together count as 1), multiply by the volume allowance for the largest conductor present, and the total must not exceed the box's marked volume. The 2.00 cu in for 14 AWG is the base building block of that whole calculation."],"ref":"NEC 2023, Table 314.16(B) — Volume Allowance Required per Conductor.","id":"P-S6-145"},{"n":146,"stem":"EMT (electrical metallic tubing) is generally permitted to be installed:","choices":["In concealed and exposed work, where not subject to severe physical damage","Direct buried without any corrosion protection in all soils","Only in dry, indoor locations","Only where encased in concrete"],"answer":"A","center":["The question asks where EMT is allowed. Flip to the 'Uses Permitted' section of Article 358 (358.10).","358.10 permits EMT in both exposed and concealed work; 358.12 lists the uses not permitted, such as where it will be subject to severe physical damage. 'Only dry indoor locations' and 'only encased in concrete' are far too restrictive, and direct burial with no corrosion protection in every soil type is not what 358.10 allows."],"math":null,"more":null,"ref":"NEC 2023, 358.10 and 358.12 — EMT Uses Permitted / Not Permitted.","id":"P-S6-146","audit":["High: Explanation calls choice A 'too restrictive' while A is the keyed answer."]},{"n":147,"stem":"Conductors of the same circuit, including the grounded and equipment grounding conductors, are generally required to be installed in the same raceway primarily to:","choices":["Save on conduit cost","Maintain a balanced magnetic field and proper operation of overcurrent devices","Make the conductors easier to color-code","Reduce the number of pull points"],"answer":"B","center":["This is a 'why' question, testing 300.3(B) and 300.5(I). The principle is about magnetic fields, not cost or convenience.","When all conductors of a circuit run together, their magnetic fields cancel. Split them into separate metal raceways and you create induced heating and can interfere with fault clearing. “Maintain a balanced magnetic field and proper operation of overcurrent devices” states that purpose. Cost, color, and pull points are not the Code's reason."],"math":null,"more":null,"ref":"NEC 2023, 300.3(B) and 300.5(I) — Conductors of the Same Circuit.","id":"P-S6-147"},{"n":148,"stem":"The minimum cover (burial depth) for a residential 120-volt, 20-ampere branch circuit using direct-buried UF cable, GFCI-protected, in a trench under no roadway, per Table 300.5, is generally:","choices":["6 inches","24 inches","12 inches","18 inches"],"answer":"C","center":["This is a Table 300.5 lookup with several conditions — circle every one: “120 V, 20 A,” “GFCI-protected,” “residential branch circuit.” Those conditions select a special reduced-depth column.","Table 300.5 has a column for residential branch circuits rated 120 V or less, GFCI-protected, and ≤ 20 A: the minimum cover is 12 in. The general direct-burial rule would be 24 in. — but the GFCI/residential conditions reduce it. Read the conditions before picking the column."],"math":null,"more":["Table 300.5 is all about matching conditions to columns. The same trench could require 6” (under concrete), 12” (this GFCI residential case), 18” (RMC/IMC), or 24” (general direct burial). The wiring method AND the circuit conditions both move you across the table. Slow down and confirm each condition the stem gives you, or you'll grab the wrong column."],"ref":"NEC 2023, Table 300.5(A) — Minimum Cover Requirements.","id":"P-S6-148"},{"n":149,"stem":"A luminaire (lighting fixture) outlet box that supports a ceiling-suspended (paddle) fan must be:","choices":["Any standard device box","A box no larger than 4 inches square","Made of nonmetallic material only","Listed and marked as suitable for fan support"],"answer":"D","center":["The clue is 'supports a paddle fan.' A spinning fan puts dynamic load on the box — a regular box won't do.","314.27(B) requires the box to be listed and marked for fan support (and to identify the maximum fan weight if over 35 lb). A standard device box isn't rated for the load. Size and material aren't the deciding factor — the listing for fan support is."],"math":null,"more":null,"ref":"NEC 2023, 314.27(C) — Boxes for Ceiling-Suspended (Paddle) Fans.","id":"P-S6-149"},{"stem":"Type NM cable (Romex) is permitted to be used in:","choices":["One- and two-family dwellings and other permitted structures, in dry locations","Wet locations","Direct burial in earth","Hazardous (classified) locations"],"answer":"A","center":["Circle 'NM cable.' Uses are in 334.10 / not-permitted in 334.12.","NM is for dry locations in dwellings and similar structures. It's prohibited in wet locations, direct burial, and hazardous areas. “One- and two-family dwellings and other permitted structures, in dry locations” captures the permitted use; the others are all on the 'not permitted' list."],"math":null,"more":null,"ref":"NEC 2023, 334.10 & 334.12 — NM Cable Uses.","n":150,"id":"P-S6-150"},{"stem":"Where flexible metal conduit (FMC) is used as an equipment grounding path, it is permitted only where the conduit length in the ground-fault path does not exceed:","choices":["3 ft","6 ft","10 ft","No limit"],"answer":"B","center":["Circle 'FMC' + 'equipment grounding path.' That's 250.118(5).","FMC can serve as the EGC only in limited lengths — total ground-return path of 6 ft or less (and the circuit ≤ 20 A, with proper fittings). Beyond that, run a separate equipment ground."],"math":null,"more":null,"ref":"NEC 2023, 250.118(5) — FMC as EGC.","n":151,"id":"P-S6-151"},{"stem":"The minimum burial depth (cover) for rigid metal conduit (RMC) installed under a residential driveway, per Table 300.5, is generally:","choices":["6 in.","12 in.","18 in.","24 in."],"answer":"C","center":["Two conditions: 'RMC' and a 'driveway' (which is a one/two-family driveway column). Table 300.5.","RMC and IMC get reduced cover — 18 in. in the general columns. Under a residential driveway the table still lands at 18 in. for rigid raceway. The wiring METHOD (rigid metal) buys you shallower cover than direct-buried cable."],"math":null,"more":["Table 300.5 columns by method: Column 1 (direct burial cable) = deepest, often 24 in. Column 2 (RMC/IMC) = 18 in. — the metal protects it. Then there are reduced numbers under buildings, concrete slabs, and for GFCI-protected residential branch circuits. Always match the METHOD and the COVER LOCATION before reading."],"ref":"NEC 2023, Table 300.5(A) — Minimum Cover.","n":152,"id":"P-S6-152"},{"stem":"Outlet boxes and conduit bodies must be installed so the wiring inside is accessible. A box used at a luminaire outlet in a wall must be:","choices":["Concealed behind drywall permanently","At least 8 inches deep","Filled with insulation","Installed so it is accessible without removing the building finish"],"answer":"D","center":["The principle is 'boxes must remain accessible' — 314.29.","You can't bury a box behind finish where you'd have to tear out drywall to reach it. It must stay accessible. (B and 'concealed permanently' are direct opposites — the exam loves that.)"],"math":null,"more":null,"ref":"NEC 2023, 314.29 — Boxes Must Be Accessible.","n":153,"id":"P-S6-153"},{"stem":"When counting conductors for box fill, a device (such as a switch or receptacle) mounted on a yoke counts as how many conductors, based on the largest conductor connected to it?","choices":["Two conductors","One conductor","Three conductors","Zero — devices aren't counted"],"answer":"A","center":["Box fill counting rule — 314.16(A)(4). Circle 'device on a yoke.'","Each yoke/strap holding a device counts as TWO conductors of the largest size connected to it. (Common counts: each conductor = 1, each device = 2, all clamps = 1, all grounds = 1.)"],"math":null,"more":null,"ref":"NEC 2023, 314.16(B)(4) — Device Fill.","n":154,"id":"P-S6-154"},{"stem":"Conductors entering a box through a cable (like NM) must be secured, and the cable sheath must extend into the box not less than:","choices":["1/8 in.","1/4 in.","1/2 in.","1 in."],"answer":"B","center":["Circle 'sheath extends into the box.' That's 314.17(B).","The cable's outer jacket must extend at least 1/4 in. inside the box so the conductors are protected past the clamp. Small number, frequently tested."],"math":null,"more":null,"ref":"NEC 2023, 314.17(B) — Cables Entering Boxes.","n":155,"id":"P-S6-155"},{"stem":"Where single conductors all of the same size and insulation are installed in a conduit, and there are exactly 2 conductors, the maximum fill is:","choices":["53%","40%","31%","60%"],"answer":"C","center":["Circle 'exactly 2 conductors.' Chapter 9, Table 1.","1 wire = 53%, 2 wires = 31%, 3+ = 40%. Exactly two means 31%. The exam parks 40% next to it as bait for guys who only remember the '40% rule.' “31%”."],"math":null,"more":null,"ref":"NEC 2023, Chapter 9, Table 1.","n":156,"id":"P-S6-156"},{"stem":"Intermediate metal conduit (IMC) is covered by which article?","choices":["358","344","348","342"],"answer":"D","center":["IMC = Article 342. (RMC = 344, FMC = 348, EMT = 358.)"],"math":null,"more":null,"ref":"NEC 2023, Article 342.","n":157,"id":"P-S6-157"},{"stem":"The maximum spacing of supports for rigid metal conduit (RMC) trade size 3/4 in. and smaller, where straight runs are made with threaded couplings, is generally:","choices":["10 ft","6 ft","12 ft","16 ft"],"answer":"A","center":["Table 344.30(A)(2) — RMC support spacing starts at 10 ft for smaller sizes (and increases for larger).","Small RMC: support every 10 ft, secured within 3 ft of boxes."],"math":null,"more":null,"ref":"NEC 2023, 344.30(B).","n":158,"id":"P-S6-158"},{"stem":"NM cable (Romex) must be secured within how many inches of each box without a built-in cable clamp?","choices":["8 in.","12 in.","18 in.","24 in."],"answer":"B","center":["334.30 — NM secured within 12 in. of a box (8 in. for single-gang boxes without clamps in some cases).","The general rule is 12 in. of a box and every 4.5 ft along the run."],"math":null,"more":null,"ref":"NEC 2023, 334.30.","n":159,"id":"P-S6-159"},{"stem":"NM cable run on the bottom of floor joists in an unfinished basement must be:","choices":["Stapled to the joist bottom","Left loose","Run through bored holes or on a running board for smaller cables","Taped up"],"answer":"C","center":["334.15(B) — smaller NM on joist faces must be protected: through bored holes or on a running board.","You can't just staple small Romex across the bottom of joists where it's exposed to damage."],"math":null,"more":null,"ref":"NEC 2023, 334.15(C).","n":160,"id":"P-S6-160"},{"stem":"The maximum fill for an auxiliary gutter containing conductors (not for through-wiring) is generally:","choices":["75%","40%","53%","20%"],"answer":"D","center":["366.22 — auxiliary gutters, like wireways, limit fill to 20%.","Gutters and wireways = 20%, not the 40% conduit number."],"math":null,"more":null,"ref":"NEC 2023, 366.22.","n":161,"id":"P-S6-161"},{"stem":"Where conductors are installed in a raceway that is exposed to different temperatures and condensation, the raceway must be provided with:","choices":["A drain or breather where moisture may collect","Extra conductors","A larger size","Paint"],"answer":"A","center":["225.22/300.7 — raceways exposed to weather get a drain/breather so condensation doesn't pool.","Moisture will collect; give it a way out."],"math":null,"more":null,"ref":"NEC 2023, 300.7.","n":162,"id":"P-S6-162"},{"stem":"Per 314.4, metal boxes shall be:","choices":["Bonded and grounded in accordance with Article 250","Grounded only where they contain a receptacle","Grounded only in wet locations","Left ungrounded where NM cable without a ground is used"],"answer":"A","center":["Short lookup: 314.4 says metal boxes shall be bonded and grounded per Article 250. There is no 'only receptacles' or 'only wet locations' limit, and a metal box fed by NM cable still has to be connected to the cable's equipment grounding conductor."],"math":null,"more":null,"ref":"NEC 2020/2023, 314.4 and 250.148.","n":163,"id":"P-S6-163","audit":["High: Keyed answer invents an exception ('part of an approved nonmetallic wiring method that doesn't require it'); 314.4 has no such exception."]},{"stem":"The depth of an outlet box used to enclose a device must provide free space for all conductors. The minimum internal depth for a box housing devices is set to prevent:","choices":["Color fading","Noise","Crowding/damage to conductors and overheating","Corrosion"],"answer":"C","center":["314.24 — box depth prevents crowding and conductor damage. Box fill is about heat and physical room.","Cramming conductors damages insulation and traps heat."],"math":null,"more":null,"ref":"NEC 2023, 314.24.","n":164,"id":"P-S6-164"},{"stem":"Liquidtight flexible nonmetallic conduit (LFNC) is covered by which article?","choices":["352","350","348","356"],"answer":"D","center":["LFNC = Article 356. (LFMC = 350.)"],"math":null,"more":null,"ref":"NEC 2023, Article 356.","n":165,"id":"P-S6-165"},{"stem":"Cable trays are a support system, and the article that covers them is:","choices":["392","376","386","300"],"answer":"A","center":["Cable trays = Article 392."],"math":null,"more":null,"ref":"NEC 2023, Article 392.","n":166,"id":"P-S6-166"},{"stem":"When deburring and reaming is required after cutting conduit, the purpose is to:","choices":["Improve looks","Remove sharp edges that would damage conductor insulation","Increase fill","Add strength"],"answer":"B","center":["EMT/RMC must be reamed so the cut end won't slice insulation on the pull."],"math":null,"more":null,"ref":"NEC 2023, 358.28 / 344.28.","n":167,"id":"P-S6-167"},{"stem":"The maximum support spacing for liquidtight flexible metal conduit (LFMC) is generally:","choices":["3 ft","6 ft","4.5 ft","10 ft"],"answer":"C","center":["350.30 — LFMC secured within 12 in. of boxes and supported at intervals not over 4.5 ft."],"math":null,"more":null,"ref":"NEC 2023, 350.30.","n":168,"id":"P-S6-168"},{"stem":"PVC conduit joints are made by:","choices":["Threading","Taping","Welding","Solvent cementing (or listed couplings)"],"answer":"D","center":["352 — rigid PVC is solvent-welded with the proper cement."],"math":null,"more":null,"ref":"NEC 2023, 352.48.","n":169,"id":"P-S6-169"},{"stem":"A nonmetallic box used with NM cable must have the cable secured to the box unless the box is a single-gang box not over a certain size and the cable is secured within:","choices":["8 in.","4 in.","12 in.","24 in."],"answer":"A","center":["314.17(C) Exception — single-gang nonmetallic box: cable secured within 8 in. of the box, clamping in the box not required."],"math":null,"more":null,"ref":"NEC 2023, 314.17(C) Ex.","n":170,"id":"P-S6-170"},{"stem":"Per Table 300.19(A), copper conductors 2/0 through 4/0 AWG in a vertical raceway must be supported at intervals not exceeding:","choices":["60 ft","80 ft","100 ft","180 ft"],"answer":"B","center":["Table 300.19(A) sets the interval by conductor size AND material. Copper 2/0–4/0 = 80 ft.","Aluminum/copper-clad aluminum of the same size goes farther (180 ft). Always check the material column. Copper 2/0–4/0 = 80 ft."],"math":null,"more":["The table values drop as conductors get heavier. Copper: 18–8 AWG = 100 ft, 6–1/0 = 100 ft, 2/0–4/0 = 80 ft, over 4/0–350 kcmil = 60 ft, and so on down to 35 ft for over 750 kcmil. Aluminum is supported farther at each size because it's lighter. The exam expects you to match BOTH the size range and the metal."],"ref":"NEC 2023, Table 300.19(A).","n":171,"id":"P-S6-171"},{"stem":"Where a cable or raceway-type wiring method is installed through bored holes in wood framing members, the edge of the hole must be at least how far from the nearest edge of the framing member (or the cable protected by a steel plate)?","choices":["1/4 in.","3/4 in.","1-1/4 in.","2 in."],"answer":"C","center":["300.4(A)(1): keep the bored hole at least 1-1/4 in. back from the edge of the stud/joist, or protect the cable with a 1/16 in. steel plate (a nail plate).","This stops drywall screws and nails from hitting the wire. 1-1/4 in. setback or a steel plate."],"math":null,"more":null,"ref":"NEC 2023, 300.4(A)(1).","n":172,"id":"P-S6-172"},{"stem":"Surface nonmetallic raceway is covered by which article?","choices":["386","352","376","388"],"answer":"D","center":["Surface nonmetallic raceway = Article 388. (386 = surface metal raceway.)"],"math":null,"more":null,"ref":"NEC 2023, Article 388.","n":173,"id":"P-S6-173"},{"stem":"When more than three current-carrying conductors are in a raceway over 24 inches long, the conductors must be:","choices":["Adjusted (derated) per Table 310.15(C)(1)","Doubled","Removed","Spliced"],"answer":"A","center":["310.15(C)(1) — over 3 current-carrying conductors in a raceway longer than 24 in. = apply the adjustment factor."],"math":null,"more":null,"ref":"NEC 2023, 310.15(C)(1).","n":174,"id":"P-S6-174"},{"stem":"A short section of raceway used to protect exposed cable from physical damage (a 'sleeve') generally does NOT require derating if it does not exceed:","choices":["12 in.","24 in.","48 in.","10 ft"],"answer":"B","center":["The 24-in. nipple/sleeve threshold — raceways 24 in. or shorter are exempt from the bundling adjustment."],"math":null,"more":null,"ref":"NEC 2023, 310.15(C)(1) Ex.","n":175,"id":"P-S6-175"},{"stem":"Power conductors of AC circuits rated 1000 volts or less (for example, 120-volt and 277-volt circuits) may occupy the same raceway only where:","choices":["Always mixed","Twisted together","All conductors have insulation rated at least the maximum circuit voltage of any conductor in the raceway","Left bare"],"answer":"C","center":["300.3(B)(1) — mixed systems share an enclosure only if all conductors are rated for the max voltage present."],"math":null,"more":null,"ref":"NEC 2023, 300.3(C)(1).","n":176,"id":"P-S6-176","audit":["Medium: Stem uses '120 V and low-voltage signal' — Class 2 signal circuits must be separated from power (725.136); insulation rating alone does not permit them together. Answer only fits 300.3(C)(1) power circuits."]},{"n":177,"stem":"Electrical metallic tubing (EMT) must be securely fastened within ___ of each box and supported at intervals not exceeding ___:","choices":["12 in.; 4.5 ft","3 ft; 10 ft","18 in.; 6 ft","No support required"],"answer":"B","center":["EMT: fasten within 3 ft of each box/fitting, then support at least every 10 ft.","Don't mix this up with NM cable (12 in. / 4.5 ft). EMT = 3 ft / 10 ft."],"math":null,"more":null,"ref":"NEC 2023, 358.30(A).","id":"P-S6-177"},{"n":178,"stem":"The maximum conduit fill for a raceway containing three or more conductors is:","choices":["31%","40%","53%","60%"],"answer":"B","center":["Chapter 9 Table 1: one conductor 53%, two conductors 31%, three or more 40%.","Count the wires first — two is the oddball at 31%."],"math":null,"more":null,"ref":"NEC 2023, Chapter 9, Table 1.","id":"P-S6-178","audit":["Medium: Duplicate of P-S6-143 (40% fill)."],"retired":true},{"n":258,"id":"N-WM-01","domain":"Wiring Methods & Materials","objective":"Calculate conduit fill with mixed conductor sizes","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Hard","type":"Calculation","stem":"Three 6 AWG THHN and one 10 AWG THHN copper conductors will be installed in EMT. What is the smallest trade size permitted?","choices":["1/2 in.","3/4 in.","1 in.","1-1/4 in."],"answer":"B","math":["Chapter 9, Table 5 (THHN): 6 AWG = 0.0507 in², 10 AWG = 0.0211 in²","Total = (3 × 0.0507) + 0.0211 = 0.1732 in²","Four conductors → 40% column of Table 4 (EMT)","1/2 in. EMT, 40% = 0.122 in² (too small)","3/4 in. EMT, 40% = 0.213 in² (OK)"],"center":["Mixed sizes mean you can't use Annex C — add up the conductor areas from Table 5 and compare to the 40% column for EMT in Table 4."],"ref":"Chapter 9, Tables 1, 4 and 5.","navTip":"Table 4 is grouped by raceway type; find the EMT block first, then the 40% column.","status":"Verified","isNew":true},{"n":259,"id":"N-WM-02","domain":"Wiring Methods & Materials","objective":"Calculate box fill","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Calculation","stem":"A 4 in. × 1-1/2 in. square box with internal cable clamps contains one receptacle and two 12/2 NM cables with grounds (four insulated 12 AWG conductors and two bare grounds). What volume is required?","choices":["15.75 cu in.","18.00 cu in.","20.25 cu in.","22.50 cu in."],"answer":"B","math":["Insulated conductors: 4 × 1 = 4","All equipment grounding conductors together: 1","Internal cable clamps (all): 1","Receptacle on one yoke: 2","Total = 8 × 2.25 cu in. (12 AWG) = 18.00 cu in."],"center":["A 4 × 1-1/2 square box is 21.0 cu in. (Table 314.16(A)), so this fits. 20.25 counts each ground separately; 15.75 forgets the clamps; 22.50 counts each clamp separately."],"ref":"314.16(B); Table 314.16(A); Table 314.16(B).","navTip":"314.16(B)(1)–(5) is the counting rulebook. Tab it, and tab Table 314.16(A) for box volumes.","status":"Verified","isNew":true},{"n":260,"id":"N-WM-03","domain":"Wiring Methods & Materials","objective":"Size a pull box for an angle pull","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Calculation","stem":"An angle pull has two 3-in. conduits and one 2-in. conduit entering the same wall of a pull box. What is the minimum distance from that wall to the opposite wall?","choices":["18 in.","20 in.","23 in.","24 in."],"answer":"C","math":["314.28(A)(2): 6 × largest raceway + sum of the other raceways in the same row on the same wall","6 × 3 in. = 18 in.","Others: 3 in. + 2 in. = 5 in.","18 + 5 = 23 in."],"center":["18 in. forgets the other raceways. 24 in. is the straight-pull rule (8 × 3 in.)."],"ref":"314.28(A)(2).","navTip":"Straight pull = 8 ×; angle or U pull = 6 × + others. Both are 314.28(A).","status":"Verified","isNew":true},{"n":261,"id":"N-WM-04","domain":"Wiring Methods & Materials","objective":"Identify underground service conductors","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Easy","type":"Code lookup","stem":"Underground service conductors that are not encased in concrete and are buried 18 in. or more below grade must have a warning ribbon placed in the trench at least how far above the installation?","choices":["6 in.","12 in.","18 in.","24 in."],"answer":"B","center":["300.5(D)(3): warning ribbon at least 300 mm (12 in.) above the underground installation."],"ref":"300.5(D)(3).","navTip":"300.5 is the whole underground rule set: (A) cover table, (D) protection from damage, (G) sealing.","status":"Verified","isNew":true}]},{"title":"SECTION 7 — EQUIPMENT FOR GENERAL USE","count":"32 of 258 questions","overview":["This section comes from NEC Chapter 4: flexible cords (400), switches (404), receptacles (406), luminaires (410), appliances (422), heating (424), motors (430), and transformers (450). It's broad but mostly definitional and table-based.","Motors (Article 430) carry the most weight and the most math. Tab Table 430.250 (three-phase motor FLC) and Table 430.52 (max overcurrent device sizing). For motors, remember the golden rule: size the WIRES and overload from the motor nameplate, but size the BRANCH-CIRCUIT conductors from the FLC tables, at 125% for a single continuous-duty motor."],"tip":"Trap to watch: motor calculations use TABLE full-load current (FLC), not the nameplate amps, for sizing branch-circuit conductors and short-circuit/ground-fault protection. The nameplate is used for overload protection. Read which one the question wants.","questions":[{"n":179,"stem":"For a single continuous-duty motor, the branch-circuit conductors must have an ampacity of not less than what percentage of the motor's full-load current?","choices":["125 percent","100 percent","115 percent","80 percent"],"answer":"A","center":["Circle “single… continuous-duty motor” and “branch-circuit conductors.” That's the 430.22 rule.","430.22 requires the conductors to be sized at 125% of the motor's full-load current (from the FLC table). It's the same 125% cushion idea as a continuous load — motors run long and start hard."],"math":["Conductor ampacity ≥ 1.25 × motor FLC → 125%"],"more":["Walk the whole motor circuit so you don't mix up the percentages: CONDUCTORS = 125% of table FLC (430.22). OVERLOAD protection = typically 115–125% of NAMEPLATE amps (430.32). SHORT-CIRCUIT/GROUND-FAULT breaker = a big multiplier from Table 430.52 (e.g., 250% for an inverse-time breaker) because motors draw huge inrush at start. Three different numbers for three different jobs — the exam tests whether you know which is which."],"ref":"NEC 2023, 430.22 — Single Motor Conductor Sizing.","id":"P-S7-179","audit":["High: Worked math ends with '→ Answer X' naming the wrong letter (key and math disagree)."]},{"n":180,"stem":"A general-use snap switch controlling a permanently installed luminaire must have an ampere rating not less than the:","choices":["Largest conductor in the panel","Connected load it controls","Service rating","Branch-circuit breaker rating"],"answer":"B","center":["A switch is rated for the LOAD it switches. The phrase to circle is “not less than the…”","404.14 requires the switch rating to be at least the load it controls (within its voltage rating). It doesn't have to match the breaker, the service, or the biggest wire in the panel — just safely carry and break its own load."],"math":null,"more":null,"ref":"NEC 2023, 404.14 — Rating and Use of Snap Switches.","id":"P-S7-180"},{"n":181,"stem":"Using Table 430.250, the full-load current of a 10-horsepower, 230-volt, three-phase squirrel-cage induction motor is:","choices":["14 amperes","30.8 amperes","28 amperes","40 amperes"],"answer":"C","center":["Circle the three coordinates: “10 hp,” “230 V,” “three-phase.” That's a single cell in Table 430.250.","Open Table 430.250 (three-phase motors). Find the 10 hp row, slide to the 230 V column. It reads 28 A. Don't calculate — the table is the legal value the Code makes you use."],"math":null,"more":["Critical exam habit: ALWAYS use the table FLC (28 A here), never the motor's nameplate amps, for sizing branch-circuit conductors and the short-circuit/ground-fault device. The nameplate is only for overload sizing. The exam deliberately offers a 'nameplate-looking' number as a distractor. If you see 'Table 430.250,' the answer comes off that table, period."],"ref":"NEC 2023, Table 430.250 — Three-Phase Motor Full-Load Currents.","id":"P-S7-181"},{"n":182,"stem":"Receptacles installed in a damp or wet location, such as outdoors, are required to be:","choices":["Tamper-resistant only","Installed only on dedicated circuits","Rated 20 amperes minimum","Listed weather-resistant type and provided with a suitable cover/enclosure for the location"],"answer":"D","center":["Circle “damp or wet location” and “outdoors.” That points to 406.9 (receptacles in damp/wet locations).","406.9 requires weather-resistant (WR) receptacles plus a cover/enclosure suited to the location (a while-in-use cover where exposed to weather). Tamper-resistant is a separate requirement, amperage and dedicated circuits aren't the rule here. “Listed weather-resistant type and provided with a suitable cover/enclosure for the location” captures both the WR rating and the cover."],"math":null,"more":null,"ref":"NEC 2023, 406.9 — Receptacles in Damp or Wet Locations.","id":"P-S7-182"},{"n":183,"stem":"A transformer rated 1000 V or less with primary overcurrent protection only and a primary current of 9 amperes or more may have its primary device set at not more than what percent of rated primary current (using the next standard size where 125% doesn't correspond)?","choices":["125%","150%","167%","250%"],"answer":"A","center":["Table 450.3(B), primary-only protection, primary current 9 A or more: the primary device is limited to 125% of rated primary current (round up to the next standard size if 125% doesn't land on one).","The higher percentages (167%, 300%) apply only to smaller primary currents (under 9 A / under 2 A). For 9 A and up it's 125%."],"math":null,"more":["Table 450.3(B) is for transformers 1000 V and less. Primary-only protection: 125% when primary current is 9 A or more; 167% when 2 A up to 9 A; 300% when under 2 A. With BOTH primary and secondary protection the allowances change again. Match the current band to the percent."],"ref":"NEC 2023, Table 450.3(B).","id":"P-S7-183"},{"n":184,"stem":"Flexible cord, as covered by Article 400, is NOT permitted to be used:","choices":["For connection of a pendant","As a substitute for the fixed wiring of a structure","For wiring of luminaires designed for cord connection","Where flexibility is necessary for appliances"],"answer":"B","center":["The question asks where flexible cord is NOT allowed. Flip to 400.12 (Uses Not Permitted).","The number-one prohibited use, top of the 400.12 list, is as a substitute for the fixed wiring of a structure (no running cord through walls in place of romex/conduit). The other three (pendants, cord-connected luminaires, appliance flexibility) are all PERMITTED uses under 400.10. “As a substitute for the fixed wiring of a structure” is the prohibited one."],"math":null,"more":null,"ref":"NEC 2023, 400.12 — Flexible Cords Uses Not Permitted.","id":"P-S7-184"},{"stem":"A receptacle rated 15 or 20 amperes installed in a dwelling-unit location specified by 406.12 must be:","choices":["Weather-resistant","Hospital-grade","Tamper-resistant (TR)","Isolated-ground"],"answer":"C","center":["Circle 'dwelling-unit' receptacles per 406.12. The hazard there is kids inserting objects.","Most 15/20A, 125/250V receptacles in dwellings must be tamper-resistant (TR) — the shutters that block foreign objects. Weather-resistant is for wet locations, a different rule."],"math":null,"more":null,"ref":"NEC 2023, 406.12 — Tamper-Resistant Receptacles.","n":185,"id":"P-S7-185"},{"stem":"The disconnecting means for a motor must be located:","choices":["At the service only","Only at the panel","Anywhere in the building","In sight from the motor controller location (and able to disconnect the motor)"],"answer":"D","center":["Circle 'motor disconnect' + location. Article 430, Part IX (430.102).","The disconnect must be in sight from the controller, and a disconnect must also be in sight from the motor/driven machine (or lockable if not). 'In sight' = visible and within 50 ft."],"math":null,"more":["'In sight from' is a defined term (Article 100): visible and not more than 50 ft away. It shows up all over Article 430 and for HVAC (440). The safety reason: whoever's working on the motor can see the disconnect is off and nobody can re-energize it out of view."],"ref":"NEC 2023, 430.102 — Motor Disconnect Location.","n":186,"id":"P-S7-186"},{"stem":"A surface-mounted LED or incandescent luminaire (with a completely enclosed light source) in a clothes closet must have a minimum clearance from the nearest point of the storage space of:","choices":["6 in.","12 in.","18 in.","No clearance, regardless of type"],"answer":"B","center":["410.16(C): a surface-mounted incandescent or LED luminaire with a fully enclosed source needs 12 in. of clearance from the storage space.","Only luminaires specifically listed/identified for closet storage-space installation may be closer. The default for a normal surface LED is 12 in."],"math":null,"more":["Closet clearances by type (410.16(C)): surface incandescent/LED = 12 in.; recessed incandescent/LED = 6 in.; surface or recessed fluorescent = 6 in.; and a luminaire specifically listed for closet storage-space use may be installed within the space per its listing. Bare-lamp and pendant fixtures aren't permitted in closets at all (410.16(B))."],"ref":"NEC 2023, 410.16(C)(1).","n":187,"id":"P-S7-187"},{"stem":"The branch circuit supplying a single 240-volt, 30-ampere continuous-duty water heater (treated as continuous) requires conductors rated at least:","choices":["30 A","37.5 A","24 A","45 A"],"answer":"B","center":["Water heaters are treated as continuous: 30 × 1.25 = 37.5 A.","The 125% continuous factor applies to fixed storage water heaters."],"math":["30 A × 1.25 = 37.5 A"],"more":null,"ref":"NEC 2023, 422.13 / 422.10.","n":188,"id":"P-S7-188","audit":["Medium: Two distractors are the same value (30 A and '30 A exactly')."]},{"stem":"Receptacles of the grounding type must have their grounding contacts connected to:","choices":["The neutral","Nothing","The equipment grounding conductor","The hot"],"answer":"C","center":["406.4 — the U-ground connects to the EGC, never the neutral.","Ground pin to ground wire. Tying it to neutral is a dangerous, prohibited mistake."],"math":null,"more":null,"ref":"NEC 2023, 406.4(C).","n":189,"id":"P-S7-189"},{"stem":"A motor controller must be capable of:","choices":["Only starting the motor","Measuring voltage","Only stopping the motor","Starting and stopping the motor it controls"],"answer":"D","center":["430.81 — a controller starts and stops the motor."],"math":null,"more":null,"ref":"NEC 2020/2023, 430.82(A).","n":190,"id":"P-S7-190","audit":["Low: Start/stop requirement is 430.82(A), not 430.81."]},{"stem":"Luminaires recessed into insulation must be marked 'Type IC' because:","choices":["They are rated for direct contact with insulation without overheating","They are cheaper","They use less power","They are larger"],"answer":"A","center":["410 — 'IC' = Insulation Contact rated. Non-IC fixtures need clearance from insulation to avoid fire.","Burying a non-IC can light in insulation is a fire hazard."],"math":null,"more":null,"ref":"NEC 2023, 410.116.","n":191,"id":"P-S7-191"},{"stem":"The overcurrent protection for the primary of a transformer (1000 V or less) with primary-only protection and primary current of less than 2 amperes may be set as high as:","choices":["125%","300%","167%","500%"],"answer":"B","center":["Table 450.3(C) — for very small primary currents (under 2 A), the device may be up to 300%.","Tiny currents allow higher percentages because device sizes are so small."],"math":null,"more":null,"ref":"NEC 2023, Table 450.3(B).","n":192,"id":"P-S7-192"},{"stem":"A hard-wired (fastened-in-place) appliance rated 13.5 amperes is the only load on an individual 15-ampere branch circuit. This is permitted only if the appliance load is:","choices":["Continuous","Not a continuous load","Over 80% always","Inductive"],"answer":"B","center":["Continuous loads (3 hours or more) are sized at 125%: 13.5 A × 1.25 = 16.9 A, which is more than a 15-A circuit allows. A non-continuous 13.5-A load fits.","Trap to know: if this were a cord-and-plug appliance on a 15-A circuit that serves two or more outlets, 210.23(A)(1) would cap it at 80% of the circuit rating — 12 A — no matter how long it runs."],"math":null,"more":null,"ref":"NEC 2020/2023, 210.19(A), 210.20(A); see 210.23(A)(1) for multi-outlet circuits.","n":193,"id":"P-S7-193","audit":["High: Ignores 210.23(A)(1): a cord-and-plug load on a multi-outlet 15-A circuit is limited to 12 A (80%), so 13.5 A is not permitted even when non-continuous. Question did not say individual branch circuit or hard-wired."]},{"stem":"Per 240.81, circuit breakers must:","choices":["Be installed only in a horizontal position","Be marked with the installer's name","Have handles that operate rotationally only","Clearly indicate whether they are in the open (off) or closed (on) position"],"answer":"D","center":["240.81 requires breakers to clearly indicate whether they are open (off) or closed (on). Where the handle operates vertically, 'up' must be the on position."],"math":null,"more":null,"ref":"NEC 2023, 240.81.","n":194,"id":"P-S7-194","audit":["Medium: Stem/choices garbled ('must indicate ... when installed: horizontally only / upside down')."]},{"stem":"A continuous-duty motor's overload protection is generally based on a percentage of the:","choices":["Motor nameplate full-load current","Table FLC","Service rating","Breaker size"],"answer":"A","center":["430.32 — overload sizing uses the NAMEPLATE FLA, not the table. (Conductors use the table.)","Overload = nameplate. Conductors = table. Don't swap them."],"math":null,"more":null,"ref":"NEC 2023, 430.32.","n":195,"id":"P-S7-195"},{"stem":"Receptacles installed in a patient bed location of a general care space must be of the:","choices":["Standard type","Hospital-grade type, identified by a green dot","Weather-resistant type","Tamper-only type"],"answer":"B","center":["517.18 — patient care receptacles are hospital-grade (green dot)."],"math":null,"more":null,"ref":"NEC 2023, 517.18(B).","n":196,"id":"P-S7-196"},{"stem":"The disconnecting means for an air-conditioning condenser must be located:","choices":["At the panel only","In the attic","Within sight from and readily accessible to the equipment","Anywhere"],"answer":"C","center":["440.14 — HVAC disconnect within sight of the unit. The whip and disconnect by the condenser."],"math":null,"more":null,"ref":"NEC 2023, 440.14.","n":197,"id":"P-S7-197"},{"stem":"Fixed electric baseboard heaters with factory-installed receptacles: the receptacle must NOT be:","choices":["White","Tamper-resistant","Grounded","Connected to the heater circuit (it can't be supplied by the heater branch circuit)"],"answer":"D","center":["424.9 — a receptacle in a baseboard heater can't be fed from the heater circuit (overload risk). It's a permitted outlet but on a separate circuit."],"math":null,"more":null,"ref":"NEC 2023, 424.9.","n":198,"id":"P-S7-198"},{"stem":"Per 450.13, transformers must be readily accessible to qualified personnel EXCEPT:","choices":["Dry-type 1000V or less in the open on a wall/column, and dry-type 50 kVA or less in fire-resistant hollow spaces","Any transformer over 50 kVA","All liquid-filled transformers","All transformers are exempt"],"answer":"A","center":["450.13 — the rule is transformers must be readily accessible. The only exceptions: (A) dry-type 1000V-or-less installed in the open on walls/columns/structures, and (B) dry-type 50 kVA or less in fire-resistant hollow spaces.","Everything else has to be readily accessible. “Dry-type 1000V or less in the open on a wall/column, and dry-type 50 kVA or less in fire-resistant hollow spaces” names the two exceptions."],"math":null,"more":null,"ref":"NEC 2023, 450.13(A) and (B).","n":199,"id":"P-S7-199"},{"stem":"The branch-circuit selection current (BCSC), when marked on HVAC equipment, is used instead of rated-load current when it is:","choices":["Smaller","Greater than the rated-load current","Equal","Zero"],"answer":"B","center":["440.4 — use BCSC when it's greater than RLA for sizing."],"math":null,"more":null,"ref":"NEC 2023, 440.4(C).","n":200,"id":"P-S7-200"},{"stem":"A motor disconnecting means must have an ampere rating of at least what percent of the motor full-load current?","choices":["80%","100%","115%","125%"],"answer":"C","center":["430.110 — the motor disconnect must be at least 115% of the FLC."],"math":["Disconnect ≥ 1.15 × FLC"],"more":null,"ref":"NEC 2023, 430.110(A).","n":201,"id":"P-S7-201"},{"stem":"Lighting luminaires installed in clothes closets must maintain minimum clearances from the storage space because:","choices":["Of cost","Of weight","Of color","Of fire risk from heat near stored combustibles"],"answer":"D","center":["410.16 — closet luminaire clearances prevent igniting stored items."],"math":null,"more":null,"ref":"NEC 2023, 410.16(C).","n":202,"id":"P-S7-202"},{"n":203,"stem":"Conductors supplying a single continuous-duty motor must have an ampacity of not less than:","choices":["100% of the motor FLC","115% of the motor FLC","125% of the motor FLC","250% of the motor FLC"],"answer":"C","center":["430.22 sizes motor branch-circuit conductors at 125% of the table full-load current (FLC).","Use the FLC from Table 430.248/430.250 — not the nameplate — for the conductor sizing."],"math":null,"more":["Motors take three separate numbers: conductors at 125% of table FLC (430.22), overload from the nameplate FLA (430.32), and the short-circuit/ground-fault breaker from the percentages in Table 430.52. Mixing up which value feeds which calc is the classic motor trap."],"ref":"NEC 2023, 430.22.","id":"P-S7-203","audit":["Medium: Duplicate of P-S7-179 (motor conductors 125%)."],"retired":true},{"n":204,"stem":"A motor's running overload protection is sized based on:","choices":["The breaker rating","The conductor ampacity","The motor nameplate full-load amperes","Table 430.250"],"answer":"C","center":["Overloads protect the motor itself, so they're set from the nameplate FLA, not the Code table.","Conductors and the breaker use the table FLC; the overload uses the nameplate."],"math":null,"more":null,"ref":"NEC 2023, 430.32.","id":"P-S7-204","audit":["Medium: Duplicate of P-S7-195 (overload from nameplate)."],"retired":true},{"n":243,"id":"N-EQ-01","domain":"Equipment for General Use","objective":"Size motor branch-circuit conductors from the table FLC","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Calculation","stem":"A 25-hp, 460-V, three-phase squirrel-cage motor (continuous duty) has a nameplate FLA of 32 A. What is the minimum copper branch-circuit conductor, using the 75°C column?","choices":["10 AWG","8 AWG","6 AWG","4 AWG"],"answer":"B","math":["Table 430.250: 25 hp, 460 V = 34 A (use the table, not the nameplate)","430.22: 34 A × 1.25 = 42.5 A","Table 310.16, 75°C Cu: 10 AWG = 35 A (too small), 8 AWG = 50 A","Minimum = 8 AWG copper"],"center":["Conductor sizing uses the table FLC (430.6(A)(1)). The 32 A nameplate value is a distractor for this step."],"ref":"430.6(A)(1); Table 430.250; 430.22; Table 310.16.","navTip":"Motor tables are at the back of Article 430: 430.247 (DC), 430.248 (1-phase), 430.250 (3-phase).","status":"Verified","isNew":true},{"n":244,"id":"N-EQ-02","domain":"Equipment for General Use","objective":"Size motor short-circuit/ground-fault protection","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Hard","type":"Calculation","stem":"For the same 25-hp, 460-V motor (table FLC 34 A), what is the maximum inverse-time circuit breaker rating permitted, using the next-higher-size allowance?","choices":["80 A","85 A","90 A","100 A"],"answer":"C","math":["Table 430.52: inverse-time breaker = 250% of FLC","34 A × 2.50 = 85 A","85 A is not a standard size (240.6(A))","430.52(C)(1) Exception No. 1: next higher standard size = 90 A"],"center":["85 A is the calculated value, but it isn't a standard rating — the exception lets you go to the next standard size up, 90 A. 100 A would require Exception No. 2 (motor won't start)."],"ref":"430.52(C)(1) and Exception No. 1; Table 430.52; 240.6(A).","navTip":"Table 430.52 is organized by motor type down the side and device type across the top — find the column before the row.","status":"Verified","isNew":true},{"n":245,"id":"N-EQ-03","domain":"Equipment for General Use","objective":"Size motor overload protection from the nameplate","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Calculation","stem":"The same motor's nameplate shows FLA 32 A and a service factor of 1.15. What is the maximum rating of a separate overload device under the basic rule?","choices":["36.8 A","40 A","42.5 A","44.8 A"],"answer":"B","math":["430.32(A)(1): service factor 1.15 or more → 125% of nameplate FLA","32 A × 1.25 = 40 A"],"center":["Overloads use the NAMEPLATE current. 42.5 A is 125% of the table value (wrong current). 36.8 A uses 115% (that's for motors without the 1.15 service factor or 40°C rise marking)."],"ref":"430.32(A)(1).","navTip":"Three motor numbers, three places: conductors 430.22 (table), OCPD 430.52 (table), overloads 430.32 (nameplate).","status":"Verified","isNew":true},{"n":246,"id":"N-EQ-04","domain":"Equipment for General Use","objective":"Size conductors for several motors","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Calculation","stem":"A feeder supplies two 460-V, three-phase motors with table FLCs of 34 A and 21 A, and no other loads. What is the minimum feeder conductor ampacity?","choices":["55.0 A","63.5 A","68.8 A","76.5 A"],"answer":"B","math":["430.24: 125% of the largest motor + 100% of the others","34 A × 1.25 = 42.5 A","42.5 A + 21 A = 63.5 A"],"center":["Only the largest motor gets the 125%. 68.8 A multiplies both motors by 125%; 55 A adds them at 100%."],"ref":"430.24; Table 430.250.","navTip":"430.24 is the 'several motors' rule; 430.62 is the matching rule for the feeder's overcurrent device.","status":"Verified","isNew":true},{"n":247,"id":"N-EQ-05","domain":"Equipment for General Use","objective":"Calculate three-phase transformer current","edition":"Theory (Ugly's) + NEC","difficulty":"Medium","type":"Calculation","stem":"A 75-kVA, three-phase transformer has a 480-V primary. What is the rated primary current?","choices":["52.1 A","90.2 A","156.3 A","208.2 A"],"answer":"B","math":["I = VA ÷ (E × 1.732)","I = 75,000 ÷ (480 × 1.732)","I = 75,000 ÷ 831.4 = 90.2 A"],"center":["156.3 A forgets the 1.732 (single-phase formula). 208.2 A is the 208-V secondary current. 52.1 A divides by 1.732 twice."],"ref":"Ugly's — three-phase formulas; used with Table 450.3(B).","navTip":"Tab the Ugly's three-phase formula page. Don't write formulas on tabs — the test center allows highlighting, underlining and permanent tabs only.","status":"Verified","isNew":true},{"n":248,"id":"N-EQ-06","domain":"Equipment for General Use","objective":"Size transformer primary-only overcurrent protection","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Hard","type":"Calculation","stem":"That 75-kVA, 480-V transformer (primary current 90.2 A) is protected on the primary only. What is the maximum standard primary overcurrent device permitted under Table 450.3(B)?","choices":["100 A","110 A","125 A","225 A"],"answer":"C","math":["Primary-only protection, primary current 9 A or more → 125%","90.2 A × 1.25 = 112.8 A","Note 1: where 125% does not match a standard size, the next higher standard size is permitted","240.6(A): next size above 112.8 A = 125 A"],"center":["110 A rounds down. 225 A is the 250% figure used when secondary protection is also provided."],"ref":"450.3(B) and Table 450.3(B), Note 1; 240.6(A).","navTip":"Table 450.3(A) is over 1000 V; 450.3(B) is 1000 V and less. Most exam questions are 450.3(B).","status":"Verified","isNew":true},{"n":249,"id":"N-EQ-07","domain":"Equipment for General Use","objective":"Size generator output conductors","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Code lookup","stem":"The conductors from a generator's output terminals to the first distribution device containing overcurrent protection must have an ampacity of not less than what percentage of the generator's nameplate current rating?","choices":["100%","115%","125%","150%"],"answer":"B","center":["445.13(A): 115% of the nameplate current rating. 125% is the continuous-load factor people reach for out of habit."],"ref":"445.13(A).","navTip":"Generators are Article 445 — short article, worth one tab.","status":"Verified","isNew":true},{"n":250,"id":"N-EQ-08","domain":"Equipment for General Use","objective":"Apply nameplate maximum overcurrent rating for HVAC equipment","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Easy","type":"Concept","stem":"A rooftop air-conditioning unit's nameplate lists 'MAX FUSE/BREAKER 40 A'. The installer wants a 45-A breaker because it's in stock. This is:","choices":["Permitted if the conductors are rated 45 A","Permitted if the unit is outdoors","Not permitted — the marked maximum overcurrent rating may not be exceeded","Permitted if the unit has a service disconnect"],"answer":"C","center":["440.22(C) and 110.3(B): where the equipment is marked with a maximum fuse or breaker size, the protective device may not exceed that marking."],"ref":"440.22(C); 110.3(B).","navTip":"In Article 440, sizing starts at 440.6 (RLA/BCSC); overcurrent device limits are 440.22.","status":"Verified","isNew":true}]},{"title":"SECTION 8 — SPECIAL OCCUPANCIES, EQUIPMENT & CONDITIONS","count":"26 of 258 questions","overview":["This section is NEC Chapter 5 (hazardous/special occupancies like 500–517 and 680 pools), Chapter 6 (special equipment), and Chapter 7 (special conditions like 700 emergency systems). On the real exam this is a smaller slice, but the questions can feel unfamiliar — so a little tabbing goes a long way.","You can't memorize all of Chapters 5–7, and you don't need to. Tab the headline articles: 500/501 (classified/hazardous locations), 680 (swimming pools & spas), 700 (emergency systems), and 760 (fire alarm). When a question names an occupancy (gas station, hospital, pool, grain bin), go straight to that occupancy's article — the answer is almost always a direct rule in the first few pages."],"tip":"Trap to watch: Class/Division terminology. Class I = flammable gases/vapors, Class II = combustible dust, Class III = fibers/flyings. Division 1 = hazard present in normal operation; Division 2 = hazard present only under abnormal conditions. The exam mixes these up on purpose.","questions":[{"n":205,"stem":"In the NEC hazardous (classified) location system, a location made hazardous by the presence of flammable gases or vapors is classified as:","choices":["Class I","Class II","Class III","Class IV"],"answer":"A","center":["Circle “flammable gases or vapors.” The Class number is tied to WHAT makes it hazardous.","Article 500 sets it: Class I = gases/vapors, Class II = combustible dust, Class III = ignitible fibers/flyings. There is no Class IV. Gases/vapors = Class I."],"math":null,"more":["Lock in the whole set so the exam can't trip you: Class I = Gases (think gasoline/propane). Class II = Dust (think grain elevator, flour mill). Class III = Fibers (think textile mill, sawmill). Then Division 1 = the hazard is there in NORMAL operation; Division 2 = the hazard appears only under ABNORMAL/fault conditions. A gas station pump island is the classic Class I example."],"ref":"NEC 2023, 500.5 — Classifications of Locations.","id":"P-S8-205"},{"n":206,"stem":"The branch circuit supplying a permanently installed swimming pool pump motor receptacle, and most pool-related receptacles, is required to be protected by:","choices":["A surge protective device","A ground-fault circuit interrupter (GFCI)","An arc-fault circuit interrupter (AFCI)","A double-pole disconnect only"],"answer":"B","center":["Circle “swimming pool” and “protected by.” Water + electricity = shock hazard, so think GFCI, and confirm in Article 680.","Article 680 requires GFCI protection for pool pump motor outlets and pool-area receptacles to protect people from shock. AFCI is for arcing fire hazards in living areas, not pools."],"math":null,"more":null,"ref":"NEC 2023, 680.21 and 680.22 — Swimming Pool Motors and Receptacles (GFCI).","id":"P-S8-206"},{"n":207,"stem":"Emergency systems covered by Article 700 are intended to supply power to designated loads within how many seconds of normal power loss, unless otherwise specified?","choices":["30 seconds","60 seconds","10 seconds","120 seconds"],"answer":"C","center":["Circle “emergency systems” and “seconds.” Article 700 has a specific transfer-time number.","700.12 requires emergency power to be available within 10 seconds of normal supply failure. (Article 701, legally required standby, allows 60 seconds — the exam contrasts those two on purpose.)"],"math":null,"more":["Don't confuse the three systems: Article 700 EMERGENCY (life-safety: exit lights, alarms) = power within 10 seconds. Article 701 LEGALLY REQUIRED STANDBY (heating, communications) = within 60 seconds. Article 702 OPTIONAL STANDBY (convenience, e.g., a home generator) = no required transfer time. The shorter the time, the more critical the load."],"ref":"NEC 2023, 700.12 — General Requirements (10-second rule).","id":"P-S8-207"},{"n":208,"stem":"In a Class I, Division 1 location, the wiring methods generally permitted include:","choices":["Standard nonmetallic-sheathed cable (NM)","Open conductors on insulators","Surface metal raceway","Threaded rigid metal conduit (RMC) or threaded steel intermediate metal conduit (IMC)"],"answer":"D","center":["Circle “Class I, Division 1” — the most hazardous gas location. The wiring method must contain an explosion. Flip to 501.10(A).","501.10(A) permits threaded RMC and threaded steel IMC (and certain MI/MC types) in Class I Div 1, because threaded metal conduit can contain an internal ignition. NM cable, open conductors, and surface raceway are nowhere near rated for that."],"math":null,"more":null,"ref":"NEC 2023, 501.10(A) — Wiring Methods, Class I, Division 1.","id":"P-S8-208"},{"n":209,"stem":"Power-limited fire alarm (PLFA) circuits and their installation are primarily covered in which NEC article?","choices":["Article 760","Article 725","Article 770","Article 800"],"answer":"A","center":["Circle “fire alarm.” Each low-voltage system has its own Chapter 7/8 article — match the topic to the number.","Article 760 is fire alarm systems. 725 is general Class 2/3 and power-limited circuits, 770 is optical fiber, 800 is communications/general. Fire alarm = 760."],"math":null,"more":["Quick map of the low-voltage articles the exam pulls from: 725 = Class 1/2/3 control & signaling circuits; 760 = fire alarm; 770 = optical fiber cable; 800 = general communications/network; (and on the Journeyman exam, NFPA 72 covers fire alarm system design in depth). When a question names the system, the article number usually follows directly."],"ref":"NEC 2023, Article 760 — Fire Alarm Systems.","id":"P-S8-209"},{"stem":"In a Class I, Division 2 location, the hazardous atmosphere is present:","choices":["Continuously under normal conditions","Only under abnormal conditions (such as equipment failure or rupture)","Never","Only outdoors"],"answer":"B","center":["Circle 'Division 2.' Division is about WHEN the hazard is present.","Division 1 = hazard present in normal operation. Division 2 = present only under abnormal/fault conditions (a leak, rupture, failure). Match the division to the frequency of hazard."],"math":null,"more":null,"ref":"NEC 2023, 500.5(B) — Class I Locations.","n":210,"id":"P-S8-210"},{"stem":"Receptacles and cord connectors that provide GFCI protection in a health care facility's patient care areas, and the general bonding of such areas, are addressed in which article?","choices":["Article 590","Article 600","Article 517","Article 700"],"answer":"C","center":["Circle 'health care facility.' Each special occupancy has its own article — hospitals are 517.","Article 517 covers health care facilities. 590 is temporary installations, 600 is signs, 700 is emergency systems. Health care = 517."],"math":null,"more":null,"ref":"NEC 2023, Article 517 — Health Care Facilities.","n":211,"id":"P-S8-211"},{"stem":"For a permanently installed swimming pool, underwater luminaires operating at more than the low-voltage contact limit must be supplied by a branch circuit protected by a:","choices":["Standard breaker only","Time clock","Surge arrester","Ground-fault circuit interrupter (GFCI)"],"answer":"D","center":["Circle 'underwater luminaire' + 'swimming pool.' Article 680.","Wet-niche/underwater pool lights above the low-voltage contact limit require GFCI protection on the supply branch circuit — people are literally in the water."],"math":null,"more":null,"ref":"NEC 2023, 680.23 — Underwater Luminaires.","n":212,"id":"P-S8-212"},{"stem":"Equipment installed in a Class I, Division 1 location must be:","choices":["Listed/identified for the Class I, Division 1 location (e.g., explosionproof)","Standard rated","Painted red","Weatherproof only"],"answer":"A","center":["500/501 — Class I Div 1 demands equipment identified for that location, typically explosionproof."],"math":null,"more":null,"ref":"NEC 2023, 500.8 / 501.","n":213,"id":"P-S8-213"},{"stem":"The depth of the classified area around a gasoline dispenser is defined because vapors:","choices":["Rise","Settle near grade (heavier than air)","Disappear","Are harmless"],"answer":"B","center":["514 — gasoline vapor is heavier than air, so the classified zone hugs the ground."],"math":null,"more":null,"ref":"NEC 2023, Table 514.3(B)(1).","n":214,"id":"P-S8-214"},{"stem":"Bonding of all metal parts and a low-resistance path around a permanently installed pool is called:","choices":["Grounding electrode","Surge protection","Equipotential bonding","Isolation"],"answer":"C","center":["680.26 — equipotential bonding ties pool metal together so there's no voltage difference a swimmer could feel."],"math":null,"more":null,"ref":"NEC 2023, 680.26.","n":215,"id":"P-S8-215"},{"stem":"Temporary wiring for holiday decorative lighting is permitted for a period not to exceed:","choices":["30 days","1 year","180 days","90 days"],"answer":"D","center":["590.3(D) — holiday/decorative temporary lighting allowed up to 90 days."],"math":null,"more":null,"ref":"NEC 2023, 590.3(B).","n":216,"id":"P-S8-216"},{"stem":"Floating docks and piers at marinas require special attention to the electrical datum plane and:","choices":["Leakage current / electric shock drowning protection","Paint color","Sign lighting","HVAC"],"answer":"A","center":["555 — marinas focus on leakage current into water (electric shock drowning) and the datum plane."],"math":null,"more":null,"ref":"NEC 2023, 555.","n":217,"id":"P-S8-217"},{"stem":"A spray booth where flammable finishes are applied is a classified location addressed by Article:","choices":["517","516","518","511"],"answer":"B","center":["Spray application / flammable finishes = Article 516."],"math":null,"more":null,"ref":"NEC 2023, Article 516.","n":218,"id":"P-S8-218"},{"stem":"Places of assembly (100 or more persons) have special requirements found in Article:","choices":["525","520","518","530"],"answer":"C","center":["Assembly occupancies = Article 518. (520 = theaters, 525 = carnivals.)"],"math":null,"more":null,"ref":"NEC 2023, Article 518.","n":219,"id":"P-S8-219"},{"stem":"The equipotential bonding grid around a pool must connect perimeter surfaces extending outward at least:","choices":["1 ft","2 ft","5 ft","3 ft"],"answer":"D","center":["680.26(B)(2) — the equipotential bonding perimeter surface extends about 3 ft around the pool."],"math":null,"more":null,"ref":"NEC 2023, 680.26(B)(2).","n":220,"id":"P-S8-220"},{"stem":"A health care facility's essential electrical system must be divided into the life safety branch, the critical branch, and the:","choices":["Equipment branch","Lighting branch","Sign branch","Outdoor branch"],"answer":"A","center":["517.30 — the essential system = life safety branch, critical branch, and equipment branch."],"math":null,"more":null,"ref":"NEC 2023, 517.30.","n":221,"id":"P-S8-221","audit":["Low: Reference 517.30 not confirmed against 2023 numbering for the three branches."]},{"stem":"In a Class I, Division 2 location, equipment that does not arc during normal operation (like ordinary enclosed motors) is:","choices":["Never allowed","Often permitted because the hazard is present only under abnormal conditions","Required to be explosionproof always","Painted red"],"answer":"B","center":["501 — Div 2 allows more general equipment since the hazard appears only on a fault/leak."],"math":null,"more":null,"ref":"NEC 2023, 501.10(B).","n":222,"id":"P-S8-222"},{"n":223,"stem":"A Class I hazardous location is one made hazardous by the presence of:","choices":["Combustible dust","Ignitible fibers or flyings","Flammable gases or vapors","Standing water"],"answer":"C","center":["Class I = flammable gases/vapors (think fuel, solvents). Class II = combustible dust. Class III = fibers/flyings.","Division 1 means the hazard is present in normal operation; Division 2 only under abnormal conditions."],"math":null,"more":null,"ref":"NEC 2023, 500.5(B).","id":"P-S8-223"},{"n":251,"id":"N-SP-01","domain":"Special Equipment","objective":"Size EVSE overcurrent protection","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Calculation","stem":"An electric vehicle supply equipment (EVSE) unit has a maximum load of 48 A. What is the minimum standard overcurrent device rating for its branch circuit?","choices":["48 A","50 A","60 A","70 A"],"answer":"C","math":["625.41: OCPD sized for continuous duty, not less than 125% of the maximum EVSE load","48 A × 1.25 = 60 A","60 A is a standard size"],"center":["EV charging is treated as continuous. 50 A would be undersized (only 104%)."],"ref":"625.41; 625.40 (individual branch circuit).","navTip":"EV charging = Article 625. Remember '6-2-5 = 1-2-5%'.","status":"Verified","isNew":true},{"n":252,"id":"N-SP-02","domain":"Special Equipment","objective":"Calculate PV maximum circuit current","edition":"NEC 2020 690.8(A)(1); NEC 2023 690.8(A)(1)(a)","difficulty":"Medium","type":"Calculation","stem":"A PV source circuit has a module short-circuit current (Isc) of 10 A. Using the 125% method, what is the circuit's maximum current?","choices":["10.0 A","12.5 A","15.6 A","20.0 A"],"answer":"B","math":["Maximum current = Isc × 125%","10 A × 1.25 = 12.5 A"],"center":["15.6 A (Isc × 1.56) is the conductor ampacity / OCPD sizing figure — that's 125% applied twice (690.8(B) adds another 125% for continuous duty)."],"ref":"690.8(A)(1) (2023: 690.8(A)(1)(a)); 690.8(B).","navTip":"PV is Article 690; the two 125% steps are (A) maximum current, then (B) conductor/OCPD sizing.","status":"Verified","isNew":true},{"n":253,"id":"N-SP-03","domain":"Special Conditions","objective":"Wiring separation for emergency systems","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Code lookup","stem":"Wiring from an emergency source to emergency loads must generally be:","choices":["Kept entirely independent of all other wiring and equipment, except as permitted","Run in the same raceway as normal power for redundancy","Installed only in PVC","Protected by AFCI breakers"],"answer":"A","center":["700.10(B): emergency circuit wiring is kept entirely independent of all other wiring. The listed exceptions (transfer equipment enclosures, exit signs with two sources, etc.) are narrow."],"ref":"700.10(B).","navTip":"Article 700 (emergency) vs 701 (legally required) vs 702 (optional): the separation rule is strict only in 700.","status":"Verified","isNew":true},{"n":254,"id":"N-SP-04","domain":"Special Conditions","objective":"Separate Class 2 circuits from power","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Code lookup","stem":"A Class 2 thermostat cable is to be pulled into a raceway that contains 120-V power conductors. In general, this is:","choices":["Permitted if the Class 2 cable is rated 300 V","Not permitted unless separated by a barrier or another specific allowance applies","Permitted in dwellings only","Permitted if the raceway is metal"],"answer":"B","center":["725.136(A): Class 2 and Class 3 circuits are not placed in the same raceway, cable, or enclosure with power conductors except as specifically permitted (barriers, segregation in enclosures, etc.). Insulation rating alone doesn't make it legal."],"ref":"725.136(A) (2020 and 2023).","navTip":"In the 2023 NEC, Article 725 was split: general rules are in 722, Class 1 moved to 724, Class 2/3 stayed in 725.","status":"Verified","isNew":true},{"n":255,"id":"N-SP-05","domain":"Special Occupancies","objective":"Locate a conduit seal in Class I, Division 1","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Code lookup","stem":"In a Class I, Division 1 location, a conduit seal is required for a conduit entering an enclosure that contains arcing devices. The seal must be installed within what distance of the enclosure?","choices":["6 in.","12 in.","18 in.","36 in."],"answer":"C","center":["501.15(A)(1): seals within 450 mm (18 in.) of the enclosure, and only listed fittings (unions, couplings, etc.) between the seal and the enclosure."],"ref":"501.15(A)(1).","navTip":"Article 501 = Class I wiring. .10 = wiring methods, .15 = sealing.","status":"Verified","isNew":true},{"n":256,"id":"N-SP-06","domain":"Special Occupancies","objective":"Locate the classified area in a major repair garage","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Easy","type":"Code lookup","stem":"In a major repair garage where vehicles using gasoline are repaired (ventilation not used to reduce the area), the floor area is generally classified Class I, Division 2 up to what height above the floor?","choices":["6 in.","18 in.","3 ft","8 ft"],"answer":"B","center":["Gasoline vapor is heavier than air, so the classified area is measured up from the floor: 450 mm (18 in.)."],"ref":"511.3(C) (major repair garages; check the exact subdivision in your edition).","navTip":"Article 511 = repair garages; 514 = fuel dispensing. Both measure the 18-in. zone from the floor.","status":"Verified (subdivision label: confirm on your page)","isNew":true},{"n":257,"id":"N-SP-07","domain":"Special Equipment","objective":"Locate the required pool-area receptacle","edition":"NEC 2020 or 2023 (same rule; numbering noted where it differs)","difficulty":"Medium","type":"Code lookup","stem":"At a dwelling with a permanently installed pool, at least one 125-V, 15- or 20-A receptacle on a general-purpose branch circuit must be located not less than 6 ft and not more than how far from the inside wall of the pool?","choices":["10 ft","15 ft","20 ft","25 ft"],"answer":"C","center":["680.22(A)(3): not less than 1.83 m (6 ft) and not more than 6.0 m (20 ft) from the inside wall, and not more than 2.0 m (6 ft 6 in.) above the floor or grade."],"ref":"680.22(A)(3).","navTip":"680.22 = area lighting, receptacles and equipment around pools. Highlight the three distances in (A).","status":"Verified","isNew":true}]},{"title":"SECTION 9 — COMMUNICATION SYSTEMS","count":"8 of 258 questions","overview":["The smallest section — just a sliver of the real exam — but worth a couple of easy points. It draws from NEC Chapter 8 (Articles 800 general communications, 805 telephone, 820 coax/CATV) and basic low-voltage practice.","Chapter 8 is unique: it stands alone and is NOT subject to the other chapters unless specifically referenced (that's the rule in 800.3). Tab 800.100 (bonding and grounding of communications) and 800.24 (mechanical execution / supporting cables). Most questions here are about separation from power conductors, grounding, and listing of cables."],"tip":"Trap to watch: remember that Chapter 8 is independent. A rule from Chapter 3 (like raceway fill) does NOT automatically apply to communications cabling unless Chapter 8 specifically points to it. The exam may bait you with a Chapter 3 rule on a Chapter 8 question.","questions":[{"n":224,"stem":"Communications circuits and equipment are primarily governed by which chapter of the NEC, which generally stands alone from the requirements of Chapters 1 through 7?","choices":["Chapter 8","Chapter 5","Chapter 3","Chapter 9"],"answer":"A","center":["Circle “communications” and “stands alone.” Only one chapter is described that way.","800.3 establishes that Chapter 8 (Communications Systems) is independent of Chapters 1–7 except where those chapters are specifically referenced. Chapter 9 is tables, not communications."],"math":null,"more":null,"ref":"NEC 2023, 800.3 and Chapter 8 — Communications Systems.","id":"P-S9-224"},{"n":225,"stem":"Communications cables installed in buildings must be listed and, where run in a plenum (air-handling space used for environmental air), be of the type marked:","choices":["CMR (riser)","CMP (plenum)","CMX (limited use)","CM (general purpose)"],"answer":"B","center":["Circle “plenum.” The cable marking letter is matched to the installation environment. The 'P' gives it away.","The listing letters: CMP = Plenum, CMR = Riser, CM = general, CMX = limited use (dwellings/small). In a plenum you need the plenum-rated cable — CMP — because it has low smoke and flame spread in an air space. The 'P' for plenum is your memory hook."],"math":null,"more":["Walk the hierarchy from most-demanding down: CMP (plenum) is the highest fire/smoke rating and may substitute anywhere; CMR (riser) is next, for vertical runs between floors; CM (general) is standard in-building; CMX is limited use. A higher-rated cable can always replace a lower one, never the reverse. 'Plenum' = air space = CMP — that's the most-tested fact in this section."],"ref":"NEC 2023, 800.179 and 800.113 — Listing and Marking of Communications Cables.","id":"P-S9-225"},{"stem":"The primary protector for a communications circuit (such as telephone) where it enters a building is required to be located:","choices":["Anywhere convenient","At least 50 ft inside the building","As close as practicable to the point of entrance","Only outdoors"],"answer":"C","center":["Circle 'primary protector' + 'enters a building.' Article 800/805 placement rule.","The primary protector goes as close as practicable to where the cable enters, so surges and faults are diverted before traveling into the building."],"math":null,"more":null,"ref":"NEC 2023, 805.90 / 800.90 — Primary Protector Location.","n":226,"id":"P-S9-226"},{"stem":"Communications cables and power conductors in the same shaft must generally be separated, and communications cables must not be placed in the same raceway with power conductors unless:","choices":["Always permitted together","Only in dwellings","Only if taped together","Separated by a barrier or the power conductors are limited types as permitted by Chapter 8"],"answer":"D","center":["Circle 'same raceway' + 'power conductors.' Separation rules in Article 800 (800.133).","Comms and power generally can't share a raceway unless separated by a barrier or the power is a permitted low-energy type per Chapter 8. The point is keeping high-energy power away from low-energy signal."],"math":null,"more":null,"ref":"NEC 2023, 800.133 — Separation from Power.","n":227,"id":"P-S9-227"},{"stem":"Optical fiber cables that contain no metallic members and carry no current are covered by which article?","choices":["770","800","820","725"],"answer":"A","center":["Optical fiber = Article 770."],"math":null,"more":null,"ref":"NEC 2023, Article 770.","n":228,"id":"P-S9-228"},{"stem":"Coaxial cable distributing radio frequency signals (CATV) is covered by which article?","choices":["800","820","770","810"],"answer":"B","center":["Coax/CATV = Article 820. (800 = general comms, 810 = antennas, 770 = fiber.)"],"math":null,"more":null,"ref":"NEC 2023, Article 820.","n":229,"id":"P-S9-229"},{"stem":"Communications conductors entering a building must have a listed primary protector when the cable is exposed to:","choices":["Indoor air","Sunlight","Accidental contact with power conductors or lightning (exposed plant)","Cold"],"answer":"C","center":["800.90 — a primary protector is required where comms cable is exposed to power contact or lightning."],"math":null,"more":null,"ref":"NEC 2023, 805.90.","n":230,"id":"P-S9-230"},{"n":231,"stem":"Accessible portions of abandoned communications cable (not terminated and not tagged for future use) must be:","choices":["Left in place","Removed","Re-labeled only","Spliced and capped"],"answer":"B","center":["800.25 requires the accessible parts of abandoned low-voltage/communications cable to be removed — it's a fire-load concern.","If it's tagged for future use it can stay; otherwise, pull it out."],"math":null,"more":null,"ref":"NEC 2023, 800.25.","id":"P-S9-231"}]}];

const EXAM_FULL = [{"title":"SECTION 1 — PROJECT DESIGN & MANAGEMENT","count":"8 of 100 questions","overview":["This section pulls from the NASCLA Contractors Guide to Business, Law and Project Management and the PMBOK Guide. It is NOT code-book material — so do not waste time flipping through your NEC here. The questions cover bidding, contracts, project scheduling, change orders, and basic estimating.","Most guys lose points here by over-thinking. These are common-sense business questions. Read the question, find the choice that a fair, organized contractor would pick, and move on. Keep your NASCLA Business & Law guide tabbed at the chapters on contracts and project management."],"tip":"Trap to watch: answers that sound 'aggressive' (cut corners, skip documentation, verbal-only agreements) are almost always wrong. The Code and the business guide both reward WRITTEN, documented, by-the-book behavior.","questions":[{"stem":"A formal document issued by an owner inviting contractors to submit prices for a defined scope of work is a:","choices":["Request for proposal/bid (RFP/ITB)","Change order","Punch list","Lien waiver"],"answer":"A","center":["An invitation to price defined work = a request for proposal / invitation to bid."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Bidding.","n":1,"id":"A-S1-1"},{"stem":"In a fixed-price (lump-sum) contract, the risk of cost overruns generally falls on the:","choices":["Owner","Contractor","Architect","Inspector"],"answer":"B","center":["Lump-sum = the contractor commits to a price, so overruns are the contractor's risk.","Cost-plus contracts shift that risk back to the owner. In fixed-price, you eat the overrun."],"math":null,"more":["Contract type drives risk: LUMP-SUM (contractor bears overrun risk, owner has price certainty), COST-PLUS (owner bears overrun risk, contractor is reimbursed costs + fee), and UNIT-PRICE (risk shared per-unit). Knowing who carries the risk in each is a common exam theme."],"ref":"NASCLA Business, Law & PM — Contract Types.","n":2,"id":"A-S1-2"},{"stem":"Retainage in a construction contract refers to:","choices":["A bonus paid early","The contractor's profit","A percentage of payment withheld until work is satisfactorily completed","A type of insurance"],"answer":"C","center":["Retainage = money held back (often 5–10%) to ensure the job is finished right before final payment."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Payments.","n":3,"id":"A-S1-3"},{"stem":"Workers' compensation insurance primarily protects:","choices":["The owner's property","Equipment from theft","The general public","Employees injured on the job"],"answer":"D","center":["Workers' comp covers employees hurt at work — medical and lost wages."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Insurance.","n":4,"id":"A-S1-4"},{"stem":"A performance bond guarantees that:","choices":["The contractor will complete the project per the contract","Materials are tax-free","Workers are paid bonuses","The owner gets a discount"],"answer":"A","center":["Performance bond = guarantee of completion per contract terms. (A payment bond guarantees subs/suppliers get paid.)"],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Bonds.","n":5,"id":"A-S1-5"},{"stem":"Estimating the quantity of conduit, wire, boxes, and devices from the plans is called:","choices":["Scheduling","A material takeoff (quantity survey)","Invoicing","Bonding"],"answer":"B","center":["Counting materials off the drawings = material takeoff / quantity survey."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Estimating.","n":6,"id":"A-S1-6"},{"stem":"To improve cash flow during a project, a contractor commonly submits periodic:","choices":["Lien waivers only","Change orders only","Progress (partial) payment applications","Final invoices only"],"answer":"C","center":["Progress billing — periodic payment applications based on work completed — keeps cash flowing during the job."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Project Finance.","n":7,"id":"A-S1-7"},{"stem":"The document that records final corrections and incomplete items to be fixed before project closeout is the:","choices":["Submittal","Bid bond","Daily log","Punch list"],"answer":"D","center":["The end-of-job fix list = punch list."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Closeout.","n":8,"id":"A-S1-8"}]},{"title":"SECTION 2 — SAFETY (OSHA & NFPA 70E)","count":"9 of 100 questions","overview":["Safety questions come from OSHA 29 CFR 1926 (construction), 29 CFR 1910 (general industry), and NFPA 70E (electrical safety in the workplace). These are about keeping people alive, so the “safest” answer is usually correct.","Tab your NFPA 70E at Article 110 (general work practices), Article 120 (establishing an electrically safe work condition), and Article 130 (energized work / PPE). Tab OSHA 1926 Subpart K (electrical). Most questions are a direct lookup of a number — an approach distance, a lockout step, or a PPE category."],"tip":"Trap to watch: when one answer says 'de-energize and lock out' and another says 'work it hot carefully,' the de-energize answer wins unless the question specifically says de-energizing creates a greater hazard. NFPA 70E's whole philosophy is: establish an electrically safe work condition first.","questions":[{"stem":"An arc flash boundary is the distance at which the incident energy equals:","choices":["1.2 cal/cm² (the onset of a second-degree burn)","0 cal/cm²","40 cal/cm²","100 cal/cm²"],"answer":"A","center":["NFPA 70E — the arc flash boundary is where incident energy = 1.2 cal/cm², the second-degree burn threshold.","Inside that boundary, exposed skin can be burned by an arc flash, so PPE is required."],"math":null,"more":null,"ref":"NFPA 70E 2024, 130.5 — Arc Flash Boundary.","n":9,"id":"A-S2-9"},{"stem":"Before beginning work, OSHA and NFPA 70E require that energized electrical conductors be placed in an electrically safe work condition unless:","choices":["The worker is in a hurry","De-energizing introduces additional or increased hazards or is infeasible","The voltage is under 120 V","A supervisor allows it verbally"],"answer":"B","center":["The only acceptable reasons to work it hot: de-energizing creates a greater hazard or is truly infeasible — and then with an energized work permit.","'In a hurry' and 'boss said OK' are never valid. The bar is genuine added hazard or infeasibility."],"math":null,"more":null,"ref":"NFPA 70E 2024, 130.2; OSHA 1910.333.","n":10,"id":"A-S2-10"},{"stem":"The proper fire extinguisher class for an energized electrical fire is:","choices":["Class A","Class B","Class C","Class D"],"answer":"C","center":["Class C = energized electrical equipment. (A = ordinary combustibles, B = flammable liquids, D = metals.)","The 'C' for current/electrical is the memory hook."],"math":null,"more":null,"ref":"OSHA / NFPA 10 — Extinguisher Classes.","n":11,"id":"A-S2-11"},{"stem":"When using a portable ladder near electrical work, the ladder should be made of:","choices":["Aluminum for conductivity","Any metal","Steel","A non-conductive material such as fiberglass"],"answer":"D","center":["Near electrical hazards, use a non-conductive (fiberglass) ladder. Metal ladders conduct and can kill.","OSHA prohibits conductive ladders where the worker could contact energized parts."],"math":null,"more":null,"ref":"OSHA 29 CFR 1926.1053 / 1910.333.","n":12,"id":"A-S2-12"},{"stem":"Personal protective equipment for arc-flash protection is selected based on the:","choices":["Incident energy analysis or the PPE category method","Worker's preference","Color of the equipment","Time of day"],"answer":"A","center":["NFPA 70E gives two ways to pick arc-flash PPE: an incident-energy analysis (cal/cm²) or the PPE category (table) method.","Either method, but it's based on the calculated/looked-up energy, never preference."],"math":null,"more":null,"ref":"NFPA 70E 2024, 130.5(G) — PPE Selection.","n":13,"id":"A-S2-13"},{"stem":"OSHA's general requirement that employers furnish a workplace free from recognized hazards is known as the:","choices":["Hierarchy of Controls","General Duty Clause","Lockout rule","Hazard Communication Standard"],"answer":"B","center":["The General Duty Clause (OSH Act 5(a)(1)) is the catch-all 'recognized hazards' requirement."],"math":null,"more":null,"ref":"OSH Act, Section 5(a)(1) — General Duty Clause.","n":14,"id":"A-S2-14"},{"stem":"When working on or near exposed energized parts, the use of a barricade or attendant is intended to:","choices":["Speed up the work","Improve lighting","Warn and protect others from the electrical hazard","Reduce noise"],"answer":"C","center":["Barricades/attendants keep unqualified people out of the hazard zone — a protection measure, not a productivity tool."],"math":null,"more":null,"ref":"NFPA 70E 2024, 130.7(E).","n":15,"id":"A-S2-15"},{"stem":"A confined space such as a vault or manhole with limited entry/exit and the potential for hazardous atmosphere requires:","choices":["No special procedures","A second electrician only","Only a flashlight","A permit-required confined space program where applicable"],"answer":"D","center":["OSHA 1910.146 — confined spaces with atmospheric or other serious hazards are permit-required, with testing, ventilation, and rescue provisions."],"math":null,"more":null,"ref":"OSHA 29 CFR 1910.146 — Permit-Required Confined Spaces.","n":16,"id":"A-S2-16"},{"stem":"The first action upon discovering a coworker in contact with an energized conductor is to:","choices":["De-energize the source if possible without endangering yourself","Grab them to pull them away","Pour water on them","Call later"],"answer":"A","center":["Never touch a victim still in contact — you become the next victim. Kill the power first if you safely can.","De-energize (or use a non-conductive means to separate) before touching. Grabbing them electrocutes you too."],"math":null,"more":null,"ref":"OSHA / NFPA 70E — Emergency Response.","n":17,"id":"A-S2-17"}]},{"title":"SECTION 3 — ELECTRICAL THEORY & PRINCIPLES","count":"11 of 100 questions","overview":["Theory questions come from Mike Holt's Understanding Electrical Theory and Ugly's Electrical References. This is your math and fundamentals section: Ohm's Law, the power wheel, series vs. parallel circuits, voltage drop, and AC basics.","Your single most valuable open-book page is the Ohm's Law / Power wheel in Ugly's. Tab it. Almost every calculation in this section comes off that wheel: E = I × R, P = E × I, and the combinations. If you can find that page in five seconds, you can solve most of these without memorizing a thing."],"tip":"Trap to watch: single-phase vs. three-phase. Three-phase power formulas add a √3 (1.732) factor. If the question says 'three-phase,' your Ugly's three-phase formula page is the one you want — not the single-phase wheel.","questions":[{"stem":"Ohm's Law states that current equals voltage divided by resistance. A 24-volt control circuit has 8 ohms of resistance. The current is:","choices":["3 amperes","192 amperes","0.33 amperes","32 amperes"],"answer":"A","center":["I = E ÷ R. Given E and R, want I."],"math":["I = E ÷ R","I = 24 V ÷ 8 Ω","I = 3 amperes"],"more":null,"ref":"Ugly's — Ohm's Law.","n":18,"id":"A-S3-18"},{"stem":"The unit of electrical resistance is the:","choices":["Volt","Ohm","Ampere","Watt"],"answer":"B","center":["Basic units: volt = pressure, ampere = current, ohm = resistance, watt = power."],"math":null,"more":null,"ref":"Ugly's — Electrical Units.","n":19,"id":"A-S3-19"},{"stem":"A 5 hp motor draws power. Given 1 hp ≈ 746 watts, the approximate output power of a 5 hp motor is:","choices":["746 watts","149 watts","3,730 watts","5,000 watts"],"answer":"C","center":["Circle '5 hp' and '746 watts per hp.' Multiply."],"math":["P = 5 hp × 746 W/hp","P = 3,730 watts"],"more":["That's the OUTPUT (shaft) power. Input electrical power is higher because of motor efficiency — e.g., at 90% efficiency the motor draws 3,730 ÷ 0.90 ≈ 4,144 W from the line. Efficiency and power factor both come between input watts and output horsepower."],"ref":"Ugly's — Horsepower / Power.","n":20,"id":"A-S3-20"},{"stem":"In a series circuit, the current is:","choices":["Different at every point","Always 120 A","Zero","The same throughout the circuit"],"answer":"D","center":["Series rule: ONE path, so current is identical everywhere. Voltage divides; current stays the same."],"math":null,"more":["Flip side for parallel: in a parallel circuit the VOLTAGE is the same across each branch and the CURRENT divides. Series = same current, divided voltage. Parallel = same voltage, divided current. That pairing answers a lot of theory questions."],"ref":"Mike Holt — Series Circuits.","n":21,"id":"A-S3-21"},{"stem":"Doubling the voltage across a fixed resistance will cause the current to:","choices":["Double","Stay the same","Halve","Drop to zero"],"answer":"A","center":["I = E ÷ R. With R fixed, current is directly proportional to voltage. Double E → double I."],"math":null,"more":null,"ref":"Ugly's — Ohm's Law relationships.","n":22,"id":"A-S3-22"},{"stem":"Apparent power in an AC circuit is measured in:","choices":["Watts","Volt-amperes (VA)","Ohms","Henries"],"answer":"B","center":["Real power = watts. Apparent power = volt-amperes (VA). Reactive power = VAR."],"math":null,"more":["The power triangle: real power (W) and reactive power (VAR) are the legs; apparent power (VA) is the hypotenuse. Power factor = W ÷ VA = cosine of the angle between them. Transformers and services are sized in VA/kVA because they must carry the apparent power, not just the watts."],"ref":"Mike Holt — AC Power.","n":23,"id":"A-S3-23"},{"stem":"The total resistance of a 6-ohm and a 3-ohm resistor in parallel is:","choices":["9 ohms","4.5 ohms","2 ohms","18 ohms"],"answer":"C","center":["Parallel of two: product over sum. (6×3)÷(6+3)."],"math":["Rt = (R1 × R2) ÷ (R1 + R2)","Rt = (6 × 3) ÷ (6 + 3) = 18 ÷ 9","Rt = 2 ohms"],"more":["Sanity check: a parallel total is always smaller than the smallest resistor. 2 Ω < 3 Ω, so it passes. If you'd gotten 9 Ω (which is just adding them — the series mistake), the answer being bigger than both resistors tells you instantly it's wrong."],"ref":"Ugly's — Parallel Resistance.","n":24,"id":"A-S3-24"},{"stem":"Inductance, which opposes a change in current, is measured in:","choices":["Farads","Coulombs","Ohms","Henries"],"answer":"D","center":["Inductance = henries (H). Capacitance = farads (F). Charge = coulombs."],"math":null,"more":null,"ref":"Mike Holt — Inductance.","n":25,"id":"A-S3-25"},{"stem":"A wattmeter reads 2,400 watts on a 120-volt circuit. The current drawn is:","choices":["20 amperes","0.05 amperes","288,000 amperes","12 amperes"],"answer":"A","center":["I = P ÷ E. 2400 ÷ 120."],"math":["I = P ÷ E","I = 2,400 W ÷ 120 V","I = 20 amperes"],"more":null,"ref":"Ugly's — Power Wheel.","n":26,"id":"A-S3-26"},{"stem":"Conductor resistance generally increases as the conductor's:","choices":["Cross-sectional area increases","Length increases","Temperature decreases","Diameter increases"],"answer":"B","center":["Resistance rises with LENGTH and falls with cross-section. Longer wire = more resistance.","More length = more resistance (and more voltage drop). Bigger wire = less."],"math":null,"more":["Full relationship: R = ρ × (L ÷ A). Resistance is proportional to length (L) and inversely proportional to area, with ρ the material's resistivity. This is exactly why long runs need upsized conductors to control voltage drop — you're fighting the length term."],"ref":"Mike Holt — Conductor Resistance.","n":27,"id":"A-S3-27"},{"stem":"The frequency of standard AC power in the United States is:","choices":["50 Hz","100 Hz","60 Hz","120 Hz"],"answer":"C","center":["U.S. line frequency is 60 Hz (Europe is 50 Hz)."],"math":null,"more":null,"ref":"Mike Holt — AC Fundamentals.","n":28,"id":"A-S3-28"}]},{"title":"SECTION 4 — GENERAL CODE REQUIREMENTS","count":"17 of 100 questions","overview":["This is one of the two heaviest sections on the real exam, so we weighted it heavily here too. It draws from NEC Chapter 1 (Articles 90, 100, 110) — definitions, general installation rules, working space, and wiring methods basics.","Article 100 (Definitions) and 110.26 (Working Space) are the two pages you will hit most. Tab them. A huge number of code questions are really just definition lookups in disguise — if a question asks 'which of these is defined as…', go straight to Article 100. For working clearances, Table 110.26(A)(1) is your friend; learn to read its three Conditions."],"tip":"Trap to watch: 'voltage to ground' vs. 'voltage between conductors.' The working-space table is organized by voltage TO GROUND. Read which one the question gives you before you pick a row in the table.","questions":[{"stem":"The NEC is primarily intended to be a standard for the practical safeguarding of persons and property from hazards arising from the use of:","choices":["Electricity","Plumbing systems","Natural gas","Structural steel"],"answer":"A","center":["Article 90 opens the whole book. The Code's purpose is the safe use of electricity."],"math":null,"more":null,"ref":"NEC 2023, 90.1 — Purpose.","n":29,"id":"A-S4-29"},{"stem":"Conductor ampacities for general wiring (sizes, insulations, and the 60/75/90°C columns) are found in which NEC table?","choices":["Table 310.16","Table 250.122","Table 220.55","Table 110.26(A)(1)"],"answer":"A","center":["Table 310.16 is THE ampacity table for conductors rated 0–2000 V in raceway/cable or earth (not free air).","Table 250.122 sizes equipment grounds; 220.55 is range demand; 110.26 is working space. The ampacity table is 310.16."],"math":null,"more":["For conductors in free air you'd use Table 310.17 instead, and there are separate tables for higher temperatures. But the everyday building-wire ampacity table — the one you'll flip to constantly — is 310.16, read at the column matching your termination temperature (110.14(C))."],"ref":"NEC 2023, Table 310.16.","n":30,"id":"A-S4-30"},{"stem":"Electrical equipment must be installed in a neat and workmanlike manner. This general requirement is found in:","choices":["300.15","240.4","110.12","408.3"],"answer":"C","center":["'Neat and workmanlike' is the memorable phrase. It lives in 110.12, Mechanical Execution of Work."],"math":null,"more":null,"ref":"NEC 2023, 110.12 — Mechanical Execution of Work.","n":31,"id":"A-S4-31"},{"stem":"The minimum depth of working space for equipment rated 0–150 volts to ground under Condition 2 is:","choices":["4.5 ft","3.5 ft","4 ft","3 ft"],"answer":"D","center":["Table 110.26(D)(1): for 0–150 V, all three Conditions are 3 ft. Condition 2 is still 3 ft.","The depth only starts increasing at higher voltage ranges. At 0–150 V it's a flat 3 ft across the board."],"math":null,"more":["Condition 2 means exposed live parts on one side and a grounded surface (like a concrete wall or enclosure) on the other. The grounded surface raises the shock risk, so at higher voltages Condition 2 demands more depth — but at 0–150 V it stays 3 ft."],"ref":"NEC 2023, Table 110.26(A)(1).","n":32,"id":"A-S4-32"},{"stem":"Conductors must generally be insulated. One location where bare conductors are commonly permitted is:","choices":["As a grounding electrode conductor or bonding jumper where permitted","Inside a wall cavity","In a kitchen","Behind a panelboard cover"],"answer":"A","center":["The exception to 'conductors shall be insulated' is grounding/bonding where bare is specifically allowed."],"math":null,"more":null,"ref":"NEC 2023, 310.3(A) / 250.62.","n":33,"id":"A-S4-33"},{"stem":"The ampacity correction factor must be applied when conductors are installed in an ambient temperature:","choices":["Equal to 30°C (86°F)","Other than 30°C (86°F)","Below freezing only","Above 100°C only"],"answer":"B","center":["Table 310.16 is built on a 30°C ambient. Any ambient OTHER than 30°C triggers a correction factor.","Hotter than 30°C derates (less ampacity); colder gives a small bump. Either way you correct when you're off 30°C."],"math":null,"more":null,"ref":"NEC 2023, 310.15(B)(1) — Temperature Correction.","n":34,"id":"A-S4-34"},{"stem":"Where 4 to 6 current-carrying conductors are bundled in a raceway, the adjustment (derating) factor applied to their ampacity is:","choices":["50%","70%","80%","100%"],"answer":"C","center":["Circle '4 to 6 conductors.' Table 310.15(A)(1) sets the adjustment.","4–6 current-carrying conductors = 80%. (7–9 = 70%, 10–20 = 50%.)"],"math":null,"more":["Why derate for fill: more current-carrying conductors crammed together means more heat with nowhere to go, so each must be downrated. Note 'current-carrying' — a grounded neutral that only carries unbalanced current and the equipment ground generally don't count toward the number."],"ref":"NEC 2023, Table 310.15(C)(1) — Adjustment Factors.","n":35,"id":"A-S4-35"},{"stem":"A 'dwelling unit' is defined in Article 100 as a single unit providing complete and independent living facilities for one or more persons, including provisions for living, sleeping, cooking, and:","choices":["Parking","Storage","Laundry","Sanitation"],"answer":"D","center":["Definition lookup. The four provisions are living, sleeping, cooking, and sanitation."],"math":null,"more":null,"ref":"NEC 2023, Article 100 — Dwelling Unit.","n":36,"id":"A-S4-36"},{"stem":"300.11 says raceways must be securely fastened in place. Where do you find the specific securing and support distances for EMT?","choices":["358.30","300.11(B)","314.23","110.13(A)"],"answer":"A","center":["300.11 is the general 'secure it' rule. The numbers (within 3 ft of each box or fitting, every 10 ft) live in the EMT article, 358.30. Every raceway article uses the same pattern: .30 = securing and supporting."],"math":null,"more":null,"ref":"NEC 2023, 300.11 and individual raceway .30 sections.","n":37,"id":"A-S4-37","audit":["Medium: Keyed answer 'Per the specific raceway article' is a non-answer; it teaches nothing and is easy to spot."]},{"stem":"The grounded conductor of a circuit is more commonly known as the:","choices":["Hot conductor","Neutral conductor","Equipment ground","Bonding jumper"],"answer":"B","center":["Definition trap. 'Grounded conductor' = the neutral (white/gray). Don't confuse with 'grounding' (the equipment ground)."],"math":null,"more":["Grounded (neutral) carries current back to the source and is white/gray. Grounding (EGC) carries fault current only and is green/bare. Two words apart, totally different jobs — the single most common terminology trap on the exam."],"ref":"NEC 2023, Article 100 — Conductor, Grounded.","n":38,"id":"A-S4-38"},{"stem":"Where conductors must be protected against physical damage, an approved means listed in 300.4 includes installation in:","choices":["Open air only","Wood molding only","Rigid metal conduit, IMC, EMT, or other approved means","Free air with no protection"],"answer":"C","center":["300.4 is about protecting conductors from physical damage. Metal raceways are the classic approved means."],"math":null,"more":null,"ref":"NEC 2023, 300.4 — Protection Against Physical Damage.","n":39,"id":"A-S4-39"},{"stem":"In a dwelling unit, the voltage between conductors supplying luminaires and standard cord-and-plug receptacle loads must not exceed:","choices":["120 volts, nominal","208 volts, nominal","240 volts, nominal","277 volts, nominal"],"answer":"A","center":["210.6(A) — the dwelling occupancy limit is 120 V nominal BETWEEN CONDUCTORS for luminaires and ordinary cord-and-plug loads.","Don't confuse this with the 210.6(B) general 150 V-to-ground limit. For dwelling lampholders/receptacles the answer is 120 V nominal between conductors."],"math":null,"more":["210.6 layers up: dwellings/guest rooms cap luminaires and small cord-and-plug loads at 120 V nominal between conductors; allows up to 120 V to ground broadly; higher voltages (277 V to ground, 480 V, etc.) are permitted only for specific loads in and. The dwelling lampholder/receptacle question is the 120 V nominal answer."],"ref":"NEC 2023, 210.6(A).","n":40,"id":"A-S4-40"},{"stem":"Equipment intended to interrupt current at fault levels must have an interrupting rating, at nominal circuit voltage, not less than:","choices":["The fault current available at the line terminals of the equipment","The nominal voltage","The full-load amps","Twice the breaker size"],"answer":"A","center":["110.9 — interrupting rating. Devices must be able to safely interrupt the available fault current at their terminals."],"math":null,"more":["This is the AIC (ampere interrupting capacity) concept. A breaker rated to interrupt 10,000 A installed where 22,000 A is available can explode trying to clear a fault. The available fault current is calculated from the utility transformer; the device's interrupting rating must meet or beat it."],"ref":"NEC 2023, 110.9 — Interrupting Rating.","n":41,"id":"A-S4-41","audit":["High: Keyed answer says 'nominal circuit current'; 110.9 requires an interrupting rating at nominal voltage not less than the current available at the line terminals (available fault current), not load current."]},{"stem":"Flash protection and the marking of equipment to warn qualified persons of arc-flash hazards relates most directly to which safety document referenced alongside the NEC?","choices":["NFPA 13","NFPA 70E","ASHRAE 90.1","PMBOK"],"answer":"B","center":["Arc-flash work practices live in NFPA 70E, the electrical safety in the workplace standard."],"math":null,"more":null,"ref":"NFPA 70E 2024; NEC 110.16.","n":42,"id":"A-S4-42"},{"stem":"Conductors of circuits rated over 1000 volts and those rated 1000 volts or less generally must not occupy the same:","choices":["Building","Job site","Enclosure, cable, or raceway, unless specifically permitted","Conduit rack"],"answer":"C","center":["300.3(B) / 490 — separation of higher-voltage and lower-voltage conductors. They can't share an enclosure unless a specific permission applies."],"math":null,"more":null,"ref":"NEC 2023, 300.3(C) — Mixed Voltage Conductors.","n":43,"id":"A-S4-43"},{"stem":"Markings required on electrical equipment, such as the manufacturer's name and ratings, must be:","choices":["Removable","Hidden from view","In metric only","Durable enough to withstand the environment involved"],"answer":"D","center":["110.21 — markings must be durable for the environment. A label that washes off in a wet location fails the rule."],"math":null,"more":null,"ref":"NEC 2023, 110.21 — Marking.","n":44,"id":"A-S4-44"},{"stem":"The authority having jurisdiction (AHJ) is the entity responsible for:","choices":["Enforcing the Code and approving equipment/installations","Manufacturing equipment","Selling permits only","Designing the system"],"answer":"A","center":["Definition. The AHJ enforces the Code and approves — typically the inspector or inspection department."],"math":null,"more":null,"ref":"NEC 2023, Article 100 — Authority Having Jurisdiction.","n":45,"id":"A-S4-45"}]},{"title":"SECTION 5 — WIRING & PROTECTION","count":"17 of 100 questions","overview":["The other heaviest section — weighted hard here on purpose. This is NEC Chapter 2: branch circuits (210), feeders (215), services (230), overcurrent protection (240), and grounding & bonding (250). This is where the exam lives, and where most points are won or lost.","Keep four tabs ready and you'll fly: 210 (branch circuits & GFCI/AFCI), 240 (overcurrent + the small-conductor rule in 240.4(D)), 250 (grounding), and Table 310.16 (ampacity). Most questions are a lookup, not a memory test. Your job is to know which tab to flip to, fast."],"tip":"Trap words that change the answer: 'continuous load' (multiply by 125%), 'copper vs. aluminum' (different ampacity columns), 'dwelling vs. other than dwelling' (different GFCI/receptacle rules), and 'overcurrent device' vs. 'conductor ampacity' (the small-conductor rule caps the breaker, not the wire's listed ampacity).","questions":[{"stem":"A single receptacle installed on an individual branch circuit must have an ampere rating not less than:","choices":["The rating of the branch circuit","10 amperes","Half the breaker rating","Any rating is acceptable"],"answer":"A","center":["210.21(B)(1): one receptacle on its own (individual) circuit must be rated at least the circuit rating. A 15 A receptacle on a 20 A individual circuit is a violation.","This is the SINGLE-receptacle-on-an-individual-circuit rule — different from the multi-outlet table 210.21(B)(3)."],"math":null,"more":["The distinction the exam tests: a SINGLE receptacle alone on a circuit must match the circuit (210.21(B)(1)). But where TWO OR MORE receptacles share a circuit, 210.21(B)(3) lets a 15 A receptacle ride on a 20 A circuit. Read whether it's one receptacle or several."],"ref":"NEC 2023, 210.21(B)(1).","n":46,"id":"A-S5-46"},{"stem":"AFCI protection is required for 120-volt, 15- and 20-ampere branch circuits supplying outlets in dwelling-unit:","choices":["Bathrooms","Kitchens, bedrooms, living rooms, and similar areas","Garages only","Outdoor areas only"],"answer":"B","center":["210.12 — AFCI dwelling areas. The list is the 'living space' rooms: kitchens, bedrooms, living rooms, dens, halls, closets, etc.","Bathrooms, garages, and outdoors are GFCI territory (210.8), not the AFCI list. Match room to rule."],"math":null,"more":["The 2023 list for AFCI is broad: kitchens, family rooms, dining, living, parlors, libraries, dens, bedrooms, sunrooms, rec rooms, closets, hallways, laundry, and similar. Think 'finished living areas.' GFCI covers the wet/grounded spots. A few spots (like a dwelling kitchen) need BOTH."],"ref":"NEC 2023, 210.12(A).","n":47,"id":"A-S5-47"},{"stem":"The demand factor concept allows a service or feeder to be sized smaller than the connected load because:","choices":["Loads are never used","The utility requires it","Not all loads operate at full value simultaneously","Wire is expensive"],"answer":"C","center":["Article 220 demand factors. The principle: not everything runs at once, so you can apply a demand factor."],"math":null,"more":["Example: a house has dozens of receptacles and several appliances, but you never run them all at max at the same instant. Article 220 lets you take the general lighting load at 100% for the first 3000 VA then 35% for the next chunk, etc. That's the demand factor at work — it sizes the service to real-world use, not nameplate totals."],"ref":"NEC 2023, Article 220 — Demand Factors.","n":48,"id":"A-S5-48"},{"stem":"A multiwire branch circuit shares a single grounded (neutral) conductor among the ungrounded conductors. It must be provided with a means to:","choices":["Increase voltage","Bypass the neutral","Reduce amperage","Simultaneously disconnect all ungrounded conductors at the point of supply"],"answer":"D","center":["210.4 — multiwire branch circuits require a means to disconnect all hots simultaneously (handle ties or a common-trip breaker).","If you could open one hot but not the other, the shared neutral could still be energized while someone works on it. Simultaneous disconnect protects the worker."],"math":null,"more":["The shared-neutral danger: on a properly wired MWBC the neutral only carries the unbalanced (difference) current. But lose the neutral connection and the two 120 V legs become a 240 V series circuit through your loads — frying equipment. That's why neutral continuity and simultaneous disconnect both matter."],"ref":"NEC 2023, 210.4 — Multiwire Branch Circuits.","n":49,"id":"A-S5-49"},{"stem":"Overcurrent devices must be readily accessible and installed so the center of the grip of the operating handle, at its highest position, is not more than:","choices":["6 ft 7 in. above the floor or working platform","5 ft above the floor","7 ft above the floor","8 ft above the floor"],"answer":"A","center":["240.24(B) — overcurrent device height. Max handle height is 6 ft 7 in.","You have to be able to reach the breaker to trip it. 6 ft 7 in. is the magic number."],"math":null,"more":null,"ref":"NEC 2023, 240.24(A).","n":50,"id":"A-S5-50"},{"stem":"The grounded service conductor (neutral) brought to the service must be sized not smaller than required to carry the maximum unbalanced load, and not smaller than the:","choices":["Largest motor","Size required by Table 250.102(C)(1)","Smallest branch circuit","Equipment ground"],"answer":"B","center":["220.61 sizes the neutral for the maximum unbalanced load, but 250.24(C)(1) also sets a floor: the grounded service conductor can't be smaller than Table 250.102(C)(1) requires, because it is the fault-current return path to the source.","Older study material says Table 250.66 — that was the pre-2017 rule. For 2020 and 2023 it is Table 250.102(C)(1)."],"math":null,"more":null,"ref":"NEC 2020/2023, 250.24(C)(1) and Table 250.102(C)(1); 220.61.","n":51,"id":"A-S5-51","audit":["High: Keyed answer cites Table 250.66 as the minimum size for the service grounded conductor. Since the 2017 NEC, 250.24(C)(1) points to Table 250.102(C)(1)."]},{"stem":"Tap conductors supplied under the 10-foot tap rule must have an ampacity not less than:","choices":["Always 100 A","10% of the feeder","The combined loads served and not less than the rating of the device supplied","The service rating"],"answer":"C","center":["240.21(B)(1) — the 10-ft tap rule. The tap must carry its load and feed the device it supplies, with length ≤ 10 ft and other limits.","Short taps are allowed without their own overcurrent device at the tap point, but they must be sized for the load and protected by enclosure/length limits."],"math":null,"more":["The tap rules (10-ft, 25-ft, etc.) are a favorite exam topic. Key 10-ft conditions: tap ≤ 10 ft, ampacity ≥ the load and the device it supplies, doesn't extend beyond the enclosure/switchboard, and is protected by being enclosed. The 25-ft rule has different ratios (tap ampacity ≥ 1/3 of the feeder OCPD). Know which length you're given."],"ref":"NEC 2023, 240.21(B)(1) — Taps.","n":52,"id":"A-S5-52"},{"stem":"A receptacle installed for a specific appliance, such as a dishwasher within a dedicated space, on an individual branch circuit is an example of a(n):","choices":["General-purpose circuit","Feeder","Multiwire circuit","Individual branch circuit"],"answer":"D","center":["Definition. One circuit, one piece of utilization equipment = individual branch circuit."],"math":null,"more":null,"ref":"NEC 2023, Article 100 — Branch Circuit, Individual.","n":53,"id":"A-S5-53"},{"stem":"Where a grounding electrode conductor is connected to a rod, pipe, or plate electrode, that portion of the GEC that is the sole connection need not be larger than:","choices":["6 AWG copper","4 AWG copper","8 AWG copper","2 AWG copper"],"answer":"A","center":["250.66(B) — the GEC to a rod/pipe/plate electrode need not exceed 6 AWG copper.","Ground rods can't dissipate enough current to justify a huge conductor, so the Code caps the required GEC to a rod at 6 AWG Cu."],"math":null,"more":["Similar caps: GEC to a concrete-encased electrode (Ufer) need not exceed 4 AWG copper (250.66(A)); GEC to a ground ring need not exceed the ring conductor size (250.66(C)). The full Table 250.66 sizes the main GEC by the service conductor size, but these electrode-specific caps override it downward."],"ref":"NEC 2023, 250.66(A).","n":54,"id":"A-S5-54"},{"stem":"The minimum size copper conductor generally permitted for branch circuits supplying power (not fixture wires or special cases) is:","choices":["18 AWG","14 AWG","16 AWG","12 AWG"],"answer":"B","center":["210.5 / 310 — the smallest standard branch-circuit power conductor is 14 AWG copper (protected at 15 A).","Smaller sizes (16, 18 AWG) are for fixture wires and specific listed cases, not general branch circuits."],"math":null,"more":null,"ref":"NEC 2023, Table 310.16 / 240.4(D).","n":55,"id":"A-S5-55"},{"stem":"Ground-fault protection of equipment (GFPE) is required for solidly grounded wye services of more than 150 volts to ground but not exceeding 1000 V phase-to-phase, for service disconnects rated:","choices":["100 A or more","400 A or more","1000 A or more","2000 A or more"],"answer":"C","center":["230.95 — GFPE threshold. Circle '1000 amperes or more' service disconnect on those wye systems (like 480Y/277).","Big services on high-leg-to-ground wye systems need ground-fault protection of EQUIPMENT at 1000 A and up. Don't confuse GFPE (equipment, 1000 A) with GFCI (personnel, milliamps)."],"math":null,"more":["GFPE protects equipment from burning down during a sustained arcing ground fault that's too low to trip the main breaker quickly but high enough to cause massive damage. It's set in the hundreds-to-1200 A range, totally different from the 4–6 mA GFCI that protects people. The exam loves to mix these two up."],"ref":"NEC 2023, 230.95 — Ground-Fault Protection of Equipment.","n":56,"id":"A-S5-56"},{"stem":"Conductors for general wiring must be of a type listed in the Code. The two most common conductor metals recognized are:","choices":["Steel and iron","Tin and lead","Silver and gold","Copper and aluminum (including copper-clad aluminum)"],"answer":"D","center":["310 — recognized conductor materials are copper and aluminum/copper-clad aluminum."],"math":null,"more":null,"ref":"NEC 2023, 310.3 — Conductor Materials.","n":57,"id":"A-S5-57"},{"stem":"When applying both ambient temperature correction and conductor bundling adjustment factors, the two factors are:","choices":["Multiplied together and applied to the table ampacity","Used separately, pick the worst","Added together","Ignored above 100 A"],"answer":"A","center":["310.15 — correction (ambient) and adjustment (fill) factors are MULTIPLIED together.","If ambient correction is 0.88 and fill adjustment is 0.80, you apply 0.88 × 0.80 = 0.704 to the 90°C ampacity."],"math":["Adjusted ampacity = Table ampacity × (temp correction) × (fill adjustment)"],"more":["Start from the 90°C column for the math (if your insulation is 90°C-rated like THHN), multiply both factors, THEN compare the result against the 60/75°C termination limit from 110.14(C). The final usable ampacity is whichever is lower. This stacked calc is one of the hardest things on the exam — work it slowly."],"ref":"NEC 2023, 310.15(B) and (C).","n":58,"id":"A-S5-58"},{"stem":"An equipment grounding conductor is permitted to be which of the following?","choices":["Only bare copper","A bare or insulated conductor, busbar, or the metal raceway itself where listed","Only green insulated wire","The neutral on the load side"],"answer":"B","center":["250.118 lists the many acceptable EGC types — wire (bare or insulated), the raceway, certain cable armor, etc.","Note the trap: using the neutral as a ground on the load side is NOT permitted (250.142) except in very limited existing cases."],"math":null,"more":null,"ref":"NEC 2023, 250.118 — Types of EGC.","n":59,"id":"A-S5-59"},{"stem":"The point where the service conductors connect to the serving utility's conductors is the:","choices":["Meter base","Service drop","Service point","Main bonding jumper"],"answer":"C","center":["Definition. The 'service point' is the demarcation between utility and premises wiring."],"math":null,"more":null,"ref":"NEC 2023, Article 100 — Service Point.","n":60,"id":"A-S5-60"},{"stem":"A panelboard that is used as service equipment in a dwelling and contains the main service disconnect must have its grounded (neutral) bus bonded to the enclosure by means of the:","choices":["Equipment ground only","Neutral lug only","Grounding electrode conductor only","Main bonding jumper"],"answer":"D","center":["250.24 / 250.28 — at the service, the neutral bonds to the enclosure via the main bonding jumper (that green screw or strap).","This is the one and only point where neutral and ground are intentionally tied together. Downstream subpanels keep them separated."],"math":null,"more":["The 'one bonding point' rule is huge: neutral-to-ground bond happens ONLY at the service (main bonding jumper). In every subpanel after that, neutrals float on an isolated bus and grounds land separately. Bond them again downstream and you create parallel neutral paths — current on the ground system, a classic dangerous mistake."],"ref":"NEC 2023, 250.24(B) and 250.28 — Main Bonding Jumper.","n":61,"id":"A-S5-61"},{"stem":"Receptacles installed outdoors in a wet location, where the product plugged in is not attended while in use, must have an enclosure that is weatherproof:","choices":["Whether or not the attachment plug cap is inserted (an 'in-use'/'while-in-use' cover)","Only when nothing is plugged in","Only in summer","Never required outdoors"],"answer":"A","center":["Circle 'wet location' and 'not attended.' That triggers the in-use (bubble) cover rule in 406.9(A).","A wet-location receptacle serving something left plugged in (like holiday lights or a battery charger) needs a cover that stays weatherproof WITH the plug inserted — the bubble cover."],"math":null,"more":["Two covers, two situations: a 'weatherproof while cover is closed' flap is OK only for a receptacle in a wet location where the plug is removed when unattended. But for anything left plugged in, you need the 'while-in-use' bubble cover that's weatherproof with the cord in place. The exam tests which cover goes where."],"ref":"NEC 2023, 406.9(B)(1) — Wet Location Receptacle Covers.","n":62,"id":"A-S5-62"}]},{"title":"SECTION 6 — WIRING METHODS & MATERIALS","count":"16 of 100 questions","overview":["A big section drawn from NEC Chapter 3: boxes (314), conductors (310), and the raceway articles — EMT (358), RMC (344), PVC (352), flexible conduits, and conduit fill (Chapter 9 tables + Annex C). Lots of straightforward lookups and a few fill calculations.","Your power tabs here: Chapter 9 Table 1 (the 40% fill rule), Chapter 9 Table 4 (raceway areas), Chapter 9 Table 5 (conductor areas), and Annex C (the quick 'how many wires fit' tables). For box fill, tab 314.16 and its Table 314.16(B). Most fill questions can be answered straight from Annex C without any math — learn to use it."],"tip":"Trap to watch: conduit fill percentages. The magic numbers are 1 wire = 53%, 2 wires = 31%, 3 or more wires = 40%. The exam loves to give you three identical conductors (use 40%) or exactly two (use 31%). Read how many conductors before you pick the percentage.","questions":[{"stem":"PVC conduit (Type PVC, Schedule 40/80) belongs to which NEC article?","choices":["Article 352","Article 344","Article 358","Article 348"],"answer":"A","center":["Rigid PVC = Article 352. (344 = RMC, 358 = EMT, 348 = FMC.)"],"math":null,"more":null,"ref":"NEC 2023, Article 352 — Rigid PVC Conduit.","n":63,"id":"A-S6-63"},{"stem":"Expansion fittings for PVC conduit are required where the expected length change due to temperature is expected to be:","choices":["0.10 in. or more","0.25 in. or more","1 in. or more","Never required"],"answer":"B","center":["352.44 — PVC expansion fittings required at 1/4 in. (0.25 in.) or more of expected movement.","PVC moves a lot with temperature — far more than metal. The 1/4-inch threshold is the trigger."],"math":null,"more":["PVC's expansion is roughly 4× that of steel. On a long exterior run, a hot-to-cold swing can move the conduit over an inch — enough to crack fittings or pull joints apart without an expansion coupling. Table 352.44 gives the expansion per °F per 100 ft."],"ref":"NEC 2023, 352.44 — Expansion Fittings.","n":64,"id":"A-S6-64"},{"stem":"The maximum support spacing for 3/4-inch EMT secured with straps is generally:","choices":["3 ft","5 ft","10 ft","12 ft"],"answer":"C","center":["358.30 — EMT support. Secured within 3 ft of each box and at intervals not exceeding 10 ft.","The 'within 3 ft of a box' part and the '10 ft intervals' part are two different numbers — the question asks the interval, which is 10 ft."],"math":null,"more":null,"ref":"NEC 2023, 358.30(A) — EMT Securing and Supporting.","n":65,"id":"A-S6-65"},{"stem":"Liquidtight flexible metal conduit (LFMC) is covered by Article 350 and is commonly used for:","choices":["Direct burial only","Plenum air returns","Service entrances only","Connections to equipment where flexibility and liquid-tight protection are needed (e.g., motors, HVAC)"],"answer":"D","center":["LFMC (Article 350) shines at flexible, wet/oily equipment connections — think the whip to an outdoor AC condenser or a motor that vibrates."],"math":null,"more":null,"ref":"NEC 2023, Article 350 — LFMC.","n":66,"id":"A-S6-66"},{"stem":"Type MC (metal-clad) cable is generally permitted in:","choices":["Exposed and concealed work, and many locations where listed for the use","Only wet locations","Only hazardous locations","Only direct burial"],"answer":"A","center":["330.10 — MC cable is versatile: exposed, concealed, many environments where listed. Wide uses-permitted list."],"math":null,"more":null,"ref":"NEC 2023, 330.10 — MC Uses Permitted.","n":67,"id":"A-S6-67"},{"stem":"Boxes installed in a wall or ceiling of noncombustible material (like plaster or tile) may be set back from the finished surface not more than:","choices":["1/8 in.","1/4 in.","1/2 in.","1 in."],"answer":"B","center":["314.20 — in noncombustible surfaces, the box can be set back up to 1/4 in. (In combustible surfaces it must be flush or project).","The logic: combustible surfaces (wood) can't have a recessed gap exposing the wall to arcing, so flush/proud. Noncombustible (plaster) gets 1/4 in. of slack."],"math":null,"more":null,"ref":"NEC 2023, 314.20 — Boxes in Walls/Ceilings.","n":68,"id":"A-S6-68"},{"stem":"Per Table 300.19(A), copper conductors 6 AWG through 1/0 AWG in a vertical raceway must be supported at intervals not exceeding:","choices":["60 ft","80 ft","100 ft","No limit"],"answer":"C","center":["Table 300.19(A) sets the interval by size AND metal. Copper 6 AWG–1/0 = 100 ft.","Watch the size break: copper 2/0–4/0 drops to 80 ft, and it keeps dropping for larger conductors. Match the exact row. Copper 6–1/0 = 100 ft."],"math":null,"more":["Copper intervals by size: 18–8 AWG = 100 ft, 6–1/0 = 100 ft, 2/0–4/0 = 80 ft, over 4/0–350 kcmil = 60 ft, on down to 35 ft for the heaviest. Aluminum goes farther at each size because it's lighter."],"ref":"NEC 2023, Table 300.19(A).","n":69,"id":"A-S6-69"},{"stem":"The radius of the inner edge of a field bend in conduit must not be less than that shown in the NEC bend-radius tables, in order to:","choices":["Save material","Reduce cost","Increase fill","Avoid damaging conductors and maintain pulling ability"],"answer":"D","center":["Chapter 9 Table 2 — minimum bend radius. Too tight a bend kinks the raceway and damages insulation on the pull."],"math":null,"more":null,"ref":"NEC 2023, Chapter 9, Table 2 — Radius of Bends.","n":70,"id":"A-S6-70"},{"stem":"Wireways must not contain conductors filling more than what percent of their cross-sectional area?","choices":["20%","31%","40%","53%"],"answer":"A","center":["376.22 — wireway fill is limited to 20% of the cross section.","Don't confuse this with conduit fill (40% for 3+). Wireways have their own, lower 20% limit."],"math":null,"more":["Wireways (and auxiliary gutters) are limited to 20% conductor fill, AND the number of current-carrying conductors triggers derating above 30 conductors. The lower 20% reflects that wireways are often used as junction/distribution points with splices, needing room to work."],"ref":"NEC 2023, 376.22 — Wireway Fill.","n":71,"id":"A-S6-71"},{"stem":"Surface metal raceway (Article 386) shall not be used where:","choices":["Indoors in dry locations","Subject to severe physical damage or corrosive vapors","In an office","On a finished wall"],"answer":"B","center":["386.12 — uses not permitted: severe physical damage, corrosive vapors, concealed work (generally), etc."],"math":null,"more":null,"ref":"NEC 2023, 386.12 — Surface Metal Raceway.","n":72,"id":"A-S6-72"},{"stem":"When pulling conductors into a raceway, the use of a listed lubricant is permitted provided it is:","choices":["Petroleum jelly","Motor oil","A type that will not have a deleterious effect on the conductors or raceway","Any soap"],"answer":"C","center":["The principle: pulling lube must be compatible — not harmful to insulation or raceway material."],"math":null,"more":null,"ref":"NEC 2023, 300.18 / manufacturer listing.","n":73,"id":"A-S6-73"},{"stem":"A conduit body (such as an LB) with a cross-sectional area not less than twice that of the largest conduit is permitted to contain conductor splices when it is:","choices":["Buried","Over 6 ft high","Painted","Durably and legibly marked with its volume and the splices fit the fill"],"answer":"D","center":["314.16(C) — conduit bodies with splices must be marked with volume, and the splice fill must comply.","An LB normally just routes conductors around a corner, but if it's big enough and marked with its cubic-inch volume, you may splice in it."],"math":null,"more":null,"ref":"NEC 2023, 314.16(C) — Conduit Bodies.","n":74,"id":"A-S6-74"},{"stem":"Cables run through bored holes in wood framing members must be protected from screws and nails by maintaining the hole at least 1¼ in. from the nearest edge, or by installing:","choices":["A steel plate or bushing at least 1/16 in. thick","Nothing extra","Tape over the cable","A larger cable"],"answer":"A","center":["300.4(B) — protect cables within 1¼ in. of a framing edge with a 1/16-in. steel plate (nail plate).","If you can't keep the cable 1¼ in. back from the stud edge, a steel nail plate stops a drywall screw from piercing it."],"math":null,"more":null,"ref":"NEC 2023, 300.4(A)(1) and (D).","n":75,"id":"A-S6-75"},{"stem":"Underground conductors emerging from grade must be protected by an approved enclosure or raceway to a point at least how high above finished grade?","choices":["4 ft","8 ft","6 ft","12 ft"],"answer":"B","center":["300.5(D) — conductors emerging from underground must be protected from grade up to 8 ft above finished grade (and below grade to the required depth).","The protection covers the vulnerable transition where conductors leave the ground. 8 ft up."],"math":null,"more":null,"ref":"NEC 2023, 300.5(D)(1).","n":76,"id":"A-S6-76"},{"stem":"Flexible cords and cables must be connected to devices and fittings so that tension is not transmitted to joints or terminals. This is accomplished with:","choices":["A knot in the cord","Electrical tape","A strain relief / listed means (e.g., Kellems grip or clamp)","A wire nut"],"answer":"C","center":["400.10 / 400.14 — strain relief. Tension must not reach the terminals; use listed strain-relief means.","A knot is the old wrong-way trick; the Code wants a proper strain-relief device."],"math":null,"more":null,"ref":"NEC 2023, 400.14 — Pull at Joints and Terminals.","n":77,"id":"A-S6-77"},{"stem":"The minimum size of a junction box for a straight pull of conductors in conduit must be at least how many times the trade diameter of the largest raceway?","choices":["6 times","12 times","10 times","8 times"],"answer":"D","center":["314.28(A)(1) — straight pulls: box length ≥ 8 × the largest raceway trade size.","For a straight-through pull, 8× the biggest conduit. (Angle/U pulls use 6× plus the other raceways — a different, larger calc.)"],"math":["Straight pull min length = 8 × (largest raceway trade size)","e.g., 2-in. conduit → 8 × 2 = 16 in. minimum box length"],"more":["The two cases the exam tests: STRAIGHT pull = 8× the largest raceway. ANGLE or U pull = 6× the largest raceway PLUS the sum of the other raceways in the same row. Angle pulls need way more room because conductors have to bend inside the box without exceeding their own bend radius."],"ref":"NEC 2023, 314.28(A) — Pull and Junction Boxes.","n":78,"id":"A-S6-78"}]},{"title":"SECTION 7 — EQUIPMENT FOR GENERAL USE","count":"13 of 100 questions","overview":["This section comes from NEC Chapter 4: flexible cords (400), switches (404), receptacles (406), luminaires (410), appliances (422), heating (424), motors (430), and transformers (450). It's broad but mostly definitional and table-based.","Motors (Article 430) carry the most weight and the most math. Tab Table 430.250 (three-phase motor FLC) and Table 430.52 (max overcurrent device sizing). For motors, remember the golden rule: size the WIRES and overload from the motor nameplate, but size the BRANCH-CIRCUIT conductors from the FLC tables, at 125% for a single continuous-duty motor."],"tip":"Trap to watch: motor calculations use TABLE full-load current (FLC), not the nameplate amps, for sizing branch-circuit conductors and short-circuit/ground-fault protection. The nameplate is used for overload protection. Read which one the question wants.","questions":[{"stem":"A snap switch used to control a permanently connected appliance must have an ampere rating not less than:","choices":["The connected appliance load","50% of the appliance load","Twice the appliance load","15 amperes always"],"answer":"A","center":["404.14 — switch rating must cover the load it controls. Same idea as luminaire switching."],"math":null,"more":null,"ref":"NEC 2023, 404.14.","n":79,"id":"A-S7-79"},{"stem":"Receptacles connected to a 20-ampere branch circuit serving two or more outlets must be rated:","choices":["20 amperes only","15 or 20 amperes","30 amperes","10 amperes"],"answer":"B","center":["Table 210.21(B)(3): on a 20 A multi-outlet circuit, receptacles may be 15 OR 20 A rated.","On a 15 A circuit, only 15 A receptacles. On a 20 A circuit, 15 or 20 A are both allowed."],"math":null,"more":["Why 15 A receptacles are OK on a 20 A circuit: a duplex 15 A receptacle is internally rated to pass 20 A through its feed-through contacts, so it can serve a 20 A circuit feeding multiple outlets. You only need a dedicated 20 A receptacle for a single 20 A appliance on an individual circuit."],"ref":"NEC 2023, Table 210.21(B)(3).","n":80,"id":"A-S7-80","audit":["Medium: Same question as practice item P-S5-140 (15 or 20 A receptacles on 20 A circuit)."]},{"stem":"A transformer's secondary conductors, where protected under the rules for transformer secondary conductors, generally must be:","choices":["Unprotected","Always 100 A","Protected per the rules in 240.21(C)","Twice the primary"],"answer":"C","center":["240.21(B) governs transformer secondary conductor protection. The primary OCPD generally doesn't protect the secondary because the voltage (and current) transform."],"math":null,"more":["Key concept: a breaker on the primary side protects the primary conductors but does NOT protect the secondary, because the transformer changes the current ratio. A 480-to-120 V transformer multiplies secondary current by ~4×, so the primary breaker would let way too much through before tripping. Secondary conductors need their own protection scheme per 240.21(B)."],"ref":"NEC 2023, 240.21(C) — Transformer Secondary Conductors.","n":81,"id":"A-S7-81"},{"stem":"Appliances that produce heat, such as electric ranges, may have their branch-circuit conductors sized using the demand factors found in:","choices":["Table 110.26","Table 310.16","Table 250.122","Table 220.55"],"answer":"D","center":["Circle 'electric range' + 'demand.' That's Table 220.55, household cooking appliances.","Ranges rarely run every burner and the oven at full at once, so Table 220.55 gives generous demand factors."],"math":null,"more":["Table 220.55 is a favorite calc question. A single 12 kW range, for example, has a Column C demand of just 8 kW — you size the circuit for 8 kW, not 12. Notes to the table handle ranges over 12 kW and multiple appliances. Knowing this table saves you from oversizing the range circuit."],"ref":"NEC 2023, Table 220.55 — Cooking Appliance Demand.","n":82,"id":"A-S7-82"},{"stem":"Electric space-heating equipment is considered a continuous load, so its branch-circuit conductors and overcurrent device are sized at:","choices":["125% of the load","115% of the load","100% of the load","80% of the load"],"answer":"A","center":["424 — fixed electric space heating is treated as continuous: 125%.","Heaters run for hours, so the 125% continuous-load factor applies, just like other continuous loads."],"math":["Conductor/OCPD ≥ 1.25 × heater load → 125%"],"more":null,"ref":"NEC 2023, 424.3(B) — Fixed Electric Space Heating.","n":83,"id":"A-S7-83"},{"stem":"The disconnecting means for a household electric range or wall oven is permitted to be:","choices":["Only a breaker 50 ft away","A cord-and-plug connection where accessible","Not required","A light switch"],"answer":"B","center":["422.33 / 210.50 — a cord-and-plug connection can serve as the disconnect for cooking appliances where the plug is accessible.","Unplugging it is a valid disconnect if you can reach the plug."],"math":null,"more":null,"ref":"NEC 2023, 422.33 — Cord-and-Plug Disconnect.","n":84,"id":"A-S7-84"},{"stem":"Capacitors used for power-factor correction must have a means to discharge stored energy. The residual voltage must be reduced to 50 volts or less within:","choices":["10 minutes","5 minutes","1 minute","1 hour"],"answer":"C","center":["460.6 — capacitor discharge. Down to 50 V within 1 minute for the typical case.","A charged capacitor holds a dangerous shock even after power is off, so the Code mandates rapid bleed-down."],"math":null,"more":null,"ref":"NEC 2023, 460.6 — Capacitor Discharge.","n":85,"id":"A-S7-85"},{"stem":"Luminaires used in wet locations must be marked:","choices":["'Dry location only'","'Damp location only'","'Indoor use'","'Suitable for Wet Locations'"],"answer":"D","center":["410.10 — wet-location luminaires must be marked 'Suitable for Wet Locations.' Damp-location fixtures are marked separately.","Match the marking to the environment. A fixture over a shower or outdoors exposed to weather needs the wet-location mark."],"math":null,"more":null,"ref":"NEC 2023, 410.10 — Luminaires in Specific Locations.","n":86,"id":"A-S7-86"},{"stem":"The full-load current used to size conductors for a hermetic refrigerant motor-compressor (like an AC unit) is the:","choices":["Rated-load current or branch-circuit selection current, whichever is greater","Nameplate horsepower","Locked-rotor current","Service rating"],"answer":"A","center":["440 — AC/refrigeration. Use rated-load current (RLA) or branch-circuit selection current (BCSC), whichever is greater.","HVAC compressors have their own Article 440 rules separate from general motors in 430."],"math":null,"more":["Article 440 (air conditioning & refrigeration) overlays Article 430. The compressor nameplate gives RLA and sometimes BCSC; you size conductors at 125% of the larger of those for a single continuous compressor. Locked-rotor current (LRA) is used for disconnect sizing, not conductor sizing."],"ref":"NEC 2023, 440.6 — Ampacity and Rating.","n":87,"id":"A-S7-87"},{"stem":"A ceiling-suspended paddle fan weighing 50 lb must be supported by:","choices":["A standard outlet box","An outlet box or system listed for the weight, identified for fan support","Drywall anchors","The fan's own wires"],"answer":"B","center":["314.27(C) — fans over 35 lb need a support system listed for that weight.","A 50-lb fan exceeds the 35-lb threshold, so the box/brace must be listed and marked for the actual weight."],"math":null,"more":null,"ref":"NEC 2023, 314.27(C).","n":88,"id":"A-S7-88"},{"stem":"Electric signs and outline lighting are covered by which NEC article, and generally require a disconnect within sight of the sign?","choices":["Article 700","Article 680","Article 600","Article 410"],"answer":"C","center":["Signs = Article 600. Disconnect within sight is a key 600.6 rule."],"math":null,"more":null,"ref":"NEC 2023, Article 600 — Electric Signs.","n":89,"id":"A-S7-89"},{"stem":"Appliance branch-circuit conductors supplying a single non-motor-operated appliance must have an ampacity not less than the appliance rating. If the appliance is continuous, the conductors are sized at:","choices":["100% of rating","150% of rating","80% of rating","125% of rating"],"answer":"D","center":["422.10 — continuous appliance loads get the 125% treatment, like other continuous loads.","The recurring 125% continuous factor again."],"math":null,"more":null,"ref":"NEC 2023, 422.10 — Branch-Circuit Rating.","n":90,"id":"A-S7-90"},{"stem":"Lighting track (Article 410, Part XV) must not be installed:","choices":["In wet or damp locations, or where subject to physical damage","In a retail store","On a ceiling","Above 6 ft"],"answer":"A","center":["410.151(C) — track lighting prohibited in wet/damp locations, where subject to damage, less than 5 ft above the floor (unless protected), etc."],"math":null,"more":null,"ref":"NEC 2023, 410.151(C) — Track Lighting.","n":91,"id":"A-S7-91"}]},{"title":"SECTION 8 — SPECIAL OCCUPANCIES, EQUIPMENT & CONDITIONS","count":"8 of 100 questions","overview":["This section is NEC Chapter 5 (hazardous/special occupancies like 500–517 and 680 pools), Chapter 6 (special equipment), and Chapter 7 (special conditions like 700 emergency systems). On the real exam this is a smaller slice, but the questions can feel unfamiliar — so a little tabbing goes a long way.","You can't memorize all of Chapters 5–7, and you don't need to. Tab the headline articles: 500/501 (classified/hazardous locations), 680 (swimming pools & spas), 700 (emergency systems), and 760 (fire alarm). When a question names an occupancy (gas station, hospital, pool, grain bin), go straight to that occupancy's article — the answer is almost always a direct rule in the first few pages."],"tip":"Trap to watch: Class/Division terminology. Class I = flammable gases/vapors, Class II = combustible dust, Class III = fibers/flyings. Division 1 = hazard present in normal operation; Division 2 = hazard present only under abnormal conditions. The exam mixes these up on purpose.","questions":[{"stem":"Gasoline dispensing and service stations are classified locations addressed by NEC Article:","choices":["514","511","517","520"],"answer":"A","center":["Motor fuel dispensing = Article 514. (511 = repair garages, 517 = health care, 520 = theaters.)"],"math":null,"more":null,"ref":"NEC 2023, Article 514 — Motor Fuel Dispensing.","n":92,"id":"A-S8-92"},{"stem":"In a commercial repair garage, the area up to a certain height above the floor may be a classified (hazardous) location because:","choices":["Heat rises","Gasoline vapors are heavier than air and collect near the floor","Light is poor","Dust settles high"],"answer":"B","center":["Circle 'near the floor.' Gasoline vapor is heavier than air, so it pools low — that's why the lower zone is classified.","The classified boundary is measured up from the floor for exactly this reason."],"math":null,"more":null,"ref":"NEC 2023, Article 511 — Repair Garages.","n":93,"id":"A-S8-93"},{"stem":"Patient care spaces in health care facilities require redundant grounding paths and special receptacles because:","choices":["Patients are large loads","Hospitals use 480 V","Reduced body resistance and connected equipment make even small currents dangerous","It looks professional"],"answer":"C","center":["Article 517 — patients may be wet, sedated, or have invasive leads, so even tiny leakage currents are dangerous. Redundant grounding mitigates that."],"math":null,"more":null,"ref":"NEC 2023, Article 517 — Health Care Facilities.","n":94,"id":"A-S8-94"},{"stem":"Carnivals, circuses, fairs, and similar temporary events are covered by NEC Article:","choices":["550","530","540","525"],"answer":"D","center":["Temporary amusement events = Article 525."],"math":null,"more":null,"ref":"NEC 2023, Article 525.","n":95,"id":"A-S8-95"},{"stem":"Agricultural buildings (Article 547) have special rules largely because of:","choices":["Dust, corrosive atmospheres (manure gases), and moisture","High ceilings","Bright lighting","Heavy equipment only"],"answer":"A","center":["Barns and livestock buildings have corrosive, dusty, damp atmospheres that attack standard wiring — hence Article 547."],"math":null,"more":null,"ref":"NEC 2023, Article 547 — Agricultural Buildings.","n":96,"id":"A-S8-96"},{"stem":"Fountains and the water in them require GFCI protection and equipotential bonding similar to:","choices":["Dry locations","Swimming pools (Article 680)","Hazardous gas areas","Signs"],"answer":"B","center":["Fountains fall under Article 680 with pools/spas — water + electricity = GFCI + bonding."],"math":null,"more":null,"ref":"NEC 2023, Article 680, Part V — Fountains.","n":97,"id":"A-S8-97"},{"stem":"Marinas and boatyards (Article 555) emphasize protection against:","choices":["High wind","Sun exposure","Electric shock drowning from leakage current into the water","Noise"],"answer":"C","center":["Article 555 targets electric shock drowning — leakage current into water around docks. GFPE/GFCI and bonding are central."],"math":null,"more":null,"ref":"NEC 2023, Article 555 — Marinas.","n":98,"id":"A-S8-98"},{"stem":"A location where easily ignitible fibers or flyings (such as a textile or wood mill) are present is classified as:","choices":["Class I","Class II","Class IV","Class III"],"answer":"D","center":["Fibers/flyings = Class III. (I = gas, II = dust, III = fibers.)"],"math":null,"more":null,"ref":"NEC 2023, 500.5(D) — Class III Locations.","n":99,"id":"A-S8-99"}]},{"title":"SECTION 9 — COMMUNICATION SYSTEMS","count":"1 of 100 questions","overview":["The smallest section — just a sliver of the real exam — but worth a couple of easy points. It draws from NEC Chapter 8 (Articles 800 general communications, 805 telephone, 820 coax/CATV) and basic low-voltage practice.","Chapter 8 is unique: it stands alone and is NOT subject to the other chapters unless specifically referenced (that's the rule in 800.3). Tab 800.100 (bonding and grounding of communications) and 800.24 (mechanical execution / supporting cables). Most questions here are about separation from power conductors, grounding, and listing of cables."],"tip":"Trap to watch: remember that Chapter 8 is independent. A rule from Chapter 3 (like raceway fill) does NOT automatically apply to communications cabling unless Chapter 8 specifically points to it. The exam may bait you with a Chapter 3 rule on a Chapter 8 question.","questions":[{"stem":"Communications cable shields, metallic sheath members, and the grounding of communications systems must be bonded to the building grounding electrode system to:","choices":["Limit voltage differences and provide a path for fault/surge currents","Increase signal speed","Reduce cost","Improve appearance"],"answer":"A","center":["Article 800 grounding/bonding exists to limit potential differences and safely carry surge/lightning energy to ground — a safety function, not performance.","Bonding the comms grounding to the building electrode system keeps everything at the same reference and gives surges a safe path."],"math":null,"more":["The principle behind Chapter 8 bonding: if the phone/data system grounds to a different electrode than the power system, a lightning surge or fault can put thousands of volts between them — right where a person or equipment bridges the two. Bonding all grounding electrodes together (the 'intersystem bonding termination,' 250.94) eliminates that deadly difference."],"ref":"NEC 2023, 800.100 / 250.94 — Bonding of Communications Systems.","n":100,"id":"A-S9-100"}]}];

const EXAM_FULL_B = [{"title":"SECTION 1 — PROJECT DESIGN & MANAGEMENT","count":"8 of 100 questions","overview":["This section pulls from the NASCLA Contractors Guide to Business, Law and Project Management and the PMBOK Guide. It is NOT code-book material — so do not waste time flipping through your NEC here. The questions cover bidding, contracts, project scheduling, change orders, and basic estimating.","Most guys lose points here by over-thinking. These are common-sense business questions. Read the question, find the choice that a fair, organized contractor would pick, and move on. Keep your NASCLA Business & Law guide tabbed at the chapters on contracts and project management."],"tip":"Trap to watch: answers that sound 'aggressive' (cut corners, skip documentation, verbal-only agreements) are almost always wrong. The Code and the business guide both reward WRITTEN, documented, by-the-book behavior.","questions":[{"stem":"The estimating step that converts quantities into labor hours uses:","choices":["Labor units (hours per item) from a labor unit manual or experience","Guesswork","The owner's budget","Random numbers"],"answer":"A","center":["Labor units (hours per device/100 ft of conduit, etc.) turn takeoff quantities into labor cost."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Labor Estimating.","n":1,"id":"B-S1-1"},{"stem":"A liquidated damages clause in a contract specifies:","choices":["A bonus","A pre-agreed amount owed for late completion","The profit","The tax"],"answer":"B","center":["Liquidated damages = agreed dollar amount per day late, set in advance."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Contracts.","n":2,"id":"B-S1-2"},{"stem":"Cash flow problems on a project are most often caused by:","choices":["Too much profit","Low overhead","Slow receivables and front-loaded costs","Good scheduling"],"answer":"C","center":["You pay for labor/material before you get paid — slow receivables strangle cash flow."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Finance.","n":3,"id":"B-S1-3"},{"stem":"An independent contractor differs from an employee primarily in:","choices":["Height","Age","Tool color","The degree of control over how the work is performed"],"answer":"D","center":["Control over the means/methods is the legal test for employee vs. independent contractor."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Labor Law.","n":4,"id":"B-S1-4"},{"stem":"A submittal in construction is a document or sample provided to the owner/engineer to:","choices":["Demonstrate that proposed materials/equipment meet the specifications","Pay the bill","Cancel the job","Hire workers"],"answer":"A","center":["Submittals (shop drawings, product data, samples) prove compliance before installation."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Submittals.","n":5,"id":"B-S1-5"},{"stem":"The total project cost in a competitive bid is the sum of direct costs, indirect costs, and:","choices":["Nothing","Markup (overhead and profit)","Sales tax only","The owner's fee"],"answer":"B","center":["Bid = direct + indirect + OH&P markup."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Estimating.","n":6,"id":"B-S1-6"},{"stem":"OSHA recordkeeping requires that serious work-related injuries be:","choices":["Ignored","Kept secret","Recorded on the OSHA log (300) and reported within required timeframes","Posted publicly forever"],"answer":"C","center":["OSHA 300 log records injuries; serious events are reported within set timeframes."],"math":null,"more":null,"ref":"OSHA 29 CFR 1904.","n":7,"id":"B-S1-7","audit":["Low: OSHA 29 CFR 1904 (recordkeeping) is not on the reference list."]},{"stem":"A purchase order is best described as:","choices":["A bid","A bond","A lien","A buyer's authorization to purchase goods at agreed terms"],"answer":"D","center":["A PO authorizes and documents a purchase with agreed price/terms."],"math":null,"more":null,"ref":"NASCLA Business, Law & PM — Procurement.","n":8,"id":"B-S1-8"}]},{"title":"SECTION 2 — SAFETY (OSHA & NFPA 70E)","count":"9 of 100 questions","overview":["Safety questions come from OSHA 29 CFR 1926 (construction), 29 CFR 1910 (general industry), and NFPA 70E (electrical safety in the workplace). These are about keeping people alive, so the “safest” answer is usually correct.","Tab your NFPA 70E at Article 110 (general work practices), Article 120 (establishing an electrically safe work condition), and Article 130 (energized work / PPE). Tab OSHA 1926 Subpart K (electrical). Most questions are a direct lookup of a number — an approach distance, a lockout step, or a PPE category."],"tip":"Trap to watch: when one answer says 'de-energize and lock out' and another says 'work it hot carefully,' the de-energize answer wins unless the question specifically says de-energizing creates a greater hazard. NFPA 70E's whole philosophy is: establish an electrically safe work condition first.","questions":[{"stem":"The limited approach boundary is the distance from an exposed energized part within which:","choices":["A shock hazard exists and unqualified persons must not cross without escort","Anyone may stand","PPE is never needed","Tools are stored"],"answer":"A","center":["NFPA 70E 130.4 — crossing the limited approach boundary requires being qualified or escorted."],"math":null,"more":null,"ref":"NFPA 70E 2024, 130.4.","n":9,"id":"B-S2-9"},{"stem":"When selecting PPE by the category method, the worker must first determine the:","choices":["Brand","Task and equipment category from the NFPA 70E tables","Color","Cost"],"answer":"B","center":["130.7(C)(15) — the table method matches task/equipment to a PPE category."],"math":null,"more":null,"ref":"NFPA 70E 2024, Table 130.7(C)(15)(a).","n":10,"id":"B-S2-10"},{"stem":"OSHA requires that disconnecting means be capable of being:","choices":["Opened only","Painted","Locked in the open (off) position for LOTO","Removed"],"answer":"C","center":["1910.333/1910.147 — disconnects must accept a lock in the open position."],"math":null,"more":null,"ref":"OSHA 29 CFR 1910.147.","n":11,"id":"B-S2-11"},{"stem":"A safety data sheet (SDS) provides information about:","choices":["Wages","Tools","Schedules","Hazardous chemical properties, handling, and first aid"],"answer":"D","center":["HazCom — SDS covers chemical hazards and safe handling."],"math":null,"more":null,"ref":"OSHA 29 CFR 1910.1200.","n":12,"id":"B-S2-12"},{"stem":"The greatest electrical hazard to a worker comes from:","choices":["Current passing through the body","Voltage alone","Resistance alone","Color of wire"],"answer":"A","center":["It's the current through the body that injures — even small currents across the heart are deadly."],"math":null,"more":["As little as 50–100 milliamps across the chest can stop the heart. Voltage drives the current, but it's the current path through the body that kills. This is why GFCIs trip at 4–6 mA — well below the danger threshold."],"ref":"OSHA — Electrical Safety.","n":13,"id":"B-S2-13"},{"stem":"Before removing a lockout device, the authorized worker must verify that:","choices":["It's lunchtime","All tools are removed, guards replaced, and workers are clear","The boss approves verbally","The lock is rusty"],"answer":"B","center":["1910.147 — before re-energizing: area clear, tools removed, guards on, everyone notified."],"math":null,"more":null,"ref":"OSHA 29 CFR 1910.147(e).","n":14,"id":"B-S2-14"},{"stem":"Ground-fault protection for personnel on temporary construction power must be provided by GFCI or a(n):","choices":["Surge arrester","Extra breaker","Assured equipment grounding conductor program","Bigger wire"],"answer":"C","center":["1926.404(b)(1) — GFCI or the AEGCP."],"math":null,"more":null,"ref":"OSHA 29 CFR 1926.404(b)(1).","n":15,"id":"B-S2-15","audit":["Low: Third version of the GFCI-or-AEGCP question."]},{"stem":"Eye and face protection is required when there is a hazard from:","choices":["Bright colors","Cold","Loud noise","Flying particles, arc flash, or molten metal"],"answer":"D","center":["1926.102 — eye/face protection against particles, arc flash, molten metal."],"math":null,"more":null,"ref":"OSHA 29 CFR 1926.102.","n":16,"id":"B-S2-16"},{"stem":"An energized electrical work permit generally documents the justification, the safe work practices, and the:","choices":["Required PPE and shock/arc-flash boundaries","Lunch schedule","Paint color","Tool brand"],"answer":"A","center":["130.2(A) — the permit captures boundaries, PPE, and the safe-work plan."],"math":null,"more":null,"ref":"NFPA 70E 2024, 130.2(B).","n":17,"id":"B-S2-17"}]},{"title":"SECTION 3 — ELECTRICAL THEORY & PRINCIPLES","count":"11 of 100 questions","overview":["Theory questions come from Mike Holt's Understanding Electrical Theory and Ugly's Electrical References. This is your math and fundamentals section: Ohm's Law, the power wheel, series vs. parallel circuits, voltage drop, and AC basics.","Your single most valuable open-book page is the Ohm's Law / Power wheel in Ugly's. Tab it. Almost every calculation in this section comes off that wheel: E = I × R, P = E × I, and the combinations. If you can find that page in five seconds, you can solve most of these without memorizing a thing."],"tip":"Trap to watch: single-phase vs. three-phase. Three-phase power formulas add a √3 (1.732) factor. If the question says 'three-phase,' your Ugly's three-phase formula page is the one you want — not the single-phase wheel.","questions":[{"stem":"A 480-volt circuit with 20 amperes flowing through a single-phase resistive load consumes:","choices":["9,600 W","24 W","500 W","960 W"],"answer":"A","center":["P = E × I = 480 × 20."],"math":["P = 480 × 20 = 9,600 W"],"more":null,"ref":"Ugly's — Power Wheel.","n":18,"id":"B-S3-18"},{"stem":"The reciprocal relationship of resistance is:","choices":["Voltage","Conductance (siemens)","Power","Inductance"],"answer":"B","center":["Conductance = 1/resistance, measured in siemens."],"math":null,"more":null,"ref":"Mike Holt — Conductance.","n":19,"id":"B-S3-19"},{"stem":"Three 30-ohm resistors in parallel give a total resistance of:","choices":["90 ohms","30 ohms","10 ohms","3 ohms"],"answer":"C","center":["Equal resistors in parallel: R ÷ n = 30 ÷ 3 = 10."],"math":["30 ÷ 3 = 10 Ω"],"more":null,"ref":"Ugly's — Parallel.","n":20,"id":"B-S3-20"},{"stem":"If you triple the current through a fixed resistance, the power dissipated (P = I²R) will:","choices":["Triple","Stay the same","Halve","Increase 9 times"],"answer":"D","center":["P = I²R. Triple I → 3² = 9× power."],"math":["P ∝ I²; (3I)² = 9 × I²"],"more":["This square relationship is why a small current increase causes a big heat jump in a conductor — and why overloads are so dangerous. Double the current, quadruple the heat. It's the math behind conductor derating and overload protection."],"ref":"Mike Holt — Power Relationships.","n":21,"id":"B-S3-21"},{"stem":"A kilowatt-hour is a unit of:","choices":["Energy consumed over time","Power","Voltage","Current"],"answer":"A","center":["kWh = energy (power × time). Your power bill is in kWh."],"math":null,"more":null,"ref":"Ugly's — Energy.","n":22,"id":"B-S3-22"},{"stem":"In a 208Y/120-volt three-phase system, the voltage from any phase to neutral is:","choices":["208 V","120 V","240 V","277 V"],"answer":"B","center":["Wye: phase-to-neutral = 120 V; phase-to-phase = 208 V (120 × 1.732)."],"math":null,"more":["In a wye system the relationship is line-to-line = line-to-neutral × 1.732. So 120 × 1.732 = 208. In 480Y/277, it's 277 to neutral, 480 line-to-line. Knowing which number is phase-to-neutral vs. phase-to-phase is heavily tested."],"ref":"Ugly's — Wye Systems.","n":23,"id":"B-S3-23"},{"stem":"Magnetism and electricity combine in a motor to produce:","choices":["Heat only","Light","Rotational (mechanical) force","Sound only"],"answer":"C","center":["A motor converts electrical energy to mechanical rotation via magnetic fields."],"math":null,"more":null,"ref":"Mike Holt — Motors.","n":24,"id":"B-S3-24"},{"stem":"The amount of charge is measured in:","choices":["Volts","Amperes","Watts","Coulombs"],"answer":"D","center":["Charge = coulombs. (Current = coulombs per second = amperes.)"],"math":null,"more":null,"ref":"Mike Holt — Charge.","n":25,"id":"B-S3-25"},{"stem":"A circuit draws 5 A at 240 V. Its resistance is:","choices":["48 ohms","1,200 ohms","0.02 ohms","245 ohms"],"answer":"A","center":["R = E ÷ I = 240 ÷ 5 = 48."],"math":["R = 240 ÷ 5 = 48 Ω"],"more":null,"ref":"Ugly's — Ohm's Law.","n":26,"id":"B-S3-26"},{"stem":"Alternating current differs from direct current in that AC:","choices":["Never changes","Periodically reverses direction","Has no voltage","Cannot do work"],"answer":"B","center":["AC reverses direction (60 times per second in the US); DC flows one way."],"math":null,"more":null,"ref":"Mike Holt — AC vs DC.","n":27,"id":"B-S3-27"},{"stem":"The effective (usable) value of an AC sine wave voltage is called the:","choices":["Peak value","Average value","RMS (root-mean-square) value","Instantaneous value"],"answer":"C","center":["RMS is the effective value — 120 V 'nominal' is the RMS value. Peak is higher (~170 V)."],"math":null,"more":null,"ref":"Mike Holt — RMS.","n":28,"id":"B-S3-28"}]},{"title":"SECTION 4 — GENERAL CODE REQUIREMENTS","count":"17 of 100 questions","overview":["This is one of the two heaviest sections on the real exam, so we weighted it heavily here too. It draws from NEC Chapter 1 (Articles 90, 100, 110) — definitions, general installation rules, working space, and wiring methods basics.","Article 100 (Definitions) and 110.26 (Working Space) are the two pages you will hit most. Tab them. A huge number of code questions are really just definition lookups in disguise — if a question asks 'which of these is defined as…', go straight to Article 100. For working clearances, Table 110.26(A)(1) is your friend; learn to read its three Conditions."],"tip":"Trap to watch: 'voltage to ground' vs. 'voltage between conductors.' The working-space table is organized by voltage TO GROUND. Read which one the question gives you before you pick a row in the table.","questions":[{"stem":"The NEC is published by which organization?","choices":["NFPA (National Fire Protection Association)","OSHA","ANSI","IEEE"],"answer":"A","center":["The NEC is NFPA 70, published by the NFPA."],"math":null,"more":null,"ref":"NEC 2023, 90.1.","n":29,"id":"B-S4-29"},{"stem":"A receptacle is defined in Article 100 as a contact device installed at an outlet for the connection of:","choices":["A luminaire","An attachment plug (or cord connector)","A breaker","A raceway"],"answer":"B","center":["Definition: a receptacle accepts an attachment plug."],"math":null,"more":null,"ref":"NEC 2023, Article 100.","n":30,"id":"B-S4-30"},{"stem":"Working space in front of equipment must be kept clear and not used for:","choices":["Access","Egress","Storage","Lighting"],"answer":"C","center":["110.26(C) — the working space is not a storage area. Keep it clear.","You can't stack material in front of a panel."],"math":null,"more":null,"ref":"NEC 2023, 110.26(B).","n":31,"id":"B-S4-31"},{"stem":"Per Table 110.26(A)(1), the working depth for 151–600 V to ground, Condition 3, is:","choices":["3 ft","3.5 ft","5 ft","4 ft"],"answer":"D","center":["151–600 V, Condition 3 = 4 ft (live parts on both sides)."],"math":null,"more":null,"ref":"NEC 2023, Table 110.26(A)(1).","n":32,"id":"B-S4-32"},{"stem":"Listed and labeled equipment must be installed and used in accordance with:","choices":["Any instructions included in the listing or labeling","The installer's judgment","The lowest cost method","Verbal advice"],"answer":"A","center":["110.3(A) — follow the listing/labeling instructions. This makes the manufacturer's instructions enforceable."],"math":null,"more":["110.3(A) is quietly one of the most powerful rules in the book: it turns the manufacturer's installation instructions into Code. If the label says 'torque to 25 in-lb' or 'use 75°C conductors,' that's now mandatory, and an inspector can cite you for ignoring it."],"ref":"NEC 2023, 110.3(B).","n":33,"id":"B-S4-33","audit":["Medium: Same question as practice item P-S4-102 (110.3(B)) — locked exam is not 'unseen'."]},{"stem":"Conductor sizes in the NEC are expressed in AWG or, for larger conductors, in:","choices":["Inches","kcmil (thousand circular mils)","Pounds","Millimeters only"],"answer":"B","center":["Above 4/0 AWG, conductors are sized in kcmil."],"math":null,"more":null,"ref":"NEC 2023, Table 310.16.","n":34,"id":"B-S4-34"},{"stem":"Electrical connections must be made by means of fittings or devices identified for the conductor material to prevent:","choices":["Color mismatch","Noise","Galvanic/dissimilar-metal problems and loose connections","Glare"],"answer":"C","center":["110.14 — dissimilar metals and improper terminals cause corrosion and loosening."],"math":null,"more":null,"ref":"NEC 2023, 110.14.","n":35,"id":"B-S4-35"},{"stem":"A grounded conductor (neutral) must generally be identified by a continuous white or gray finish, or for sizes larger than 6 AWG:","choices":["Green","No marking","Red","White/gray marking at terminations"],"answer":"D","center":["200.6 — large neutrals can be re-identified white/gray at the ends."],"math":null,"more":null,"ref":"NEC 2023, 200.6(B).","n":36,"id":"B-S4-36"},{"stem":"The maximum number of disconnects to open all conductors of a service is intended so a person can de-energize the building:","choices":["With no more than six operations of the hand","With a single key","Only with tools","Remotely only"],"answer":"A","center":["230.71 — the 'six operations' concept: kill the service in six motions or fewer."],"math":null,"more":null,"ref":"NEC 2023, 230.71.","n":37,"id":"B-S4-37"},{"stem":"Conductors entering enclosures must be protected from abrasion, and openings through which they pass must be:","choices":["Left jagged","Smooth or fitted with bushings","Painted","Enlarged"],"answer":"B","center":["300.4(G)/110.12 — smooth edges or bushings protect insulation."],"math":null,"more":null,"ref":"NEC 2023, 300.4(G).","n":38,"id":"B-S4-38"},{"stem":"The term 'in sight from' means visible and not more than what distance away?","choices":["20 ft","100 ft","50 ft","10 ft"],"answer":"C","center":["Article 100 — 'in sight from' = visible and within 50 ft."],"math":null,"more":null,"ref":"NEC 2023, Article 100.","n":39,"id":"B-S4-39"},{"stem":"Equipment that depends on natural circulation of air must be installed so room air flow is:","choices":["Blocked","Heated","Reduced","Not prevented by walls or obstructions (adequate ventilation)"],"answer":"D","center":["110.13(D) — ventilated equipment needs unobstructed airflow."],"math":null,"more":null,"ref":"NEC 2023, 110.13(B).","n":40,"id":"B-S4-40"},{"stem":"Where a circuit breaker handle is operated vertically, the 'up' position must be:","choices":["On","Off","Either","Locked"],"answer":"A","center":["240.81 — vertical handle: up = on."],"math":null,"more":null,"ref":"NEC 2023, 240.81.","n":41,"id":"B-S4-41"},{"stem":"Service equipment must be marked to identify it as being:","choices":["A subpanel","Suitable for use as service equipment","Weatherproof","Tamper-resistant"],"answer":"B","center":["230.66 — service equipment is marked/listed 'suitable for use as service equipment.' “Suitable for use as service equipment”."],"math":null,"more":null,"ref":"NEC 2023, 230.66.","n":42,"id":"B-S4-42"},{"stem":"Flexible cords are NOT permitted to be used where run through:","choices":["A pendant","An appliance","Holes in walls, ceilings, or floors (as fixed wiring)","A listed assembly"],"answer":"C","center":["400.12 — cords can't substitute for fixed wiring or run through structural openings."],"math":null,"more":null,"ref":"NEC 2023, 400.12.","n":43,"id":"B-S4-43"},{"stem":"The minimum size of a copper grounding electrode conductor to a concrete-encased electrode (Ufer) need not exceed:","choices":["6 AWG","1/0 AWG","2 AWG","4 AWG"],"answer":"D","center":["250.66(D) — GEC to a concrete-encased electrode need not exceed 4 AWG Cu."],"math":null,"more":null,"ref":"NEC 2023, 250.66(B).","n":44,"id":"B-S4-44"},{"stem":"When equipment marking includes a torque value for terminations, applying that torque is:","choices":["Required (per 110.3(B) listing instructions)","Optional","A suggestion","For aluminum only"],"answer":"A","center":["110.14(D)/110.3(A) — marked torque values are mandatory. Use a torque tool."],"math":null,"more":null,"ref":"NEC 2023, 110.14(D).","n":45,"id":"B-S4-45"}]},{"title":"SECTION 5 — WIRING & PROTECTION","count":"17 of 100 questions","overview":["The other heaviest section — weighted hard here on purpose. This is NEC Chapter 2: branch circuits (210), feeders (215), services (230), overcurrent protection (240), and grounding & bonding (250). This is where the exam lives, and where most points are won or lost.","Keep four tabs ready and you'll fly: 210 (branch circuits & GFCI/AFCI), 240 (overcurrent + the small-conductor rule in 240.4(D)), 250 (grounding), and Table 310.16 (ampacity). Most questions are a lookup, not a memory test. Your job is to know which tab to flip to, fast."],"tip":"Trap words that change the answer: 'continuous load' (multiply by 125%), 'copper vs. aluminum' (different ampacity columns), 'dwelling vs. other than dwelling' (different GFCI/receptacle rules), and 'overcurrent device' vs. 'conductor ampacity' (the small-conductor rule caps the breaker, not the wire's listed ampacity).","questions":[{"stem":"Branch-circuit conductors supplying a single receptacle on an individual branch circuit must have an ampacity not less than:","choices":["The rating of the branch circuit","50% of the circuit","10 A","Any value"],"answer":"A","center":["210.19/210.21 — conductors and the single receptacle match the circuit rating."],"math":null,"more":null,"ref":"NEC 2023, 210.19(A).","n":46,"id":"B-S5-46"},{"stem":"GFCI protection is required for all 125-volt, 15- and 20-ampere receptacles in dwelling unit:","choices":["Bedrooms","Bathrooms","Living rooms","Closets"],"answer":"B","center":["210.8(A)(1) — bathrooms are squarely on the GFCI list."],"math":null,"more":null,"ref":"NEC 2023, 210.8(A)(1).","n":47,"id":"B-S5-47"},{"stem":"On a 20-ampere branch circuit that supplies two or more outlets, a single cord-and-plug-connected utilization equipment item (not fastened in place) must not be rated more than:","choices":["16 amperes (80% of the circuit)","20 amperes (100%)","25 amperes","10 amperes"],"answer":"A","center":["210.23 — on a 20 A circuit feeding several outlets, any ONE cord-and-plug item that isn't fastened in place is capped at 80% of the circuit: 20 × 0.80 = 16 A.","Equipment fastened in place on that same circuit has its own 50% limit. The portable cord-and-plug item is the 80% rule."],"math":null,"more":["The 210.23 limits on a multi-outlet circuit: cord-and-plug equipment NOT fastened in place ≤ 80% of the circuit rating; equipment FASTENED in place ≤ 50% of the circuit rating where lighting/receptacles are also supplied. These are different from a single piece of equipment on its own INDIVIDUAL circuit, which can use up to 100%."],"ref":"NEC 2023, 210.23(B)(2).","n":48,"id":"B-S5-48"},{"stem":"Feeders must have an equipment grounding conductor sized per Table 250.122 based on the:","choices":["Largest load","Voltage","Smallest conductor","Rating of the overcurrent device ahead of the feeder"],"answer":"D","center":["250.122 — EGC sized by the upstream overcurrent device."],"math":null,"more":null,"ref":"NEC 2023, 250.122.","n":49,"id":"B-S5-49"},{"stem":"The main bonding jumper connects the equipment grounding conductor and the service enclosure to the:","choices":["Grounded (neutral) conductor at the service","Hot bus","Ground rod only","Meter"],"answer":"A","center":["250.28 — the MBJ ties the neutral to the enclosure/EGC at the service. The one bonding point."],"math":null,"more":null,"ref":"NEC 2023, 250.28.","n":50,"id":"B-S5-50"},{"stem":"Receptacles in a dwelling garage require:","choices":["AFCI only","GFCI protection","No protection","240 V"],"answer":"B","center":["210.8(A)(2) — garages are GFCI."],"math":null,"more":null,"ref":"NEC 2023, 210.8(A)(2).","n":51,"id":"B-S5-51"},{"stem":"The overcurrent device protecting a conductor generally must not exceed the conductor's ampacity, except where:","choices":["Never","Always doubled","Permitted by the 'next size up' rule or other specific allowances","Halved"],"answer":"C","center":["240.4 — OCPD ≤ ampacity, with exceptions like 240.4(C) next-size-up and 240.4(D)."],"math":null,"more":null,"ref":"NEC 2023, 240.4.","n":52,"id":"B-S5-52"},{"stem":"AFCI protection in dwellings is intended to reduce the risk of:","choices":["Shock","Voltage drop","Overload","Fires caused by arcing faults"],"answer":"D","center":["210.12 — AFCI = arc-fault, fire prevention. (GFCI = shock.)"],"math":null,"more":null,"ref":"NEC 2023, 210.12.","n":53,"id":"B-S5-53"},{"stem":"Grounding electrodes present at a building (metal water pipe, building steel, Ufer, ground ring) must be:","choices":["Bonded together to form the grounding electrode system","Used individually","Ignored","Separated"],"answer":"A","center":["250.50 — all present electrodes are bonded into one grounding electrode system."],"math":null,"more":null,"ref":"NEC 2023, 250.50.","n":54,"id":"B-S5-54"},{"stem":"A metal underground water pipe used as a grounding electrode must be in direct contact with earth for at least:","choices":["5 ft","10 ft","20 ft","25 ft"],"answer":"B","center":["250.52(A)(1) — metal water pipe electrode: 10 ft or more in contact with earth."],"math":null,"more":null,"ref":"NEC 2023, 250.52(A)(1).","n":55,"id":"B-S5-55"},{"stem":"Conductors must be protected against overcurrent in accordance with their ampacities, and the point of protection is generally:","choices":["The load end","The middle","Where the conductor receives its supply (origin)","Anywhere"],"answer":"C","center":["240.21 — overcurrent protection goes at the point of supply, with tap-rule exceptions."],"math":null,"more":null,"ref":"NEC 2023, 240.21.","n":56,"id":"B-S5-56"},{"stem":"Where individual dwelling kitchen countertop spaces are wider than 12 in., receptacles must be placed so no point along the wall counter is more than:","choices":["12 in.","48 in.","36 in.","24 in."],"answer":"D","center":["210.52(C)(1) — counter receptacles so no point is more than 24 in. from one (reach of ~24 in.)."],"math":null,"more":null,"ref":"NEC 2023, 210.52(C)(1).","n":57,"id":"B-S5-57"},{"stem":"A grounding electrode conductor must be installed in one continuous length without a splice, except where:","choices":["Spliced by irreversible compression connectors or busbars as permitted","Never","Taped","Wire-nutted"],"answer":"A","center":["250.64(C) — GEC is continuous, or spliced only by listed irreversible means/busbar."],"math":null,"more":null,"ref":"NEC 2023, 250.64(C).","n":58,"id":"B-S5-58"},{"stem":"The service disconnecting means must plainly indicate whether it is in the open or closed position and be:","choices":["Hidden","Readily accessible and externally operable","Locked away","Tool-only"],"answer":"B","center":["230.76/230.70 — service disconnect: readily accessible, externally operable, clearly marked."],"math":null,"more":null,"ref":"NEC 2023, 230.70(A).","n":59,"id":"B-S5-59"},{"stem":"Outdoor receptacles at a dwelling are required at the front and back of the dwelling at grade level, located not more than how high above grade?","choices":["3 ft","4 ft 6 in.","6 ft 6 in.","8 ft"],"answer":"C","center":["210.52(E) — required outdoor receptacles not more than 6 ft 6 in. above grade."],"math":null,"more":null,"ref":"NEC 2023, 210.52(E).","n":60,"id":"B-S5-60"},{"stem":"The minimum number of 15- or 20-ampere general lighting branch circuits is determined by the calculated load at:","choices":["1 VA/sq ft","100 VA/sq ft","10 VA/sq ft","3 VA/sq ft for dwellings (general lighting)"],"answer":"D","center":["220.12/Table 220.12 — dwellings use 3 VA per sq ft for general lighting load."],"math":["Lighting VA = 3 × floor area (sq ft)"],"more":["The general lighting load for a dwelling is 3 VA/sq ft of habitable area. From the total VA you divide by circuit capacity (e.g., 120 V × 15 A = 1800 VA) to get the minimum number of lighting circuits. This is a classic dwelling load-calc starting point."],"ref":"NEC 2023, 220.41 (NEC 2020: Table 220.12) — 3 VA per sq ft for dwelling units.","n":61,"id":"B-S5-61","audit":["Medium: Labeled 'NEC 2023 Table 220.12' — in the 2023 NEC the dwelling 3 VA/ft² unit load moved to 220.41 (Table 220.12 is the 2020 location)."]},{"stem":"Equipment grounding conductors must be electrically continuous and capable of safely carrying:","choices":["The maximum ground-fault current likely to be imposed","The full load current continuously","No current","Twice the load"],"answer":"A","center":["250.4(B)(5) — the EGC must safely carry fault current to clear the device."],"math":null,"more":null,"ref":"NEC 2023, 250.4(A)(5).","n":62,"id":"B-S5-62"}]},{"title":"SECTION 6 — WIRING METHODS & MATERIALS","count":"16 of 100 questions","overview":["A big section drawn from NEC Chapter 3: boxes (314), conductors (310), and the raceway articles — EMT (358), RMC (344), PVC (352), flexible conduits, and conduit fill (Chapter 9 tables + Annex C). Lots of straightforward lookups and a few fill calculations.","Your power tabs here: Chapter 9 Table 1 (the 40% fill rule), Chapter 9 Table 4 (raceway areas), Chapter 9 Table 5 (conductor areas), and Annex C (the quick 'how many wires fit' tables). For box fill, tab 314.16 and its Table 314.16(B). Most fill questions can be answered straight from Annex C without any math — learn to use it."],"tip":"Trap to watch: conduit fill percentages. The magic numbers are 1 wire = 53%, 2 wires = 31%, 3 or more wires = 40%. The exam loves to give you three identical conductors (use 40%) or exactly two (use 31%). Read how many conductors before you pick the percentage.","questions":[{"stem":"EMT is joined and terminated by:","choices":["Setscrew or compression fittings","Threading","Solvent cement","Welding"],"answer":"A","center":["EMT is thinwall — no threads. Setscrew or compression couplings/connectors."],"math":null,"more":null,"ref":"NEC 2023, 358.6 / fittings.","n":63,"id":"B-S6-63"},{"stem":"The maximum trade size of EMT recognized by the NEC is:","choices":["2 in.","4 in.","3 in.","6 in."],"answer":"B","center":["358.20 — EMT is made up to trade size 4."],"math":null,"more":null,"ref":"NEC 2023, 358.20(B).","n":64,"id":"B-S6-64"},{"stem":"Where nonmetallic-sheathed cable (NM) emerges from the floor, it must be protected by:","choices":["Tape","Nothing","A raceway or other approved means","Paint"],"answer":"C","center":["334.15 — exposed NM subject to damage is protected by conduit/guard strip."],"math":null,"more":null,"ref":"NEC 2023, 334.15(B).","n":65,"id":"B-S6-65"},{"stem":"The minimum bending radius for conduit is provided to prevent:","choices":["Cost increase","Noise","Color change","Flattening of the raceway and damage to conductors"],"answer":"D","center":["Ch. 9 Table 2 — the radius keeps the raceway round and the wire safe."],"math":null,"more":null,"ref":"NEC 2023, Chapter 9, Table 2.","n":66,"id":"B-S6-66"},{"stem":"Boxes must be sized so that the total box fill does not exceed the volume:","choices":["Marked on the box or calculated per Table 314.16(A)","Of the largest conductor","Of the conduit","Of the room"],"answer":"A","center":["314.16 — box fill can't exceed the box's listed/marked volume."],"math":null,"more":null,"ref":"NEC 2023, 314.16.","n":67,"id":"B-S6-67"},{"stem":"A pull box for an angle pull where the largest raceway is 2 in. must have a minimum distance from that raceway to the opposite wall of:","choices":["8 in.","12 in.","16 in.","6 in."],"answer":"B","center":["314.28(A)(2) — angle pull = 6× largest raceway = 6 × 2 = 12 in. (plus other raceways)."],"math":["Angle pull = 6 × 2 in. = 12 in. (+ sum of others in the row)"],"more":null,"ref":"NEC 2023, 314.28(A)(2).","n":68,"id":"B-S6-68"},{"stem":"Type AC cable (armored cable) differs from MC primarily by its:","choices":["Color","Size","Bonding strip and the armor serving as the EGC","Voltage rating"],"answer":"C","center":["320 — AC cable's interlocked armor with internal bonding strip qualifies as the EGC; MC generally has a separate EGC."],"math":null,"more":null,"ref":"NEC 2023, Article 320.","n":69,"id":"B-S6-69"},{"stem":"Underground service conductors (direct buried, no GFCI special case) generally require a minimum cover of:","choices":["6 in.","12 in.","18 in.","24 in."],"answer":"D","center":["Table 300.5 — direct-buried service/feeder general cover is 24 in."],"math":null,"more":null,"ref":"NEC 2023, Table 300.5.","n":70,"id":"B-S6-70"},{"stem":"Raceways and cables installed in wet locations above grade must be listed for:","choices":["Wet locations","Dry locations","Hazardous areas","Plenum"],"answer":"A","center":["300.9/conductor types — wet locations need wet-rated methods and conductors."],"math":null,"more":null,"ref":"NEC 2023, 300.9.","n":71,"id":"B-S6-71"},{"stem":"The number of conductors permitted in a box is reduced when the box contains:","choices":["Only wire","Devices, clamps, fittings, or grounding conductors (which take volume)","Air","Labels"],"answer":"B","center":["314.16(B) — devices, clamps, fittings, and grounds all consume volume."],"math":null,"more":null,"ref":"NEC 2023, 314.16(B).","n":72,"id":"B-S6-72"},{"stem":"FMC (flexible metal conduit) is commonly used for:","choices":["Direct burial","Wet outdoor service","Connections where flexibility is required, in dry locations","Plenum air"],"answer":"C","center":["348.10 — FMC for flexibility in dry locations. (Liquidtight LFMC for wet.)"],"math":null,"more":null,"ref":"NEC 2023, 348.10.","n":73,"id":"B-S6-73"},{"stem":"When supporting EMT, it must be securely fastened within how many feet of each outlet box, junction box, or fitting?","choices":["1 ft","5 ft","10 ft","3 ft"],"answer":"D","center":["358.30(D) — secure EMT within 3 ft of each box/fitting."],"math":null,"more":null,"ref":"NEC 2023, 358.30(A).","n":74,"id":"B-S6-74"},{"stem":"A conduit body (LB, T, etc.) must have a volume marked on it if it is to contain:","choices":["Splices, taps, or devices","Only straight conductors","Air","A label"],"answer":"A","center":["314.16(C) — mark the volume if you'll splice/tap/install devices in the conduit body."],"math":null,"more":null,"ref":"NEC 2023, 314.16(C).","n":75,"id":"B-S6-75"},{"stem":"When installing conductors in parallel, all parallel raceways must have:","choices":["Different sizes","The same physical characteristics (so current divides evenly)","Random lengths","Mixed materials"],"answer":"B","center":["310.10(G) — parallel runs must match so current shares equally."],"math":null,"more":null,"ref":"NEC 2023, 310.10(G).","n":76,"id":"B-S6-76"},{"stem":"Rigid PVC conduit must be securely fastened within 3 ft of each box, cabinet, or fitting, and supported at intervals not exceeding the values in:","choices":["Table 352.30","Table 314.16(B)","Table 310.16","Table 250.66"],"answer":"A","center":["352.30(A): fasten within 3 ft of each box/cabinet/fitting. 352.30(B): support at intervals per Table 352.30 (closer than metal conduit since PVC is less rigid).","For 1/2–1 in. PVC the table interval is 3 ft; it increases for larger sizes. Choice: Table 352.30."],"math":null,"more":["PVC needs more support than steel because it's flexible and sags, especially when warm. Table 352.30 spacing runs from about 3 ft for small sizes up to 8 ft for the largest. And remember expansion fittings (352.44) on long runs for thermal movement."],"ref":"NEC 2023, 352.30 and Table 352.30.","n":77,"id":"B-S6-77"},{"stem":"Conductors emerging from the ground in PVC that transitions to exposed work must transition to a wiring method suitable for:","choices":["Underground only","Dry only","Plenum","The above-ground exposure and physical protection (e.g., RMC at the riser)"],"answer":"D","center":["300.5(B) — protect the riser where it leaves the ground, often with RMC/IMC."],"math":null,"more":null,"ref":"NEC 2023, 300.5(D).","n":78,"id":"B-S6-78"}]},{"title":"SECTION 7 — EQUIPMENT FOR GENERAL USE","count":"13 of 100 questions","overview":["This section comes from NEC Chapter 4: flexible cords (400), switches (404), receptacles (406), luminaires (410), appliances (422), heating (424), motors (430), and transformers (450). It's broad but mostly definitional and table-based.","Motors (Article 430) carry the most weight and the most math. Tab Table 430.250 (three-phase motor FLC) and Table 430.52 (max overcurrent device sizing). For motors, remember the golden rule: size the WIRES and overload from the motor nameplate, but size the BRANCH-CIRCUIT conductors from the FLC tables, at 125% for a single continuous-duty motor."],"tip":"Trap to watch: motor calculations use TABLE full-load current (FLC), not the nameplate amps, for sizing branch-circuit conductors and short-circuit/ground-fault protection. The nameplate is used for overload protection. Read which one the question wants.","questions":[{"stem":"A general-use snap switch rated for AC only must control loads not exceeding its:","choices":["Ampere and voltage rating","Voltage only","Color","Size"],"answer":"A","center":["404.14 — switch used within its ampere and voltage ratings."],"math":null,"more":null,"ref":"NEC 2023, 404.14.","n":79,"id":"B-S7-79"},{"stem":"The branch circuit for a single motor must be sized so the conductors carry at least 125% of the motor's:","choices":["Nameplate amps","Table full-load current","Locked-rotor amps","Voltage"],"answer":"B","center":["430.22 — conductors at 125% of TABLE FLC."],"math":null,"more":null,"ref":"NEC 2023, 430.22.","n":80,"id":"B-S7-80"},{"stem":"A 5 hp, 230-volt, single-phase motor has a table full-load current (FLC) per Table 430.248 of:","choices":["40 A","16 A","28 A","8 A"],"answer":"C","center":["Look it up directly in Table 430.248 (single-phase). 5 hp at 230 V = 28 A.","Single-phase motors use Table 430.248; three-phase use 430.250. For 5 hp at 230 V single-phase the table value is 28 A."],"math":null,"more":["Critical: single-phase motors use Table 430.248, three-phase use Table 430.250. The same horsepower draws MORE current single-phase than three-phase (no √3 benefit) — a 5 hp single-phase motor at 230 V is 28 A, but a 5 hp three-phase motor at 230 V is only about 15.2 A. Always confirm the phase before picking a table."],"ref":"NEC 2023, Table 430.248.","n":81,"id":"B-S7-81"},{"stem":"Receptacles rated 15 and 20 amperes in dwellings must generally be:","choices":["Hospital grade","Weatherproof","Isolated ground","Tamper-resistant"],"answer":"D","center":["406.12 — dwelling 15/20 A receptacles = tamper-resistant."],"math":null,"more":null,"ref":"NEC 2023, 406.12.","n":82,"id":"B-S7-82"},{"stem":"Recessed incandescent luminaires not marked IC must maintain clearance from combustible materials of at least:","choices":["1/2 in.","0 in.","1 in.","3 in."],"answer":"A","center":["410.116 — non-IC recessed fixtures keep 1/2 in. from combustibles (and thermal insulation clearances)."],"math":null,"more":null,"ref":"NEC 2023, 410.116(A)(1).","n":83,"id":"B-S7-83"},{"stem":"Conductors supplying several motors, or a motor and other loads, must have an ampacity not less than:","choices":["The sum of all full-load currents at 100%","125% of the largest motor's FLC, plus the sum of the other motors' FLC and the other loads","125% of every motor's FLC added together","80% of the total connected load"],"answer":"B","center":["430.24: take 125% of the largest motor's full-load current, then add 100% of the other motors' full-load currents and the other loads (continuous non-motor loads at 125%)."],"math":null,"more":null,"ref":"NEC 2020/2023, 430.24.","n":84,"id":"B-S7-84","audit":["Medium: Garbled stem ('appliance with a motor over 1/8 hp combined with other loads') and cites 430.24 for an appliance."]},{"stem":"Transformer secondary conductors supplying a single set of conductors to a single OCPD are protected primarily by:","choices":["The primary breaker only","No protection","Rules in 240.21(C) for the secondary side","A fuse on the rod"],"answer":"C","center":["240.21(B) — secondary conductors follow their own protection rules."],"math":null,"more":null,"ref":"NEC 2023, 240.21(C).","n":85,"id":"B-S7-85"},{"stem":"Capacitors must have a disconnecting means and overcurrent protection unless:","choices":["Always","Painted","Never required","Connected on the load side of a motor running OCPD in certain cases"],"answer":"D","center":["460.8 — capacitor protection/disconnect, with allowances when connected to a motor circuit."],"math":null,"more":null,"ref":"NEC 2023, 460.8.","n":86,"id":"B-S7-86"},{"stem":"The minimum branch-circuit rating for a household electric clothes dryer is based on a minimum load of:","choices":["5,000 watts (5 kVA) or nameplate, whichever is larger","1,500 VA","10,000 VA","500 VA"],"answer":"A","center":["220.54 — dryer load is the larger of 5000 VA or nameplate."],"math":null,"more":null,"ref":"NEC 2023, 220.54.","n":87,"id":"B-S7-87"},{"stem":"Wall switch-controlled lighting outlets are required in which dwelling locations?","choices":["Habitable rooms and bathrooms only","Habitable rooms, bathrooms, hallways, stairways, attached garages, and outdoor entrances/exits","Bedrooms only","Kitchens only"],"answer":"B","center":["210.70(A)(1) requires a switched lighting outlet in habitable rooms and bathrooms; 210.70(A)(2) adds hallways, stairways, attached garages, detached garages with power, and outdoor entrances/exits.","The complete answer is all of them, not just rooms and baths."],"math":null,"more":["210.70(A)(3) also requires a lighting outlet at attics, underfloor spaces, utility rooms, and basements when used for storage or containing equipment needing service. The exam likes the 'incomplete' trap — pick the choice that lists the most required areas."],"ref":"NEC 2023, 210.70(A).","n":88,"id":"B-S7-88"},{"stem":"Motor overload protection is designed to protect the motor and conductors from:","choices":["Short circuits only","Lightning","Sustained overcurrent due to motor overload (running too hot)","Voltage drop"],"answer":"C","center":["430 Part III — overloads protect against prolonged overcurrent/overheating; the breaker handles shorts."],"math":null,"more":null,"ref":"NEC 2023, 430.31.","n":89,"id":"B-S7-89"},{"stem":"A disconnecting means for appliances rated over 300 VA must be:","choices":["Not required","Hidden","Remote only","Within sight or lockable"],"answer":"D","center":["422.31/422.34 — appliance disconnects within sight or capable of being locked open."],"math":null,"more":null,"ref":"NEC 2023, 422.31.","n":90,"id":"B-S7-90"},{"stem":"Transformer ventilation openings must not be:","choices":["Blocked or obstructed","Present","Large","Screened"],"answer":"A","center":["450.9 — don't block transformer ventilation; heat must escape."],"math":null,"more":null,"ref":"NEC 2023, 450.9.","n":91,"id":"B-S7-91"}]},{"title":"SECTION 8 — SPECIAL OCCUPANCIES, EQUIPMENT & CONDITIONS","count":"8 of 100 questions","overview":["This section is NEC Chapter 5 (hazardous/special occupancies like 500–517 and 680 pools), Chapter 6 (special equipment), and Chapter 7 (special conditions like 700 emergency systems). On the real exam this is a smaller slice, but the questions can feel unfamiliar — so a little tabbing goes a long way.","You can't memorize all of Chapters 5–7, and you don't need to. Tab the headline articles: 500/501 (classified/hazardous locations), 680 (swimming pools & spas), 700 (emergency systems), and 760 (fire alarm). When a question names an occupancy (gas station, hospital, pool, grain bin), go straight to that occupancy's article — the answer is almost always a direct rule in the first few pages."],"tip":"Trap to watch: Class/Division terminology. Class I = flammable gases/vapors, Class II = combustible dust, Class III = fibers/flyings. Division 1 = hazard present in normal operation; Division 2 = hazard present only under abnormal conditions. The exam mixes these up on purpose.","questions":[{"stem":"Equipment in a Class II (dust) location must be designed to:","choices":["Exclude dust and not allow dust ignition (dustignitionproof)","Vent dust","Attract dust","Be open"],"answer":"A","center":["502 — Class II equipment keeps dust out and runs cool enough not to ignite it."],"math":null,"more":null,"ref":"NEC 2023, 502.6.","n":92,"id":"B-S8-92"},{"stem":"A commercial garage with major repair and fuel dispensing combines requirements of Articles:","choices":["517 and 520","511 and 514","600 and 700","725 and 760"],"answer":"B","center":["511 (repair garage) and 514 (fuel dispensing) both apply."],"math":null,"more":null,"ref":"NEC 2023, Articles 511 & 514.","n":93,"id":"B-S8-93"},{"stem":"Patient care space classification (Category 1, 2, etc.) in a hospital determines the level of:","choices":["Lighting","Paint","Electrical system reliability and redundancy required","Furniture"],"answer":"C","center":["517 — patient care categories drive redundancy/reliability requirements."],"math":null,"more":null,"ref":"NEC 2023, 517.10.","n":94,"id":"B-S8-94"},{"stem":"Theaters and similar locations (Article 520) have special rules because of:","choices":["High ceilings only","Outdoor exposure","Cold temperatures","Large crowds, stage equipment, and dimming systems"],"answer":"D","center":["520 — crowds, stage/dimmer equipment, and egress lighting drive the rules."],"math":null,"more":null,"ref":"NEC 2023, Article 520.","n":95,"id":"B-S8-95"},{"stem":"A spa or hot tub installed indoors requires GFCI protection and:","choices":["Equipotential bonding of metal parts","No bonding","240 V only","No disconnect"],"answer":"A","center":["680 Part IV — spas/hot tubs need GFCI and bonding, like pools."],"math":null,"more":null,"ref":"NEC 2020/2023, 680.43 (indoor installations) and 680.43(D) bonding.","n":96,"id":"B-S8-96","audit":["Low: Indoor spas are 680.43; 680.42 is outdoor installations."]},{"stem":"Recreational vehicle parks and the supply equipment for RV sites are covered by Article:","choices":["552","551","555","590"],"answer":"B","center":["RV parks = Article 551. (552 = park trailers, 555 = marinas.)"],"math":null,"more":null,"ref":"NEC 2023, Article 551.","n":97,"id":"B-S8-97"},{"stem":"Manufactured/mobile homes and the supply to them are addressed in Article:","choices":["547","545","550","551"],"answer":"C","center":["Mobile/manufactured homes = Article 550."],"math":null,"more":null,"ref":"NEC 2023, Article 550.","n":98,"id":"B-S8-98"},{"stem":"A wet-niche underwater pool light fixture must be installed so it can be:","choices":["Never removed","Sealed permanently","Painted in place","Removed to the deck for relamping with cord slack provided"],"answer":"D","center":["680.23 — wet-niche fixtures need enough cord to bring them onto the deck to service."],"math":null,"more":null,"ref":"NEC 2023, 680.23(B).","n":99,"id":"B-S8-99"}]},{"title":"SECTION 9 — COMMUNICATION SYSTEMS","count":"1 of 100 questions","overview":["The smallest section — just a sliver of the real exam — but worth a couple of easy points. It draws from NEC Chapter 8 (Articles 800 general communications, 805 telephone, 820 coax/CATV) and basic low-voltage practice.","Chapter 8 is unique: it stands alone and is NOT subject to the other chapters unless specifically referenced (that's the rule in 800.3). Tab 800.100 (bonding and grounding of communications) and 800.24 (mechanical execution / supporting cables). Most questions here are about separation from power conductors, grounding, and listing of cables."],"tip":"Trap to watch: remember that Chapter 8 is independent. A rule from Chapter 3 (like raceway fill) does NOT automatically apply to communications cabling unless Chapter 8 specifically points to it. The exam may bait you with a Chapter 3 rule on a Chapter 8 question.","questions":[{"stem":"When communications cables are installed near lightning protection conductors, they must maintain:","choices":["A separation (typically 6 ft) from lightning protection conductors where practicable","Contact","No separation","A bond only"],"answer":"A","center":["800.53/Chapter 8 — keep comms cables separated from lightning protection down-conductors (about 6 ft) where practicable."],"math":null,"more":["The reason is surge energy: a lightning strike puts enormous current and voltage on the lightning protection conductor. Keeping communications cable separated reduces inductive coupling that could fry equipment or shock a user. Where you can't separate, bonding requirements kick in."],"ref":"NEC 2023, 800.53 / Chapter 8.","n":100,"id":"B-S9-100"}]}];

const EXAM_MIN = 270;

const FLASHCARDS = {
  concept: [
    { tag: "S5", front: "Continuous Load — Conductor & OCPD Sizing", back: "Size conductors and the overcurrent device at 125% of a continuous load (one running 3 hrs or more). Run it backwards too: a breaker carries its rating ÷ 1.25 as continuous load (a 20A breaker = 16A continuous).", ref: "NEC 210.19(A) & 210.20(A)" },
    { tag: "S5", front: "Small-Conductor Rule", back: "Max overcurrent protection caps regardless of ampacity table: 14 AWG Cu = 15A, 12 AWG Cu = 20A, 10 AWG Cu = 30A. Don't get baited by the higher 90°C ampacity.", ref: "NEC 240.4(D)" },
    { tag: "S5", front: "GFCI vs. AFCI", back: "GFCI protects PEOPLE from shock in wet/grounded areas (baths, kitchens, garages, outdoors). AFCI protects the BUILDING from arc-fault fires in living areas (bedrooms, living rooms, halls).", ref: "NEC 210.8 (GFCI) / 210.12 (AFCI)" },
    { tag: "S6", front: "Conduit Fill Percentages", back: "1 conductor = 53% max fill. 2 conductors = 31%. 3 or more = 40%. Read how many wires before picking the percent.", ref: "NEC Ch. 9, Table 1" },
    { tag: "S6", front: "Max Bends Between Pull Points", back: "360° total (four 90° bends) in any one run between pull points — same number across every raceway article (EMT 358.26, RMC 344.26, PVC 352.26).", ref: "NEC 358.26 et al." },
    { tag: "S4", front: "Working Space Depth (110.26)", back: "Condition 1, 0–150V to ground = 3 ft minimum depth. Width = 30 in. or equipment width (greater). Headroom = 6½ ft. Table is organized by VOLTAGE TO GROUND.", ref: "NEC Table 110.26(A)(1)" },
    { tag: "S4", front: "Approved vs. Listed vs. Labeled", back: "APPROVED = acceptable to the AHJ (inspector). LISTED = on a recognized testing lab's published list. LABELED = carries that lab's mark. The exam offers all three — match the exact word.", ref: "NEC Article 100" },
    { tag: "S4", front: "Termination Temperature Rule", back: "The circuit's temperature rating is set by the LOWEST-rated termination, conductor, or device. 90°C wire on 75°C lugs = size from the 75°C column.", ref: "NEC 110.14(C)" },
    { tag: "S3", front: "Power Formula (single-phase)", back: "P = E × I. Watts = Volts × Amps. The whole power wheel (E=I×R, P=E×I, and combos) lives on one page in Ugly's — tab it.", ref: "Ugly's — Ohm's Law / Power Wheel" },
    { tag: "S3", front: "Three-Phase Power Factor √3", back: "Three-phase formulas add 1.732 (√3). Line current I = P ÷ (E × 1.732). Forgetting the 1.732 is the #1 theory mistake.", ref: "Ugly's — Three-Phase Formulas" },
    { tag: "S3", front: "Series vs. Parallel Resistance", back: "SERIES adds up (total bigger than any one resistor). PARALLEL divides (total smaller than the smallest resistor). If a 'parallel' total is bigger than your smallest R, you erred.", ref: "Ugly's — Series/Parallel" },
    { tag: "S7", front: "Motor Circuit — Three Percentages", back: "Conductors = 125% of TABLE FLC (430.22). Overload = ~115–125% of NAMEPLATE (430.32). Short-circuit/ground-fault breaker = big multiplier from Table 430.52 (e.g., 250%).", ref: "NEC Article 430" },
    { tag: "S7", front: "Motor FLC — Table not Nameplate", back: "For sizing branch-circuit conductors and the short-circuit device, ALWAYS use the table full-load current (430.250 for 3-phase), never the motor nameplate. Nameplate is only for overload.", ref: "NEC Table 430.250" },
    { tag: "S2", front: "Electrically Safe Work Condition — Order", back: "(1) Determine all sources → (2) OPEN disconnects → (3) verify open → (4) lockout/tagout → (5) test for absence of voltage → (6) ground if needed. Order is tested.", ref: "NFPA 70E Article 120" },
    { tag: "S8", front: "Hazardous Location Class & Division", back: "Class I = gases/vapors, II = dust, III = fibers. Division 1 = hazard in NORMAL operation; Division 2 = hazard only under ABNORMAL/fault conditions.", ref: "NEC 500.5" },
    { tag: "S8", front: "Emergency System Transfer Times", back: "Art. 700 EMERGENCY (life safety) = power in 10 sec. Art. 701 legally required standby = 60 sec. Art. 702 optional standby = no required time.", ref: "NEC 700.12" },
    { tag: "S9", front: "Chapter 8 Stands Alone", back: "Communications (Ch. 8) is independent of Chapters 1–7 except where specifically referenced. A Chapter 3 rule doesn't auto-apply to comms cabling.", ref: "NEC 800.3" },
    { tag: "S9", front: "Comms Cable Ratings", back: "CMP = plenum (highest, substitutes anywhere) > CMR = riser (vertical between floors) > CM = general > CMX = limited use. Higher rating replaces lower, never reverse.", ref: "NEC 800.179" },
    { tag: "S1", front: "Critical Path", back: "The longest chain of dependent activities — it sets the SHORTEST possible project duration. Slip any task on it and the whole job slips.", ref: "PMBOK 7th ed. — Schedule" },
    { tag: "S6", front: "Box Fill Basics (314.16)", back: "Count conductors, each device = 2, all clamps together = 1, all grounds together = 1 — times the volume for the largest conductor. 14 AWG = 2.00 cu in, 12 AWG = 2.25, 10 AWG = 2.50.", ref: "NEC Table 314.16(B)" },
    { tag: "S6", front: "ASHRAE 90.1 — what it governs", back: "The energy standard for commercial / non-low-rise-residential buildings (an allowed reference, NOT the NEC). For electricians: lighting power limits (LPD), automatic lighting controls (time switch / occupancy sensor), daylighting & exterior lighting controls, and minimum motor/transformer efficiency.", ref: "ANSI/ASHRAE/IES 90.1-2022" },
    { tag: "S6", front: "'Automatic lighting shutoff' — which book?", back: "ASHRAE 90.1, not the NEC. Commercial interior lighting generally must shut off automatically via a scheduled time switch or an occupancy/vacancy sensor when the space is unoccupied.", ref: "ANSI/ASHRAE/IES 90.1" },
  ],
  qa: [
    { tag: "S5", front: "Max overcurrent protection for 12 AWG copper?", back: "20 amperes — the small-conductor rule caps it regardless of the ampacity table.", ref: "NEC 240.4(D)(5)" },
    { tag: "S5", front: "A continuous 16A load needs what minimum conductor/breaker?", back: "20A. 16 × 1.25 = 20.", ref: "NEC 210.19(A) & 210.20(A)" },
    { tag: "S6", front: "Max total bends in one conduit run between pull points?", back: "360 degrees (four 90° bends).", ref: "NEC 358.26" },
    { tag: "S6", front: "Max conduit fill for 3 or more conductors?", back: "40 percent.", ref: "NEC Ch. 9, Table 1" },
    { tag: "S4", front: "Min working space depth, 0–150V to ground, Condition 1?", back: "3 feet.", ref: "NEC Table 110.26(A)(1)" },
    { tag: "S4", front: "Min headroom for working space about service equipment?", back: "6 ft 6 in. (6½ ft).", ref: "NEC 110.26(A)(3)" },
    { tag: "S3", front: "Power of a 240V load drawing 25A?", back: "6,000 watts. P = E × I = 240 × 25.", ref: "Ugly's — Power Wheel" },
    { tag: "S3", front: "Line current of 30kW, 480V, 3-phase load?", back: "≈36.1A. I = 30,000 ÷ (480 × 1.732).", ref: "Ugly's — 3-Phase" },
    { tag: "S3", front: "Voltage between the two hots in a 120/240V single-phase system?", back: "240 volts (not 208 — that's 3-phase wye).", ref: "Ugly's — Single-Phase" },
    { tag: "S7", front: "Branch-circuit conductors for a single continuous-duty motor?", back: "125% of the motor's table full-load current.", ref: "NEC 430.22" },
    { tag: "S7", front: "FLC of a 10 HP, 230V, 3-phase motor?", back: "28 amperes (from the table — not the nameplate).", ref: "NEC Table 430.250" },
    { tag: "S2", front: "First step after determining all sources, to make safe?", back: "Open the disconnecting device(s) for each source.", ref: "NFPA 70E Art. 120" },
    { tag: "S8", front: "A flammable-gas area is which Class?", back: "Class I (gases/vapors). Class II = dust, III = fibers.", ref: "NEC 500.5" },
    { tag: "S8", front: "Emergency systems must restore power within how long?", back: "10 seconds (Article 700).", ref: "NEC 700.12" },
    { tag: "S5", front: "Does a dwelling kitchen countertop receptacle need GFCI?", back: "Yes — it's explicitly on the 210.8(A) list. Bedrooms are AFCI, not GFCI.", ref: "NEC 210.8(A)" },
    { tag: "S6", front: "How many 12 AWG THHN fit in 3/4-in. EMT?", back: "16 conductors (read straight from Annex C).", ref: "NEC Annex C, Table C.1" },
    { tag: "S9", front: "What cable rating is required in a plenum?", back: "CMP (plenum-rated) — low smoke/flame in air-handling spaces.", ref: "NEC 800.179" },
    { tag: "S4", front: "What does 'approved' mean in the NEC?", back: "Acceptable to the authority having jurisdiction (the inspector).", ref: "NEC Article 100" },
    { tag: "S5", front: "The 'next size up' rule applies up to what ampacity?", back: "800A or less (and not a receptacle circuit) — round up to next standard size. Over 800A you round DOWN.", ref: "NEC 240.4(B)/(C)" },
    { tag: "S1", front: "What sets the shortest possible project duration?", back: "The critical path — the longest chain of dependent tasks.", ref: "PMBOK 7th ed." },
  ],
};

// Torque's rotating tips for the home screen (foreman voice)
const TORQUE_TIPS = [
  "Tab your book before test day, not during. The clock don't care how fast you flip.",
  "See 'continuous load'? Your hand reaches for 1.25 before your brain even finishes the sentence.",
  "Three-phase means 1.732 is in the formula. Forget it and you'll pick the trap every time.",
  "The grounded conductor is usually the neutral; grounding is the safety ground. Say it slow, get it right.",
  "When two answers fight, pick the safer one. The Code almost always sides with safe.",
  "Conduit fill: COUNT the wires before you grab a percentage. Two wires is 31, not 40.",
  "Motor circuit, three numbers: conductors off the table, overload off the nameplate, breaker off 430.52.",
  "GFCI saves the person. AFCI saves the house. Match the room to the job.",
  "Neutral bonds to ground at ONE spot — the service. Never in a subpanel.",
  "Definition question? Don't reason it. Flip to Article 100 and read the exact words.",
  "Don't leave blanks on the real exam. A guess can be right; a blank never is.",
  "Read the whole question twice. Half the wrong answers come from missing one word.",
  "Start at Table 110.26(A)(1) — the 3 ft working-space depth applies only to some conditions and voltages. Whatever the table gives you, keep it clear: no boxes, no buckets, no excuses.",
  "Derate for heat AND for crowding, but you don't stack both the same way — know which table is which.",
  "Service disconnect: six throws max, and the new code wants them in their own enclosures.",
  "EGC is sized off the breaker (250.122). GEC is sized off the service conductors (250.66). Two different tables.",
  "Box too full is a real violation. Count conductors, clamps, and devices — then check Table 314.16.",
  "Dwelling receptacle rule: no point along the wall more than 6 feet from an outlet. Walk it in your head.",
  "Read the WHOLE question twice. Half the traps are one word — 'dwelling,' 'single,' 'continuous.'",
  "On a motor, the overload device protects against overload; the breaker or fuse handles short-circuit and ground-fault. Different jobs, different sizes.",
  "If a question gives you a load in VA, they want amps. Single-phase: divide by the voltage. Three-phase: divide by volts × 1.732.",
  "PVC moves with heat. Long runs need expansion fittings — don't let that one sneak past you.",
];


// STUDY_GUIDES — rich per-section study content. Keyed by section index 0..8.
// Each: { guide:[paras], tabBooks:[{book, items:[]}], keyNumbers:[{v,label}], proTips:[{title, tip, torque, intro}] }
const STUDY_GUIDES = {
  // ===== 0 PROJECT DESIGN & MANAGEMENT =====
  0: {
    guide: [
      "This section is business and law, not code. It pulls from the NASCLA Contractors Guide to Business, Law & Project Management and the PMBOK Guide. Do not reach for your NEC here — you will burn time you don't have. The questions cover bidding, contracts, estimating, scheduling, insurance, bonds, liens, and project closeout.",
      "The good news: most of these are common-sense questions for anyone who has run a job. The contractor who documents everything, pulls permits, carries the right insurance, and gets change orders signed before doing the work is always the 'right answer.' When two answers compete, the one that is more written-down, more by-the-book, and more protective of both parties wins.",
      "Know your contract types cold, because risk lives there. In a lump-sum (fixed-price) contract the contractor eats cost overruns. In cost-plus, the owner carries that risk and reimburses costs plus a fee. Unit-price splits it per unit of work. The exam loves to ask 'who bears the risk' in each.",
      "Estimating terms trip people up: overhead is your ongoing cost of doing business (rent, insurance, office salaries); profit is what you keep; contingency is money set aside for the unknowns; a material takeoff is the count of materials off the plans. Each is a distinct term with a distinct definition — match the wording exactly.",
    ],
    tabBooks: [
      { book: "NASCLA Business, Law & PM", items: ["Contracts & Change Orders", "Estimating (overhead, profit, contingency)", "Bonds & Insurance", "Liens", "Project Closeout / Punch List"] },
      { book: "PMBOK Guide, 7th ed.", items: ["Scope Management", "Schedule / Critical Path Method"] },
    ],
    keyNumbers: [
      { v: "5–10%", label: "Typical retainage withheld until completion" },
      { v: "Lump-sum", label: "Contractor bears overrun risk" },
      { v: "Cost-plus", label: "Owner bears overrun risk" },
    ],
    proTips: [
      { title: "Pick the 'documented' answer", img: CHEAT_DOCS, tip: "When two answers compete, choose the one that's more written-down and by-the-book: signed change orders, written contracts, pulled permits. Aggressive or verbal-only choices are almost always the wrong answer.", torque: true, intro: "Listen up — twenty-five years and I've never once seen 'we agreed on a handshake' save a contractor in court." },
      { title: "Know who carries the risk", img: CHEAT_RISK, tip: "Lump-sum = contractor eats overruns (owner gets price certainty). Cost-plus = owner carries the risk, pays cost + fee. Unit-price = shared per unit. 'Who bears the risk' is a favorite question.", torque: true, intro: "Here's the one that pays your mortgage or sinks it — read the contract type before you bid." },
      { title: "Performance vs. payment bond", img: CHEAT_BONDS, tip: "A performance bond guarantees you'll finish the job per contract. A payment bond guarantees your subs and suppliers get paid. Don't swap them.", torque: false },
      { title: "Mechanic's lien", img: CHEAT_LIEN, tip: "A lien filed by someone unpaid for labor or materials that improved a property is a mechanic's lien — not a tax, judgment, or mortgage lien.", torque: false },
    ],
  },

  // ===== 1 SAFETY =====
  1: {
    guide: [
      "Safety questions come from OSHA 29 CFR 1926 (construction), 1910 (general industry), and NFPA 70E (electrical safety in the workplace). The governing philosophy is simple: the safest answer is almost always correct. When one choice says 'de-energize and lock out' and another says 'work it carefully while hot,' the de-energize answer wins — unless the question specifically says de-energizing creates a greater hazard or is infeasible.",
      "NFPA 70E's centerpiece is the electrically safe work condition, and it's an ordered process you must know in sequence: determine all sources, open the disconnects, visually verify the opening, apply lockout/tagout, test for the absence of voltage with a verified meter, and ground where needed. The exam will hand you the middle of that list and ask for the next step.",
      "Lockout/tagout (OSHA 1910.147) requires devices that are durable, standardized, substantial, and that identify who applied them — and only that person removes their own lock. Tape and markers don't cut it. The whole point is that no one can re-energize a circuit while someone is working on it out of sight.",
      "Arc flash is its own world. The arc flash boundary is the distance where incident energy hits 1.2 cal/cm² — the threshold for a second-degree burn. PPE is selected either by an incident-energy analysis or the PPE category table, never by preference. And for fires: Class C extinguishers are for energized electrical equipment (C for 'current').",
    ],
    tabBooks: [
      { book: "NFPA 70E 2024", items: ["Art. 110 — General work practices", "Art. 120 — Establishing safe work condition", "Art. 130 — Energized work / PPE", "130.5 — Arc flash boundary"] },
      { book: "OSHA 29 CFR 1926", items: ["Subpart K — Electrical", "1926.404 — GFCI / assured grounding"] },
      { book: "OSHA 29 CFR 1910", items: ["1910.147 — Lockout/Tagout", "1910.146 — Confined Spaces"] },
    ],
    keyNumbers: [
      { v: "1.2", label: "cal/cm² — arc flash boundary (2nd-degree burn)" },
      { v: "Class C", label: "Extinguisher for energized electrical fire" },
      { v: "Live-Dead-Live", label: "Verify meter before & after testing" },
    ],
    proTips: [
      { title: "When in doubt, de-energize", img: CHEAT_DEENERGIZE, tip: "If one answer says lock it out and another says work it hot, pick de-energize — unless the question states de-energizing causes a greater hazard or is infeasible. That's the only exception NFPA 70E allows.", torque: true, intro: "I've buried friends who 'just needed a second' on a hot panel. De-energize. Every time the question lets you." },
      { title: "Know the safe-work-condition ORDER", img: CHEAT_ESWC, tip: "Determine sources → OPEN disconnects → verify open → lockout/tagout → TEST for absence of voltage → ground if needed. They'll give you one step and ask for the next.", torque: true, intro: "Memorize this like your address. Out of order on the job, somebody gets hurt; out of order on the test, you lose the point." },
      { title: "Live-Dead-Live", img: CHEAT_LIVEDEAD, tip: "Test your meter on a known live source, test the circuit (should read dead), then re-test the known live source to prove your meter didn't fail mid-test. NFPA 70E requires verifying the instrument before and after.", torque: true, intro: "A meter that lies is worse than no meter. Prove it works, prove it's dead, prove it still works." },
      { title: "Never touch a contact victim", img: CHEAT_VICTIM, tip: "If a coworker is still in contact with an energized conductor, kill the power first — don't grab them, or you become victim number two. Use a non-conductive means to separate if you can't de-energize.", torque: true, intro: "Hardest thing you'll ever do is NOT grab your buddy. But a second body on the wire helps nobody." },
      { title: "Fiberglass, not aluminum", img: CHEAT_LADDER, tip: "Near electrical work, use a non-conductive fiberglass ladder. A metal ladder is a path to ground through you.", torque: false },
    ],
  },

  // ===== 2 ELECTRICAL THEORY =====
  2: {
    guide: [
      "Theory is your math and fundamentals section, drawn from Mike Holt's Understanding Electrical Theory and Ugly's Electrical References. It covers Ohm's Law, the power wheel, series vs. parallel circuits, voltage drop, AC basics, power factor, and the differences between single-phase and three-phase.",
      "Your single most valuable open-book page is the Ohm's Law / power wheel in Ugly's. Tab it. Nearly every calculation comes off that wheel: E = I × R, P = E × I, and their combinations. If you can find that page in five seconds, you can solve most of this section without memorizing a formula.",
      "Series and parallel behave oppositely, and the exam exploits the confusion. In series, the current is the same everywhere and resistances add up (total is bigger than any one resistor). In parallel, the voltage is the same across each branch and resistance goes down (total is smaller than the smallest resistor). If a 'parallel' answer comes out bigger than your smallest resistor, you made an error — stop and recheck.",
      "Three-phase is where points get lost. Three-phase power formulas carry a √3 (1.732) factor. The instant a question says 'three-phase,' your three-phase formula page is the one you want — not the single-phase wheel. Forgetting the 1.732 is the number-one theory mistake on the whole exam.",
    ],
    tabBooks: [
      { book: "Ugly's Electrical References", items: ["Ohm's Law / Power Wheel", "Single-Phase Formulas", "Three-Phase Formulas (√3)", "Series & Parallel Circuits", "Horsepower / Watts conversions"] },
      { book: "Mike Holt — Understanding Electrical Theory", items: ["AC Fundamentals", "Power Factor", "Conductor Resistance"] },
    ],
    keyNumbers: [
      { v: "1.732", label: "√3 — the three-phase factor" },
      { v: "746", label: "Watts per horsepower" },
      { v: "60", label: "Hz — U.S. line frequency" },
      { v: "P = E × I", label: "Power = Volts × Amps" },
    ],
    proTips: [
      { title: "The 1.732 trap", img: CHEAT_1732, tip: "Three-phase formulas include √3 = 1.732. The classic wrong answer is the one you get by forgetting it (just P ÷ E). See 'three-phase'? Reach for the three-phase page, not the single-phase wheel.", torque: true, intro: "This little number, 1.732, has failed more apprentices than bad coffee. Don't be one of 'em." },
      { title: "Series adds, parallel divides", img: CHEAT_SERIES, tip: "Series: current is the same everywhere, resistances ADD (total > any resistor). Parallel: voltage is the same, resistance DROPS (total < smallest resistor). A parallel total bigger than your smallest resistor means you slipped.", torque: true, intro: "Easy way to never blow it: parallel makes things SMALLER. If your answer got bigger, you went the wrong way." },
      { title: "Build the power wheel into muscle memory", img: CHEAT_WHEEL, tip: "Volts, amps, ohms, watts — the wheel connects all four. Know which two you're given and which one you want, then pick the matching slice. It's all on one page in Ugly's.", torque: false },
      { title: "Voltage drop is just Ohm's Law", img: CHEAT_VDROP, tip: "Voltage drop across a wire = I × R of that wire. NEC recommends keeping branch-circuit drop under 3% (210.19 note). Long runs need bigger wire because resistance climbs with length.", torque: true, intro: "Long run to a fan motor way out in a warehouse? Voltage drop'll eat you alive. Upsize the wire." },
    ],
  },

  // ===== 3 GENERAL CODE REQUIREMENTS =====
  3: {
    guide: [
      "This is one of the two heaviest sections on the exam (17 of 100 questions), so it deserves real time. It draws from NEC Chapter 1 — Articles 90, 100, and 110 — covering the Code's purpose, definitions, general installation rules, working space, conductor temperature limits, and equipment marking.",
      "A huge share of 'code' questions here are really definition questions in disguise. If a question asks 'which term is defined as…' or 'as defined in the NEC,' go straight to Article 100 and match the exact wording. Don't reason from job experience — the Code's definition is the only one that counts.",
      "Working space (110.26) is gold. Tab Table 110.26(A)(1) and learn to read its three Conditions. The table is organized by voltage TO GROUND, so confirm which voltage the question gives before you pick a row. Know the core numbers: 3 ft depth (0–150 V), 30 in. width (or equipment width, whichever is greater), and 6½ ft headroom.",
      "Temperature limits cause a lot of conductor-sizing errors. Under 110.14(C), the whole circuit is limited by the lowest-rated termination, conductor, or device — the weakest link. You might have 90°C THHN wire, but if the breaker lugs are rated 75°C, you size from the 75°C column. The 90°C column is generally only for derating math, not final termination sizing.",
    ],
    tabBooks: [
      { book: "NEC 2023 — Chapter 1", items: ["Article 90 — Purpose & scope", "Article 100 — Definitions (tab heavily)", "110.14(C) — Temperature limitations", "110.26 — Working space", "Table 110.26(A)(1) — Working clearances"] },
    ],
    keyNumbers: [
      { v: "3 ft", label: "Working depth, 0–150 V, Condition 1" },
      { v: "30 in.", label: "Working space width (or equipment width)" },
      { v: "6 ft 6 in.", label: "Minimum headroom at equipment" },
      { v: "1200 A", label: "Threshold for two entrances / egress rules" },
      { v: "Lowest", label: "Termination rating governs the circuit" },
    ],
    proTips: [
      { title: "Definition questions → Article 100", img: CHEAT_DEFS, tip: "'As defined in the NEC,' 'which term means…' — these aren't reasoning questions, they're lookups. Flip to Article 100 and match the exact wording. Don't answer from field habit.", torque: true, intro: "Field smarts and the Code's exact words ain't always the same thing. On a definition question, the book wins." },
      { title: "Approved ≠ Listed ≠ Labeled", img: CHEAT_APPROVED, tip: "APPROVED = acceptable to the AHJ (inspector). LISTED = on a testing lab's published list. LABELED = carries the lab's mark. The exam offers all three on one question to bait you.", torque: true, intro: "Three words that look like triplets and ain't. The inspector 'approves.' UL 'lists.' Match the exact word in the question." },
      { title: "Read the working-space table by VOLTAGE TO GROUND", img: CHEAT_WSTABLE, tip: "Table 110.26(A)(1) is organized by voltage to ground, and by Condition (1, 2, or 3). Confirm both before reading a cell. Condition 1 = least hazard/space; Condition 3 = live parts both sides, most space.", torque: true, intro: "Wrong row, wrong answer. Check the voltage-to-ground AND the condition number before your finger lands on a cell." },
      { title: "The weakest-link temperature rule", img: CHEAT_WEAKLINK, tip: "110.14(C): the lowest-rated termination, conductor, or device sets the whole circuit's temperature rating. 90°C wire on 75°C lugs = size from the 75°C column. The 90°C column is mostly for derating math.", torque: true, intro: "Your fancy 90-degree wire don't matter if the lug it lands on is only good for 75. Size to the weakest link." },
      { title: "Width vs. depth — don't mix them", img: CHEAT_WIDTHDEPTH, tip: "Working space DEPTH (front clearance) for 0–150 V is 3 ft. WIDTH is 30 in. (or the equipment width). People swap the 30 in. and 36 in. constantly.", torque: false },
    ],
  },

  // ===== 4 WIRING & PROTECTION =====
  4: {
    guide: [
      "The other heaviest section (17 of 100), and where the exam truly lives. This is NEC Chapter 2: branch circuits (210), feeders (215), services (230), overcurrent protection (240), and grounding & bonding (250). Most questions are lookups — your job is to know which tab to flip to, fast.",
      "Keep four tabs ready and you'll fly: 210 (branch circuits, GFCI/AFCI), 240 (overcurrent + the small-conductor rule), 250 (grounding & bonding), and Table 310.16 (ampacity). A handful of trap words flip the answer: 'continuous load' (×1.25), 'copper vs. aluminum' (different ampacity columns), 'dwelling vs. other than dwelling,' and 'overcurrent device' vs. 'conductor ampacity.'",
      "Grounding and bonding (250) confuse more electricians than anything else, mostly because of two words that sound alike. The grounded conductor is the neutral (white/gray) — it carries current. The grounding conductor (EGC) is green or bare — it carries fault current only. They're intentionally tied together at exactly ONE place: the service, via the main bonding jumper. Every subpanel downstream keeps them separated.",
      "GFCI and AFCI also get swapped constantly. GFCI (210.8) protects PEOPLE from shock in wet or grounded areas — baths, kitchens, garages, outdoors, basements, laundry. AFCI (210.12) protects the BUILDING from arcing-fault fires in living areas — bedrooms, living rooms, halls, closets. A dwelling kitchen needs both. The exam will plant a bedroom on a GFCI question to see if you bite.",
    ],
    tabBooks: [
      { book: "NEC 2023 — Chapter 2", items: ["210 — Branch circuits, GFCI/AFCI", "210.8 (GFCI) & 210.12 (AFCI)", "215 — Feeders", "230 — Services (six-disconnect rule 230.71)", "240 — Overcurrent (240.4(D) small conductors)", "250 — Grounding & bonding", "Table 250.122 — EGC sizing", "Table 250.66 — GEC sizing"] },
      { book: "NEC 2023 — Article 310", items: ["Table 310.16 — Ampacities"] },
    ],
    keyNumbers: [
      { v: "125%", label: "Continuous-load multiplier" },
      { v: "14=15, 12=20, 10=30", label: "Small-conductor Cu breaker caps" },
      { v: "6", label: "Max service disconnects (230.71)" },
      { v: "6 ft 7 in.", label: "Max breaker handle height" },
      { v: "1 point", label: "Neutral-ground bond: service only" },
    ],
    proTips: [
      { title: "'Continuous' means ×1.25", img: CHEAT_CONTINUOUS, tip: "The instant you read 'continuous load' (runs 3 hrs+), multiply by 1.25 for the conductor and breaker. Backwards too: a 20 A breaker carries only 16 A continuous (20 ÷ 1.25).", torque: true, intro: "See the word 'continuous,' your hand should already be reaching for 1.25. No thinking required." },
      { title: "Small-conductor rule beats the ampacity table", img: CHEAT_SMALLCOND, tip: "240.4(D) caps the breaker for small wire regardless of the table: 14 Cu = 15 A, 12 Cu = 20 A, 10 Cu = 30 A. Table 310.16 might show 12 AWG at 30 A — don't take the bait.", torque: true, intro: "The table'll tempt you with a bigger number. 240.4(D) says nope. Small wire, small breaker." },
      { title: "Grounded vs. grounding", tip: "GROUNDED conductor = neutral = white/gray = carries current. GROUNDING conductor = EGC = green/bare = fault current only. One letter apart, totally different jobs. The #1 terminology trap.", torque: true, intro: "Twenty-five years and I still slow down on these two words. Grounded is the neutral. Grounding is the safety ground. Say it slow." },
      { title: "GFCI protects people, AFCI protects the building", img: CHEAT_GFCIAFCI, tip: "GFCI (210.8): wet/grounded areas — baths, kitchens, garages, outdoors. AFCI (210.12): living areas — bedrooms, living rooms, halls, closets. They'll drop a bedroom into a GFCI question to fool you.", torque: true, intro: "GFCI keeps YOU from getting bit. AFCI keeps the HOUSE from burning. Match the room to the job." },
      { title: "One bonding point only", img: CHEAT_BONDPT, tip: "Neutral and ground tie together at exactly ONE place — the service main bonding jumper. Every subpanel keeps neutrals isolated and grounds separate. Bond again downstream and you put current on the ground system.", torque: true, intro: "Bond it twice and you've got current riding the ground wire — the kind of mistake that bites somebody months later. One point. Service only." },
    ],
  },

  // ===== 5 WIRING METHODS & MATERIALS =====
  5: {
    guide: [
      "A big section (16 of 100) from NEC Chapter 3: boxes (314), conductors (310), and the raceway articles — EMT (358), RMC (344), PVC (352), FMC (348), LFMC (350), MC cable (330), NM cable (334). Plus conduit fill (Chapter 9 tables and Annex C) and box fill (314.16). Lots of straightforward lookups and a few calculations.",
      "Conduit fill is the math you must own. The percentages: 1 conductor = 53%, 2 conductors = 31%, 3 or more = 40%. Read how many conductors before you pick the percent — the exam loves to give you exactly two (31%) when you're expecting the famous '40% rule.' When all conductors are the same size, skip the math entirely and read the answer straight out of Annex C.",
      "Box fill (314.16) has its own counting system: each conductor counts as 1, each device (on a yoke) counts as 2, all clamps together count as 1, all grounds together count as 1 — then multiply by the volume for the largest conductor present. The base volumes: 14 AWG = 2.00 cu in, 12 AWG = 2.25, 10 AWG = 2.50.",
      "Know your raceway article numbers and their support rules, because the exam asks both. The 360° maximum-bend rule between pull points is the same across every raceway article. Support intervals differ by type — EMT is secured within 3 ft of a box and every 10 ft. And PVC needs expansion fittings because it moves about four times as much as steel with temperature.",
    ],
    tabBooks: [
      { book: "NEC 2023 — Chapter 3", items: ["314.16 — Box fill + Table 314.16(B)", "314.28 — Pull/junction box sizing", "358 (EMT), 344 (RMC), 352 (PVC)", "348 (FMC), 350 (LFMC), 330 (MC), 334 (NM)", "300.4 — Physical protection / nail plates", "Table 300.5 — Burial depths"] },
      { book: "NEC 2023 — Chapter 9 & Annex C", items: ["Table 1 — Fill percentages (53/31/40)", "Tables 4 & 5 — Raceway & conductor areas", "Annex C — Same-size conductor fill"] },
    ],
    keyNumbers: [
      { v: "53 / 31 / 40", label: "Fill %: 1 / 2 / 3+ conductors" },
      { v: "360°", label: "Max bends between pull points" },
      { v: "2.00 / 2.25 / 2.50", label: "Box-fill cu in: 14 / 12 / 10 AWG" },
      { v: "8× / 6×", label: "Pull box: straight / angle pulls" },
      { v: "1/4 in.", label: "PVC expansion-fitting trigger" },
    ],
    proTips: [
      { title: "Count conductors BEFORE picking the fill %", img: CHEAT_COUNT, tip: "1 wire = 53%, 2 wires = 31%, 3+ = 40%. The exam plants exactly two conductors expecting you to grab 40% out of habit. Read the count first.", torque: true, intro: "Everybody screams '40 percent!' Then the question gives you TWO wires and the answer's 31. Count first, brag later." },
      { title: "Same-size wires? Use Annex C, skip the math", img: CHEAT_ANNEXC, tip: "When all conductors are the same size and type, Annex C tells you exactly how many fit — no calculation. Mixed sizes? Then you go to Chapter 9 Tables 1, 4, 5 and do the area math.", torque: true, intro: "Annex C is the cheat sheet the Code GIVES you. Same-size wires, just read the box. Save the math for mixed sizes." },
      { title: "360° max bends — every raceway", tip: "No more than 360° of bends (four 90s) between pull points, and it's the same number in every raceway article — EMT, RMC, PVC, IMC. Need more? Add a pull box to reset the count.", torque: true, intro: "Four 90s and you're done. Try to cram in a fifth and you'll be cussing that wire pull till sundown. Add a box." },
      { title: "Box fill counting", img: CHEAT_BOXFILL, tip: "Each conductor = 1, each device = 2, all clamps = 1, all grounds = 1. Multiply by the volume for the LARGEST conductor present. 14=2.00, 12=2.25, 10=2.50 cu in.", torque: true, intro: "Devices count as two, all your grounds count as one. Get the count right and the cubic inches almost size themselves." },
      { title: "Straight pull = 8×, angle pull = 6×", tip: "Pull-box minimum: straight pull = 8× the largest raceway. Angle/U pull = 6× the largest PLUS the sum of the others. Angle pulls need way more room so wire doesn't kink.", torque: false },
      { title: "PVC moves — plan for it", tip: "PVC expands about 4× more than steel with temperature. Expansion fittings are required at 1/4 in. of expected movement (352.44). Long exterior runs without them crack joints.", torque: false },
    ],
  },

  // ===== 6 EQUIPMENT FOR GENERAL USE =====
  6: {
    guide: [
      "This broad section (13 of 100) comes from NEC Chapter 4: flexible cords (400), switches (404), receptacles (406), luminaires (410), appliances (422), space heating (424), motors (430), HVAC (440), transformers (450), and capacitors (460). It's mostly definitional and table-based, with motors carrying the most weight and the most math.",
      "Motors (Article 430) are the make-or-break topic. The golden rule is three different percentages for three different jobs. Branch-circuit conductors are sized at 125% of the TABLE full-load current (430.22). Overload protection is sized from the motor's NAMEPLATE amps (430.32). The short-circuit/ground-fault breaker uses a large multiplier from Table 430.52 (like 250% for an inverse-time breaker) because motors draw huge inrush at startup.",
      "The single most important motor habit: use the TABLE full-load current (Table 430.250 for three-phase) to size conductors and the short-circuit device — never the nameplate amps. The nameplate is only for overload sizing. The exam deliberately offers a 'nameplate-looking' number as a distractor.",
      "Receptacles and switches are simpler. A switch must be rated for at least the load it controls. On a 20 A multi-outlet circuit, receptacles may be 15 OR 20 A rated (a 15 A duplex passes 20 A through its strap). Most dwelling receptacles must be tamper-resistant (406.12), and wet-location receptacles need weather-resistant rating plus the right cover. HVAC compressors follow Article 440 and use rated-load current, not nameplate horsepower.",
      "One reference that catches electricians off guard is ANSI/ASHRAE/IES 90.1, the energy standard on your allowed-book list. It is NOT the NEC. You won't get many questions from it, but know what it owns: energy-efficient design of commercial and non-low-rise-residential buildings. For an electrician the relevant parts are lighting and power. 90.1 caps how much lighting power a space may use (lighting power density), requires automatic lighting controls — a scheduled time switch or occupancy/vacancy sensor that shuts lights off when a space is empty, daylight-responsive dimming near windows and skylights, and photocell or astronomical time-switch control for exterior lighting — and sets minimum efficiencies for equipment like motors and transformers. The tell: if a question says 'energy standard,' 'lighting power allowance/density,' or 'automatic lighting shutoff,' the source is 90.1, not the NEC.",
    ],
    tabBooks: [
      { book: "NEC 2023 — Chapter 4", items: ["430 — Motors (the big one)", "Table 430.250 — 3-phase motor FLC", "Table 430.52 — Max OCPD sizing", "440 — A/C & refrigeration", "404/406 — Switches & receptacles", "410 — Luminaires", "422/424 — Appliances & heating", "450 — Transformers"] },
      { book: "ASHRAE 90.1-2022", items: ["Sec. 9 — Lighting power limits & controls", "Motor / transformer minimum efficiency"] },
    ],
    keyNumbers: [
      { v: "125%", label: "Motor branch-circuit conductors (of table FLC)" },
      { v: "Table FLC", label: "Use it — not the nameplate — for conductors" },
      { v: "250%", label: "Typical inverse-time breaker (Table 430.52)" },
      { v: "1 min", label: "Capacitor discharge to 50 V (460.6)" },
    ],
    proTips: [
      { title: "Motor circuit = three different percentages", tip: "Conductors = 125% of TABLE FLC (430.22). Overload = ~115–125% of NAMEPLATE (430.32). Short-circuit breaker = big multiplier from Table 430.52 (e.g., 250%). Three jobs, three numbers.", torque: true, intro: "This is the one that separates the journeymen from the guessers. Three numbers, three jobs. Burn it in." },
      { title: "TABLE current, never nameplate", tip: "Size motor conductors and the short-circuit device from the TABLE full-load current (430.250), not the motor's nameplate amps. The exam parks a nameplate-looking number as bait. Nameplate is only for overload.", torque: true, intro: "Nameplate's right there on the motor, tempting you. For conductors? Ignore it. Go to the table. Every time." },
      { title: "Why the breaker is so big", tip: "Motors pull massive inrush at startup — several times running current. That's why Table 430.52 lets the short-circuit/ground-fault breaker go to 250%+. It has to ride through start-up without tripping.", torque: true, intro: "A motor at startup gulps current like a thirsty horse. Size that breaker too tight and it'll trip every time you hit the switch." },
      { title: "15 A receptacles on a 20 A circuit", tip: "On a 20 A circuit feeding multiple outlets, 15 OR 20 A receptacles are fine — a 15 A duplex passes 20 A through its feed-through strap. Only a single 20 A appliance on its own circuit needs a dedicated 20 A receptacle.", torque: false },
      { title: "HVAC uses Article 440", tip: "Air-conditioning compressors follow Article 440, not just 430. Size conductors from rated-load current (RLA) or branch-circuit selection current, whichever is greater — not nameplate horsepower.", torque: false },
      { title: "ASHRAE 90.1 = the energy book", tip: "If a question mentions lighting power limits, automatic lighting shutoff, occupancy sensors, daylighting controls, or minimum motor/transformer efficiency, that's ANSI/ASHRAE/IES 90.1 — the energy standard — not the NEC. It's a small slice of the exam, so don't over-study it; just know what lives there.", torque: true, intro: "Most guys never crack 90.1. Know the handful of things it owns and move on — don't lose study hours over one or two questions." },
    ],
  },

  // ===== 7 SPECIAL OCCUPANCIES =====
  7: {
    guide: [
      "This section (8 of 100) covers NEC Chapter 5 (hazardous and special occupancies, Articles 500–590), Chapter 6 (special equipment), and Chapter 7 (special conditions like emergency systems). The questions can feel unfamiliar, but a little tabbing turns them into quick lookups, because each occupancy has its own article.",
      "Hazardous location classification is the backbone. Class tells you WHAT the hazard is: Class I = flammable gases or vapors, Class II = combustible dust, Class III = ignitible fibers or flyings. Division tells you WHEN it's present: Division 1 = present in normal operation, Division 2 = present only under abnormal/fault conditions. The exam mixes these up constantly.",
      "Match the occupancy to its article and the answer usually sits in the first few pages. Gas stations / fuel dispensing = 514. Repair garages = 511. Health care = 517. Theaters = 520. Carnivals = 525. Agricultural buildings = 547. Marinas = 555. Swimming pools, spas, fountains = 680. When a question names a place, jump straight to that article.",
      "Water is the recurring theme in the special-equipment articles. Pools, spas, fountains, and marinas all lean hard on GFCI protection and equipotential bonding because water plus electricity equals shock — or in marinas, electric shock drowning from leakage current into the water. Emergency systems (Article 700) must restore power within 10 seconds; legally required standby (701) gets 60 seconds; optional standby (702) has no required time.",
    ],
    tabBooks: [
      { book: "NEC 2023 — Chapter 5", items: ["500.5 — Class & Division definitions", "501 — Class I wiring methods", "511 (garages) / 514 (fuel)", "517 — Health care", "547 — Agricultural"] },
      { book: "NEC 2023 — Chapters 6 & 7", items: ["680 — Pools, spas, fountains", "555 — Marinas", "700 / 701 / 702 — Emergency & standby"] },
    ],
    keyNumbers: [
      { v: "I / II / III", label: "Gas / Dust / Fibers" },
      { v: "Div 1 / Div 2", label: "Normal / Abnormal presence" },
      { v: "10 sec", label: "Emergency power restore (Art. 700)" },
      { v: "60 sec", label: "Legally required standby (Art. 701)" },
    ],
    proTips: [
      { title: "Class = what, Division = when", img: CHEAT_CLASSDIV, tip: "Class I/II/III = gases / dust / fibers (WHAT the hazard is). Division 1/2 = present in normal operation / only under abnormal conditions (WHEN it's there). The exam swaps these on purpose.", torque: true, intro: "Class is the WHAT, Division is the WHEN. Gas station pump? Class I, and Division 1 right at the nozzle." },
      { title: "Name the place, find the article", img: CHEAT_PLACE, tip: "Gas station = 514, repair garage = 511, hospital = 517, theater = 520, carnival = 525, farm = 547, marina = 555, pool = 680. When a question names a place, the answer's in that article's first pages.", torque: true, intro: "Don't memorize every rule — memorize which article. Question names a place, you flip right to it and read." },
      { title: "Water = GFCI + bonding", img: CHEAT_WATER, tip: "Pools, spas, fountains, marinas all hinge on GFCI protection and equipotential bonding. Water plus electricity is the deadliest combo in the book — the answer almost always involves GFCI.", torque: true, intro: "Anywhere there's water and a cord, think GFCI and bonding first. That combo's killed too many people at backyard pools." },
      { title: "Emergency power timing", tip: "Art. 700 emergency (exit lights, alarms) = power in 10 seconds. Art. 701 legally required standby = 60 seconds. Art. 702 optional standby = no required time. Shorter time = more critical load.", torque: false },
      { title: "Gas vapor sinks", tip: "Gasoline vapor is heavier than air, so it pools near the floor. That's why the classified zone in a garage or fuel area is measured UP from the floor.", torque: false },
    ],
  },

  // ===== 8 COMMUNICATIONS =====
  8: {
    guide: [
      "The smallest section — just 1 question on the real exam — but an easy point if you tab it. It draws from NEC Chapter 8: Article 800 (general communications), 805 (telephone), 820 (coax/CATV), and 770 (optical fiber).",
      "The one rule that defines Chapter 8: it stands alone. Communications systems are NOT subject to the requirements of Chapters 1 through 7 unless those chapters are specifically referenced (800.3). So a Chapter 3 rule like conduit fill does not automatically apply to communications cabling. The exam may bait you with a Chapter 3 rule on a Chapter 8 question — don't take it.",
      "Cable ratings follow a hierarchy you can rank by demand: CMP (plenum) is the highest fire/smoke rating and may substitute anywhere; CMR (riser) is next, for vertical runs between floors; CM (general) is standard in-building; CMX is limited use. A higher-rated cable can always replace a lower one, never the reverse. 'Plenum' = air-handling space = CMP — the 'P' is your memory hook.",
      "Bonding and grounding are the other theme. The primary protector goes as close as practicable to where the cable enters the building, and all grounding electrodes get bonded together (the intersystem bonding termination, 250.94). The reason is safety: if the comms ground and the power ground are at different potentials, a surge or fault can put thousands of volts right where a person bridges the two systems.",
    ],
    tabBooks: [
      { book: "NEC 2023 — Chapter 8", items: ["800.3 — Chapter 8 stands alone", "800.100 — Bonding & grounding", "800.179 — Cable markings (CMP/CMR/CM/CMX)", "805 (telephone) / 820 (coax)"] },
      { book: "NEC 2023 — Article 250", items: ["250.94 — Intersystem bonding termination"] },
    ],
    keyNumbers: [
      { v: "CMP > CMR > CM > CMX", label: "Cable rating hierarchy" },
      { v: "Ch. 8", label: "Stands alone from Ch. 1–7" },
      { v: "Plenum = CMP", label: "Air space needs plenum cable" },
    ],
    proTips: [
      { title: "Chapter 8 stands alone", img: CHEAT_CH8, tip: "Communications (Ch. 8) is independent of Chapters 1–7 except where specifically referenced (800.3). A Chapter 3 rule like conduit fill doesn't auto-apply. They'll bait you with a power rule on a comms question.", torque: true, intro: "Chapter 8 plays by its own rules. Don't let 'em sneak a power-wiring rule past you on a phone-cable question." },
      { title: "P is for Plenum", img: CHEAT_PLENUM, tip: "CMP = plenum (highest rating, goes anywhere) > CMR = riser (between floors) > CM = general > CMX = limited. Higher always replaces lower. Air-handling space needs CMP — the 'P' is your hook.", torque: true, intro: "Cable in the ceiling air space? You want the P — plenum. It's the one that won't choke a building with smoke." },
      { title: "Bond it all together", img: CHEAT_BOND, tip: "Comms grounding bonds to the building grounding electrode system (intersystem bonding, 250.94). If comms and power grounds sit at different potentials, a surge puts big voltage right where someone bridges them.", torque: false },
    ],
  },
};


// RESOURCES — verified links per section. Official sources + stable YouTube search URLs.
// YouTube uses search URLs (always valid) rather than specific video IDs that could go dead.
const yt = (q) => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);

const RESOURCES = {
  0: [ // Project Design & Management
    { label: "NASCLA — Official Site & Exam Info", url: "https://www.nascla.org", kind: "official" },
    { label: "PSI Exams — Candidate Info Bulletin", url: "https://test-takers.psiexams.com", kind: "official" },
    { label: "Video: Construction Contract Types Explained", url: yt("construction contract types lump sum cost plus explained"), kind: "video" },
    { label: "Video: Mechanic's Lien Basics for Contractors", url: yt("mechanics lien explained for contractors"), kind: "video" },
  ],
  1: [ // Safety
    { label: "OSHA — 1926 Subpart K (Construction Electrical)", url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926SubpartK", kind: "official" },
    { label: "Video: PPE Categories & Arc Flash Boundaries", url: yt("arc flash PPE categories boundaries explained electrician"), kind: "video" },
    { label: "OSHA — 1910 Subpart S (Electrical)", url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910SubpartS", kind: "official" },
    { label: "OSHA — Lockout/Tagout 1910.147", url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147", kind: "official" },
    { label: "NFPA — Free Access to Codes (incl. 70E)", url: "https://www.nfpa.org/for-professionals/codes-and-standards/list-of-codes-and-standards/free-access", kind: "official" },
    { label: "Video: NFPA 70E Arc Flash & Boundaries", url: yt("NFPA 70E arc flash boundary explained"), kind: "video" },
    { label: "Video: Lockout Tagout Step by Step", url: yt("lockout tagout procedure electrical step by step"), kind: "video" },
  ],
  2: [ // Theory
    { label: "Video: ElectricianU — Electrical Theory Basics", url: yt("electricianu electrical theory basics for apprentices"), kind: "video" },
    { label: "Video: Kirchhoff’s Laws Made Simple", url: yt("kirchhoffs voltage current law explained simple"), kind: "video" },
    { label: "Mike Holt — Free Resources & Theory", url: "https://www.mikeholt.com/free-resources.php", kind: "official" },
    { label: "Mike Holt — YouTube Channel", url: "https://www.youtube.com/user/MikeHoltNEC", kind: "video" },
    { label: "Video: Ohm's Law & the Power Wheel", url: yt("ohms law power wheel electrical explained"), kind: "video" },
    { label: "Video: Three-Phase Power and the 1.732 Factor", url: yt("three phase power 1.732 square root 3 explained"), kind: "video" },
    { label: "Video: Series vs Parallel Circuits", url: yt("series vs parallel circuits resistance explained"), kind: "video" },
  ],
  3: [ // General Code
    { label: "NFPA 70 (NEC) — 2023 Edition", url: "https://www.nfpa.org/product/nfpa-70-national-electrical-code-nec/p0070code", kind: "official" },
    { label: "NFPA — Free Online Code Access (register)", url: "https://www.nfpa.org/for-professionals/codes-and-standards/list-of-codes-and-standards/free-access", kind: "official" },
    { label: "Video: NEC Working Space 110.26 Explained", url: yt("NEC 110.26 working space clearances explained"), kind: "video" },
    { label: "Video: Conductor Temperature Ratings 110.14(C)", url: yt("NEC 110.14 C conductor termination temperature rating"), kind: "video" },
  ],
  4: [ // Wiring & Protection
    { label: "Video: Grounding vs Bonding (the real difference)", url: yt("grounding vs bonding NEC difference explained"), kind: "video" },
    { label: "Video: GFCI vs AFCI — Where Each Is Required", url: yt("GFCI vs AFCI required locations NEC explained"), kind: "video" },
    { label: "NFPA 70 (NEC) — 2023 Edition", url: "https://www.nfpa.org/product/nfpa-70-national-electrical-code-nec/p0070code", kind: "official" },
    { label: "Mike Holt — Grounding vs Bonding (Free)", url: "https://www.mikeholt.com/free-resources.php", kind: "official" },
    { label: "Video: Grounding vs Bonding Explained", url: yt("grounding vs bonding NEC 250 explained Mike Holt"), kind: "video" },
    { label: "Video: GFCI vs AFCI — What's the Difference", url: yt("GFCI vs AFCI difference NEC explained"), kind: "video" },
    { label: "Video: Continuous Load 125% Sizing", url: yt("NEC continuous load 125 percent conductor sizing"), kind: "video" },
  ],
  5: [ // Wiring Methods
    { label: "Video: Conduit Bending — Offsets & 90s", url: yt("conduit bending offsets 90 degree EMT how to"), kind: "video" },
    { label: "Video: Box Fill Calculations Step by Step", url: yt("NEC box fill calculation 314.16 step by step"), kind: "video" },
    { label: "NFPA 70 (NEC) — 2023 Edition", url: "https://www.nfpa.org/product/nfpa-70-national-electrical-code-nec/p0070code", kind: "official" },
    { label: "Video: Conduit Fill Calculations (Ch. 9)", url: yt("NEC conduit fill calculation chapter 9 annex C"), kind: "video" },
    { label: "Video: Box Fill Calculations 314.16", url: yt("NEC box fill calculation 314.16 explained"), kind: "video" },
    { label: "Video: Pull Box Sizing 314.28", url: yt("NEC 314.28 pull box sizing straight angle explained"), kind: "video" },
  ],
  6: [ // Equipment
    { label: "Video: Motor Calculations — Conductors, Overloads, Breaker", url: yt("NEC motor calculation 430 conductors overload breaker example"), kind: "video" },
    { label: "Video: Transformer Sizing & Protection 450.3", url: yt("transformer sizing overcurrent protection 450.3 explained"), kind: "video" },
    { label: "NFPA 70 (NEC) — 2023 Edition", url: "https://www.nfpa.org/product/nfpa-70-national-electrical-code-nec/p0070code", kind: "official" },
    { label: "Video: Motor Calculations Article 430", url: yt("NEC article 430 motor calculations explained"), kind: "video" },
    { label: "Video: Motor FLC Tables 430.250", url: yt("NEC 430.250 motor full load current table explained"), kind: "video" },
    { label: "Video: Transformer Sizing 450.3", url: yt("NEC transformer overcurrent protection 450.3 explained"), kind: "video" },
  ],
  7: [ // Special Occupancies
    { label: "Video: Hazardous Locations — Class/Division Explained", url: yt("hazardous locations class division NEC 500 explained"), kind: "video" },
    { label: "Video: Swimming Pool Bonding 680.26", url: yt("swimming pool equipotential bonding 680.26 explained"), kind: "video" },
    { label: "NFPA 70 (NEC) — 2023 Edition", url: "https://www.nfpa.org/product/nfpa-70-national-electrical-code-nec/p0070code", kind: "official" },
    { label: "Mike Holt — Swimming Pools & Marinas (Free)", url: "https://www.mikeholt.com/free-resources.php", kind: "official" },
    { label: "Video: Hazardous Locations Class & Division", url: yt("NEC hazardous locations class division explained"), kind: "video" },
    { label: "Video: Swimming Pool Bonding Article 680", url: yt("NEC 680 swimming pool bonding GFCI explained"), kind: "video" },
  ],
  8: [ // Communications
    { label: "Video: Structured Cabling & Cat6 Basics", url: yt("structured cabling cat6 basics low voltage explained"), kind: "video" },
    { label: "NFPA 70 (NEC) — Chapter 8", url: "https://www.nfpa.org/product/nfpa-70-national-electrical-code-nec/p0070code", kind: "official" },
    { label: "Video: NEC Chapter 8 Communications Overview", url: yt("NEC chapter 8 communications cables explained"), kind: "video" },
    { label: "Video: Plenum vs Riser Cable Ratings", url: yt("plenum vs riser cable CMP CMR rating explained"), kind: "video" },
  ],
};


// DIAGRAMS — blue/chrome SVG line-art. Each returns an inline SVG sized to container.
// Referenced by section index via DIAGRAMS[idx] = [{title, caption, render}]
const DGRID = "#1b2740", DTXT = "#c2cee0", DBLU = "#1f7bff", DCYA = "#46c6ff", DLIV = "#27e08a", DRED = "#ff4361", DMUT = "#7e8eaa", DSTEEL = "#9fb3cc";

function DiagFrame({ children, h = 220 }) {
  return (
    <svg viewBox={`0 0 360 ${h}`} width="100%" style={{ display: "block", background: "#070c16", borderRadius: 10 }}>
      <defs>
        <pattern id="dg" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke={DGRID} strokeWidth="1" />
        </pattern>
        <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" /><stop offset=".4" stopColor="#cdd9e8" /><stop offset=".6" stopColor="#8aa0bd" /><stop offset="1" stopColor="#e6eef7" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height={h} fill="url(#dg)" opacity="0.5" />
      {children}
    </svg>
  );
}
const dt = (x, y, s, fill = DTXT, anchor = "start", weight = 600) => (
  <text x={x} y={y} fontFamily="'JetBrains Mono',monospace" fontSize={s} fill={fill} textAnchor={anchor} fontWeight={weight}>{""}</text>
);

const DIAGRAMS = {
  // ===== General Code: Working Space 110.26 =====
  3: [
    {
      title: "Working Space — 110.26",
      caption: "Depth is measured from the live parts out into the room. For 0–150 V to ground, all three Conditions require 3 ft. Width is 30 in. or the equipment width, whichever is greater. Headroom is 6½ ft.",
      render: () => (
        <DiagFrame h={210}>
          {/* equipment box */}
          <rect x="20" y="40" width="46" height="120" fill="#0d1422" stroke={DSTEEL} strokeWidth="2" />
          <text x="43" y="105" fontFamily="'Saira',sans-serif" fontSize="11" fill={DCYA} textAnchor="middle" fontWeight="700" transform="rotate(-90 43 105)">PANEL</text>
          {/* depth arrows */}
          <line x1="66" y1="100" x2="300" y2="100" stroke={DBLU} strokeWidth="2" />
          <polygon points="300,100 292,96 292,104" fill={DBLU} />
          <polygon points="66,100 74,96 74,104" fill={DBLU} />
          <rect x="150" y="86" width="66" height="22" rx="4" fill="#070c16" />
          <text x="183" y="101" fontFamily="'Saira',sans-serif" fontSize="13" fill={DLIV} textAnchor="middle" fontWeight="800">3 FT MIN</text>
          {/* worker */}
          <circle cx="300" cy="78" r="9" fill="none" stroke={DSTEEL} strokeWidth="2" />
          <line x1="300" y1="87" x2="300" y2="125" stroke={DSTEEL} strokeWidth="2" />
          <line x1="300" y1="100" x2="288" y2="112" stroke={DSTEEL} strokeWidth="2" />
          <line x1="300" y1="100" x2="312" y2="112" stroke={DSTEEL} strokeWidth="2" />
          <line x1="300" y1="125" x2="290" y2="150" stroke={DSTEEL} strokeWidth="2" />
          <line x1="300" y1="125" x2="310" y2="150" stroke={DSTEEL} strokeWidth="2" />
          {/* headroom */}
          <line x1="335" y1="20" x2="335" y2="160" stroke={DCYA} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="345" y="95" fontFamily="'Saira',sans-serif" fontSize="10" fill={DCYA} textAnchor="middle" fontWeight="700" transform="rotate(-90 345 95)">6.5 FT HEADROOM</text>
          {/* floor */}
          <line x1="10" y1="160" x2="350" y2="160" stroke={DSTEEL} strokeWidth="2" />
          <text x="20" y="180" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill={DMUT}>LIVE PARTS</text>
          <text x="20" y="192" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill={DMUT}>(equipment face)</text>
        </DiagFrame>
      ),
    },
  ],

  // ===== Wiring & Protection: One-Point Bond + GFCI/AFCI =====
  4: [
    {
      title: "One Bonding Point — Service vs. Subpanel",
      caption: "Neutral and ground are tied together ONLY at the service (main bonding jumper). At every subpanel downstream, neutrals stay on an isolated bus and grounds land separately. Bond them again and current rides the ground wire.",
      render: () => (
        <DiagFrame h={210}>
          {/* service */}
          <rect x="24" y="40" width="120" height="130" fill="#0d1422" stroke={DSTEEL} strokeWidth="2" />
          <text x="84" y="34" fontFamily="'Saira',sans-serif" fontSize="12" fill={DCYA} textAnchor="middle" fontWeight="800">SERVICE</text>
          {/* neutral & ground bus tied */}
          <rect x="40" y="70" width="40" height="10" fill={DSTEEL} /><text x="36" y="66" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={DTXT}>N</text>
          <rect x="40" y="130" width="40" height="10" fill={DLIV} /><text x="36" y="126" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={DLIV}>G</text>
          <line x1="60" y1="80" x2="60" y2="130" stroke={DRED} strokeWidth="3" />
          <text x="66" y="108" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={DRED} fontWeight="700">BOND</text>
          <text x="100" y="105" fontFamily="'Saira',sans-serif" fontSize="9" fill={DLIV} fontWeight="700">MBJ</text>
          {/* feeder */}
          <line x1="144" y1="90" x2="210" y2="90" stroke={DSTEEL} strokeWidth="2" />
          <line x1="144" y1="120" x2="210" y2="120" stroke={DLIV} strokeWidth="2" />
          {/* subpanel */}
          <rect x="210" y="40" width="120" height="130" fill="#0d1422" stroke={DSTEEL} strokeWidth="2" />
          <text x="270" y="34" fontFamily="'Saira',sans-serif" fontSize="12" fill={DCYA} textAnchor="middle" fontWeight="800">SUBPANEL</text>
          <rect x="226" y="70" width="40" height="10" fill={DSTEEL} /><text x="222" y="66" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={DTXT}>N</text>
          <rect x="226" y="130" width="40" height="10" fill={DLIV} /><text x="222" y="126" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={DLIV}>G</text>
          {/* NOT bonded marker */}
          <line x1="246" y1="86" x2="246" y2="124" stroke={DRED} strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
          <line x1="238" y1="98" x2="254" y2="112" stroke={DRED} strokeWidth="2.5" />
          <line x1="254" y1="98" x2="238" y2="112" stroke={DRED} strokeWidth="2.5" />
          <text x="290" y="108" fontFamily="'Saira',sans-serif" fontSize="9" fill={DRED} fontWeight="700">NO BOND</text>
          <text x="24" y="190" fontFamily="'JetBrains Mono',monospace" fontSize="8.5" fill={DMUT}>Bond once — at the service only. Subpanels keep N & G separate.</text>
        </DiagFrame>
      ),
    },
  ],

  // ===== Wiring Methods: Conduit Fill + Box Fill =====
  5: [
    {
      title: "Conduit Fill — 53 / 31 / 40",
      caption: "Maximum conductor fill depends on how many wires are in the raceway: one wire 53%, two wires 31%, three or more 40%. Read the count before you pick the percent — exactly two is the classic 31% trap.",
      render: () => (
        <DiagFrame h={170}>
          {/* 1 wire */}
          <circle cx="70" cy="70" r="40" fill="none" stroke={DSTEEL} strokeWidth="2.5" />
          <circle cx="70" cy="70" r="22" fill={DBLU} opacity="0.5" />
          <circle cx="70" cy="70" r="22" fill="none" stroke={DCYA} strokeWidth="1.5" />
          <text x="70" y="135" fontFamily="'Saira',sans-serif" fontSize="13" fill={DLIV} textAnchor="middle" fontWeight="800">1 = 53%</text>
          {/* 2 wires */}
          <circle cx="180" cy="70" r="40" fill="none" stroke={DSTEEL} strokeWidth="2.5" />
          <circle cx="168" cy="70" r="14" fill={DBLU} opacity="0.5" stroke={DCYA} strokeWidth="1.2" />
          <circle cx="192" cy="70" r="14" fill={DBLU} opacity="0.5" stroke={DCYA} strokeWidth="1.2" />
          <text x="180" y="135" fontFamily="'Saira',sans-serif" fontSize="13" fill={DRED} textAnchor="middle" fontWeight="800">2 = 31%</text>
          {/* 3+ wires */}
          <circle cx="290" cy="70" r="40" fill="none" stroke={DSTEEL} strokeWidth="2.5" />
          <circle cx="290" cy="58" r="11" fill={DBLU} opacity="0.5" stroke={DCYA} strokeWidth="1" />
          <circle cx="278" cy="80" r="11" fill={DBLU} opacity="0.5" stroke={DCYA} strokeWidth="1" />
          <circle cx="302" cy="80" r="11" fill={DBLU} opacity="0.5" stroke={DCYA} strokeWidth="1" />
          <text x="290" y="135" fontFamily="'Saira',sans-serif" fontSize="13" fill={DLIV} textAnchor="middle" fontWeight="800">3+ = 40%</text>
        </DiagFrame>
      ),
    },
    {
      title: "Box Fill Counting — 314.16",
      caption: "Count each conductor as 1, each device (yoke) as 2, all clamps together as 1, all grounds together as 1. Multiply the total by the volume for the largest conductor: 14 AWG = 2.00, 12 = 2.25, 10 = 2.50 cu in.",
      render: () => (
        <DiagFrame h={180}>
          <rect x="120" y="30" width="120" height="120" rx="4" fill="#0d1422" stroke={DSTEEL} strokeWidth="2.5" />
          {/* conductors entering */}
          <line x1="120" y1="60" x2="150" y2="60" stroke={DCYA} strokeWidth="2.5" />
          <line x1="120" y1="75" x2="150" y2="75" stroke={DCYA} strokeWidth="2.5" />
          <line x1="240" y1="60" x2="270" y2="60" stroke={DLIV} strokeWidth="2.5" />
          {/* device */}
          <rect x="165" y="55" width="30" height="70" rx="3" fill="none" stroke={DBLU} strokeWidth="2" />
          <circle cx="180" cy="72" r="5" fill="none" stroke={DBLU} strokeWidth="1.5" />
          <circle cx="180" cy="108" r="5" fill="none" stroke={DBLU} strokeWidth="1.5" />
          {/* legend */}
          <text x="20" y="50" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>conductor = 1</text>
          <text x="20" y="70" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DBLU} fontWeight="700">device = 2</text>
          <text x="20" y="90" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>clamps = 1</text>
          <text x="20" y="110" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DLIV}>grounds = 1</text>
          <text x="260" y="120" fontFamily="'Saira',sans-serif" fontSize="11" fill={DCYA} fontWeight="700">14=2.00</text>
          <text x="260" y="136" fontFamily="'Saira',sans-serif" fontSize="11" fill={DCYA} fontWeight="700">12=2.25</text>
          <text x="260" y="152" fontFamily="'Saira',sans-serif" fontSize="11" fill={DCYA} fontWeight="700">10=2.50</text>
        </DiagFrame>
      ),
    },
  ],

  // ===== Equipment: Motor Circuit Three Percentages =====
  6: [
    {
      title: "Motor Circuit — Three Sizing Points",
      caption: "One motor, three different numbers. Branch-circuit conductors at 125% of the TABLE full-load current (430.22). Overload from the NAMEPLATE (430.32). Short-circuit/ground-fault breaker from Table 430.52 — a big multiplier (e.g., 250%) to ride through startup inrush.",
      render: () => (
        <DiagFrame h={180}>
          {/* breaker */}
          <rect x="20" y="65" width="50" height="40" rx="4" fill="#0d1422" stroke={DRED} strokeWidth="2" />
          <text x="45" y="58" fontFamily="'Saira',sans-serif" fontSize="9" fill={DRED} textAnchor="middle" fontWeight="700">BREAKER</text>
          <text x="45" y="90" fontFamily="'Saira',sans-serif" fontSize="11" fill={DRED} textAnchor="middle" fontWeight="800">250%</text>
          {/* conductors */}
          <line x1="70" y1="85" x2="150" y2="85" stroke={DCYA} strokeWidth="3" />
          <text x="110" y="76" fontFamily="'Saira',sans-serif" fontSize="10" fill={DCYA} textAnchor="middle" fontWeight="700">125% FLC</text>
          {/* overload */}
          <rect x="150" y="65" width="50" height="40" rx="4" fill="#0d1422" stroke={DBLU} strokeWidth="2" />
          <text x="175" y="58" fontFamily="'Saira',sans-serif" fontSize="9" fill={DBLU} textAnchor="middle" fontWeight="700">OVERLOAD</text>
          <text x="175" y="90" fontFamily="'Saira',sans-serif" fontSize="9" fill={DBLU} textAnchor="middle" fontWeight="800">NAMEPLATE</text>
          {/* conductor to motor */}
          <line x1="200" y1="85" x2="270" y2="85" stroke={DCYA} strokeWidth="3" />
          {/* motor */}
          <circle cx="300" cy="85" r="30" fill="#0d1422" stroke={DSTEEL} strokeWidth="2.5" />
          <text x="300" y="90" fontFamily="'Saira',sans-serif" fontSize="20" fill={DLIV} textAnchor="middle" fontWeight="900">M</text>
          <text x="180" y="150" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill={DMUT} textAnchor="middle">Table FLC for conductors · nameplate for overload</text>
        </DiagFrame>
      ),
    },
  ],

  // ===== Special Occupancies: Class/Division =====
  7: [
    {
      title: "Hazardous Locations — Class & Division",
      caption: "Class is WHAT the hazard is: I = gases/vapors, II = dust, III = fibers. Division is WHEN it's present: 1 = during normal operation, 2 = only under abnormal/fault conditions.",
      render: () => (
        <DiagFrame h={170}>
          <text x="90" y="30" fontFamily="'Saira',sans-serif" fontSize="12" fill={DCYA} textAnchor="middle" fontWeight="800">CLASS = WHAT</text>
          <rect x="20" y="42" width="140" height="26" rx="4" fill="#0d1422" stroke={DBLU} strokeWidth="1.5" />
          <text x="30" y="59" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>I · Gases / Vapors</text>
          <rect x="20" y="74" width="140" height="26" rx="4" fill="#0d1422" stroke={DBLU} strokeWidth="1.5" />
          <text x="30" y="91" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>II · Combustible Dust</text>
          <rect x="20" y="106" width="140" height="26" rx="4" fill="#0d1422" stroke={DBLU} strokeWidth="1.5" />
          <text x="30" y="123" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>III · Fibers / Flyings</text>

          <text x="270" y="30" fontFamily="'Saira',sans-serif" fontSize="12" fill={DLIV} textAnchor="middle" fontWeight="800">DIVISION = WHEN</text>
          <rect x="200" y="48" width="140" height="34" rx="4" fill="#0d1422" stroke={DLIV} strokeWidth="1.5" />
          <text x="210" y="62" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DLIV} fontWeight="700">DIV 1 · normal</text>
          <text x="210" y="75" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill={DMUT}>hazard present in use</text>
          <rect x="200" y="90" width="140" height="34" rx="4" fill="#0d1422" stroke={DSTEEL} strokeWidth="1.5" />
          <text x="210" y="104" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DSTEEL} fontWeight="700">DIV 2 · abnormal</text>
          <text x="210" y="117" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill={DMUT}>only on fault/leak</text>
        </DiagFrame>
      ),
    },
  ],
};

// Additional diagrams appended to existing sections
DIAGRAMS[4].push(
  {
    title: "Grounding Electrode System — 250.50",
    caption: "All electrodes present at a building are bonded together into one system: the metal underground water pipe (needs 10 ft in earth), a concrete-encased electrode (Ufer), and ground rod(s). A single rod over 25 ohms must be supplemented by a second rod 6 ft away.",
    render: () => (
      <DiagFrame h={200}>
        {/* ground line */}
        <line x1="10" y1="70" x2="350" y2="70" stroke={DSTEEL} strokeWidth="2" />
        <text x="14" y="62" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill={DMUT}>GRADE</text>
        {/* service / GEC bus */}
        <rect x="150" y="20" width="60" height="34" rx="4" fill="#0d1422" stroke={DCYA} strokeWidth="2" />
        <text x="180" y="41" fontFamily="'Saira',sans-serif" fontSize="11" fill={DCYA} textAnchor="middle" fontWeight="800">SERVICE</text>
        {/* water pipe */}
        <line x1="180" y1="54" x2="60" y2="120" stroke={DLIV} strokeWidth="2" />
        <line x1="30" y1="120" x2="120" y2="120" stroke={DSTEEL} strokeWidth="4" />
        <text x="30" y="140" fontFamily="'JetBrains Mono',monospace" fontSize="8.5" fill={DTXT}>WATER PIPE</text>
        <text x="30" y="151" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={DMUT}>(10 ft in earth)</text>
        {/* ufer */}
        <line x1="180" y1="54" x2="180" y2="110" stroke={DLIV} strokeWidth="2" />
        <rect x="150" y="110" width="60" height="20" fill="none" stroke={DSTEEL} strokeWidth="2" strokeDasharray="3 2" />
        <text x="180" y="148" fontFamily="'JetBrains Mono',monospace" fontSize="8.5" fill={DTXT} textAnchor="middle">UFER</text>
        <text x="180" y="159" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={DMUT} textAnchor="middle">(in footing)</text>
        {/* rods */}
        <line x1="180" y1="54" x2="290" y2="90" stroke={DLIV} strokeWidth="2" />
        <line x1="290" y1="80" x2="290" y2="160" stroke={DSTEEL} strokeWidth="3" />
        <line x1="320" y1="80" x2="320" y2="160" stroke={DSTEEL} strokeWidth="3" />
        <line x1="290" y1="95" x2="320" y2="95" stroke={DLIV} strokeWidth="1.5" />
        <text x="305" y="178" fontFamily="'JetBrains Mono',monospace" fontSize="8.5" fill={DTXT} textAnchor="middle">2 RODS ·6 ft apart</text>
        <text x="220" y="40" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={DLIV}>GEC bonds all</text>
      </DiagFrame>
    ),
  },
  {
    title: "GFCI vs AFCI — Room Map",
    caption: "GFCI protects people in wet/grounded spots: baths, kitchens, garages, outdoors, basements, laundry. AFCI protects the building from arc-fault fires in living areas: bedrooms, living/family rooms, halls, closets. A dwelling kitchen needs BOTH.",
    render: () => (
      <DiagFrame h={200}>
        {/* GFCI side */}
        <rect x="14" y="20" width="158" height="160" rx="6" fill="#0d1422" stroke={DLIV} strokeWidth="1.5" />
        <text x="93" y="40" fontFamily="'Saira',sans-serif" fontSize="13" fill={DLIV} textAnchor="middle" fontWeight="900">GFCI — PEOPLE</text>
        <text x="26" y="62" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Bathrooms</text>
        <text x="26" y="80" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Kitchens *</text>
        <text x="26" y="98" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Garages</text>
        <text x="26" y="116" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Outdoors</text>
        <text x="26" y="134" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Basements</text>
        <text x="26" y="152" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Laundry / sinks</text>
        <text x="26" y="170" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill={DMUT}>wet / grounded</text>
        {/* AFCI side */}
        <rect x="188" y="20" width="158" height="160" rx="6" fill="#0d1422" stroke={DBLU} strokeWidth="1.5" />
        <text x="267" y="40" fontFamily="'Saira',sans-serif" fontSize="13" fill={DBLU} textAnchor="middle" fontWeight="900">AFCI — BUILDING</text>
        <text x="200" y="62" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Bedrooms</text>
        <text x="200" y="80" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Living / family</text>
        <text x="200" y="98" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Kitchens *</text>
        <text x="200" y="116" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Hallways</text>
        <text x="200" y="134" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Closets</text>
        <text x="200" y="152" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={DTXT}>• Dens / sunrooms</text>
        <text x="200" y="170" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill={DMUT}>finished living areas</text>
        <text x="180" y="195" fontFamily="'JetBrains Mono',monospace" fontSize="8.5" fill={DCYA} textAnchor="middle">* kitchen = BOTH</text>
      </DiagFrame>
    ),
  },
);

DIAGRAMS[4].push({
  title: "Service Drop Clearances — 230.24",
  caption: "Overhead service conductors keep minimum clearances: 10 ft at the lowest point above a walkable surface, 12 ft over residential driveways, 18 ft over public roads. Over a roof generally 8 ft (reduced allowances apply for low-slope and small overhangs).",
  render: () => (
    <DiagFrame h={200}>
      {/* pole and span */}
      <line x1="20" y1="20" x2="20" y2="180" stroke={DSTEEL} strokeWidth="3" />
      <path d="M20 40 Q 180 75 340 55" fill="none" stroke={DCYA} strokeWidth="2.5" />
      <text x="180" y="35" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill={DCYA} textAnchor="middle">SERVICE DROP</text>
      {/* ground */}
      <line x1="10" y1="180" x2="350" y2="180" stroke={DSTEEL} strokeWidth="2" />
      {/* 10 ft */}
      <line x1="80" y1="62" x2="80" y2="180" stroke={DLIV} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="84" y="130" fontFamily="'Saira',sans-serif" fontSize="11" fill={DLIV} fontWeight="800">10 FT</text>
      <text x="84" y="143" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={DMUT}>walk surface</text>
      {/* 12 ft */}
      <line x1="190" y1="68" x2="190" y2="180" stroke={DBLU} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="194" y="130" fontFamily="'Saira',sans-serif" fontSize="11" fill={DBLU} fontWeight="800">12 FT</text>
      <text x="194" y="143" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={DMUT}>driveway</text>
      {/* 18 ft */}
      <line x1="300" y1="58" x2="300" y2="180" stroke={DRED} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="262" y="130" fontFamily="'Saira',sans-serif" fontSize="11" fill={DRED} fontWeight="800">18 FT</text>
      <text x="262" y="143" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={DMUT}>public road</text>
    </DiagFrame>
  ),
});


// LOOKUPS — "find it first" drill targets. Each: where the rule LIVES, so you drill book speed.
// prompt = what you're hunting; book + where = the location; nugget = the value once you land on it.
const LOOKUPS = [
  // ---- Working space / general (110) ----
  { prompt: "Minimum working space DEPTH in front of a 120/240V panel (Condition 1)", book: "NEC 2023", where: "110.26(A)(1) / Table", nugget: "3 ft" },
  { prompt: "Minimum working space WIDTH in front of equipment", book: "NEC 2023", where: "110.26(A)(2)", nugget: "30 in. or width of equipment, whichever is greater" },
  { prompt: "Minimum HEADROOM of working space at equipment", book: "NEC 2023", where: "110.26(A)(3)", nugget: "6 ft 6 in." },
  { prompt: "When a second entrance/egress is required at large equipment", book: "NEC 2023", where: "110.26(C)(2)", nugget: "1200 A or more and over 6 ft wide" },
  { prompt: "Rule that listed equipment must be installed per its instructions", book: "NEC 2023", where: "110.3(B)", nugget: "Listing/labeling instructions are mandatory" },
  { prompt: "Conductor termination temperature limitation rule", book: "NEC 2023", where: "110.14(C)", nugget: "Lowest-rated termination governs" },
  { prompt: "Definition of any term (e.g., 'dwelling unit', 'readily accessible')", book: "NEC 2023", where: "Article 100", nugget: "All defined terms" },

  // ---- Branch circuits / GFCI / AFCI (210) ----
  { prompt: "Dwelling locations that require GFCI protection", book: "NEC 2023", where: "210.8(A)", nugget: "Baths, kitchens, garages, outdoors, basements, laundry, etc." },
  { prompt: "Dwelling areas that require AFCI protection", book: "NEC 2023", where: "210.12(A)", nugget: "Most finished living areas (bedrooms, living, halls, etc.)" },
  { prompt: "Receptacle spacing along a dwelling wall (the '6-foot rule')", book: "NEC 2023", where: "210.52(A)", nugget: "No point along wall more than 6 ft from a receptacle" },
  { prompt: "Kitchen countertop receptacle spacing", book: "NEC 2023", where: "210.52(C)", nugget: "No point more than 24 in. from a receptacle" },
  { prompt: "Dwelling hallway receptacle requirement", book: "NEC 2023", where: "210.52(H)", nugget: "Halls 10 ft or longer need one" },
  { prompt: "Two required small-appliance branch circuits (kitchen)", book: "NEC 2023", where: "210.11(C)(1)", nugget: "Min two 20 A circuits" },
  { prompt: "Where a wall switch-controlled lighting outlet is required (dwelling)", book: "NEC 2023", where: "210.70(A)", nugget: "Habitable rooms, bathrooms, hallways, stairways, attached/detached garages with power, and outdoor entrances/exits" },
  { prompt: "Dwelling voltage limit for luminaires & ordinary receptacle loads", book: "NEC 2023", where: "210.6(A)", nugget: "120 V nominal between conductors" },

  // ---- Overcurrent (240) ----
  { prompt: "Max overcurrent device for 14, 12, 10 AWG copper (small-conductor rule)", book: "NEC 2023", where: "240.4(D)", nugget: "15 / 20 / 30 A" },
  { prompt: "Standard ampere ratings of fuses and breakers", book: "NEC 2023", where: "240.6(A)", nugget: "15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100…" },
  { prompt: "Maximum height of an overcurrent device operating handle", book: "NEC 2023", where: "240.24(A)", nugget: "6 ft 7 in." },
  { prompt: "Where overcurrent devices are NOT permitted", book: "NEC 2023", where: "240.24(D),(E),(F)", nugget: "Not in clothes closets, bathrooms, or over steps" },
  { prompt: "The 10-foot and 25-foot tap rules", book: "NEC 2023", where: "240.21(B)", nugget: "10-ft: ≥ load; 25-ft: ≥ 1/3 of feeder OCPD" },

  // ---- Grounding & bonding (250) ----
  { prompt: "Sizing the equipment grounding conductor (EGC) by OCPD", book: "NEC 2023", where: "Table 250.122", nugget: "e.g., 100 A = 8 AWG Cu" },
  { prompt: "Sizing the grounding electrode conductor (GEC)", book: "NEC 2023", where: "Table 250.66", nugget: "By largest service conductor" },
  { prompt: "Max GEC size required to a ground rod", book: "NEC 2023", where: "250.66(A)", nugget: "Need not exceed 6 AWG Cu" },
  { prompt: "Single ground rod resistance / supplemental electrode rule", book: "NEC 2023", where: "250.53(A)(2)", nugget: "Over 25 Ω → add a 2nd rod (6 ft apart)" },
  { prompt: "Where the main bonding jumper is installed", book: "NEC 2023", where: "250.24(B) / 250.28", nugget: "At the service — the one bonding point" },
  { prompt: "Types of equipment grounding conductors permitted", book: "NEC 2023", where: "250.118", nugget: "Wire, raceway, cable armor where listed, etc." },

  // ---- Conductors / ampacity (310) ----
  { prompt: "General conductor ampacity table (60/75/90°C)", book: "NEC 2023", where: "Table 310.16", nugget: "Ampacities by size & insulation" },
  { prompt: "Ambient temperature correction factors", book: "NEC 2023", where: "310.15(B)(1)", nugget: "Correct when ambient ≠ 30°C" },
  { prompt: "Conductor bundling / adjustment (derate) factors", book: "NEC 2023", where: "Table 310.15(C)(1)", nugget: "4–6=80%, 7–9=70%, 10–20=50%" },
  { prompt: "Reduced conductor sizes for dwelling services/feeders", book: "NEC 2023", where: "Table 310.12", nugget: "e.g., 200 A = 2/0 Cu" },

  // ---- Load calcs (220) ----
  { prompt: "Dwelling general lighting load per square foot", book: "NEC 2023", where: "220.41 (2020: Table 220.12)", nugget: "3 VA/sq ft" },
  { prompt: "Household range / cooking appliance demand factors", book: "NEC 2023", where: "Table 220.55", nugget: "e.g., one 12 kW range = 8 kW" },
  { prompt: "Household electric dryer minimum load", book: "NEC 2023", where: "220.54", nugget: "5000 VA or nameplate, whichever is larger" },
  { prompt: "Neutral (feeder/service) demand factor", book: "NEC 2023", where: "220.61", nugget: "Max unbalanced load; 70% over 200 A for some loads" },

  // ---- Services (230) ----
  { prompt: "Maximum number of service disconnects", book: "NEC 2023", where: "230.71", nugget: "Up to 6 (now in separate enclosures/compartments)" },
  { prompt: "Where the service disconnect must be located", book: "NEC 2023", where: "230.70(A)(1)", nugget: "Outside, or inside nearest the point of entrance" },
  { prompt: "Overhead service drop clearances", book: "NEC 2023", where: "230.24", nugget: "10 ft walk / 12 ft driveway / 18 ft road" },

  // ---- Wiring methods (300, raceways, boxes) ----
  { prompt: "Underground burial depth table", book: "NEC 2023", where: "Table 300.5", nugget: "Cover by method (e.g., 24 in. direct burial)" },
  { prompt: "Protecting cables through framing (nail plates / 1.25 in.)", book: "NEC 2023", where: "300.4(A),(D)", nugget: "1.25 in. setback or 1/16 in. steel plate" },
  { prompt: "Box fill volume per conductor size", book: "NEC 2023", where: "Table 314.16(B)", nugget: "14=2.00, 12=2.25, 10=2.50 cu in." },
  { prompt: "Pull/junction box sizing (straight & angle pulls)", book: "NEC 2023", where: "314.28(A)", nugget: "Straight 8×, angle 6× + others" },
  { prompt: "Outlet box / support used to hold a ceiling-suspended fan", book: "NEC 2023", where: "314.27(C)", nugget: "Box/support must be listed & marked for fan support; max weight per its listing" },
  { prompt: "EMT support spacing", book: "NEC 2023", where: "358.30(A)", nugget: "Within 3 ft of box, every 10 ft" },
  { prompt: "NM cable (Romex) securing", book: "NEC 2023", where: "334.30", nugget: "Within 12 in. of box, every 4.5 ft" },
  { prompt: "Conduit fill percentages (1, 2, 3+ conductors)", book: "NEC 2023", where: "Chapter 9, Table 1", nugget: "53% / 31% / 40%" },
  { prompt: "Same-size conductor fill (how many fit)", book: "NEC 2023", where: "Annex C", nugget: "Direct lookup, no math" },
  { prompt: "Maximum bends allowed between pull points", book: "NEC 2023", where: "358.26 (EMT) / each raceway article .26", nugget: "360° total (four 90° bends)" },
  { prompt: "Minimum bend radius of a conduit/raceway", book: "NEC 2023", where: "Chapter 9, Table 2", nugget: "Conduit bend radius by trade size (not conductor radius)" },
  { prompt: "Wireway / auxiliary gutter fill limit", book: "NEC 2023", where: "376.22 / 366.22", nugget: "20% fill" },

  // ---- Equipment (Chapter 4) ----
  { prompt: "Three-phase motor full-load current table", book: "NEC 2023", where: "Table 430.250", nugget: "FLC for conductor sizing" },
  { prompt: "Single-phase motor full-load current table", book: "NEC 2023", where: "Table 430.248", nugget: "e.g., 5 hp 230 V = 28 A" },
  { prompt: "Motor branch-circuit conductor sizing percent", book: "NEC 2023", where: "430.22", nugget: "125% of table FLC" },
  { prompt: "Motor overload sizing basis", book: "NEC 2023", where: "430.32", nugget: "From the nameplate FLA" },
  { prompt: "Motor short-circuit / ground-fault device max %", book: "NEC 2023", where: "Table 430.52", nugget: "e.g., 250% inverse-time breaker" },
  { prompt: "Motor disconnect minimum rating", book: "NEC 2023", where: "430.110(A)", nugget: "≥ 115% of FLC" },
  { prompt: "A/C & refrigeration equipment (HVAC) rules", book: "NEC 2023", where: "Article 440", nugget: "Use RLA / BCSC, disconnect within sight" },
  { prompt: "Transformer overcurrent protection table", book: "NEC 2023", where: "Table 450.3(B)", nugget: "Primary/secondary percentages" },
  { prompt: "Wet-location luminaire marking", book: "NEC 2023", where: "410.10", nugget: "'Suitable for Wet Locations'" },

  // ---- Special occupancies (Chapter 5/6) ----
  { prompt: "Hazardous location Class & Division definitions", book: "NEC 2023", where: "500.5", nugget: "Class I/II/III, Div 1/2" },
  { prompt: "Swimming pool equipotential bonding", book: "NEC 2023", where: "680.26", nugget: "Bond pool metal; ~3 ft perimeter" },
  { prompt: "Motor fuel dispensing (gas station) classification", book: "NEC 2023", where: "Article 514", nugget: "Classified zones near dispensers" },
  { prompt: "Health care facility wiring", book: "NEC 2023", where: "Article 517", nugget: "Redundant grounding, patient care spaces" },

  // ---- Theory / Ugly's ----
  { prompt: "Ohm's Law / power wheel (E, I, R, P)", book: "Ugly's", nugget: "E=I×R, P=E×I" },
  { prompt: "Three-phase power formula (the 1.732 page)", book: "Ugly's", nugget: "VA = E × I × 1.732" },
  { prompt: "Single-phase vs three-phase formulas", book: "Ugly's", nugget: "Phase-specific equations" },
  { prompt: "Voltage drop formula", book: "Ugly's", nugget: "VD = (2 × K × I × L) ÷ cmil" },
  { prompt: "Horsepower to watts conversion", book: "Ugly's", nugget: "1 hp ≈ 746 W" },

  // ---- Safety / 70E / OSHA ----
  { prompt: "Arc flash boundary definition", book: "NFPA 70E", where: "130.5", nugget: "1.2 cal/cm² (2nd-degree burn)" },
  { prompt: "Establishing an electrically safe work condition (the steps)", book: "NFPA 70E", where: "Article 120 (120.6 in 2024; 120.5 in 2021)", nugget: "Identify all sources → open the disconnect (interrupt the load) → visually verify open where possible → release stored energy → apply LOTO → TEST for absence of voltage (and re-test your tester)" },
  { prompt: "Shock approach boundaries (limited/restricted)", book: "NFPA 70E", where: "130.4", nugget: "Limited (outer), restricted (inner)" },
  { prompt: "Lockout/Tagout requirements", book: "OSHA", where: "1910.147", nugget: "Energy control program" },
  { prompt: "Construction GFCI / assured grounding program", book: "OSHA", where: "1926.404(b)(1)", nugget: "GFCI or AEGCP on temp power" },

  // ---- Business / Law (NASCLA) ----
  { prompt: "Contract types and who bears the risk", book: "NASCLA Business & Law", nugget: "Lump-sum, cost-plus, unit-price" },
  { prompt: "Bonds (bid, performance, payment)", book: "NASCLA Business & Law", nugget: "Each guarantees a different thing" },
  { prompt: "Mechanic's lien basics", book: "NASCLA Business & Law", nugget: "Unpaid labor/material claim on property" },
  // ---- Energy Standard (ASHRAE 90.1) ----
  { prompt: "Energy standard — lighting power limits & automatic lighting controls", book: "ASHRAE 90.1", where: "Section 9 — Lighting", nugget: "Lighting power density caps + required automatic controls (time switch, occupancy/vacancy sensors, daylighting)" },
  { prompt: "Which book covers energy efficiency (not the NEC)?", book: "ASHRAE 90.1", where: "90.1-2022", nugget: "Energy-efficient building design: lighting, power, motor & transformer efficiency" },
];


// CODE LOCATOR — a keyword INDEX (not code text). Maps topics to where they live
// so you flip straight there in your real book. Always confirm the exact figure on the page.
// t=topic  a=location  d=plain description  k=extra search words
const LOCATOR = [
  // ===== CHAPTER 1 — GENERAL =====
  { t: "Definitions", a: "Article 100", d: "Every defined term in the Code. Flip here first on any 'what is' question.", k: "dwelling readily accessible labeled listed meaning define" },
  { t: "Listing & labeling must be followed", a: "110.3(B)", d: "Equipment must be installed per its listing/labeling instructions.", k: "instructions UL listed marked install per" },
  { t: "Conductor termination temperature", a: "110.14(C)", d: "Lowest-rated termination sets which ampacity column you use.", k: "60 75 90 degree lug terminal rating" },
  { t: "Conductor connections / terminals", a: "110.14", d: "Splices, terminals, and torque of connections.", k: "torque splice terminal connector" },
  { t: "Working space depth", a: "Table 110.26(A)(1)", d: "Clear distance in front of equipment by voltage and condition.", k: "3 feet clearance front panel working space" },
  { t: "Working space width", a: "110.26(A)(2)", d: "30 in. or the width of the equipment, whichever is more.", k: "30 inches wide" },
  { t: "Working space headroom", a: "110.26(A)(3)", d: "Minimum headroom of the working space at equipment.", k: "6.5 feet head room height" },
  { t: "Second entrance to working space", a: "110.26(C)(2)", d: "When large equipment needs a second egress / door.", k: "1200 amp egress exit large equipment" },
  { t: "Dedicated equipment space", a: "110.26(E)", d: "The space above/around panels kept clear of piping/ducts.", k: "dedicated indoor outdoor footprint" },
  { t: "Illumination of working space", a: "110.26(D)", d: "Lighting required at indoor service/equipment locations.", k: "lighting working space" },
  { t: "Arc-flash warning label", a: "110.16", d: "Warning marking on equipment likely to need service while energized.", k: "arc flash label danger marking" },
  { t: "Guarding live parts", a: "110.27", d: "Protecting energized parts from accidental contact.", k: "guard cover energized 600 volts" },

  // ===== CHAPTER 2 — WIRING & PROTECTION =====
  { t: "Grounded (neutral) conductor use & color", a: "Article 200", d: "White/gray identification and use of the grounded conductor.", k: "neutral white gray identification" },
  { t: "Branch-circuit voltage limit (dwelling)", a: "210.6(A)", d: "120 V nominal between conductors for dwelling luminaires/receptacles.", k: "120 volt dwelling lampholder receptacle voltage" },
  { t: "GFCI required (dwelling)", a: "210.8(A)", d: "Dwelling areas requiring GFCI protection.", k: "ground fault bathroom kitchen garage outdoor basement laundry" },
  { t: "GFCI required (other than dwelling)", a: "210.8(B)", d: "Commercial/other-occupancy GFCI locations.", k: "ground fault commercial gfci" },
  { t: "GFCI for specific equipment", a: "210.8(C-F)", d: "Crawl space, HVAC outlet, and other specific GFCI rules.", k: "hvac crawl space outlet gfci" },
  { t: "AFCI required", a: "210.12", d: "Arc-fault protection for dwelling living areas.", k: "arc fault bedroom living combination breaker" },
  { t: "Required branch circuits (small appliance, laundry, bath)", a: "210.11", d: "Minimum circuits a dwelling must have.", k: "two small appliance laundry bathroom 20 amp circuit" },
  { t: "Receptacle ratings on branch circuits", a: "210.21(B)", d: "What receptacle ampere ratings are allowed on a circuit.", k: "15 20 amp single multiple receptacle rating" },
  { t: "Receptacle spacing (dwelling walls)", a: "210.52(A)", d: "The 6-foot rule along dwelling walls.", k: "6 feet 12 foot rule wall spacing receptacle" },
  { t: "Kitchen countertop receptacles", a: "210.52(C)", d: "Counter spacing, islands, peninsulas.", k: "counter island peninsula 24 inch 4 foot kitchen" },
  { t: "Bathroom receptacle", a: "210.52(D)", d: "Required receptacle within 3 ft of the basin.", k: "bathroom basin sink receptacle" },
  { t: "Outdoor receptacles (dwelling)", a: "210.52(E)", d: "Front and back outdoor receptacle requirement.", k: "outdoor exterior front back receptacle" },
  { t: "Hallway receptacle", a: "210.52(H)", d: "Halls 10 ft or longer need a receptacle.", k: "hallway 10 feet receptacle" },
  { t: "Lighting outlets required", a: "210.70", d: "Where switch-controlled lighting outlets are required.", k: "lighting outlet switch habitable room stairway garage" },
  { t: "Continuous load 125%", a: "210.19 / 210.20", d: "Sizing conductors and OCPD for continuous loads.", k: "continuous 125 percent 100 percent load" },
  { t: "Feeders (general)", a: "Article 215", d: "Feeder conductor sizing and protection.", k: "feeder ampacity sizing" },
  { t: "Load calculations (branch, feeder, service)", a: "Article 220", d: "All the demand calcs.", k: "load calculation demand service feeder" },
  { t: "General lighting load per sq ft", a: "220.41 dwellings / Table 220.42(A) others (2023)", d: "VA per sq ft. 2020 book: both are in Table 220.12.", k: "3 va square foot lighting general dwelling" },
  { t: "Range / cooking demand", a: "Table 220.55", d: "Demand factors for household cooking equipment.", k: "range oven cooktop demand 8 kw" },
  { t: "Dryer demand", a: "220.54", d: "Household electric dryer minimum load.", k: "dryer 5000 va demand" },
  { t: "Optional dwelling calculation", a: "220.82", d: "The simplified single-dwelling load calc.", k: "optional method dwelling 100 percent 40 percent" },
  { t: "Neutral / feeder demand", a: "220.61", d: "Sizing the grounded conductor for max unbalance.", k: "neutral demand unbalanced 70 percent" },
  { t: "Services (general)", a: "Article 230", d: "Everything service-related.", k: "service entrance" },
  { t: "Service drop / overhead clearances", a: "230.24", d: "Vertical clearances over ground, roofs, roads.", k: "10 12 18 feet overhead drop clearance roof road" },
  { t: "Service disconnect location", a: "230.70", d: "Where the service disconnect must be.", k: "disconnect location nearest point entrance" },
  { t: "Number of service disconnects", a: "230.71(B)", d: "Up to six service disconnects, each in a separate enclosure or compartment, or in a listed assembly per 230.71(B).", k: "six disconnect maximum service handles separate enclosure compartment" },
  { t: "Overcurrent protection (general)", a: "Article 240", d: "Fuses, breakers, and where they go.", k: "overcurrent fuse breaker protection" },
  { t: "Small-conductor rule", a: "240.4(D)", d: "Max OCPD for 14/12/10 AWG.", k: "14 12 10 awg 15 20 30 amp small conductor" },
  { t: "Standard OCPD ratings", a: "240.6(A)", d: "The list of standard fuse/breaker sizes.", k: "standard size 15 20 30 next size up breaker fuse" },
  { t: "Tap rules (10 ft / 25 ft)", a: "240.21(B)", d: "Feeder tap conductor rules.", k: "10 foot 25 foot tap feeder" },
  { t: "OCPD location / height", a: "240.24", d: "Readily accessible, 6'7\" max, not in closets/baths/over steps.", k: "6 foot 7 height closet bathroom steps location breaker" },
  { t: "Grounding & bonding (general)", a: "Article 250", d: "The whole grounding article.", k: "grounding bonding ground" },
  { t: "Grounding electrode system", a: "250.50 / 250.52", d: "Which electrodes must be used and bonded together.", k: "electrode rod ufer water pipe ground" },
  { t: "Ground rod / supplemental electrode", a: "250.53(A)(2)", d: "Single rod over 25 ohms needs a second.", k: "ground rod 25 ohm two rods 6 feet" },
  { t: "GEC sizing", a: "Table 250.66", d: "Grounding electrode conductor by service size.", k: "grounding electrode conductor size 6 awg" },
  { t: "EGC sizing", a: "Table 250.122", d: "Equipment grounding conductor by OCPD.", k: "equipment ground size breaker green" },
  { t: "Main bonding jumper", a: "250.24 / 250.28", d: "The single neutral-to-ground bond at the service.", k: "main bonding jumper neutral ground bond service" },
  { t: "Types of EGC permitted", a: "250.118", d: "Wire, conduit, cable armor allowed as EGC.", k: "equipment grounding conductor types raceway emt" },
  { t: "Bonding at services", a: "250.92", d: "Bonding service raceways and enclosures.", k: "service bonding bushing locknut" },
  { t: "Surge protective devices", a: "Article 242", d: "SPD requirements (now required for dwellings).", k: "spd surge protector arrester" },

  // ===== CHAPTER 3 — WIRING METHODS & MATERIALS =====
  { t: "Wiring methods (general)", a: "Article 300", d: "General install rules for raceways/cables.", k: "wiring methods general install" },
  { t: "Underground burial depth", a: "Table 300.5", d: "Minimum cover by wiring method.", k: "burial depth cover underground 18 24 inch direct" },
  { t: "Protection through framing", a: "300.4", d: "Nail plates, 1.25 in. setback.", k: "nail plate 1.25 inch bore notch stud joist" },
  { t: "Conductor support in vertical raceways", a: "Table 300.19(A)", d: "Max unsupported length by size & metal.", k: "vertical raceway support riser 80 feet copper" },
  { t: "Boxes & fittings (general)", a: "Article 314", d: "Boxes, conduit bodies, handhole enclosures.", k: "box fitting junction outlet" },
  { t: "Box fill calculation", a: "314.16", d: "Volume per conductor, clamps, devices.", k: "box fill volume cubic inch conductor count 314.16" },
  { t: "Pull / junction box sizing", a: "314.28", d: "Straight (8x) and angle (6x) pull sizing.", k: "pull box junction straight angle 8x 6x sizing" },
  { t: "Ceiling fan box support", a: "314.27(C)", d: "Box must be listed & marked for fan support.", k: "ceiling fan box support 35 pounds listed paddle" },
  { t: "Cabinets & cutout boxes", a: "Article 312", d: "Panel enclosures, wire-bending space.", k: "cabinet cutout box gutter wire bending space" },
  { t: "NM cable (Romex)", a: "Article 334", d: "Nonmetallic-sheathed cable rules.", k: "romex nm cable nonmetallic" },
  { t: "NM cable securing", a: "334.30", d: "Within 12 in. of box, every 4.5 ft.", k: "nm romex secure 12 inch 4.5 feet staple" },
  { t: "AC cable (BX)", a: "Article 320", d: "Armored cable.", k: "armored ac cable bx" },
  { t: "MC cable", a: "Article 330", d: "Metal-clad cable.", k: "metal clad mc cable" },
  { t: "UF cable", a: "Article 340", d: "Underground feeder cable.", k: "uf underground feeder cable direct burial" },
  { t: "Service-entrance cable (SE/USE)", a: "Article 338", d: "SE and USE cable.", k: "se use service entrance cable" },
  { t: "IMC", a: "Article 342", d: "Intermediate metal conduit.", k: "imc intermediate metal conduit" },
  { t: "RMC (rigid)", a: "Article 344", d: "Rigid metal conduit.", k: "rmc rigid metal conduit" },
  { t: "PVC conduit", a: "Article 352", d: "Rigid PVC conduit.", k: "pvc rigid nonmetallic conduit schedule 40 80" },
  { t: "PVC support spacing", a: "Table 352.30", d: "Support within 3 ft + intervals by size.", k: "pvc support 3 feet table spacing" },
  { t: "PVC expansion fittings", a: "352.44", d: "Thermal expansion on long PVC runs.", k: "pvc expansion fitting thermal movement" },
  { t: "EMT", a: "Article 358", d: "Electrical metallic tubing.", k: "emt thin wall tubing" },
  { t: "EMT support spacing", a: "358.30", d: "Within 3 ft of box, every 10 ft.", k: "emt support 3 feet 10 feet secure" },
  { t: "ENT (smurf tube)", a: "Article 362", d: "Electrical nonmetallic tubing.", k: "ent smurf flexible nonmetallic tubing" },
  { t: "FMC (Greenfield)", a: "Article 348", d: "Flexible metal conduit.", k: "fmc flexible metal greenfield" },
  { t: "LFMC", a: "Article 350", d: "Liquidtight flexible metal conduit.", k: "lfmc liquidtight flexible metal" },
  { t: "LFNC", a: "Article 356", d: "Liquidtight flexible nonmetallic conduit.", k: "lfnc liquidtight flexible nonmetallic" },
  { t: "Wireways", a: "Article 376", d: "Metal wireway, 20% fill.", k: "wireway 20 percent fill gutter" },
  { t: "Auxiliary gutters", a: "Article 366", d: "Gutters, 20% fill.", k: "auxiliary gutter 20 percent" },
  { t: "Surface raceways", a: "Article 386", d: "Metal surface raceway (Wiremold).", k: "surface raceway wiremold" },
  { t: "Cable trays", a: "Article 392", d: "Cable tray systems.", k: "cable tray ladder" },
  { t: "Conduit fill percentages", a: "Chapter 9, Table 1", d: "1 wire 53%, 2 wires 31%, 3+ 40%.", k: "conduit fill 53 31 40 percent chapter 9" },
  { t: "Conduit/raceway bend radius", a: "Chapter 9, Table 2", d: "Minimum bend radius by trade size.", k: "bend radius conduit table 2 chapter 9" },
  { t: "Conductor & conduit dimensions", a: "Chapter 9, Tables 4 & 5", d: "Conduit areas and conductor areas for fill math.", k: "conduit area conductor dimension table 4 5" },
  { t: "Conductor fill (quick lookup)", a: "Annex C", d: "How many same-size conductors fit — no math.", k: "annex c conductor fill how many fit" },
  { t: "Maximum bends between pulls", a: "Raceway article .26 (e.g. 358.26)", d: "360° total (four 90s) between pull points.", k: "360 degrees four bends pull points raceway" },

  // ===== CHAPTER 4 — EQUIPMENT FOR GENERAL USE =====
  { t: "Flexible cords & cables", a: "Article 400", d: "Cord types and uses; cord ampacity in Table 400.5.", k: "cord flexible so sj ampacity table 400.5" },
  { t: "Switches", a: "Article 404", d: "Switch install and ratings.", k: "switch snap toggle three way rating" },
  { t: "Receptacles & attachment plugs", a: "Article 406", d: "Receptacle install, covers, TR.", k: "receptacle plug cover tamper resistant" },
  { t: "Wet-location receptacle covers", a: "406.9(B)", d: "In-use ('bubble') covers outdoors.", k: "wet location in use bubble cover weatherproof" },
  { t: "Tamper-resistant receptacles", a: "406.12", d: "Where TR receptacles are required.", k: "tamper resistant tr receptacle dwelling" },
  { t: "Luminaires (fixtures)", a: "Article 410", d: "Lighting fixture install rules.", k: "luminaire fixture lighting" },
  { t: "Closet luminaire clearances", a: "410.16", d: "Clearance from storage space by fixture type.", k: "closet luminaire clearance 12 inch storage led" },
  { t: "Wet/damp location luminaires", a: "410.10", d: "Marking and use in wet/damp spots.", k: "wet damp location luminaire marking suitable" },
  { t: "Recessed luminaire clearances (IC)", a: "410.116", d: "Clearance to combustibles / insulation contact.", k: "recessed can ic rated insulation clearance" },
  { t: "Appliances", a: "Article 422", d: "Fixed/cord-connected appliance rules.", k: "appliance disconnect water heater disposal" },
  { t: "Fixed electric space heating", a: "Article 424", d: "Baseboard, heaters, 125% rule.", k: "electric heat baseboard 125 percent fixed heating" },
  { t: "Motors (general)", a: "Article 430", d: "The whole motor article.", k: "motor article 430" },
  { t: "Motor FLC — single phase", a: "Table 430.248", d: "Full-load current for conductor sizing.", k: "motor single phase full load current flc 430.248" },
  { t: "Motor FLC — three phase", a: "Table 430.250", d: "Full-load current for conductor sizing.", k: "motor three phase full load current flc 430.250" },
  { t: "Motor conductor sizing", a: "430.22", d: "125% of table FLC for a single motor.", k: "motor conductor 125 percent flc sizing" },
  { t: "Motor overload sizing", a: "430.32", d: "From the nameplate FLA.", k: "motor overload nameplate fla 115 125 percent" },
  { t: "Motor short-circuit / GF device", a: "Table 430.52", d: "Max breaker/fuse percentages.", k: "motor breaker fuse 250 percent short circuit table 430.52" },
  { t: "Motor disconnect", a: "430.110", d: "Disconnect rating, in sight of motor.", k: "motor disconnect 115 percent in sight" },
  { t: "Several motors on one circuit", a: "430.24", d: "Sizing conductors for a group of motors.", k: "multiple motors feeder largest plus" },
  { t: "A/C & refrigeration (HVAC)", a: "Article 440", d: "Uses nameplate RLA/BCSC, disconnect in sight.", k: "ac air conditioner hvac rla bcsc disconnect 440" },
  { t: "Transformers", a: "Article 450", d: "Transformer install and protection.", k: "transformer article 450" },
  { t: "Transformer overcurrent protection", a: "Table 450.3(B)", d: "Primary/secondary percentages, 1000V or less.", k: "transformer overcurrent 125 percent primary secondary 450.3" },
  { t: "Capacitors", a: "Article 460", d: "Capacitor rules and discharge.", k: "capacitor discharge 460.6 power factor" },
  { t: "Storage batteries", a: "Article 480", d: "Battery installations.", k: "battery storage 480" },
  { t: "Generators", a: "Article 445", d: "Generator install rules.", k: "generator 445" },

  // ===== CHAPTER 5 — SPECIAL OCCUPANCIES =====
  { t: "Hazardous (classified) locations", a: "Article 500", d: "Class/Division system overview.", k: "hazardous classified location class division 500" },
  { t: "Class/Division definitions", a: "500.5", d: "Class I gas, II dust, III fibers; Div 1/2.", k: "class i ii iii division 1 2 gas dust fiber" },
  { t: "Class I locations", a: "Article 501", d: "Flammable gas/vapor wiring methods.", k: "class 1 gas vapor explosion proof 501" },
  { t: "Class II locations", a: "Article 502", d: "Combustible dust wiring methods.", k: "class 2 dust 502" },
  { t: "Class III locations", a: "Article 503", d: "Ignitible fibers/flyings.", k: "class 3 fibers flyings 503" },
  { t: "Fuel dispensing (gas stations)", a: "Article 514", d: "Classified zones around dispensers.", k: "gas station fuel dispenser motor fuel 514" },
  { t: "Spray application / dip", a: "Article 516", d: "Paint spray booths.", k: "spray booth paint dip 516" },
  { t: "Health care facilities", a: "Article 517", d: "Patient care, redundant grounding.", k: "hospital health care patient care 517" },
  { t: "Assembly occupancies", a: "Article 518", d: "Places of assembly.", k: "assembly occupancy 518" },
  { t: "Theaters", a: "Article 520", d: "Stage/theater wiring.", k: "theater stage 520" },
  { t: "Carnivals, fairs, circuses", a: "Article 525", d: "Temporary amusement wiring.", k: "carnival fair circus 525" },
  { t: "Agricultural buildings", a: "Article 547", d: "Farm/equipotential rules.", k: "agricultural farm 547" },
  { t: "Mobile / manufactured homes", a: "Article 550", d: "Mobile home wiring/service.", k: "mobile manufactured home 550" },
  { t: "RV parks", a: "Article 551", d: "Recreational vehicles & parks.", k: "rv recreational vehicle park 551" },
  { t: "Marinas & boatyards", a: "Article 555", d: "Docks, shore power.", k: "marina boatyard dock shore power 555" },
  { t: "Temporary installations", a: "Article 590", d: "Temp power for construction/holiday.", k: "temporary power construction 590 holiday" },

  // ===== CHAPTER 6 — SPECIAL EQUIPMENT =====
  { t: "Electric signs & outline lighting", a: "Article 600", d: "Signs, neon.", k: "sign neon outline lighting 600" },
  { t: "Cranes & hoists", a: "Article 610", d: "Crane/hoist wiring.", k: "crane hoist 610" },
  { t: "Elevators", a: "Article 620", d: "Elevator/escalator wiring.", k: "elevator escalator 620" },
  { t: "Electric vehicle charging", a: "Article 625", d: "EVSE / EV charger install.", k: "ev electric vehicle charger evse 625" },
  { t: "Information technology equipment", a: "Article 645", d: "Server/computer rooms.", k: "it room server computer 645" },
  { t: "Swimming pools, spas, hot tubs", a: "Article 680", d: "Pool wiring, clearances, bonding.", k: "pool spa hot tub fountain 680" },
  { t: "Pool equipotential bonding", a: "680.26", d: "Bond pool steel + perimeter surface.", k: "pool bonding equipotential 3 feet perimeter 680.26" },
  { t: "Pool overhead clearances", a: "680.9", d: "Conductors over pools.", k: "pool overhead clearance 680.9" },
  { t: "Fire pumps", a: "Article 695", d: "Fire pump power.", k: "fire pump 695" },

  // ===== CHAPTER 7 — SPECIAL CONDITIONS =====
  { t: "Emergency systems", a: "Article 700", d: "Life-safety emergency power.", k: "emergency system 700 backup life safety" },
  { t: "Legally required standby", a: "Article 701", d: "Required standby systems.", k: "legally required standby 701" },
  { t: "Optional standby", a: "Article 702", d: "Optional generators/standby.", k: "optional standby generator 702" },
  { t: "Interconnected power / PV", a: "Article 705", d: "Solar/utility interconnection.", k: "solar pv interconnect 705 grid tie" },
  { t: "Energy storage systems", a: "Article 706", d: "Battery storage systems.", k: "energy storage ess battery 706" },
  { t: "Class 1, 2, 3 circuits", a: "722 / 724 / 725 (2023)", d: "2023 split them: 722 general, 724 Class 1, 725 Class 2 & 3. 2020 book: all in Article 725.", k: "class 1 2 3 power limited control signaling 725" },
  { t: "Fire alarm systems", a: "Article 760", d: "Fire alarm circuits.", k: "fire alarm 760" },
  { t: "Optical fiber cables", a: "Article 770", d: "Fiber install + abandoned cable.", k: "fiber optic optical 770 abandoned" },

  // ===== CHAPTER 8 — COMMUNICATIONS =====
  { t: "Communications systems (general)", a: "Article 800", d: "General comms rules + abandoned cable.", k: "communications general 800 telephone" },
  { t: "Abandoned communications cable", a: "800.25", d: "Accessible abandoned cable must be removed.", k: "abandoned cable removed accessible 800.25" },
  { t: "Antennas & TV (radio/TV)", a: "Article 810", d: "Radio/TV receiving + transmitting antennas.", k: "antenna radio tv 810" },
  { t: "Coaxial cable / CATV", a: "Article 820", d: "Community antenna / coax.", k: "coax catv community antenna 820" },
  { t: "Network-powered broadband", a: "Article 830", d: "Network broadband systems.", k: "network broadband 830" },
  { t: "Premises-powered broadband", a: "Article 840", d: "Premises broadband (ONT).", k: "premises broadband ont 840" },

  // ===== OTHER BOOKS =====
  { t: "Ohm's Law / power wheel", a: "Ugly's", d: "E=I×R, P=E×I and the wheel.", k: "ohms law power wheel volts amps resistance ugly" },
  { t: "Three-phase formulas (1.732)", a: "Ugly's", d: "Line vs phase, the √3 factor.", k: "three phase 1.732 square root 3 power formula ugly" },
  { t: "Voltage drop formula", a: "Ugly's", d: "VD = (2×K×I×L) ÷ cmil.", k: "voltage drop cmil k factor ugly" },
  { t: "Conduit bending math", a: "Ugly's", d: "Offsets, multipliers, shrink.", k: "conduit bending offset multiplier shrink ugly" },
  { t: "Lockout / Tagout", a: "OSHA 1910.147", d: "Energy control program.", k: "loto lockout tagout 1910.147 osha energy control" },
  { t: "Construction electrical safety", a: "OSHA 1926 Subpart K", d: "Construction-site electrical rules.", k: "osha 1926 subpart k construction gfci temporary" },
  { t: "PPE (general industry)", a: "OSHA 1910 Subpart I", d: "Personal protective equipment.", k: "ppe protective equipment 1910 subpart i osha" },
  { t: "Arc-flash boundary", a: "NFPA 70E 130.5", d: "Incident-energy / arc-flash boundary.", k: "arc flash boundary 70e 130.5 incident energy" },
  { t: "Shock approach boundaries", a: "NFPA 70E 130.4", d: "Limited & restricted approach.", k: "approach boundary limited restricted shock 70e 130.4" },
  { t: "Electrically safe work condition", a: "NFPA 70E 120.6 (2024)", d: "The de-energize + verify + LOTO steps.", k: "electrically safe work condition 70e 120 deenergize verify" },
  { t: "Contracts, bonds, liens", a: "NASCLA Business & Law", d: "Contract types, bond types, mechanic's lien.", k: "contract bond lien lump sum cost plus nascla business law" },
  { t: "Project management basics", a: "PMBOK 7th / NASCLA", d: "Scope, schedule, cost, risk.", k: "project management pmbok scope schedule cost risk" },
];


// ============================================================
//  FAN GUYS EXAM PRO  —  Study System
//  Blue / Chrome / Black.  No emoji — all icons are drawn SVG.
// ============================================================

const LETTERS = ["A", "B", "C", "D"];
// Practice pool. Items retired in the Nov 2026 audit (duplicates) are excluded so the count is honest.
const ALL_Q = EXAM.flatMap((s, si) =>
  s.questions.filter((q) => !q.retired).map((q) => ({ ...q, sectionIdx: si, sectionTitle: s.title }))
);
const sectionPool = (si) => ALL_Q.filter((q) => q.sectionIdx === si);
// Separate, locked 100-question Full Practice Exam pool (never used in study/practice)
const ALL_FULL = EXAM_FULL.flatMap((s, si) =>
  s.questions.map((q) => ({ ...q, sectionIdx: si, sectionTitle: s.title }))
);

// Section hero images (Torque). dark:true = image has black bg, place on black container.
const SECTION_IMAGES = {
  0: { src: SEC_PROJECT, dark: false }, // Project Design & Management
  2: { src: SEC_THEORY, dark: true },   // Electrical Theory
  3: { src: SEC_GENCODE, dark: false }, // General Code Requirements
  5: { src: SEC_METHODS, dark: false }, // Wiring Methods & Materials
  6: { src: SEC_EQUIP, dark: false },   // Equipment for General Use
  7: { src: SEC_SPECIAL, dark: false }, // Special Occupancies
  8: { src: SEC_COMMS, dark: false },   // Communication Systems
};

// Visual cheat-sheet posters per section (each is its own tap-to-open card)
const SECTION_CHEATS = {
  3: [
    { src: CHEAT_WIDTHDEPTH, title: "Width vs. Depth — Don't Mix Them", cap: "NEC working space (110.26)" },
    { src: CHEAT_WSTABLE, title: "Read the Working-Space Table by Voltage", cap: "Table 110.26(A)(1)" },
    { src: CHEAT_WEAKLINK, title: "The Weakest-Link Temperature Rule", cap: "110.14(C)" },
    { src: CHEAT_APPROVED, title: "Approved ≠ Listed ≠ Labeled", cap: "Article 100 terms" },
    { src: CHEAT_DEFS, title: "Definition Questions → Article 100", cap: "Answer from the book" },
  ],
  7: [
    { src: CHEAT_WATER, title: "Water = Check GFCI First, Then Bonding", cap: "Article 680 & wet locations" },
    { src: CHEAT_PLACE, title: "Name the Place, Find the Article", cap: "Special occupancies roadmap" },
    { src: CHEAT_CLASSDIV, title: "Class = What, Division = When", cap: "Hazardous (classified) locations" },
  ],
  8: [
    { src: CHEAT_BOND, title: "Bond It All Together", cap: "Intersystem bonding (250.94)" },
    { src: CHEAT_PLENUM, title: "P is for Plenum", cap: "CMP / CMR / CM / CMX" },
    { src: CHEAT_CH8, title: "Chapter 8 Stands Alone", cap: "Communications (800.3)" },
  ],
};
function Mascot({ src = MASCOT_FULL, w = 120, style = {} }) {
  return <img src={src} alt="Fan Guys mascot" style={{ width: w, height: "auto", filter: `drop-shadow(0 8px 20px ${C.blueDeep}66)`, ...style }} />;
}

function shortTitle(t) { const p = t.split(" — "); return p.length > 1 ? p[1] : t; }
function sectionTag(t) { const m = t.match(/SECTION\s+(\d+)/i); return m ? "S" + m[1] : ""; }

// ---------- palette ----------
const C = {
  bg: "#05080f",
  bg2: "#080d18",
  panel: "#0d1422",
  panel2: "#111a2c",
  line: "#1b2740",
  steel: "#9fb3cc",
  chrome: "#dfe8f2",
  blue: "#1f7bff",
  blueHi: "#3f9bff",
  blueDeep: "#0a4fcc",
  cyan: "#46c6ff",
  live: "#27e08a",
  danger: "#ff4361",
  text: "#eaf1fb",
  mute: "#7e8eaa",
  faint: "#7684a0", // raised from #46546f for readable contrast (≈5:1)
};
const disp = "'Saira',sans-serif";        // condensed industrial display
const body = "'Saira Semi Condensed',sans-serif";
const mono = "'JetBrains Mono','Courier New',monospace";

function Style() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Saira:wght@600;700;800;900&family=Saira+Semi+Condensed:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');
      *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
      button:focus-visible,a:focus-visible,summary:focus-visible,input:focus-visible{outline:3px solid #46c6ff;outline-offset:2px}
      @media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}
      @keyframes fgRise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fgScan{0%{transform:translateY(-120%)}100%{transform:translateY(520%)}}
      @keyframes fgGlow{0%,100%{box-shadow:0 0 0 ${C.blue}00,0 6px 22px ${C.blueDeep}55}50%{box-shadow:0 0 26px ${C.blue}66,0 6px 22px ${C.blueDeep}55}}
      @keyframes fgBar{from{width:0}}
      @keyframes fgShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
      @keyframes fgSheen{0%{background-position:-160% 0}100%{background-position:260% 0}}
      @keyframes fgFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
      @keyframes fgFlip{from{transform:rotateY(0)}to{transform:rotateY(180deg)}}
      .fg-rise{animation:fgRise .42s cubic-bezier(.2,.7,.3,1) both}
      .fg-btn{transition:transform .08s ease,box-shadow .15s ease,border-color .15s ease,background .15s ease}
      .fg-btn:active{transform:scale(.975)}
      .fg-chrome{background:linear-gradient(180deg,#fff,#cdd9e8 38%,#8aa0bd 60%,#e6eef7 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
      ::-webkit-scrollbar{width:9px;height:9px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.line};border-radius:8px}
    `}</style>
  );
}

// ---------- drawn icons (stroke-based, blue/chrome) ----------
const Ico = {
  bolt: (p = {}) => (
    <svg width={p.s || 22} height={p.s || 22} viewBox="0 0 24 24" fill="none">
      <path d="M13 2 4.5 13.4H11l-1.5 8.6L20 9.9h-6.7L13 2Z" fill={p.c || C.blue} stroke={p.st || "#0a1a33"} strokeWidth="0.7" strokeLinejoin="round"/>
    </svg>
  ),
  book: (p = {}) => (
    <svg width={p.s || 22} height={p.s || 22} viewBox="0 0 24 24" fill="none" stroke={p.c || C.cyan} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 6c-1.6-1.2-3.7-2-6-2-1 0-2 .15-3 .4v13c1-.25 2-.4 3-.4 2.3 0 4.4.8 6 2 1.6-1.2 3.7-2 6-2 1 0 2 .15 3 .4v-13c-1-.25-2-.4-3-.4-2.3 0-4.4.8-6 2Z"/>
      <path d="M12 6v14"/>
    </svg>
  ),
  cards: (p = {}) => (
    <svg width={p.s || 22} height={p.s || 22} viewBox="0 0 24 24" fill="none" stroke={p.c || C.blue} strokeWidth="1.7" strokeLinejoin="round">
      <rect x="3" y="7" width="13" height="13" rx="2"/>
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4H19a2 2 0 0 1 2 2v9.5a1.5 1.5 0 0 1-1.5 1.5H16"/>
    </svg>
  ),
  timer: (p = {}) => (
    <svg width={p.s || 22} height={p.s || 22} viewBox="0 0 24 24" fill="none" stroke={p.c || C.danger} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8"/><path d="M12 13V9M9 2h6M19 6l1.5-1.5"/>
    </svg>
  ),
  target: (p = {}) => (
    <svg width={p.s || 22} height={p.s || 22} viewBox="0 0 24 24" fill="none" stroke={p.c || C.blue} strokeWidth="1.7">
      <circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill={p.c || C.blue}/>
    </svg>
  ),
  chair: (p = {}) => (
    <svg width={p.s || 20} height={p.s || 20} viewBox="0 0 24 24" fill="none" stroke={p.c || C.cyan} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v7h12V4M6 11l-1 9M18 11l1 9M5 15h14M8 20v1M16 20v1"/>
    </svg>
  ),
  sigma: (p = {}) => (
    <svg width={p.s || 20} height={p.s || 20} viewBox="0 0 24 24" fill="none" stroke={p.c || C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 5H7l5 7-5 7h10"/>
    </svg>
  ),
  spark: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke={p.c || C.cyan} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>
    </svg>
  ),
  check: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke={p.c || C.live} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9 17.5 20 6.5"/></svg>
  ),
  x: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke={p.c || C.danger} strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
  ),
  home: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke={p.c || C.mute} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"><path d="M4 11 12 4l8 7M6 10v9h12v-9"/></svg>
  ),
  flip: (p = {}) => (
    <svg width={p.s || 16} height={p.s || 16} viewBox="0 0 24 24" fill="none" stroke={p.c || C.steel} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8a9 9 0 0 1 15-3l3 3M21 16a9 9 0 0 1-15 3l-3-3M21 5v3h-3M3 19v-3h3"/></svg>
  ),
  chev: (p = {}) => (
    <svg width={p.s || 16} height={p.s || 16} viewBox="0 0 24 24" fill="none" stroke={p.c || C.blue} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg>
  ),
  arrowL: (p = {}) => (
    <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke={p.c || C.mute} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
  ),
};

// background grid + scan lines
function Backdrop() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.45,
        backgroundImage: `linear-gradient(${C.line}44 1px,transparent 1px),linear-gradient(90deg,${C.line}44 1px,transparent 1px)`,
        backgroundSize: "46px 46px",
        maskImage: "radial-gradient(ellipse 100% 60% at 50% 0%,#000 25%,transparent 78%)",
      }} />
      <div style={{ position: "absolute", top: 0, left: "10%", width: 2, height: 40, background: `linear-gradient(${C.blue},transparent)`, animation: "fgScan 3s linear infinite" }} />
      <div style={{ position: "absolute", top: 0, left: "44%", width: 2, height: 40, background: `linear-gradient(${C.cyan},transparent)`, animation: "fgScan 3.6s linear infinite", animationDelay: ".8s" }} />
      <div style={{ position: "absolute", top: 0, left: "78%", width: 2, height: 40, background: `linear-gradient(${C.blueHi},transparent)`, animation: "fgScan 2.6s linear infinite", animationDelay: "1.4s" }} />
    </div>
  );
}

function TopBar({ go, showHome }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "calc(8px + env(safe-area-inset-top)) 16px 8px", borderBottom: `1px solid ${C.line}`, background: `${C.bg}e8`, backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 40 }}>
      <div role="link" tabIndex={0} aria-label="Fan Guys Exam Pro home" onKeyDown={(e) => { if (e.key === "Enter") go({ screen: "home" }); }} onClick={() => go({ screen: "home" })} style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", minHeight: 44 }}>
        <img src={LOGO} alt="Fan Guys" style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 7, border: `1px solid ${C.line}` }} />
        <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 15, letterSpacing: 0.4 }}>
          <span className="fg-chrome">FAN</span><span style={{ color: C.blue }}>GUYS</span>
        </div>
        <span style={{ fontFamily: mono, fontSize: 8.5, color: C.mute, border: `1px solid ${C.line}`, padding: "2px 5px", borderRadius: 4, letterSpacing: 1 }}>EXAM PRO</span>
      </div>
      {showHome && <button className="fg-btn" aria-label="Home" onClick={() => go({ screen: "home" })} style={{ ...ghostBtn, minWidth: 44, minHeight: 44, justifyContent: "center" }}><Ico.home s={15} /></button>}
    </div>
  );
}

const ghostBtn = { cursor: "pointer", background: "transparent", border: `1px solid ${C.line}`, color: C.mute, fontFamily: mono, fontSize: 11, fontWeight: 700, padding: "6px 9px", borderRadius: 8, display: "flex", alignItems: "center", gap: 5 };
const cardLabel = (color) => ({ display: "flex", alignItems: "center", gap: 7, fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: 1.4, color, marginBottom: 9 });
const bodyP = { fontFamily: body, fontSize: 15.5, fontWeight: 400, lineHeight: 1.5, color: "#c2cee0", margin: "0 0 10px" };
const tagPill = { fontFamily: mono, fontSize: 11, fontWeight: 700, color: "#04122b", background: `linear-gradient(180deg,${C.blueHi},${C.blue})`, borderRadius: 6, padding: "3px 7px", flexShrink: 0 };

function PrimaryBtn({ children, onClick, glow = true, full }) {
  return (
    <button className="fg-btn" onClick={onClick} style={{
      cursor: "pointer", border: "none", width: full ? "100%" : undefined,
      background: `linear-gradient(180deg,${C.blueHi},${C.blueDeep})`, color: "#fff",
      fontFamily: disp, fontWeight: 800, fontSize: 16, letterSpacing: 0.6, textTransform: "uppercase",
      padding: "14px 18px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
      animation: glow ? "fgGlow 2.6s ease-in-out infinite" : "none",
      boxShadow: `0 6px 22px ${C.blueDeep}55`,
    }}>{children}</button>
  );
}
function GhostBtn({ children, onClick, full }) {
  return (
    <button className="fg-btn" onClick={onClick} style={{
      cursor: "pointer", border: `1px solid ${C.line}`, width: full ? "100%" : undefined,
      background: C.panel2, color: C.text,
      fontFamily: disp, fontWeight: 800, fontSize: 15, letterSpacing: 0.6, textTransform: "uppercase",
      padding: "13px 18px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    }}>{children}</button>
  );
}
function SectionHeading({ children, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, margin: "2px 0 13px" }}>
      <div style={{ width: 5, height: 17, background: `linear-gradient(${C.blueHi},${C.blueDeep})`, borderRadius: 2 }} />
      {icon}
      <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>{children}</div>
    </div>
  );
}

// ---- Splash / loading screen (clean fan + scissor lift smoothly extends) ----
const SPLASH_CSS = `
.tlwrap .brand{font-family:${disp};font-weight:900;letter-spacing:1px;color:#dbe6f5;white-space:nowrap;text-shadow:0 0 14px rgba(0,167,255,.5);text-align:center}
.tlwrap .tl-stage{position:relative;height:min(66vh,600px);aspect-ratio:460/720;animation:tlFade .5s ease both}
.tlwrap .tl-layer{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center}
.tlwrap .tl-static{z-index:1}
.tlwrap .tl-sciss{z-index:2;transform-origin:50% 85%;transition:transform .1s linear;will-change:transform}
.tlwrap .tl-basket{z-index:3;transition:transform .1s linear;will-change:transform}
.tlwrap .tl-glow{position:absolute;left:50%;top:12%;width:20%;height:6%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(0,150,255,.85),rgba(0,150,255,0) 70%);filter:blur(6px);z-index:4;pointer-events:none;animation:tlPulse 1.4s ease-in-out infinite}
.tlwrap .status{width:min(300px,82vw);text-align:center}
.tlwrap .percent{display:inline-block;color:#f7fbff;font-weight:900;font-size:30px;letter-spacing:.04em;text-shadow:0 0 12px #00a7ff,0 2px 0 #000}
.tlwrap .bar{display:block;margin-top:10px;height:12px;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);overflow:hidden}
.tlwrap .bar-fill{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#0074ff,#00e0ff);box-shadow:0 0 16px #00a7ff;transition:width .14s linear}
@keyframes tlFade{0%{opacity:0}100%{opacity:1}}
@keyframes tlPulse{0%,100%{opacity:.4;transform:translate(-50%,-50%) scale(.9)}50%{opacity:.9;transform:translate(-50%,-50%) scale(1.18)}}
`;

function Splash({ onDone }) {
  const [pct, setPct] = useState(0);
  const [fading, setFading] = useState(false);
  const doneRef = useRef(false);
  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setFading(true);
    setTimeout(onDone, 520);
  };
  useEffect(() => {
    const RISE = 2900;
    const startT = performance.now();
    let raf;
    const loop = (now) => {
      const t = Math.min(1, (now - startT) / RISE);
      const eased = 1 - Math.pow(1 - t, 2.0);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(loop);
      else setTimeout(finish, 520);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const prog = pct / 100;
  const s = 0.30 + 1.15 * prog;        // scissor scale: collapsed -> fully extended
  const basketY = 11.94 * (1 - s);     // % the basket+Torque ride with the scissors
  return (
    <div className="tlwrap" onClick={finish} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "18px 16px calc(18px + env(safe-area-inset-bottom))", opacity: fading ? 0 : 1, transition: "opacity .5s ease", pointerEvents: fading ? "none" : "auto" }}>
      <style>{SPLASH_CSS}</style>
      <div className="brand" style={{ fontSize: 14 }}>FAN GUYS · EXAM PRO</div>
      <div className="tl-stage">
        <img className="tl-layer tl-static" src={STATIC_LAYER} alt="" />
        <img className="tl-layer tl-sciss" src={SCISS_LAYER} alt="" style={{ transform: `scaleY(${s})` }} />
        <img className="tl-layer tl-basket" src={BASKET_LAYER} alt="Loading" style={{ transform: `translateY(${basketY}%)` }} />
        <div className="tl-glow" />
      </div>
      <div className="status">
        <span className="percent">{pct}%</span>
        <span className="bar"><span className="bar-fill" style={{ width: pct + "%" }} /></span>
      </div>
    </div>
  );
}



const ALL_FULL_B = EXAM_FULL_B.flatMap((s, si) => s.questions.map((q) => ({ ...q, sectionIdx: si, sectionTitle: s.title })));

// ====================================================================
//  HOME  — logo splash + 4 modes
// ====================================================================
// Exam outline facts verified against the PSI Candidate Information Bulletin (bulletin 6677), accessed 2026-11-17.
const OUTLINE_CHANGE_DATE = new Date("2027-01-01T00:00:00");
const OUTLINE_2027 = [["Project Documents", 5], ["Safety", 5], ["Electrical Theory & Principles", 6], ["General Code Requirements", 11], ["Wiring & Protection", 22], ["Wiring Methods & Materials", 14], ["Equipment for General Use", 20], ["Special Occupancies, Equipment & Conditions", 15], ["Communication Systems", 2]];

function Home({ go, progress }) {
  const best = [progress.best.A, progress.best.B].filter((x) => x != null);
  const bestPct = best.length ? Math.max(...best) : null;
  const due = reviewPool(progress, ALL_Q).length;
  const answered = Object.keys(progress.q).length;
  const mastered = Object.values(progress.q).filter((s) => questionStatus(s) === "mastered").length;
  const daysToChange = Math.ceil((OUTLINE_CHANGE_DATE - Date.now()) / 86400000);
  return (
    <div className="fg-rise" style={{ padding: "20px 16px 70px", maxWidth: 780, margin: "0 auto" }}>
      {/* hero: logo left, Torque right */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2%", background: "radial-gradient(120% 120% at 30% 30%, #0a1322 0%, #000 80%)", border: `1px solid ${C.line}`, borderRadius: 20, padding: "14px 10px 6px", marginTop: 6 }}>
        <div style={{ flex: "1 1 0", textAlign: "center", minWidth: 0 }}>
          <img src={LOGO} alt="Fan Guys Exam Pro" style={{ width: "min(96%,260px)", borderRadius: 16, animation: "fgFloat 5s ease-in-out infinite" }} />
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2.5, color: C.cyan, marginTop: 6 }}>MASTER / UNLIMITED</div>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2.5, color: C.mute, marginTop: 2 }}>NEC 2020 OR 2023</div>
        </div>
        <img src={MASCOT_POINT} alt="Torque" style={{ flex: "1.25 1 0", width: "58%", maxWidth: 300, height: "auto", objectFit: "contain", animation: "fgFloat 4.2s ease-in-out infinite", animationDelay: ".4s" }} />
      </div>

      {/* stat strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, margin: "16px 0 22px" }}>
        <Stat label="MASTERED" value={`${mastered}/${ALL_Q.length}`} color={C.blue} />
        <Stat label="ANSWERED" value={String(answered)} color={C.cyan} />
        <Stat label="BEST EXAM" value={bestPct != null ? bestPct + "%" : "—"} color={bestPct != null && bestPct >= 75 ? C.live : C.cyan} />
      </div>

      {/* next study action */}
      {due > 0 && (
        <button className="fg-btn" onClick={() => go({ screen: "quiz", mode: "review", _k: Date.now() })} style={{ width: "100%", cursor: "pointer", textAlign: "left", marginBottom: 14, display: "flex", alignItems: "center", gap: 13, background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${C.live}66`, borderRadius: 14, padding: "14px 15px", color: C.text }}>
          <span style={{ fontFamily: disp, fontWeight: 900, fontSize: 26, color: C.live, minWidth: 40, textAlign: "center" }}>{due}</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontFamily: disp, fontWeight: 900, fontSize: 16, textTransform: "uppercase" }}>Review Due</span>
            <span style={{ display: "block", fontFamily: body, fontSize: 13, color: C.mute, lineHeight: 1.3 }}>Your misses, starred questions, and questions scheduled to come back. Up to 25 per session.</span>
          </span>
          <Ico.chev s={16} c={C.live} />
        </button>
      )}

      {daysToChange > 0 && (
        <button className="fg-btn" onClick={() => go({ screen: "about" })} style={{ width: "100%", cursor: "pointer", textAlign: "left", marginBottom: 18, background: "#2a1c05", border: "1px solid #ffb02088", borderRadius: 14, padding: "12px 15px", color: C.text }}>
          <span style={{ display: "block", fontFamily: mono, fontSize: 10, letterSpacing: 1.5, color: "#ffb020", marginBottom: 3 }}>EXAM OUTLINE CHANGES JAN 1, 2027 · {daysToChange} DAYS</span>
          <span style={{ display: "block", fontFamily: body, fontSize: 13.5, color: "#f3e6cc", lineHeight: 1.35 }}>Testing in 2027? More Wiring & Protection (22), Equipment (20) and Special Occupancies (15); PMBOK and ASHRAE 90.1 drop off the book list. The mock exams here use the 2026 weights. Tap for details.</span>
        </button>
      )}

      <SectionHeading icon={<Ico.spark s={15} />}>CHOOSE YOUR MODE</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
        <ModeTile icon={<Ico.book s={26} />} title="STUDY" sub="Learn each section + how to find answers" accent={C.cyan} onClick={() => go({ screen: "studyList" })} />
        <ModeTile icon={<Ico.target s={26} />} title="PRACTICE" sub="Quiz by section · instant walkthroughs" accent={C.blue} onClick={() => go({ screen: "practiceList" })} />
        <ModeTile icon={<Ico.timer s={26} />} title="TIMED EXAM" sub={`2 mocks · ${ALL_FULL.length} Q each · ${EXAM_MIN} min`} accent={C.danger} onClick={() => go({ screen: "examIntro" })} />
        <ModeTile icon={<Ico.cards s={26} />} title="FLASHCARDS" sub="Drill terms & rules · Concept / Q&A" accent={C.blueHi} onClick={() => go({ screen: "flashIntro" })} />
        <ModeTile icon={<Ico.book s={26} />} title="FIND IT FIRST" sub={`Timed book-lookup drill · ${LOOKUPS.length} targets`} accent={C.live} onClick={() => go({ screen: "lookupIntro" })} />
        <ModeTile icon={<Ico.target s={26} />} title="CODE LOCATOR" sub={`Search ${LOCATOR.length} topics · find the article fast`} accent={C.cyan} onClick={() => go({ screen: "locator" })} />
        <ModeTile icon={<Ico.sigma s={26} />} title="MY PROGRESS" sub="Weak spots by section · back up your progress" accent={C.live} onClick={() => go({ screen: "progress" })} />
        <ModeTile icon={<Ico.spark s={26} />} title="STARRED" sub={`${Object.keys(progress.marks).length} saved questions`} accent={"#ffb020"} onClick={() => go({ screen: "quiz", mode: "marked", _k: Date.now() })} />
      </div>

      {/* About the exam banner */}
      <button className="fg-btn" onClick={() => go({ screen: "about" })} style={{ width: "100%", cursor: "pointer", textAlign: "left", marginTop: 13, display: "flex", alignItems: "center", gap: 13, background: "radial-gradient(120% 140% at 12% 20%, #0c1a30 0%, #06101f 80%)", border: `1px solid ${C.cyan}55`, borderRadius: 14, padding: "14px 15px", color: C.text }}>
        <span style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, background: C.bg2, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ico.spark s={20} c={C.cyan} /></span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontFamily: disp, fontWeight: 900, fontSize: 16, textTransform: "uppercase" }}>About The Exam</span>
          <span style={{ display: "block", fontFamily: body, fontSize: 13, color: C.mute, marginTop: 1, lineHeight: 1.3 }}>What it is, NASCLA vs. state-specific, reciprocity map &amp; sign-up links</span>
        </span>
        <Ico.chev s={16} c={C.cyan} />
      </button>

      {/* Torque tip of the day */}
      <div style={{ display: "flex", alignItems: "center", gap: 13, marginTop: 18, background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${C.blue}44`, borderRadius: 14, padding: "13px 15px" }}>
        <img src={MASCOT_BADGE} alt="Torque" style={{ width: 52, height: 52, borderRadius: 11, flexShrink: 0, border: `1px solid ${C.line}` }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: 2, color: C.cyan, marginBottom: 3 }}>TORQUE'S TIP</div>
          <div style={{ fontFamily: body, fontSize: 14.5, fontWeight: 600, color: "#dbe6f5", lineHeight: 1.35, fontStyle: "italic" }}>“{TORQUE_TIPS[Math.floor(Date.now() / 86400000) % TORQUE_TIPS.length]}”</div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 30, fontFamily: mono, fontSize: 10, color: C.faint, lineHeight: 1.7 }}>
        STUDY SMART. PASS CONFIDENT.<br />OPEN-BOOK PREP · VERIFY CODE IN YOUR CURRENT EDITIONS
      </div>
      <p style={{ textAlign: "center", marginTop: 12, fontFamily: body, fontSize: 11, color: C.faint, lineHeight: 1.5, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
        Independent study aid. Not affiliated with, authorized, or endorsed by NASCLA, NFPA, PMI, or any licensing agency or testing provider. NASCLA, NEC, NFPA 70E, and PMBOK are trademarks of their respective owners.
      </p>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "11px 6px", textAlign: "center" }}>
      <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 24, color }}>{value}</div>
      <div style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: 1, color: C.mute, marginTop: 3 }}>{label}</div>
    </div>
  );
}
function ModeTile({ icon, title, sub, accent, onClick }) {
  return (
    <button className="fg-btn" onClick={onClick} style={{
      cursor: "pointer", textAlign: "left", background: `linear-gradient(160deg,${C.panel2},${C.panel})`,
      border: `1px solid ${C.line}`, borderRadius: 15, padding: "16px 15px", color: C.text,
      position: "relative", overflow: "hidden", minHeight: 132, display: "flex", flexDirection: "column",
    }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 70, height: 70, borderRadius: "50%", background: accent, opacity: 0.12, filter: "blur(8px)" }} />
      <div style={{ width: 44, height: 44, borderRadius: 11, background: C.bg2, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 11 }}>{icon}</div>
      <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 20, letterSpacing: 0.4, marginBottom: 3 }}>{title}</div>
      <div style={{ fontFamily: body, fontSize: 13, color: C.mute, lineHeight: 1.3, fontWeight: 500 }}>{sub}</div>
      <div style={{ position: "absolute", bottom: 12, right: 12 }}><Ico.chev s={15} c={accent} /></div>
    </button>
  );
}

// ====================================================================
//  STUDY  — list + reader
// ====================================================================
function StudyList({ go }) {
  return (
    <div className="fg-rise" style={{ padding: "20px 16px 70px", maxWidth: 780, margin: "0 auto" }}>
      <SectionHeading icon={<Ico.book s={15} />}>STUDY SECTIONS</SectionHeading>
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${C.line}`, borderRadius: 13, padding: "12px 14px", marginBottom: 16 }}>
        <img src={MASCOT_BOOK} alt="Torque" style={{ width: 64, height: 64, borderRadius: 11, flexShrink: 0, objectFit: "cover", objectPosition: "center top", background: "#000", border: `1px solid ${C.line}` }} />
        <p style={{ ...bodyP, margin: 0 }}>Read these first. Each one teaches the section, tells you which book to tab, and how to attack the questions — tap my Pro Tips inside and I'll break down where guys lose points.</p>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {EXAM.map((s, i) => (
          <button key={i} className="fg-btn" onClick={() => go({ screen: "studyRead", sectionIdx: i })} style={{ ...rowBtn, flexDirection: "column", alignItems: "stretch", gap: 8, padding: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <span style={tagPill}>{sectionTag(s.title)}</span>
              <span style={{ fontFamily: disp, fontWeight: 800, fontSize: 18, color: C.text, textTransform: "uppercase" }}>{shortTitle(s.title)}</span>
              <span style={{ marginLeft: "auto" }}><Ico.chev s={15} c={C.cyan} /></span>
            </div>
            <div style={{ fontFamily: body, fontSize: 14, color: C.mute, lineHeight: 1.35, textAlign: "left", fontWeight: 500 }}>{s.overview[0].slice(0, 115)}…</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StudyRead({ sectionIdx, go, openTorque }) {
  const sec = EXAM[sectionIdx];
  const g = STUDY_GUIDES[sectionIdx];
  const hasNext = sectionIdx < EXAM.length - 1;
  return (
    <div className="fg-rise" style={{ padding: "20px 16px 90px", maxWidth: 720, margin: "0 auto" }}>
      <button className="fg-btn" onClick={() => go({ screen: "studyList" })} style={{ ...ghostBtn, marginBottom: 16 }}><Ico.arrowL s={15} /> SECTIONS</button>
      <span style={tagPill}>{sectionTag(sec.title)}</span>
      <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 30, textTransform: "uppercase", margin: "13px 0 3px", lineHeight: 1.04 }}>{shortTitle(sec.title)}</div>
      <div style={{ fontFamily: mono, fontSize: 11, color: C.cyan, marginBottom: 20 }}>{sec.count.toUpperCase()}</div>

      {/* THE GUIDE — with Torque floating, text wrapping around him */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "2px 0 11px" }}>
        <Ico.book s={16} c={C.cyan} />
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>THE GUIDE</div>
      </div>
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.cyan}`, borderRadius: 12, padding: "16px 16px", marginBottom: 22 }}>
        {SECTION_IMAGES[sectionIdx] && (
          <img
            src={SECTION_IMAGES[sectionIdx].src}
            alt={shortTitle(sec.title) + " — Torque"}
            style={{
              float: "right",
              width: "42%",
              maxWidth: 188,
              height: "auto",
              margin: "0 0 10px 15px",
              shapeOutside: "margin-box",
              borderRadius: SECTION_IMAGES[sectionIdx].dark ? 12 : 0,
              background: SECTION_IMAGES[sectionIdx].dark ? "radial-gradient(120% 100% at 50% 20%, #0a1322 0%, #000 85%)" : "transparent",
              border: SECTION_IMAGES[sectionIdx].dark ? `1px solid ${C.line}` : "none",
              filter: SECTION_IMAGES[sectionIdx].dark ? "none" : `drop-shadow(0 6px 16px ${C.blueDeep}66)`,
              animation: "fgFloat 5.5s ease-in-out infinite",
            }}
          />
        )}
        {g.guide.map((p, i) => <p key={i} style={{ ...bodyP, marginBottom: i === g.guide.length - 1 ? 0 : 12 }}>{p}</p>)}
        <div style={{ clear: "both" }} />
      </div>

      {/* KEY NUMBERS */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "2px 0 11px" }}>
        <Ico.sigma s={16} c={C.blue} />
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>KEY NUMBERS</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 22 }}>
        {g.keyNumbers.map((k, i) => (
          <div key={i} style={{ background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${C.line}`, borderRadius: 11, padding: "12px 13px" }}>
            <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 19, color: C.blueHi, lineHeight: 1.05 }}>{k.v}</div>
            <div style={{ fontFamily: body, fontSize: 13, color: C.mute, marginTop: 4, lineHeight: 1.25, fontWeight: 500 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* TAB YOUR BOOKS */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "2px 0 11px" }}>
        <Ico.bolt s={16} c={C.blue} />
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>TAB YOUR BOOKS</div>
      </div>
      <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
        {g.tabBooks.map((b, i) => (
          <div key={i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "13px 14px" }}>
            <div style={{ fontFamily: disp, fontWeight: 800, fontSize: 15, color: C.cyan, marginBottom: 9, textTransform: "uppercase", letterSpacing: 0.3 }}>{b.book}</div>
            <div style={{ display: "grid", gap: 6 }}>
              {b.items.map((it, j) => (
                <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ marginTop: 2, flexShrink: 0 }}><Ico.check s={13} c={C.blue} /></span>
                  <span style={{ fontFamily: body, fontSize: 14.5, color: "#c2cee0", lineHeight: 1.3, fontWeight: 500 }}>{it}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* PRO TIPS (tappable) */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "2px 0 5px" }}>
        <Ico.spark s={16} c={C.gold || C.blueHi} />
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>PRO TIPS</div>
      </div>
      <p style={{ fontFamily: body, fontSize: 13.5, color: C.mute, marginBottom: 12, fontWeight: 500 }}>Tap a tip — Torque breaks down where guys lose the point.</p>
      <div style={{ display: "grid", gap: 9, marginBottom: 26 }}>
        {g.proTips.map((t, i) => (
          <button key={i} className="fg-btn" onClick={() => openTorque(t)} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", width: "100%", cursor: "pointer", background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${t.torque ? C.blue + "66" : C.line}`, borderRadius: 12, padding: "13px 14px", color: C.text }}>
            {t.torque
              ? <img src={MASCOT_BADGE} alt="Torque" style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, border: `1px solid ${C.line}` }} />
              : <span style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, background: C.bg2, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ico.spark s={18} c={C.blue} /></span>}
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "block", fontFamily: disp, fontWeight: 800, fontSize: 16, color: C.text, lineHeight: 1.1 }}>{t.title}</span>
              <span style={{ display: "block", fontFamily: mono, fontSize: 10, color: t.torque ? C.cyan : C.mute, marginTop: 3, letterSpacing: 1 }}>{t.torque ? "TAP — TORQUE EXPLAINS" : "TAP TO OPEN"}</span>
            </span>
            <Ico.chev s={15} c={C.blue} />
          </button>
        ))}
      </div>

      {/* Torque field shot — General Code working space */}
      {sectionIdx === 3 && (
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "2px 0 11px" }}>
            <Ico.target s={16} c={C.cyan} />
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>IN THE FIELD — 3 FT WORKING SPACE</div>
          </div>
          <div style={{ background: "#000", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
            <img src={MASCOT_MEASURE} alt="Torque measuring 3 ft working space in front of a panel" style={{ width: "100%", display: "block" }} />
            <p style={{ fontFamily: body, fontSize: 13.5, color: C.mute, margin: 0, padding: "11px 13px", lineHeight: 1.4, fontWeight: 500 }}>Torque measuring the 3 ft clear depth in front of a panel — 110.26(A). For 0–150 V to ground that's 3 ft in all three Conditions. Keep it clear: no storage, 30 in. wide, 6½ ft of headroom.</p>
          </div>
        </div>
      )}

      {/* DIAGRAMS */}
      {DIAGRAMS[sectionIdx] && DIAGRAMS[sectionIdx].map((d, i) => (
        <div key={i} style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "2px 0 11px" }}>
            <Ico.target s={16} c={C.cyan} />
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>DIAGRAM — {d.title.toUpperCase()}</div>
          </div>
          <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12 }}>
            {d.render()}
            <p style={{ fontFamily: body, fontSize: 13.5, color: C.mute, margin: "11px 2px 0", lineHeight: 1.4, fontWeight: 500 }}>{d.caption}</p>
          </div>
        </div>
      ))}

      {/* READ THE CODE — NFPA free access */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "2px 0 11px" }}>
          <Ico.book s={16} c={C.live} />
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>READ THE CODE</div>
        </div>
        <a href="https://www.nfpa.org/for-professionals/codes-and-standards/list-of-codes-and-standards/free-access" target="_blank" rel="noopener noreferrer" className="fg-btn" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${C.live}55`, borderRadius: 12, padding: "14px 15px", color: C.text }}>
          <span style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, background: C.bg2, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ico.book s={18} c={C.live} /></span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontFamily: disp, fontWeight: 800, fontSize: 15.5, color: C.text }}>Read NEC 2023 Free (NFPA)</span>
            <span style={{ display: "block", fontFamily: body, fontSize: 12.5, color: C.mute, marginTop: 1, lineHeight: 1.3 }}>Official read-only viewer. Free sign-in. Find NFPA 70 &rarr; 2023 &rarr; Free Access.</span>
          </span>
          <Ico.chev s={15} c={C.mute} />
        </a>
        <p style={{ fontFamily: mono, fontSize: 9.5, color: C.faint, marginTop: 9, lineHeight: 1.5 }}>For exam day you use your physical book — this is for checking a rule at home. Read-only; you can't print or copy it.</p>
      </div>

      {/* RESOURCES & LINKS */}
      {RESOURCES[sectionIdx] && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "2px 0 11px" }}>
            <Ico.book s={16} c={C.blue} />
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>RESOURCES & LINKS</div>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {RESOURCES[sectionIdx].map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="fg-btn" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", background: C.panel, border: `1px solid ${r.kind === "official" ? C.blue + "55" : C.line}`, borderRadius: 11, padding: "12px 13px", color: C.text }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: C.bg2, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {r.kind === "video" ? <Ico.target s={15} c={C.danger} /> : <Ico.book s={15} c={C.cyan} />}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontFamily: body, fontWeight: 600, fontSize: 14.5, color: C.text, lineHeight: 1.2 }}>{r.label}</span>
                  <span style={{ display: "block", fontFamily: mono, fontSize: 9.5, color: r.kind === "video" ? C.danger : C.cyan, marginTop: 2, letterSpacing: 1 }}>{r.kind === "video" ? "VIDEO SEARCH" : "OFFICIAL SOURCE"}</span>
                </span>
                <Ico.chev s={14} c={C.mute} />
              </a>
            ))}
          </div>
          <p style={{ fontFamily: mono, fontSize: 9.5, color: C.faint, marginTop: 10, lineHeight: 1.5 }}>Links open in your browser. Video links run a YouTube search so they stay current.</p>
        </div>
      )}

      {/* actions */}
      <div style={{ display: "grid", gap: 10 }}>
        <PrimaryBtn full glow={false} onClick={() => go({ screen: "quiz", mode: "section", sectionIdx })}><Ico.target s={17} c="#fff" /> PRACTICE THIS SECTION</PrimaryBtn>
        {hasNext && <GhostBtn full onClick={() => go({ screen: "studyRead", sectionIdx: sectionIdx + 1 })}>NEXT SECTION <Ico.chev s={14} c={C.text} /></GhostBtn>}
      </div>
    </div>
  );
}

// ---- Torque popup modal ----
function TorquePopup({ tip, onClose }) {
  const [zoomSrc, setZoomSrc] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  if (!tip) return null;
  const fitZoom = () => { setZoomScale(1); setPan({ x: 0, y: 0 }); };
  const closeZoom = () => { setZoomSrc(null); setZoomScale(1); setPan({ x: 0, y: 0 }); };
  return (
    <>
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "#02040ad9", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 0 0 0" }}>
      <div onClick={(e) => e.stopPropagation()} className="fg-rise" style={{ width: "100%", maxWidth: 640, maxHeight: "92vh", overflowY: "auto", background: `linear-gradient(180deg,${C.panel2},${C.bg2})`, borderTop: `2px solid ${C.blue}`, borderTopLeftRadius: 22, borderTopRightRadius: 22, boxShadow: `0 -20px 60px ${C.blueDeep}66`, padding: "10px 18px calc(24px + env(safe-area-inset-bottom))", position: "relative" }}>
        <div style={{ width: 44, height: 5, borderRadius: 3, background: C.line, margin: "6px auto 14px" }} />
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, cursor: "pointer", background: "transparent", border: "none", padding: 6 }}><Ico.x s={18} c={C.mute} /></button>

        <div style={{ display: "flex", gap: 14, alignItems: "flex-end" }}>
          <img src={MASCOT_POINT} alt="Torque" style={{ width: 110, height: "auto", flexShrink: 0, borderRadius: 12, background: "#000", border: `1px solid ${C.line}` }} />
          <div style={{ flex: 1, minWidth: 0, paddingBottom: 6 }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2, color: C.cyan, marginBottom: 4 }}>TORQUE · FOREMAN</div>
            <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 20, color: C.text, lineHeight: 1.08, textTransform: "uppercase" }}>{tip.title}</div>
          </div>
        </div>

        {tip.torque && tip.intro && (
          <div style={{ position: "relative", background: C.blue + "1c", border: `1px solid ${C.blue}55`, borderRadius: 14, padding: "12px 14px", margin: "14px 0 12px" }}>
            <div style={{ fontFamily: body, fontSize: 16.5, fontWeight: 600, color: "#dbe6f5", lineHeight: 1.4, fontStyle: "italic" }}>“{tip.intro}”</div>
          </div>
        )}

        <p style={{ ...bodyP, fontSize: 16, marginBottom: 4 }}>{tip.tip}</p>

        {tip.img && (
          <div onClick={() => { setZoomScale(1); setZoomSrc(tip.img); }} style={{ display: "block", marginTop: 14, cursor: "zoom-in" }}>
            <img src={tip.img} alt={tip.title} style={{ width: "100%", display: "block", borderRadius: 12, border: `1px solid ${C.line}` }} />
            <div style={{ fontFamily: mono, fontSize: 9.5, color: C.faint, marginTop: 6, textAlign: "center" }}>Tap image to view full screen &amp; zoom</div>
          </div>
        )}

        <button className="fg-btn" onClick={onClose} style={{ marginTop: 16, width: "100%", cursor: "pointer", border: "none", background: `linear-gradient(180deg,${C.blueHi},${C.blueDeep})`, color: "#fff", fontFamily: disp, fontWeight: 800, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", padding: "13px", borderRadius: 12 }}>GOT IT</button>
      </div>
    </div>
    {zoomSrc && (
      <div onClick={closeZoom} style={{ position: "fixed", inset: 0, zIndex: 200, background: "#000000fa", overflow: "hidden", touchAction: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={zoomSrc}
          alt=""
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => { e.stopPropagation(); const t = e.touches[0]; dragRef.current = { cx: t.clientX, cy: t.clientY, x: pan.x, y: pan.y }; }}
          onTouchMove={(e) => { e.stopPropagation(); if (!dragRef.current) return; const t = e.touches[0]; setPan({ x: dragRef.current.x + (t.clientX - dragRef.current.cx), y: dragRef.current.y + (t.clientY - dragRef.current.cy) }); }}
          onTouchEnd={(e) => { e.stopPropagation(); dragRef.current = null; }}
          onMouseDown={(e) => { e.stopPropagation(); dragRef.current = { cx: e.clientX, cy: e.clientY, x: pan.x, y: pan.y }; }}
          onMouseMove={(e) => { if (!dragRef.current) return; setPan({ x: dragRef.current.x + (e.clientX - dragRef.current.cx), y: dragRef.current.y + (e.clientY - dragRef.current.cy) }); }}
          onMouseUp={() => { dragRef.current = null; }}
          style={{ width: "100%", maxWidth: "100%", height: "auto", display: "block", transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`, transformOrigin: "center center", touchAction: "none", userSelect: "none", WebkitUserSelect: "none", cursor: zoomScale > 1 ? "grab" : "default" }}
        />
        <button onClick={(e) => { e.stopPropagation(); closeZoom(); }} style={{ position: "fixed", top: "calc(12px + env(safe-area-inset-top))", right: 16, zIndex: 210, cursor: "pointer", background: "#0b1220e6", border: `1px solid ${C.line}`, borderRadius: 999, width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center" }}><Ico.x s={20} c="#fff" /></button>
        <div onClick={(e) => e.stopPropagation()} style={{ position: "fixed", bottom: "calc(16px + env(safe-area-inset-bottom))", left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, zIndex: 210 }}>
          <button onClick={(e) => { e.stopPropagation(); setZoomScale((s) => Math.max(1, Math.round((s - 0.5) * 100) / 100)); }} style={zoomBtn}>&minus;</button>
          <button onClick={(e) => { e.stopPropagation(); fitZoom(); }} style={{ ...zoomBtn, width: "auto", padding: "0 16px", fontFamily: mono, fontSize: 13, letterSpacing: 1 }}>FIT</button>
          <button onClick={(e) => { e.stopPropagation(); setZoomScale((s) => Math.min(3.5, Math.round((s + 0.5) * 100) / 100)); }} style={zoomBtn}>+</button>
        </div>
        <div style={{ position: "fixed", top: "calc(14px + env(safe-area-inset-top))", left: 16, zIndex: 210, fontFamily: mono, fontSize: 11, color: "#9fb2cc", pointerEvents: "none" }}>{Math.round(zoomScale * 100)}%{zoomScale > 1 ? " · drag to move" : ""}</div>
      </div>
    )}
    </>
  );
}

const zoomBtn = { cursor: "pointer", background: "#0b1220e6", border: `1px solid ${C.line}`, borderRadius: 999, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: disp, fontWeight: 800, fontSize: 24, lineHeight: 1 };

function PracticeList({ go, progress }) {
  const stats = sectionStats(progress, ALL_Q);
  return (
    <div className="fg-rise" style={{ padding: "20px 16px 70px", maxWidth: 780, margin: "0 auto" }}>
      <SectionHeading icon={<Ico.target s={15} />}>PRACTICE BY SECTION</SectionHeading>
      <p style={{ fontFamily: body, fontSize: 13.5, color: C.mute, margin: "-4px 0 12px", fontWeight: 500 }}>Questions and answer choices are shuffled every run. A question counts as mastered after you get it right on two separate review days.</p>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 9 }}>
        <button className="fg-btn" onClick={() => go({ screen: "quiz", mode: "all", _k: Date.now() })} style={{ ...rowBtn, borderColor: C.blue, background: `linear-gradient(160deg,${C.panel2},${C.panel})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <Ico.spark s={18} c={C.blue} />
            <span style={{ fontFamily: disp, fontWeight: 800, fontSize: 17, textTransform: "uppercase" }}>All {ALL_Q.length} · Shuffled</span>
          </div>
          <Ico.chev s={15} />
        </button>
        {EXAM.map((s, i) => {
          const st = stats[i] || { total: 0, mastered: 0, answered: 0, right: 0 };
          const acc = st.answered ? Math.round((st.right / st.answered) * 100) : null;
          return (
            <button key={i} className="fg-btn" onClick={() => go({ screen: "quiz", mode: "section", sectionIdx: i, _k: Date.now() })} style={{ ...rowBtn, flexDirection: "column", alignItems: "stretch", gap: 7, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11, minWidth: 0, justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 11, minWidth: 0, flex: 1, overflow: "hidden" }}>
                  <span style={tagPill}>{sectionTag(s.title)}</span>
                  <span style={{ fontFamily: disp, fontWeight: 700, fontSize: 16.5, color: C.text, textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{shortTitle(s.title)}</span>
                </span>
                <span style={{ fontFamily: mono, fontSize: 11, color: C.mute, flexShrink: 0 }}>{st.total}Q</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ flex: 1, height: 5, background: C.line, borderRadius: 4, overflow: "hidden" }}><div style={{ width: (st.total ? (st.mastered / st.total) * 100 : 0) + "%", height: "100%", background: C.live }} /></div>
                <span style={{ fontFamily: mono, fontSize: 10.5, color: acc == null ? C.mute : acc >= 75 ? C.live : C.danger, minWidth: 92, textAlign: "right" }}>{acc == null ? "NOT STARTED" : `${st.mastered} MASTERED · ${acc}%`}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
const rowBtn = { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left", cursor: "pointer", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 11, padding: "13px 14px", color: C.text };

// ====================================================================
//  EXAM INTRO
// ====================================================================
function ExamIntro({ go, progress, setProgress }) {
  const sv = progress.exam;
  const svAnswered = sv ? Object.keys(sv.answers || {}).length : 0;
  const fmt = (ms) => { const m = Math.round(ms / 60000); return `${Math.floor(m / 60)} h ${m % 60} min`; };
  const start = (set) => {
    if (sv && !window.confirm(`Starting a new exam discards your paused Exam ${sv.set} (${svAnswered} answered). Continue?`)) return;
    setProgress((p) => ({ ...p, exam: null }));
    go({ screen: "quiz", mode: "exam", examSet: set, _k: Date.now() });
  };
  const recent = progress.attempts.slice(-5).reverse();
  return (
    <div className="fg-rise" style={{ padding: "24px 16px 70px", maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
      <img src={MASCOT_BOOK} alt="" style={{ width: "min(60%,260px)", height: "auto", borderRadius: 16, background: "#000", marginBottom: 6 }} />
      <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 30, textTransform: "uppercase" }}>Full Practice Exam</div>
      <p style={{ ...bodyP, textAlign: "center", margin: "10px auto 20px", maxWidth: 470 }}>
        Two mock exams, each <b style={{ color: C.text }}>100 questions in {EXAM_MIN} minutes</b>, pass at <b style={{ color: C.live }}>75%</b>. Section counts follow the NASCLA outline in effect <b style={{ color: C.text }}>through Dec 31, 2026</b>. Questions and choices are shuffled each attempt, and neither set appears in Practice. You can pause and pick up later on this device — the real exam won't pause, so sit at least one straight through.
      </p>
      {sv && (
        <div style={{ background: C.panel, border: `1px solid ${C.live}66`, borderRadius: 13, padding: "14px", marginBottom: 14, textAlign: "left" }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 1.5, color: C.live, marginBottom: 4 }}>PAUSED EXAM {sv.set}</div>
          <div style={{ fontFamily: body, fontSize: 14.5, color: C.text, marginBottom: 10 }}>{svAnswered} of {sv.order.length} answered · {fmt(sv.leftMs)} left</div>
          <PrimaryBtn full glow={false} onClick={() => go({ screen: "quiz", mode: "exam", examSet: sv.set, resume: true, _k: Date.now() })}>RESUME EXAM {sv.set}</PrimaryBtn>
        </div>
      )}
      <div style={{ display: "grid", gap: 11 }}>
        <button className="fg-btn" onClick={() => start("A")} style={{ cursor: "pointer", border: "none", background: `linear-gradient(180deg,${C.blueHi},${C.blueDeep})`, color: "#fff", fontFamily: disp, fontWeight: 900, fontSize: 18, letterSpacing: 0.6, textTransform: "uppercase", padding: "16px", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}><Ico.bolt s={18} c="#fff" /> {sv ? "NEW" : "START"} EXAM A {progress.best.A != null ? `· BEST ${progress.best.A}%` : ""}</button>
        <button className="fg-btn" onClick={() => start("B")} style={{ cursor: "pointer", border: `1px solid ${C.blue}`, background: C.panel2, color: C.text, fontFamily: disp, fontWeight: 900, fontSize: 18, letterSpacing: 0.6, textTransform: "uppercase", padding: "16px", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}><Ico.bolt s={18} c={C.cyan} /> {sv ? "NEW" : "START"} EXAM B {progress.best.B != null ? `· BEST ${progress.best.B}%` : ""}</button>
      </div>
      {recent.length > 0 && (
        <div style={{ marginTop: 20, textAlign: "left" }}>
          <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: 1.5, color: C.mute, marginBottom: 8 }}>RECENT ATTEMPTS</div>
          {recent.map((a, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 12.5, color: C.text, padding: "8px 2px", borderTop: `1px solid ${C.line}` }}>
              <span>{new Date(a.at).toLocaleDateString()} · Exam {a.set}</span>
              <span style={{ color: a.pct >= 75 ? C.live : C.danger }}>{a.correct}/{a.total} · {a.pct}%{a.usedMin != null ? ` · ${a.usedMin} min` : ""}</span>
            </div>
          ))}
        </div>
      )}
      <p style={{ fontFamily: mono, fontSize: 10.5, color: C.mute, marginTop: 14 }}>A repeat attempt on the same set measures memory as much as skill. Expect your real-exam score to run lower than a third or fourth try here.</p>
    </div>
  );
}
// ====================================================================
//  QUIZ ENGINE  — practice (instant feedback) + exam (timed, deferred)
// ====================================================================
function buildPool(config, progress) {
  const seed = config.seed ?? Math.floor(Math.random() * 2 ** 31);
  const rand = rng(seed);
  let base;
  if (config.mode === "section") base = shuffle(sectionPool(config.sectionIdx), rand);
  else if (config.mode === "review") base = reviewPool(progress, ALL_Q).slice(0, 25);
  else if (config.mode === "marked") base = shuffle(ALL_Q.filter((q) => progress.marks[q.id]), rand);
  else if (config.mode === "list") base = (config.ids || []).map((id) => ALL_Q.find((q) => q.id === id) || ALL_FULL.find((q) => q.id === id) || ALL_FULL_B.find((q) => q.id === id)).filter(Boolean);
  else if (config.mode === "exam") {
    const src = config.examSet === "B" ? ALL_FULL_B : ALL_FULL;
    if (config.resume && progress.exam) {
      const byId = Object.fromEntries(src.map((q) => [q.id, q]));
      return { seed: progress.exam.seed, pool: progress.exam.order.map((id, i) => withChoiceOrder(byId[id], progress.exam.perms[i])).filter((q) => q && q.choices) };
    }
    base = shuffle(src, rand);
  } else base = shuffle(ALL_Q, rand);
  return { seed, pool: base.map((q) => withChoiceOrder(q, choicePerm(rand))) };
}

function Quiz(props) {
  const [built] = useState(() => buildPool(props.config, props.progress));
  if (!built.pool.length) return <EmptyQuiz config={props.config} go={props.go} />;
  return <QuizRun {...props} built={built} />;
}

function EmptyQuiz({ config, go }) {
  return (
    <div style={{ minHeight: "100dvh", background: C.bg, color: C.text }}>
      <Style /><Backdrop /><TopBar go={go} showHome />
      <div style={{ padding: "40px 20px", maxWidth: 560, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 22, textTransform: "uppercase", marginBottom: 8 }}>Nothing to review yet</div>
        <p style={{ ...bodyP, textAlign: "center" }}>{config.mode === "marked" ? "Tap the star on any practice question to save it here." : "Answer some practice questions first. Misses and questions due for another look will show up here."}</p>
        <PrimaryBtn full glow={false} onClick={() => go({ screen: "practiceList" })}>GO TO PRACTICE</PrimaryBtn>
      </div>
    </div>
  );
}

function QuizRun({ config, go, progress, setProgress, built }) {
  const timed = config.mode === "exam";
  const { pool, seed } = built;
  const saved = timed && config.resume && progress.exam ? progress.exam : null;

  const [idx, setIdx] = useState(saved ? saved.idx : 0);
  const [answers, setAnswers] = useState(saved ? saved.answers : {});   // idx -> chosen index (in displayed order)
  const [flags, setFlags] = useState(saved ? saved.flags || {} : {});
  const [picked, setPicked] = useState(saved ? saved.answers[saved.idx] ?? null : null);
  const [locked, setLocked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [leftMs, setLeftMs] = useState(saved ? saved.leftMs : EXAM_MIN * 60000);
  const [dialog, setDialog] = useState(null); // "exit" | "finish" | "nav"
  const scroller = useRef(null);
  const answersRef = useRef(answers); answersRef.current = answers;
  const flagsRef = useRef(flags); flagsRef.current = flags;
  const idxRef = useRef(idx); idxRef.current = idx;
  const endAtRef = useRef(Date.now() + leftMs);
  const doneRef = useRef(false);

  const q = pool[idx];
  const correctIdx = LETTERS.indexOf(q.answer);
  const isLast = idx === pool.length - 1;
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flags).filter(Boolean).length;
  const marked = !!progress.marks[q.id];

  useEffect(() => { if (scroller.current) scroller.current.scrollTop = 0; }, [idx]);

  // Exam clock runs off the wall clock, so a locked phone or background tab can't stretch it.
  useEffect(() => {
    if (!timed) return;
    const t = setInterval(() => {
      const left = Math.max(0, endAtRef.current - Date.now());
      setLeftMs(left);
      if (left <= 0) { clearInterval(t); finish(answersRef.current); }
    }, 500);
    return () => clearInterval(t);
    // eslint-disable-next-line
  }, [timed]);

  // Autosave an exam in progress (every change + every 15 s) so a refresh or dead battery doesn't lose it.
  function snapshot() {
    if (!timed || doneRef.current) return;
    const left = Math.max(0, endAtRef.current - Date.now());
    setProgress((p) => ({ ...p, exam: { set: config.examSet, seed, order: pool.map((x) => x.id), perms: pool.map((x) => x.perm), answers: answersRef.current, flags: flagsRef.current, idx: idxRef.current, leftMs: left, savedAt: Date.now() } }));
  }
  useEffect(() => { snapshot(); }, [answers, flags, idx]); // eslint-disable-line
  useEffect(() => { if (!timed) return; const t = setInterval(snapshot, 15000); return () => clearInterval(t); }, [timed]); // eslint-disable-line

  function finish(finalAnswers) {
    if (doneRef.current) return;
    doneRef.current = true;
    const ans = finalAnswers || answersRef.current;
    let correct = 0;
    pool.forEach((qq, i) => { if (ans[i] === LETTERS.indexOf(qq.answer)) correct++; });
    const pct = Math.round((correct / pool.length) * 100);
    if (timed) {
      const usedMin = Math.round((EXAM_MIN * 60000 - Math.max(0, endAtRef.current - Date.now())) / 60000);
      setProgress((p) => ({
        ...p, exam: null,
        best: { ...p.best, [config.examSet]: Math.max(p.best[config.examSet] ?? 0, pct) },
        attempts: p.attempts.concat({ at: Date.now(), set: config.examSet, pct, correct, total: pool.length, usedMin }).slice(-50),
      }));
    }
    go({ screen: "results", pct, correct, total: pool.length, answers: ans, pool, timed, mode: config.mode });
  }

  function choose(i) {
    if (timed) { setPicked(i); setAnswers((a) => ({ ...a, [idx]: i })); return; }
    if (locked) return;
    setPicked(i); setLocked(true);
    setAnswers((a) => ({ ...a, [idx]: i }));
    setProgress((p) => recordAnswer(p, q.id, i === correctIdx));
  }
  function goTo(n) {
    setIdx(n); setShowMore(false); setDialog(null);
    setPicked(timed ? (answersRef.current[n] ?? null) : null);
    setLocked(false);
  }
  function next() {
    if (isLast) {
      if (timed && answeredCount < pool.length) { setDialog("finish"); return; }
      finish(answers); return;
    }
    goTo(idx + 1);
  }
  function prev() { if (idx > 0) goTo(idx - 1); }
  function exit() { if (timed) { setDialog("exit"); return; } go({ screen: "home" }); }
  function pauseAndLeave() { snapshot(); doneRef.current = true; go({ screen: "home" }); }
  function discard() { doneRef.current = true; setProgress((p) => ({ ...p, exam: null })); go({ screen: "home" }); }

  const progressPct = ((idx + (timed ? 0 : locked ? 1 : 0)) / pool.length) * 100;
  const totalSec = Math.ceil(leftMs / 1000);
  const hh = Math.floor(totalSec / 3600), mm = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0"), ss = String(totalSec % 60).padStart(2, "0");
  const lowTime = leftMs < 5 * 60000;
  const title = timed ? `EXAM ${config.examSet}` : config.mode === "review" ? "REVIEW" : config.mode === "marked" ? "STARRED" : config.mode === "list" ? "RETRY MISSES" : "PRACTICE";

  return (
    <div ref={scroller} style={{ minHeight: "100dvh", maxHeight: "100dvh", overflowY: "auto", background: C.bg, color: C.text }}>
      <Style /><Backdrop />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "calc(9px + env(safe-area-inset-top)) 16px 9px", borderBottom: `1px solid ${C.line}`, background: `${C.bg}f2`, position: "sticky", top: 0, zIndex: 40 }}>
        <button onClick={() => timed && setDialog("nav")} aria-label={timed ? "Open question list" : undefined} style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", color: C.text, cursor: timed ? "pointer" : "default", padding: 4, minHeight: 44 }}>
          <span style={{ fontFamily: mono, fontSize: 10, color: C.cyan, letterSpacing: 1 }}>{title}</span>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.mute }}><span style={{ color: C.blue }}>{idx + 1}</span>/{pool.length}</span>
          {timed && <span style={{ fontFamily: mono, fontSize: 10, color: C.mute, border: `1px solid ${C.line}`, borderRadius: 6, padding: "2px 6px" }}>LIST</span>}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {timed && (
            <span role="timer" aria-label={`Time left ${hh} hours ${mm} minutes`} style={{ fontFamily: mono, fontWeight: 700, fontSize: 14, color: lowTime ? C.danger : C.text, border: `1px solid ${lowTime ? C.danger : C.line}`, padding: "4px 9px", borderRadius: 8 }}>{hh}:{mm}:{ss}</span>
          )}
          <button className="fg-btn" onClick={() => setProgress((p) => toggleMark(p, q.id))} aria-label={marked ? "Remove star" : "Star this question for review"} aria-pressed={marked} style={{ ...ghostBtn, minWidth: 44, minHeight: 44, justifyContent: "center", color: marked ? "#ffb020" : C.mute, borderColor: marked ? "#ffb02088" : C.line, fontSize: 18 }}>{marked ? "★" : "☆"}</button>
          <button className="fg-btn" onClick={exit} aria-label={timed ? "Pause or leave exam" : "Leave practice"} style={{ ...ghostBtn, minWidth: 44, minHeight: 44, justifyContent: "center" }}>{timed ? <span style={{ fontFamily: mono, fontSize: 11 }}>PAUSE</span> : <Ico.x s={14} c={C.mute} />}</button>
        </div>
      </div>

      <div style={{ height: 4, background: C.line }}>
        <div style={{ height: "100%", width: progressPct + "%", background: `linear-gradient(90deg,${C.blueHi},${C.cyan})`, transition: "width .35s ease" }} />
      </div>

      <div style={{ padding: "18px 16px 110px", maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 13, flexWrap: "wrap" }}>
          <span style={tagPill}>{sectionTag(q.sectionTitle)}</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: C.mute, letterSpacing: 1 }}>{shortTitle(q.sectionTitle).toUpperCase()}</span>
          {q.isNew && <span style={{ fontFamily: mono, fontSize: 9.5, color: C.live, border: `1px solid ${C.live}66`, borderRadius: 5, padding: "1px 5px" }}>NEW · {q.type?.toUpperCase()}</span>}
          {timed && flags[idx] && <span style={{ fontFamily: mono, fontSize: 9.5, color: "#ffb020", border: "1px solid #ffb02066", borderRadius: 5, padding: "1px 5px" }}>FLAGGED</span>}
        </div>

        <div className="fg-rise" key={"q" + idx} style={{ fontFamily: body, fontWeight: 600, fontSize: 21, lineHeight: 1.3, marginBottom: 18 }}>{q.stem}</div>

        <div role="radiogroup" aria-label="Answer choices" style={{ display: "grid", gap: 10 }}>
          {q.choices.map((c, i) => {
            const isCorrect = i === correctIdx;
            const isPicked = i === picked;
            let bdr = C.line, bg = C.panel, lc = C.blue;
            if (!timed && locked && isCorrect) { bdr = C.live; bg = `${C.live}14`; lc = C.live; }
            else if (!timed && locked && isPicked && !isCorrect) { bdr = C.danger; bg = `${C.danger}14`; lc = C.danger; }
            else if (timed && isPicked) { bdr = C.blue; bg = `${C.blue}18`; lc = C.cyan; }
            const hot = (!timed && locked && (isCorrect || isPicked)) || (timed && isPicked);
            return (
              <button key={i} role="radio" aria-checked={isPicked} className="fg-btn" disabled={!timed && locked} onClick={() => choose(i)}
                style={{ display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left", width: "100%", minHeight: 52, cursor: !timed && locked ? "default" : "pointer", background: bg, border: `1.5px solid ${bdr}`, borderRadius: 12, padding: "13px 14px", color: C.text, animation: !timed && locked && isPicked && !isCorrect ? "fgShake .4s" : "none" }}>
                <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 13, color: hot ? lc : C.blue, border: `1.5px solid ${hot ? lc : C.line}`, borderRadius: 7, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{LETTERS[i]}</span>
                <span style={{ fontFamily: body, fontSize: 16, fontWeight: 500, lineHeight: 1.3, paddingTop: 2 }}>{c}</span>
                {!timed && locked && isCorrect && <span style={{ marginLeft: "auto", paddingTop: 2 }}><Ico.check s={17} /></span>}
                {!timed && locked && isPicked && !isCorrect && <span style={{ marginLeft: "auto", paddingTop: 2 }}><Ico.x s={17} /></span>}
              </button>
            );
          })}
        </div>

        {timed && (
          <button className="fg-btn" onClick={() => setFlags((f) => ({ ...f, [idx]: !f[idx] }))} aria-pressed={!!flags[idx]} style={{ ...ghostBtn, marginTop: 14, minHeight: 44, color: flags[idx] ? "#ffb020" : C.mute, borderColor: flags[idx] ? "#ffb02088" : C.line }}>
            {flags[idx] ? "FLAGGED — TAP TO CLEAR" : "FLAG TO COME BACK"}
          </button>
        )}

        {!timed && locked && (
          <div className="fg-rise" aria-live="polite" style={{ marginTop: 20, display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 13px", borderRadius: 10, background: picked === correctIdx ? `${C.live}14` : `${C.danger}14`, border: `1px solid ${picked === correctIdx ? C.live : C.danger}55` }}>
              {picked === correctIdx ? <Ico.check s={16} /> : <Ico.x s={16} />}
              <span style={{ fontFamily: disp, fontWeight: 800, fontSize: 14, color: picked === correctIdx ? C.live : C.danger }}>{picked === correctIdx ? "CORRECT" : "NOT QUITE"}</span>
              <span style={{ fontFamily: mono, fontSize: 12, color: C.mute, marginLeft: "auto" }}>ANSWER: <span style={{ color: C.live }}>{q.answer}</span></span>
            </div>
            {picked !== correctIdx && (
              <div style={{ fontFamily: body, fontSize: 14.5, color: "#dbe6f5", lineHeight: 1.4 }}>You picked <b>{LETTERS[picked]}</b>. The right answer is <b style={{ color: C.live }}>{q.choices[correctIdx]}</b>. It goes on your Review list so it comes back until you get it right.</div>
            )}
            <Card color={C.cyan} label={<><Ico.chair s={14} c={C.cyan} /> IN THE TESTING CENTER</>}>
              {(q.center || []).map((t, i) => <p key={i} style={{ ...bodyP, marginBottom: i === q.center.length - 1 ? 0 : 10 }}>{t}</p>)}
            </Card>
            {q.math && q.math.length > 0 && (
              <Card color={C.blue} label={<><Ico.sigma s={14} c={C.blue} /> SHOW THE MATH</>}>
                {q.math.map((t, i) => <div key={i} style={{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: C.text, padding: "3px 0" }}>{t}</div>)}
              </Card>
            )}
            {q.navTip && (
              <Card color={C.live} label={<><Ico.book s={14} c={C.live} /> FIND IT FAST</>}>
                <p style={{ ...bodyP, marginBottom: 0 }}>{q.navTip}</p>
              </Card>
            )}
            {q.more && q.more.length > 0 && (
              <div>
                <button className="fg-btn" onClick={() => setShowMore(!showMore)} aria-expanded={showMore} style={{ cursor: "pointer", background: C.panel2, border: `1px solid ${C.blue}55`, color: C.cyan, fontFamily: mono, fontSize: 12, fontWeight: 700, letterSpacing: 1, padding: "12px 14px", borderRadius: 10, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>MORE — THE WHY &amp; THE TRAPS</span>
                  <span style={{ display: "inline-flex", transform: showMore ? "rotate(90deg)" : "none", transition: "transform .2s" }}><Ico.chev s={14} c={C.cyan} /></span>
                </button>
                {showMore && (
                  <div className="fg-rise" style={{ marginTop: 8, background: C.panel, border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.blue}`, borderRadius: 10, padding: "14px 15px" }}>
                    {q.more.map((t, i) => <p key={i} style={{ ...bodyP, marginBottom: i === q.more.length - 1 ? 0 : 10 }}>{t}</p>)}
                  </div>
                )}
              </div>
            )}
            <div style={{ fontFamily: mono, fontSize: 11, color: C.mute, lineHeight: 1.6 }}>REF · {q.ref}</div>
          </div>
        )}
      </div>

      {/* action bar */}
      <div style={{ position: "sticky", bottom: 0, padding: "12px 16px calc(12px + env(safe-area-inset-bottom))", background: `linear-gradient(transparent,${C.bg} 22%)`, zIndex: 30 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 10 }}>
          {timed && idx > 0 && <button className="fg-btn" onClick={prev} aria-label="Previous question" style={{ ...ghostBtn, padding: "15px 16px", borderRadius: 13 }}><Ico.arrowL s={16} /></button>}
          <button className="fg-btn" disabled={!timed && !locked} onClick={next} style={{ flex: 1, cursor: timed || locked ? "pointer" : "not-allowed", background: (timed || locked) ? `linear-gradient(180deg,${C.blueHi},${C.blueDeep})` : C.panel2, color: (timed || locked) ? "#fff" : C.mute, border: "none", fontFamily: disp, fontWeight: 900, fontSize: 17, letterSpacing: 1, textTransform: "uppercase", padding: "15px", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {timed ? (isLast ? "FINISH & SCORE" : "NEXT") : !locked ? "SELECT AN ANSWER" : isLast ? "SEE RESULTS" : "NEXT QUESTION"}
            {(timed && !isLast) && <Ico.chev s={15} c="#fff" />}
          </button>
        </div>
      </div>

      {dialog && (
        <div role="dialog" aria-modal="true" onClick={() => setDialog(null)} style={{ position: "fixed", inset: 0, zIndex: 120, background: "#02040ae0", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 560, maxHeight: "86dvh", overflowY: "auto", background: C.panel2, borderTop: `2px solid ${C.blue}`, borderRadius: "20px 20px 0 0", padding: "18px 18px calc(20px + env(safe-area-inset-bottom))" }}>
            {dialog === "exit" && (<>
              <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 20, textTransform: "uppercase", marginBottom: 6 }}>Pause this exam?</div>
              <p style={{ ...bodyP }}>Your answers and remaining time ({hh}:{mm}) are saved on this device. Resume from Timed Exam whenever you're ready. The clock stops while paused — the real exam won't, so practice at least one full sitting.</p>
              <div style={{ display: "grid", gap: 10 }}>
                <PrimaryBtn full glow={false} onClick={pauseAndLeave}>PAUSE &amp; SAVE</PrimaryBtn>
                <GhostBtn full onClick={() => setDialog(null)}>KEEP GOING</GhostBtn>
                <button onClick={discard} style={{ ...ghostBtn, justifyContent: "center", minHeight: 44, color: C.danger, borderColor: C.danger + "66" }}>DISCARD THIS ATTEMPT</button>
              </div>
            </>)}
            {dialog === "finish" && (<>
              <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 20, textTransform: "uppercase", marginBottom: 6 }}>{pool.length - answeredCount} unanswered</div>
              <p style={{ ...bodyP }}>A blank is always wrong. Go back and make your best guess, or score it now.</p>
              <div style={{ display: "grid", gap: 10 }}>
                <PrimaryBtn full glow={false} onClick={() => setDialog("nav")}>SHOW ME WHICH ONES</PrimaryBtn>
                <GhostBtn full onClick={() => finish(answers)}>SCORE IT NOW</GhostBtn>
              </div>
            </>)}
            {dialog === "nav" && (<>
              <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 18, textTransform: "uppercase", marginBottom: 4 }}>Questions</div>
              <div style={{ fontFamily: mono, fontSize: 11, color: C.mute, marginBottom: 12 }}>{answeredCount} answered · {pool.length - answeredCount} blank · {flaggedCount} flagged</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(44px,1fr))", gap: 6 }}>
                {pool.map((_, i) => {
                  const a = answers[i] != null, f = flags[i];
                  return <button key={i} onClick={() => goTo(i)} aria-label={`Question ${i + 1}${a ? ", answered" : ", blank"}${f ? ", flagged" : ""}`} style={{ minHeight: 44, borderRadius: 8, cursor: "pointer", fontFamily: mono, fontSize: 12, fontWeight: 700, color: a ? "#fff" : C.mute, background: i === idx ? C.blueDeep : a ? C.panel : "transparent", border: `1.5px solid ${f ? "#ffb020" : a ? C.blue + "88" : C.line}` }}>{i + 1}</button>;
                })}
              </div>
            </>)}
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ color, label, children }) {
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderLeft: `4px solid ${color}`, borderRadius: 12, padding: "14px 15px" }}>
      <div style={cardLabel(color)}>{label}</div>
      {children}
    </div>
  );
}

// ====================================================================
//  FLASHCARDS  — toggle: Concept  /  Q&A
// ====================================================================
function FlashIntro({ go }) {
  return (
    <div className="fg-rise" style={{ padding: "24px 16px 70px", maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
      <Mascot w={120} style={{ marginBottom: 6 }} />
      <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 30, textTransform: "uppercase" }}>Flashcards</div>
      <p style={{ ...bodyP, textAlign: "center", margin: "10px auto 22px", maxWidth: 440 }}>Fast drilling. Tap a card to flip it. Use the toggle to switch how cards read:</p>
      <div style={{ display: "grid", gap: 10, textAlign: "left", marginBottom: 24 }}>
        <Card color={C.blue} label="CONCEPT MODE"><p style={{ ...bodyP, marginBottom: 0 }}>Front = a term or rule. Back = what it means, the book/section to find it, and the trap.</p></Card>
        <Card color={C.cyan} label="Q&amp;A MODE"><p style={{ ...bodyP, marginBottom: 0 }}>Front = an exam-style question. Back = the answer + where to look.</p></Card>
      </div>
      <PrimaryBtn full onClick={() => go({ screen: "flash" })}><Ico.cards s={17} c="#fff" /> START FLASHCARDS</PrimaryBtn>
    </div>
  );
}

function Flashcards({ go }) {
  const [mode, setMode] = useState("concept"); // concept | qa
  const deck = FLASHCARDS[mode];
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = deck[i];

  function nav(d) { setFlipped(false); setTimeout(() => setI((x) => (x + d + deck.length) % deck.length), 60); }
  function switchMode(m) { setMode(m); setI(0); setFlipped(false); }

  return (
    <div className="fg-rise" style={{ padding: "18px 16px 40px", maxWidth: 620, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <Mascot src={MASCOT_BADGE} w={46} style={{ borderRadius: 10 }} />
        <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 18, textTransform: "uppercase", color: C.text }}>Flashcards</div>
      </div>
      {/* toggle */}
      <div style={{ display: "flex", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: 4, marginBottom: 18 }}>
        {[["concept", "CONCEPT"], ["qa", "Q&A"]].map(([k, lbl]) => (
          <button key={k} className="fg-btn" onClick={() => switchMode(k)} style={{ flex: 1, cursor: "pointer", border: "none", borderRadius: 9, padding: "10px", fontFamily: disp, fontWeight: 800, fontSize: 14, letterSpacing: 1, color: mode === k ? "#fff" : C.mute, background: mode === k ? `linear-gradient(180deg,${C.blueHi},${C.blueDeep})` : "transparent" }}>{lbl}</button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontFamily: mono, fontSize: 12, color: C.mute }}><span style={{ color: C.blue }}>{i + 1}</span> / {deck.length}</span>
        <span style={tagPill}>{card.tag}</span>
      </div>

      {/* card */}
      <div onClick={() => setFlipped(!flipped)} style={{ cursor: "pointer", perspective: 1200, marginBottom: 18 }}>
        <div style={{ position: "relative", minHeight: 300, transition: "transform .5s cubic-bezier(.2,.7,.3,1)", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "none" }}>
          {/* front */}
          <div style={{ ...flashFace, background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${C.line}` }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2, color: C.cyan, marginBottom: 14 }}>{mode === "concept" ? "CONCEPT" : "QUESTION"}</div>
            <div style={{ fontFamily: disp, fontWeight: 800, fontSize: 24, lineHeight: 1.15, color: C.text }}>{card.front}</div>
            <div style={{ position: "absolute", bottom: 16, display: "flex", alignItems: "center", gap: 6, fontFamily: mono, fontSize: 10, color: C.faint }}><Ico.flip s={13} /> TAP TO FLIP</div>
          </div>
          {/* back */}
          <div style={{ ...flashFace, transform: "rotateY(180deg)", background: `linear-gradient(160deg,${C.panel},${C.bg2})`, border: `1px solid ${C.blue}55`, alignItems: "stretch", justifyContent: "flex-start", textAlign: "left" }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2, color: C.live, marginBottom: 12 }}>ANSWER</div>
            <div style={{ fontFamily: body, fontWeight: 500, fontSize: 16.5, lineHeight: 1.45, color: "#d4deef" }}>{card.back}</div>
            <div style={{ marginTop: "auto", paddingTop: 14, borderTop: `1px solid ${C.line}`, fontFamily: mono, fontSize: 10.5, color: C.cyan, lineHeight: 1.5 }}>FIND IT · {card.ref}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="fg-btn" onClick={() => nav(-1)} style={{ ...ghostBtn, flex: 1, justifyContent: "center", padding: "14px", borderRadius: 12, fontSize: 13 }}><Ico.arrowL s={15} /> PREV</button>
        <button className="fg-btn" onClick={() => setFlipped(!flipped)} style={{ flex: 1, cursor: "pointer", border: `1px solid ${C.line}`, background: C.panel2, color: C.text, fontFamily: disp, fontWeight: 800, fontSize: 13, letterSpacing: 1, padding: "14px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}><Ico.flip s={14} c={C.text} /> FLIP</button>
        <button className="fg-btn" onClick={() => nav(1)} style={{ flex: 1, cursor: "pointer", border: "none", background: `linear-gradient(180deg,${C.blueHi},${C.blueDeep})`, color: "#fff", fontFamily: disp, fontWeight: 800, fontSize: 13, letterSpacing: 1, padding: "14px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>NEXT <Ico.chev s={14} c="#fff" /></button>
      </div>
    </div>
  );
}
const flashFace = { position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", borderRadius: 18, padding: "22px 20px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "left" };

// ====================================================================
//  RESULTS
// ====================================================================
function Results({ data, go }) {
  const { pct, correct, total, timed } = data;
  const passed = correct / total >= 0.75; // compare the raw ratio; a rounded 75% can still be a fail
  const [shown, setShown] = useState(0);
  useEffect(() => { let r = 0; const t = setInterval(() => { r += 3; if (r >= pct) { r = pct; clearInterval(t); } setShown(r); }, 18); return () => clearInterval(t); }, [pct]);

  const bySection = {};
  data.pool.forEach((q, i) => {
    const k = q.sectionTitle; if (!bySection[k]) bySection[k] = { c: 0, t: 0 };
    bySection[k].t++; if (data.answers[i] === LETTERS.indexOf(q.answer)) bySection[k].c++;
  });
  const need = Math.max(0, Math.ceil(total * 0.75) - correct);

  // attach sectionIdx to each section bucket + build ranked focus plan
  data.pool.forEach((q, i) => { if (bySection[q.sectionTitle].idx === undefined) bySection[q.sectionTitle].idx = q.sectionIdx; });
  const ranked = Object.entries(bySection)
    .map(([title, v]) => ({ title, idx: v.idx, c: v.c, t: v.t, p: (v.c / v.t) * 100 }))
    .sort((a, b) => a.p - b.p);
  const focus = ranked.filter((s) => s.p < 75).slice(0, 3);          // sections below passing
  const weakest = ranked.length ? ranked[0].title : null;
  const weakPct = ranked.length ? ranked[0].p : 101;

  // every missed (or skipped) question, with the right answer + book reference
  const misses = data.pool
    .map((q, i) => ({ q, i, picked: data.answers[i] }))
    .filter((m) => m.picked !== LETTERS.indexOf(m.q.answer));
  const [showMiss, setShowMiss] = useState(false);

  const coach = passed
    ? (weakest && weakPct < 100 ? `Solid work. Only soft spot is ${shortTitle(weakest)} — brush that and you're money.` : "Clean run. You're ready — keep the book tabs sharp and go get it.")
    : (weakest ? `You're close. ${shortTitle(weakest)} is hurting you most — hit it in Study, then run it again. Your misses are listed below with the exact article to read.` : "Close. Review your misses below and run it again.");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <Style /><Backdrop />
      <TopBar go={go} showHome />
      <div className="fg-rise" style={{ padding: "28px 16px 70px", maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <Mascot w={84} style={{ marginBottom: 4, transform: passed ? "none" : "scaleX(-1)" }} />
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: passed ? C.live : C.cyan, marginBottom: 12 }}>{timed ? "FULL EXAM RESULT" : "PRACTICE RESULT"}</div>
        <div style={{ position: "relative", width: 188, height: 188, margin: "0 auto 8px" }}>
          <svg width="188" height="188" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="94" cy="94" r="80" fill="none" stroke={C.line} strokeWidth="12" />
            <circle cx="94" cy="94" r="80" fill="none" stroke={passed ? C.live : C.blue} strokeWidth="12" strokeLinecap="round" strokeDasharray={2 * Math.PI * 80} strokeDashoffset={2 * Math.PI * 80 * (1 - shown / 100)} style={{ transition: "stroke-dashoffset .1s linear", filter: `drop-shadow(0 0 8px ${passed ? C.live : C.blue}88)` }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 50 }}>{shown}<span style={{ fontSize: 22, color: C.mute }}>%</span></div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.mute }}>{correct}/{total}</div>
          </div>
        </div>
        <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 25, color: passed ? C.live : C.cyan, textTransform: "uppercase", marginBottom: 4 }}>{passed ? "On Pace To Pass" : `${need} More To Pass`}</div>
        <p style={{ ...bodyP, textAlign: "center", margin: "0 auto 18px", maxWidth: 420 }}>Real exam needs 75%. {passed ? "Strong. Review any misses and lock it in." : "Hit the weak sections below, then run it again."}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${passed ? C.live + "55" : C.blue + "55"}`, borderRadius: 14, padding: "13px 15px", marginBottom: 22, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
          <img src={MASCOT_BADGE} alt="Torque" style={{ width: 50, height: 50, borderRadius: 11, flexShrink: 0, border: `1px solid ${C.line}` }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: 2, color: passed ? C.live : C.cyan, marginBottom: 3 }}>TORQUE</div>
            <div style={{ fontFamily: body, fontSize: 14.5, fontWeight: 600, color: "#dbe6f5", lineHeight: 1.35, fontStyle: "italic" }}>“{coach}”</div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 8, marginBottom: 26, textAlign: "left" }}>
          {Object.entries(bySection).map(([title, v], i) => {
            const p = Math.round((v.c / v.t) * 100); const col = p >= 75 ? C.live : p >= 50 ? C.blue : C.danger;
            return (
              <div key={i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 13px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ fontFamily: disp, fontWeight: 700, fontSize: 14.5, textTransform: "uppercase" }}>{shortTitle(title)}</span>
                  <span style={{ fontFamily: mono, fontSize: 12, color: col }}>{v.c}/{v.t}</span>
                </div>
                <div style={{ height: 6, background: C.line, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: p + "%", background: col, animation: "fgBar .6s ease both", animationDelay: i * 0.05 + "s" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* RANKED FOCUS PLAN */}
        {focus.length > 0 && (
          <div style={{ textAlign: "left", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 11 }}>
              <Ico.target s={17} c={C.cyan} />
              <span style={{ fontFamily: disp, fontWeight: 900, fontSize: 17, textTransform: "uppercase" }}>Study These Next</span>
            </div>
            <p style={{ fontFamily: body, fontSize: 13.5, color: C.mute, margin: "0 0 12px", fontWeight: 500 }}>Ranked weakest first. Tap one to jump straight into that section's study guide.</p>
            <div style={{ display: "grid", gap: 9 }}>
              {focus.map((s, i) => (
                <button key={i} className="fg-btn" onClick={() => go({ screen: "studyRead", sectionIdx: s.idx })} style={{ cursor: "pointer", textAlign: "left", border: `1px solid ${C.line}`, borderLeft: `4px solid ${s.p >= 50 ? C.blue : C.danger}`, background: `linear-gradient(160deg,${C.panel2},${C.panel})`, borderRadius: 12, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 22, color: s.p >= 50 ? C.blue : C.danger, width: 26, textAlign: "center", flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: disp, fontWeight: 800, fontSize: 15.5, textTransform: "uppercase" }}>{shortTitle(s.title)}</div>
                    <div style={{ fontFamily: mono, fontSize: 11.5, color: C.mute, marginTop: 2 }}>You got {s.c} of {s.t} · {Math.round(s.p)}%</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 1, color: C.cyan, flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>STUDY <Ico.chev s={13} c={C.cyan} /></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MISSED QUESTION DEBRIEF */}
        {misses.length > 0 && (
          <div style={{ textAlign: "left", marginBottom: 24 }}>
            <button className="fg-btn" onClick={() => setShowMiss((v) => !v)} style={{ width: "100%", cursor: "pointer", border: `1px solid ${C.line}`, background: C.panel, borderRadius: 12, padding: "13px 15px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Ico.x s={16} c={C.danger} /><span style={{ fontFamily: disp, fontWeight: 900, fontSize: 16, textTransform: "uppercase", color: C.text }}>Review My {misses.length} Miss{misses.length === 1 ? "" : "es"}</span></span>
              <span style={{ fontFamily: mono, fontSize: 11, color: C.cyan }}>{showMiss ? "HIDE" : "SHOW"}</span>
            </button>
            {showMiss && (
              <div className="fg-rise" style={{ display: "grid", gap: 10, marginTop: 11 }}>
                {misses.map((m, i) => {
                  const correctLetterIdx = LETTERS.indexOf(m.q.answer);
                  const yours = m.picked == null ? null : m.q.choices[m.picked];
                  return (
                    <div key={i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "13px 14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 7 }}>
                        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: 1, color: C.faint }}>{shortTitle(m.q.sectionTitle)}</span>
                        <span style={{ fontFamily: mono, fontSize: 10, color: C.faint }}>Q{m.q.n}</span>
                      </div>
                      <div style={{ fontFamily: body, fontSize: 14.5, fontWeight: 600, color: C.text, lineHeight: 1.35, marginBottom: 10 }}>{m.q.stem}</div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 5 }}>
                        <Ico.x s={14} c={C.danger} />
                        <span style={{ fontFamily: body, fontSize: 13.5, color: C.danger, fontWeight: 600 }}>{yours == null ? "You skipped this one" : "You picked: " + yours}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 9 }}>
                        <Ico.check s={14} c={C.live} />
                        <span style={{ fontFamily: body, fontSize: 13.5, color: C.live, fontWeight: 700 }}>Correct: {m.q.choices[correctLetterIdx]}</span>
                      </div>
                      {m.q.center && m.q.center.length > 0 && (
                        <details style={{ marginBottom: 9 }}>
                          <summary style={{ cursor: "pointer", fontFamily: mono, fontSize: 11.5, color: C.cyan, padding: "6px 0", minHeight: 32 }}>WHY</summary>
                          {m.q.center.map((t, k) => <p key={k} style={{ ...bodyP, fontSize: 14.5, marginBottom: 8 }}>{t}</p>)}
                          {m.q.math && m.q.math.map((t, k) => <div key={"m" + k} style={{ fontFamily: mono, fontSize: 13, color: C.text, padding: "2px 0" }}>{t}</div>)}
                        </details>
                      )}
                      {m.q.ref && (
                        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cyan, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 10px", display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <Ico.book s={13} c={C.cyan} /> LOOK IT UP: {m.q.ref}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div style={{ display: "grid", gap: 10 }}>
          {misses.length > 0 && <PrimaryBtn full glow={false} onClick={() => go({ screen: "quiz", mode: "list", ids: misses.map((m) => m.q.id), _k: Date.now() })}>RETRY MY {misses.length} MISS{misses.length === 1 ? "" : "ES"}</PrimaryBtn>}
          <GhostBtn full onClick={() => go({ screen: "home" })}><Ico.home s={15} c={C.text} /> HOME</GhostBtn>
        </div>
      </div>
    </div>
  );
}

// ====================================================================
//  ROOT
// ====================================================================

// ====================================================================
//  FIND IT FIRST — timed book-lookup drill
// ====================================================================
function LookupIntro({ go }) {
  return (
    <div className="fg-rise" style={{ padding: "24px 16px 70px", maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
      <img src={MASCOT_BOOK} alt="Torque with NEC 2023" style={{ width: "min(64%,280px)", height: "auto", borderRadius: 16, background: "#000", marginBottom: 6 }} />
      <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 28, textTransform: "uppercase" }}>Find It First</div>
      <p style={{ ...bodyP, textAlign: "center", margin: "10px auto 14px", maxWidth: 470 }}>
        Open-book exams aren't won by what you memorize — they're won by how <b style={{ color: C.text }}>fast you find it</b>. Grab your real book. I'll name a rule; you race to find it, tap <b style={{ color: C.cyan }}>FOUND IT</b>, and I'll show you exactly where it lives and your time. Beat your average.
      </p>
      <div style={{ background: C.panel, border: `1px solid ${C.blue}44`, borderRadius: 13, padding: "13px 15px", marginBottom: 20, textAlign: "left", maxWidth: 470, marginLeft: "auto", marginRight: "auto" }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2, color: C.cyan, marginBottom: 7 }}>HOW IT WORKS</div>
        <div style={{ fontFamily: body, fontSize: 14.5, color: "#c2cee0", lineHeight: 1.5, fontWeight: 500 }}>
          1. Read what to find &nbsp;•&nbsp; 2. Find it in your tabbed book &nbsp;•&nbsp; 3. Tap FOUND IT &nbsp;•&nbsp; 4. Check the location &amp; your time &nbsp;•&nbsp; 5. Rate yourself, next rep
        </div>
      </div>
      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 2, color: C.mute, marginBottom: 12 }}>PICK A RUN LENGTH</div>
      <div style={{ display: "grid", gap: 10 }}>
        <PrimaryBtn full onClick={() => go({ screen: "lookup", count: 10, _k: Math.random() })}><Ico.timer s={16} c="#fff" /> QUICK 10</PrimaryBtn>
        <GhostBtn full onClick={() => go({ screen: "lookup", count: 20, _k: Math.random() })}>STANDARD 20</GhostBtn>
        <GhostBtn full onClick={() => go({ screen: "lookup", count: LOOKUPS.length, _k: Math.random() })}>MARATHON · ALL {LOOKUPS.length}</GhostBtn>
      </div>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.faint, marginTop: 14 }}>Par time is 40 seconds a find. Under par = green. The real test gives you ~2.7 min per question — train faster than that.</p>
    </div>
  );
}

function fmtSec(ms) { const s = ms / 1000; return s < 10 ? s.toFixed(1) + "s" : Math.round(s) + "s"; }

function LookupDrill({ config, go }) {
  const PAR = 40000; // 40s par
  const pool = React.useMemo(() => {
    const a = [...LOOKUPS];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a.slice(0, config.count);
  }, [config._k]);

  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [results, setResults] = useState([]); // {ms, hit}
  const startRef = useRef(Date.now());
  const lockRef = useRef(0);
  const tickRef = useRef(null);

  useEffect(() => {
    startRef.current = Date.now(); setElapsed(0); setRevealed(false);
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => setElapsed(Date.now() - startRef.current), 100);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [idx]);

  const item = pool[idx];
  const done = idx >= pool.length;
  const last = idx + 1 >= pool.length;

  function foundIt() {
    const ms = Date.now() - startRef.current;
    lockRef.current = ms;
    if (tickRef.current) clearInterval(tickRef.current); // stop the clock
    setElapsed(ms);
    setRevealed(true);
  }
  function rate(hit) {
    setResults((r) => [...r, { ms: lockRef.current, hit }]);
    if (idx + 1 >= pool.length) {
      const all = [...results, { ms: lockRef.current, hit }];
      const hits = all.filter((x) => x.hit);
      const avg = hits.length ? Math.round(hits.reduce((a, x) => a + x.ms, 0) / hits.length) : 0;
      const fastest = hits.length ? Math.min(...hits.map((x) => x.ms)) : 0;
      go({ screen: "lookupResults", total: pool.length, hits: hits.length, avg, fastest });
    } else {
      setIdx(idx + 1);
    }
  }

  if (done || !item) return null;
  const col = elapsed <= PAR ? C.live : elapsed <= PAR * 1.8 ? C.blue : C.danger;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <Style /><Backdrop />
      <TopBar go={go} showHome />
      <div className="fg-rise" style={{ padding: "16px 16px 60px", maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* progress + timer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.mute }}>FIND {idx + 1} / {pool.length}</span>
          <span style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, color: revealed ? col : C.text }}>{fmtSec(elapsed)}</span>
        </div>
        <div style={{ height: 5, background: C.line, borderRadius: 4, overflow: "hidden", marginBottom: 22 }}>
          <div style={{ height: "100%", width: ((idx) / pool.length) * 100 + "%", background: C.blue }} />
        </div>

        {/* the find */}
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 2, color: C.cyan, marginBottom: 10 }}>FIND THIS IN YOUR BOOK</div>
        <div style={{ background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.cyan}`, borderRadius: 14, padding: "20px 18px", marginBottom: 20 }}>
          <div style={{ fontFamily: disp, fontWeight: 800, fontSize: 21, lineHeight: 1.2, color: C.text }}>{item.prompt}</div>
        </div>

        {!revealed ? (
          <button className="fg-btn" onClick={foundIt} style={{ width: "100%", cursor: "pointer", border: "none", background: `linear-gradient(180deg,${C.blueHi},${C.blueDeep})`, color: "#fff", fontFamily: disp, fontWeight: 900, fontSize: 20, letterSpacing: 1, textTransform: "uppercase", padding: "20px", borderRadius: 14, boxShadow: `0 8px 26px ${C.blueDeep}55` }}>
            <Ico.check s={20} c="#fff" /> FOUND IT
          </button>
        ) : (
          <div className="fg-rise">
            <div style={{ background: C.panel, border: `1px solid ${col}66`, borderRadius: 14, padding: "16px 16px", marginBottom: 16 }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2, color: col, marginBottom: 6 }}>IT LIVES HERE · YOUR TIME {fmtSec(lockRef.current)}</div>
              <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 22, color: C.cyan, marginBottom: 2 }}>{item.book}{item.where ? "  " + item.where : ""}</div>
              {item.nugget && <div style={{ fontFamily: body, fontSize: 15.5, color: "#dbe6f5", marginTop: 6, fontWeight: 500, lineHeight: 1.35 }}>{item.nugget}</div>}
            </div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1, color: C.mute, marginBottom: 4, textAlign: "center" }}>DID YOU FIND IT? — TAP TO {last ? "FINISH" : "CONTINUE"}</div>
            <div style={{ fontFamily: body, fontSize: 12.5, color: C.faint, marginBottom: 12, textAlign: "center", fontWeight: 500 }}>{last ? "Last one — your pick logs it and shows your results." : "Your pick is logged and moves you to the next find."}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button className="fg-btn" onClick={() => rate(true)} style={{ cursor: "pointer", border: "none", background: `linear-gradient(180deg,${C.live},#16a766)`, color: "#05210f", fontFamily: disp, fontWeight: 900, fontSize: 16, textTransform: "uppercase", padding: "18px 10px", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}><Ico.check s={17} c="#05210f" /> GOT IT {last ? "" : <Ico.chev s={15} c="#05210f" />}</button>
              <button className="fg-btn" onClick={() => rate(false)} style={{ cursor: "pointer", border: `1px solid ${C.danger}`, background: C.danger + "22", color: C.danger, fontFamily: disp, fontWeight: 900, fontSize: 16, textTransform: "uppercase", padding: "18px 10px", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}><Ico.x s={15} c={C.danger} /> MISSED {last ? "" : <Ico.chev s={15} c={C.danger} />}</button>
            </div>
            <div style={{ textAlign: "center", marginTop: 10, fontFamily: mono, fontSize: 11, letterSpacing: 1, color: C.cyan }}>{last ? "↓ EITHER ONE FINISHES THE DRILL" : "↓ EITHER ONE GOES TO THE NEXT FIND"}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function LookupResults({ data, go }) {
  const { total, hits, avg, fastest } = data;
  const rate = Math.round((hits / total) * 100);
  const fast = avg > 0 && avg <= 40000;
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <Style /><Backdrop />
      <TopBar go={go} showHome />
      <div className="fg-rise" style={{ padding: "28px 16px 70px", maxWidth: 560, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <img src={MASCOT_POINT} alt="Torque" style={{ width: 150, height: "auto", borderRadius: 14, background: "#000", border: `1px solid ${C.line}`, marginBottom: 6 }} />
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.cyan, marginBottom: 14 }}>LOOKUP DRILL DONE</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, marginBottom: 22 }}>
          <Stat label="FOUND" value={hits + "/" + total} color={C.live} />
          <Stat label="AVG TIME" value={avg ? fmtSec(avg) : "—"} color={fast ? C.live : C.blue} />
          <Stat label="FASTEST" value={fastest ? fmtSec(fastest) : "—"} color={C.cyan} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${fast ? C.live + "55" : C.blue + "55"}`, borderRadius: 14, padding: "13px 15px", marginBottom: 22 }}>
          <img src={MASCOT_BADGE} alt="Torque" style={{ width: 48, height: 48, borderRadius: 11, flexShrink: 0, border: `1px solid ${C.line}` }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: 2, color: fast ? C.live : C.cyan, marginBottom: 3 }}>TORQUE</div>
            <div style={{ fontFamily: body, fontSize: 14.5, fontWeight: 600, color: "#dbe6f5", lineHeight: 1.35, fontStyle: "italic" }}>“{fast ? "That's testing-center speed. Keep those tabs sharp and you'll never run out of clock." : "Findable, but slow burns time you don't have. Tab the spots you fumbled and run it again — speed comes from reps."}”</div>
          </div>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <PrimaryBtn full onClick={() => go({ screen: "lookup", count: total, _k: Math.random() })}><Ico.timer s={16} c="#fff" /> RUN IT AGAIN</PrimaryBtn>
          <GhostBtn full onClick={() => go({ screen: "home" })}><Ico.home s={15} c={C.text} /> HOME</GhostBtn>
        </div>
      </div>
    </div>
  );
}




// ====================================================================
//  CODE LOCATOR — type a keyword, get the article/table to flip to
// ====================================================================
function CodeLocator({ go }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const results = query.length === 0 ? [] : LOCATOR.filter((e) => {
    const hay = (e.t + " " + e.a + " " + e.d + " " + (e.k || "")).toLowerCase();
    return query.split(/\s+/).every((w) => hay.includes(w));
  }).slice(0, 40);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <Style /><Backdrop />
      <TopBar go={go} showHome />
      <div className="fg-rise" style={{ padding: "18px 16px 80px", maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 4 }}>
          <img src={MASCOT_BOOK} alt="Torque" style={{ width: 50, height: 50, borderRadius: 11, background: "#000", border: `1px solid ${C.line}`, objectFit: "cover", objectPosition: "center top", flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 23, textTransform: "uppercase", lineHeight: 1 }}>Code Locator</div>
            <div style={{ fontFamily: mono, fontSize: 10.5, color: C.cyan, marginTop: 3, letterSpacing: 1 }}>{LOCATOR.length} TOPICS · FIND WHERE TO FLIP</div>
          </div>
        </div>
        <p style={{ ...bodyP, margin: "12px 0 14px" }}>Type a keyword — "GFCI", "working space", "motor", "conduit fill", "pool". I'll point you to the article or table to flip to in your book.</p>

        {/* search box */}
        <div style={{ position: "sticky", top: 8, zIndex: 2, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, background: C.bg2, border: `1px solid ${C.blue}66`, borderRadius: 12, padding: "12px 14px" }}>
            <Ico.target s={17} c={C.cyan} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the code…"
              autoFocus
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontFamily: body, fontSize: 16 }}
            />
            {q && <button className="fg-btn" onClick={() => setQ("")} style={{ cursor: "pointer", border: "none", background: "transparent", padding: 4 }}><Ico.x s={16} c={C.mute} /></button>}
          </div>
        </div>

        {/* results */}
        {query.length === 0 && (
          <div>
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: 1.5, color: C.mute, marginBottom: 9 }}>POPULAR LOOKUPS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["GFCI", "Working space", "Box fill", "Motor", "Conduit fill", "Grounding", "Pool", "Receptacle spacing", "Burial depth", "Transformer"].map((s, i) => (
                <button key={i} className="fg-btn" onClick={() => setQ(s)} style={{ cursor: "pointer", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 20, padding: "9px 14px", color: C.cyan, fontFamily: mono, fontSize: 12.5 }}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {query.length > 0 && results.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 10px", color: C.mute }}>
            <div style={{ fontFamily: disp, fontWeight: 800, fontSize: 17, marginBottom: 6 }}>No match for "{q}"</div>
            <p style={{ fontFamily: body, fontSize: 14, color: C.faint }}>Try a simpler word — like "motor", "ground", "receptacle", or "conduit".</p>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.mute, marginBottom: 11 }}>{results.length} MATCH{results.length === 1 ? "" : "ES"}</div>
            <div style={{ display: "grid", gap: 9 }}>
              {results.map((e, i) => (
                <div key={i} style={{ background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.cyan}`, borderRadius: 12, padding: "13px 15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ fontFamily: disp, fontWeight: 800, fontSize: 15.5, color: C.text, lineHeight: 1.2 }}>{e.t}</span>
                    <span style={{ fontFamily: mono, fontSize: 12.5, fontWeight: 700, color: C.cyan, flexShrink: 0, textAlign: "right" }}>{e.a}</span>
                  </div>
                  {e.d && <div style={{ fontFamily: body, fontSize: 13.5, color: C.mute, marginTop: 5, lineHeight: 1.35, fontWeight: 500 }}>{e.d}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        <p style={{ fontFamily: mono, fontSize: 9.5, color: C.faint, marginTop: 22, lineHeight: 1.5, textAlign: "center" }}>This is an index, not the code text. Always open your NEC 2023 to confirm the exact rule and figure on the page.</p>
      </div>
    </div>
  );
}



// ====================================================================
//  ABOUT THE EXAM — what it is, vs state-specific, reciprocity map, links
// ====================================================================
// US tile-grid (stylized). r=row, c=col. States accepting the NASCLA
// Accredited ELECTRICAL exam are flagged below in ACCEPT_STATES.
const US_TILES = [
  { s: "ME", r: 0, c: 10 },
  { s: "VT", r: 1, c: 9 }, { s: "NH", r: 1, c: 10 },
  { s: "WA", r: 2, c: 0 }, { s: "ID", r: 2, c: 1 }, { s: "MT", r: 2, c: 2 }, { s: "ND", r: 2, c: 3 }, { s: "MN", r: 2, c: 4 }, { s: "WI", r: 2, c: 5 }, { s: "MI", r: 2, c: 7 }, { s: "NY", r: 2, c: 9 }, { s: "MA", r: 2, c: 10 },
  { s: "OR", r: 3, c: 0 }, { s: "NV", r: 3, c: 1 }, { s: "WY", r: 3, c: 2 }, { s: "SD", r: 3, c: 3 }, { s: "IA", r: 3, c: 4 }, { s: "IL", r: 3, c: 5 }, { s: "IN", r: 3, c: 6 }, { s: "OH", r: 3, c: 7 }, { s: "PA", r: 3, c: 8 }, { s: "NJ", r: 3, c: 9 }, { s: "CT", r: 3, c: 10 },
  { s: "CA", r: 4, c: 0 }, { s: "UT", r: 4, c: 1 }, { s: "CO", r: 4, c: 2 }, { s: "NE", r: 4, c: 3 }, { s: "MO", r: 4, c: 4 }, { s: "KY", r: 4, c: 5 }, { s: "WV", r: 4, c: 6 }, { s: "VA", r: 4, c: 7 }, { s: "MD", r: 4, c: 8 }, { s: "DE", r: 4, c: 9 }, { s: "RI", r: 4, c: 10 },
  { s: "AZ", r: 5, c: 1 }, { s: "NM", r: 5, c: 2 }, { s: "KS", r: 5, c: 3 }, { s: "AR", r: 5, c: 4 }, { s: "TN", r: 5, c: 5 }, { s: "NC", r: 5, c: 6 }, { s: "SC", r: 5, c: 7 }, { s: "DC", r: 5, c: 8 },
  { s: "OK", r: 6, c: 3 }, { s: "LA", r: 6, c: 4 }, { s: "MS", r: 6, c: 5 }, { s: "AL", r: 6, c: 6 }, { s: "GA", r: 6, c: 7 },
  { s: "AK", r: 7, c: 0 }, { s: "HI", r: 7, c: 1 }, { s: "TX", r: 7, c: 3 }, { s: "FL", r: 7, c: 8 },
];
const ACCEPT_STATES = ["AL", "AZ", "DC", "FL", "ID", "KY", "LA", "MS", "MO", "NE", "NM", "NC", "SC", "TN", "UT", "VA", "WV"];
const ACCEPT_NAMES = "Alabama, Arizona, Washington D.C., Florida, Idaho, Kentucky, Louisiana, Mississippi, Missouri, Nebraska, New Mexico, North Carolina, South Carolina, Tennessee, Utah, Virginia, and West Virginia";

// Official board page for each accepting jurisdiction (NASCLA-maintained detail pages).
const NB = "https://www.nascla.org/electrical-exams-participating-state-agencies/";
const STATE_BOARDS = [
  ["Alabama", "Electrical Contractors Board", NB + "alabama-electrical-contractors-board"],
  ["Arizona", "Registrar of Contractors", NB + "arizona-registrar-contractors"],
  ["Washington D.C.", "Dept. of Licensing & Consumer Protection", NB + "district-columbia-department-licensing-and-consumer"],
  ["Florida", "Electrical Contractors' Licensing Board", NB + "florida-electrical-contractors-licensing-board"],
  ["Idaho", "Electrical Board (DOPL)", NB + "idaho-electrical-board-division-occupational-and"],
  ["Kentucky", "Dept. of Housing, Buildings & Construction", NB + "kentucky-department-housing-buildings-and"],
  ["Louisiana", "State Licensing Board for Contractors", NB + "louisiana-state-licensing-board-contractors"],
  ["Mississippi", "State Board of Contractors", NB + "mississippi-state-board-contractors"],
  ["Missouri", "Office of Statewide Electrical Contractors", NB + "missouri-office-statewide-electrical-contractors"],
  ["Nebraska", "State Electrical Division", NB + "nebraska-state-electrical-division"],
  ["New Mexico", "Construction Industries Division", NB + "new-mexico-construction-industries-division"],
  ["North Carolina", "Board of Examiners of Electrical Contractors", NB + "north-carolina-state-board-examiners-electrical"],
  ["South Carolina", "Contractors' Licensing Board", NB + "south-carolina-contractors-licensing-board"],
  ["Tennessee", "Board for Licensing Contractors", NB + "tennessee-board-licensing-contractors"],
  ["Utah", "Div. of Professional Licensing (Electricians)", NB + "utah-division-professional-licensing-electricians"],
  ["Virginia", "Board for Contractors (DPOR)", NB + "virginia-board-contractors-department-professional"],
  ["West Virginia", "Contractors Licensing Board (Div. of Labor)", NB + "west-virginia-contractors-licensing-board-division"],
];

// hex-map geometry (pointy-top honeycomb)
const HEXR = 21;                         // center-to-vertex
const HEXW = Math.sqrt(3) * HEXR;        // hex width
const HEXROW = HEXR * 1.5;               // vertical row pitch
function hexPoints(cx, cy) {
  let p = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 90);
    p.push((cx + HEXR * Math.cos(a)).toFixed(1) + "," + (cy + HEXR * Math.sin(a)).toFixed(1));
  }
  return p.join(" ");
}
const HEX_COLS = 11, HEX_ROWS = 8;
const HEXMAP_W = HEX_COLS * HEXW + HEXW;
const HEXMAP_H = HEX_ROWS * HEXROW + HEXR * 2;

function AboutExam({ go }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <Style /><Backdrop />
      <TopBar go={go} showHome />
      <div className="fg-rise" style={{ padding: "18px 16px 80px", maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}>
          <img src={MASCOT_BOOK} alt="Torque" style={{ width: 52, height: 52, borderRadius: 11, background: "#000", border: `1px solid ${C.line}`, objectFit: "cover", objectPosition: "center top", flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 24, textTransform: "uppercase", lineHeight: 1 }}>About The Exam</div>
            <div style={{ fontFamily: mono, fontSize: 10.5, color: C.cyan, marginTop: 3, letterSpacing: 1 }}>WHAT YOU'RE STUDYING FOR</div>
          </div>
        </div>

        {/* WHAT IT IS */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0 11px" }}>
          <Ico.bolt s={16} c={C.cyan} /><div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>WHAT IT IS</div>
        </div>
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.cyan}`, borderRadius: 12, padding: "15px 16px", marginBottom: 16 }}>
          <p style={{ ...bodyP, margin: 0 }}>This app preps you for the <b style={{ color: C.text }}>NASCLA Accredited Electrical Examination for Master / Unlimited Electricians</b> — a standardized, open-book trade exam built by the National Association of State Contractors Licensing Agencies and adopted by states starting in 2018.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 20 }}>
          {[["100", "QUESTIONS"], ["4.5 hrs", "TIME LIMIT (270 MIN)"], ["75%", "TO PASS"], ["Open Book", "BRING YOUR REFS"]].map((x, i) => (
            <div key={i} style={{ background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${C.line}`, borderRadius: 11, padding: "12px 13px" }}>
              <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 21, color: C.blueHi }}>{x[0]}</div>
              <div style={{ fontFamily: mono, fontSize: 9.5, color: C.mute, marginTop: 2, letterSpacing: 1 }}>{x[1]}</div>
            </div>
          ))}
        </div>

        {/* OUTLINE BY TEST DATE */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0 11px" }}>
          <Ico.timer s={16} c="#ffb020" /><div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>YOUR TEST DATE CHANGES THE EXAM</div>
        </div>
        <p style={{ ...bodyP, margin: "0 0 11px" }}>PSI's bulletin lists a new content outline <b style={{ color: C.text }}>effective January 1, 2027</b>. Still 100 questions, 270 minutes, 75 to pass, and still NEC 2020 or 2023 — but the weight shifts toward code-heavy installation sections.</p>
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 12px", marginBottom: 10, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: body, fontSize: 13.5, color: C.text }}>
            <thead><tr style={{ color: C.mute, fontFamily: mono, fontSize: 10.5, textAlign: "left" }}><th style={{ padding: "6px 4px" }}>SECTION</th><th style={{ padding: "6px 4px", textAlign: "right" }}>THRU 2026</th><th style={{ padding: "6px 4px", textAlign: "right" }}>FROM 2027</th></tr></thead>
            <tbody>
              {EXAM.map((s, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${C.line}` }}>
                  <td style={{ padding: "6px 4px" }}>{i === 0 ? "Project Design & Mgmt → Project Documents" : shortTitle(s.title)}</td>
                  <td style={{ padding: "6px 4px", textAlign: "right", fontFamily: mono }}>{[8, 9, 11, 17, 17, 16, 13, 8, 1][i]}</td>
                  <td style={{ padding: "6px 4px", textAlign: "right", fontFamily: mono, color: OUTLINE_2027[i][1] > [8, 9, 11, 17, 17, 16, 13, 8, 1][i] ? C.live : C.text }}>{OUTLINE_2027[i][1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontFamily: body, fontSize: 13, color: C.mute, margin: "0 0 22px", fontWeight: 500, lineHeight: 1.45 }}>From 2027 the PMBOK Guide and ASHRAE 90.1 are no longer on the reference list. The bulletin lists only section names and counts for 2027, not subtopics. Source: PSI Candidate Information Bulletin for the NASCLA electrical exams (test-takers.psiexams.com, bulletin 6677), checked Nov 17, 2026. Confirm with PSI before you book.</p>

        {/* ALLOWED REFERENCES (OPEN BOOK) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0 11px" }}>
          <Ico.book s={16} c={C.cyan} /><div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>OPEN BOOK — WHAT YOU CAN BRING</div>
        </div>
        <p style={{ ...bodyP, margin: "0 0 11px" }}>This is an open-book exam. These are the references allowed in the test center for the <b style={{ color: C.text }}>Master / Unlimited Electrician</b> exam through Dec 31, 2026. <b style={{ color: C.text }}>Don't bring the 2026 NEC</b> — the exam is written to the 2020 or 2023 edition, and the 2026 edition renumbered whole articles (load calculations moved to Article 120). For <b style={{ color: C.text }}>Code questions, only the listed Code editions count</b>; for the others you may use a newer or older edition at your own risk.</p>
        <div style={{ background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.cyan}`, borderRadius: 12, padding: "12px 14px", marginBottom: 11 }}>
          {[
            ["National Electrical Code (NEC) — or NEC Handbook", "NFPA 70 · 2020 OR 2023"],
            ["OSHA 29 CFR 1926 — Construction", "2024"],
            ["OSHA 29 CFR 1910 — General Industry", "2024"],
            ["PMBOK Guide — Project Management", "7th ed. (2021)"],
            ["ANSI/ASHRAE/IES 90.1 — Energy Standard", "90.1-2022 (I-P)"],
            ["NASCLA Contractors Guide — Business, Law & PM", "14th ed. (2024)"],
            ["NFPA 70E — Electrical Safety in the Workplace", "2024"],
            ["Ugly's Electrical References", "2023"],
            ["Understanding Electrical Theory for NEC Applications", "Mike Holt"],
          ].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 9, padding: "6px 0", borderTop: i ? `1px solid ${C.line}` : "none" }}>
              <span style={{ color: C.cyan, fontFamily: mono, fontSize: 12, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: body, fontWeight: 600, fontSize: 14, color: C.text, lineHeight: 1.25 }}>{b[0]}</span>
                <span style={{ display: "block", fontFamily: mono, fontSize: 10, color: C.blueHi, marginTop: 1, letterSpacing: 0.5 }}>{b[1]}</span>
              </span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: body, fontSize: 13, color: C.mute, margin: "0 0 6px", fontWeight: 500 }}><b style={{ color: C.text }}>Also allowed (no questions come from these):</b> Ferm's Fast Finder Index, and Tom Henry's Key Word Index. A diagram/blueprint packet is handed to you at the test center.</p>
        <div style={{ background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 11, padding: "11px 14px", marginBottom: 22 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 1.5, color: C.cyan, marginBottom: 5 }}>BOOK RULES</div>
          <p style={{ fontFamily: body, fontSize: 13, color: C.mute, margin: 0, lineHeight: 1.5, fontWeight: 500 }}>You may <b style={{ color: C.text }}>highlight, underline, and tab/index</b> your books — but they must be <b style={{ color: C.text }}>otherwise unmarked (no writing in them)</b> and hold no loose or attached papers. <b style={{ color: C.text }}>Permanent tabs only</b> — Post-it / temporary tabs must come out before the exam starts. Calculator must be <b style={{ color: C.text }}>silent, non-printing, non-programmable</b>, with no alphabet keyboard.</p>
        </div>

        {/* NASCLA vs STATE-SPECIFIC */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0 11px" }}>
          <Ico.target s={16} c={C.blue} /><div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>NASCLA vs. STATE-SPECIFIC</div>
        </div>
        <div style={{ display: "grid", gap: 10, marginBottom: 12 }}>
          <div style={{ background: `linear-gradient(160deg,${C.panel2},${C.panel})`, border: `1px solid ${C.live}55`, borderRadius: 12, padding: "14px 15px" }}>
            <div style={{ fontFamily: disp, fontWeight: 800, fontSize: 15.5, color: C.live, marginBottom: 5 }}>NASCLA Accredited Exam</div>
            <p style={{ ...bodyP, margin: 0 }}>Pass it once and your score goes into NASCLA's national database (NED). Every <b style={{ color: C.text }}>participating state</b> will then accept that score in place of their own electrical trade exam — so you don't re-test the trade in each state. Best move if you work across state lines.</p>
          </div>
          <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "14px 15px" }}>
            <div style={{ fontFamily: disp, fontWeight: 800, fontSize: 15.5, color: C.mute, marginBottom: 5 }}>State-Specific Exam</div>
            <p style={{ ...bodyP, margin: 0 }}>A state's own trade exam counts in <b style={{ color: C.text }}>that one state only</b>. Move to another state and you generally start over with their exam.</p>
          </div>
        </div>
        <div style={{ background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 11, padding: "12px 14px", marginBottom: 22 }}>
          <p style={{ fontFamily: body, fontSize: 13.5, color: C.mute, margin: 0, lineHeight: 1.45, fontWeight: 500 }}><b style={{ color: C.text }}>Important:</b> it is NOT a national license. Each state still controls its own rules — you'll usually still need that state's Business &amp; Law exam, proof of experience, fees, insurance, and any CE. The NASCLA exam just clears the <i>trade</i> portion.</p>
        </div>

        {/* RECIPROCITY MAP */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0 11px" }}>
          <Ico.spark s={16} c={C.cyan} /><div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>WHERE IT'S ACCEPTED</div>
        </div>
        <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${C.line}`, marginBottom: 12, background: "#000" }}>
          <img src={US_MAP_IMG} alt="17 states plus D.C. accept the NASCLA Electrical Exam" style={{ width: "100%", display: "block" }} />
        </div>
        <p style={{ ...bodyP, margin: "0 0 8px" }}>The map shows {ACCEPT_STATES.length} jurisdictions: {ACCEPT_NAMES}. As of Nov 17, 2026, NASCLA's participating-agency page lists <b style={{ color: C.text }}>19 agencies</b> — the ones above plus <b style={{ color: C.text }}>Vanderburgh County, Indiana</b> and the <b style={{ color: C.text }}>South Carolina Residential Builders Commission</b>. Not every agency accepts every level (Master, Journeyman, Residential), so check your agency's page.</p>
        <p style={{ fontFamily: mono, fontSize: 10, color: C.faint, lineHeight: 1.55, marginBottom: 22 }}>This list changes as states join — always confirm the current list and each state's exact requirements with NASCLA and the state board before you count on reciprocity.</p>

        {/* LINKS */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0 11px" }}>
          <Ico.book s={16} c={C.blue} /><div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>REGISTER &amp; LEARN MORE</div>
        </div>
        <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
          {[
            ["Apply / Register — NASCLA NED Database", "https://ned.nascla.org", "$65 application · start here"],
            ["NASCLA — Electrical Exam Program Info", "https://www.nascla.org/nascla-electrical-exams", "Official program details"],
            ["NASCLA — Participating States (current list)", "https://www.nascla.org/nascla-electrical-exams-participating-state-agencies", "Verify your state here"],
            ["PSI Exams — Scheduling & Bulletins", "https://test-takers.psiexams.com", "Book your test date"],
          ].map((r, i) => (
            <a key={i} href={r[1]} target="_blank" rel="noopener noreferrer" className="fg-btn" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", background: C.panel, border: `1px solid ${C.blue}55`, borderRadius: 11, padding: "12px 13px", color: C.text }}>
              <span style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: C.bg2, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ico.chev s={15} c={C.cyan} /></span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: body, fontWeight: 600, fontSize: 14, color: C.text, lineHeight: 1.2 }}>{r[0]}</span>
                <span style={{ display: "block", fontFamily: mono, fontSize: 9.5, color: C.cyan, marginTop: 2, letterSpacing: 0.5 }}>{r[2]}</span>
              </span>
            </a>
          ))}
        </div>

        {/* STATE LICENSING BOARDS */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0 6px" }}>
          <Ico.target s={16} c={C.cyan} /><div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.text }}>STATE LICENSING BOARDS</div>
        </div>
        <p style={{ fontFamily: body, fontSize: 13, color: C.mute, margin: "0 0 11px", fontWeight: 500 }}>The board for each accepting jurisdiction — tap yours for that state's requirements, contact, and how to apply.</p>
        <div style={{ display: "grid", gap: 7, marginBottom: 14 }}>
          {STATE_BOARDS.map((b, i) => (
            <a key={i} href={b[2]} target="_blank" rel="noopener noreferrer" className="fg-btn" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 12px", color: C.text }}>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: disp, fontWeight: 800, fontSize: 14, color: C.text }}>{b[0]}</span>
                <span style={{ display: "block", fontFamily: body, fontSize: 12, color: C.mute, marginTop: 1, lineHeight: 1.25 }}>{b[1]}</span>
              </span>
              <Ico.chev s={14} c={C.cyan} />
            </a>
          ))}
        </div>
        <p style={{ fontFamily: mono, fontSize: 9.5, color: C.faint, lineHeight: 1.5, textAlign: "center" }}>Exam facts shown reflect public NASCLA program info — confirm current details with NASCLA and your state board.</p>
        <div style={{ background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 11, padding: "12px 14px", marginTop: 14 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 1.5, color: C.cyan, marginBottom: 5 }}>DISCLAIMER</div>
          <p style={{ fontFamily: body, fontSize: 12, color: C.mute, margin: 0, lineHeight: 1.55, fontWeight: 500 }}>Fan Guys Exam Pro is an <b style={{ color: C.text }}>independent study aid</b>. It is <b style={{ color: C.text }}>not affiliated with, authorized, or endorsed by</b> NASCLA, NFPA, PMI, OSHA, PSI, or any licensing agency or testing provider. NASCLA, NEC, NFPA 70E, and PMBOK are trademarks of their respective owners, used here only to describe the exam this tool helps you prepare for. This app does not reproduce the codebooks or actual exam questions — always study from your own current reference editions and confirm every rule on the page.</p>
        </div>
      </div>
    </div>
  );
}


// ====================================================================
//  MY PROGRESS — section mastery, weak spots, backup / restore
// ====================================================================
function ProgressScreen({ go, progress, setProgress }) {
  const stats = sectionStats(progress, ALL_Q);
  const [msg, setMsg] = useState(null);
  const fileRef = useRef(null);
  const rows = EXAM.map((s, i) => {
    const st = stats[i] || { total: 0, mastered: 0, answered: 0, right: 0, missed: 0, seen: 0 };
    return { i, title: shortTitle(s.title), ...st, acc: st.answered ? Math.round((st.right / st.answered) * 100) : null };
  });
  const weak = rows.filter((r) => r.acc != null).sort((a, b) => a.acc - b.acc).slice(0, 3);
  const backup = () => {
    const blob = new Blob([exportText(progress)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `exam-pro-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    setMsg("Backup file saved. On iPhone it lands in Files › Downloads.");
  };
  const restore = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    f.text().then((txt) => {
      try { const incoming = importText(txt); setProgress((p) => mergeProgress(p, incoming)); setMsg("Restored. Your current progress was kept and merged with the backup."); }
      catch (err) { setMsg("Couldn't read that file: " + err.message); }
    });
    e.target.value = "";
  };
  const reset = () => { if (window.confirm("Erase all saved progress on this device? Back up first if you might want it.")) { setProgress(emptyProgress()); setMsg("Progress cleared."); } };
  return (
    <div style={{ minHeight: "100dvh", background: C.bg, color: C.text }}>
      <Style /><Backdrop />
      <TopBar go={go} showHome />
      <div className="fg-rise" style={{ padding: "18px 16px 80px", maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: disp, fontWeight: 900, fontSize: 26, textTransform: "uppercase", marginBottom: 4 }}>My Progress</div>
        <p style={{ ...bodyP }}>Accuracy counts every practice answer. "Mastered" means you got the question right on two separate review days — it's a better readiness signal than a high score on a set you've already seen.</p>

        {weak.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <SectionHeading icon={<Ico.target s={15} c={C.danger} />}>WORK ON THESE NEXT</SectionHeading>
            <div style={{ display: "grid", gap: 8 }}>
              {weak.map((r) => (
                <button key={r.i} className="fg-btn" onClick={() => go({ screen: "quiz", mode: "section", sectionIdx: r.i, _k: Date.now() })} style={{ ...rowBtn, minHeight: 52 }}>
                  <span style={{ fontFamily: disp, fontWeight: 800, fontSize: 15.5, textTransform: "uppercase" }}>{r.title}</span>
                  <span style={{ fontFamily: mono, fontSize: 12, color: r.acc >= 75 ? C.live : C.danger }}>{r.acc}% · PRACTICE ›</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <SectionHeading icon={<Ico.sigma s={15} />}>BY SECTION</SectionHeading>
        <div style={{ display: "grid", gap: 8, marginBottom: 22 }}>
          {rows.map((r) => (
            <div key={r.i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, gap: 8 }}>
                <span style={{ fontFamily: disp, fontWeight: 700, fontSize: 14.5, textTransform: "uppercase" }}>{r.title}</span>
                <span style={{ fontFamily: mono, fontSize: 11.5, color: C.mute }}>{r.seen}/{r.total} seen · {r.acc == null ? "—" : r.acc + "%"}</span>
              </div>
              <div style={{ height: 6, background: C.line, borderRadius: 4, overflow: "hidden" }}><div style={{ height: "100%", width: (r.total ? (r.mastered / r.total) * 100 : 0) + "%", background: C.live }} /></div>
              <div style={{ fontFamily: mono, fontSize: 10.5, color: C.mute, marginTop: 5 }}>{r.mastered} mastered · {r.missed} to fix</div>
            </div>
          ))}
        </div>

        <SectionHeading icon={<Ico.book s={15} />}>BACK UP &amp; RESTORE</SectionHeading>
        <p style={{ ...bodyP }}>Progress lives on this device only — no account, no server. Back it up before clearing Safari data or switching phones.</p>
        <div style={{ display: "grid", gap: 10 }}>
          <PrimaryBtn full glow={false} onClick={backup}>BACK UP TO A FILE</PrimaryBtn>
          <GhostBtn full onClick={() => fileRef.current && fileRef.current.click()}>RESTORE FROM A FILE</GhostBtn>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={restore} style={{ display: "none" }} aria-label="Choose backup file" />
          <button onClick={reset} style={{ ...ghostBtn, justifyContent: "center", minHeight: 44, color: C.danger, borderColor: C.danger + "66" }}>ERASE PROGRESS</button>
        </div>
        {msg && <p role="status" style={{ ...bodyP, marginTop: 12, color: C.cyan }}>{msg}</p>}
      </div>
    </div>
  );
}

export default function App() {
  const [state, setState] = useState({ screen: "home" });
  const [torque, setTorque] = useState(null);
  const [splash, setSplash] = useState(() => { try { return !sessionStorage.getItem("fgSplash"); } catch (e) { return true; } });
  // Progress is saved on this device (localStorage) after every change.
  const [progress, setProgress] = useState(() => loadProgress());
  const [saveOk, setSaveOk] = useState(true);
  useEffect(() => { setSaveOk(saveProgress(progress)); }, [progress]);

  // Screen changes go into browser history so the iPhone back-swipe and Android back button work.
  // Live screens (quiz, drill, results) are recorded as their starting screen so Back never restarts a quiz.
  const histOf = (s) => s.screen === "quiz" ? { screen: s.mode === "exam" ? "examIntro" : "practiceList" }
    : s.screen === "lookup" ? { screen: "lookupIntro" }
    : (s.screen === "results" || s.screen === "lookupResults") ? { screen: "home" } : s;
  const go = (s) => { setState(s); try { window.history.pushState({ fg: histOf(s) }, ""); } catch (e) {} };
  useEffect(() => {
    try { window.history.replaceState({ fg: { screen: "home" } }, ""); } catch (e) {}
    const onPop = (e) => setState((e.state && e.state.fg) || { screen: "home" });
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const endSplash = () => { setSplash(false); try { sessionStorage.setItem("fgSplash", "1"); } catch (e) {} };

  const bare = ["quiz", "results", "lookup", "lookupResults", "locator", "about", "progress"].includes(state.screen);
  return (
    <div style={{ minHeight: "100dvh", background: C.bg, fontFamily: body, color: C.text }}>
      <Style /><Backdrop />
      {!bare && <div style={{ position: "relative", zIndex: 10 }}><TopBar go={go} showHome={state.screen !== "home"} /></div>}
      {!saveOk && <div role="alert" style={{ position: "relative", zIndex: 11, background: "#3a1020", color: "#ffd0d8", fontFamily: body, fontSize: 13.5, padding: "8px 16px", textAlign: "center" }}>Progress can't be saved in this browser mode (Private Browsing?). Use Back Up in My Progress before closing.</div>}
      <div style={{ position: "relative", zIndex: 1 }}>
        {state.screen === "home" && <Home go={go} progress={progress} />}
        {state.screen === "progress" && <ProgressScreen go={go} progress={progress} setProgress={setProgress} />}
        {state.screen === "studyList" && <StudyList go={go} />}
        {state.screen === "studyRead" && <StudyRead sectionIdx={state.sectionIdx} go={go} openTorque={setTorque} />}
        {state.screen === "practiceList" && <PracticeList go={go} progress={progress} />}
        {state.screen === "examIntro" && <ExamIntro go={go} progress={progress} setProgress={setProgress} />}
        {state.screen === "flashIntro" && <FlashIntro go={go} />}
        {state.screen === "lookupIntro" && <LookupIntro go={go} />}
        {state.screen === "lookup" && <LookupDrill key={state._k} config={state} go={go} />}
        {state.screen === "lookupResults" && <LookupResults data={state} go={go} />}
        {state.screen === "locator" && <CodeLocator go={go} />}
        {state.screen === "about" && <AboutExam go={go} />}
        {state.screen === "flash" && <Flashcards go={go} />}
        {state.screen === "quiz" && <Quiz key={state.mode + (state.sectionIdx ?? "") + (state._k ?? "")} config={state} go={go} progress={progress} setProgress={setProgress} />}
        {state.screen === "results" && <Results data={state} go={go} />}
      </div>
      <TorquePopup tip={torque} onClose={() => setTorque(null)} />
      {splash && <Splash onDone={endSplash} />}
    </div>
  );
}

