# ForeSight 2026 — Review & To-Fix

Running list of things to revisit. Grouped by area; check off as resolved.

## Magic application catalog (`docs/data/magic-applications.json`)
- [x] ~~Recover missing descriptions — Sense §16A3 and §16A5~~ **Resolved:** they were the *bestowed* forms of the controlled effects one tier down (§16B2 augment → §16A3; §16A4 replace → §16A5). Rewritten accordingly; §16A4 intensity corrected to 2 (parser had been fooled by the literal "Intensity 1 Applications bestowed" text).
- [ ] **Spot-check intensities in other fundamentals** for the same parser glitch (a description line that literally began "Intensity N Applications" reset the tier). Only Sense was known to contain such phrasing, but worth a scan.
- [ ] **Duplicate codes** in the original — **Summon §20A4** appears twice; **Time §23A6** appears twice. Almost certainly numbering errors; renumber.
- [ ] **Cancellation §4A10** had several effects mashed into one source entry; they were split without inventing anything — confirm the split matches intent.
- [ ] **Scaling / Variable formulas** are rough OCR/encoding artifacts (tab-delimited columns came through as stray apostrophes, e.g. `Z'inflicts DC2Z+3'`). Need a human pass to restore the intended "base vs. scaled" columns. Descriptions themselves are clean.
- [ ] Spot-check the **auto-generated names** (124 were invented) and rename to taste.

## Book output (ePub / print)
- [x] ~~Static build-time table rendering~~ **Done** — `entity-views.ts` runs from `site.config`'s `prebuild` (before doc extraction) and renders `static/data/*.json` into a limited-column `<table>` + per-item detail cards, so the book gets real HTML. `<foresight-table>` now *enhances* that substrate (summary/cards toggle, text + tag filter) instead of replacing a blank element. `skills.md` is back in the book (20 rows, 20 cards, 20 working row→card anchors, zero JS).
- [ ] **All internal cross-links are dead in the ePub** — chapters carry absolute site paths (`href="/gm-cheat-sheet/"`) and `tosijs-ui`'s epub builder does no `/slug/` → `slug.xhtml` rewriting. Upstream tosijs-ui gap, not a config error. (Same-page `#skill-*` anchors are fine — only cross-chapter links break.)
- [ ] **Swap the remaining collections to entity views** — add specs to `src/entity-specs.ts` for `background-factors`, `fields`, `magic-fundamentals`, then replace the hand-written Markdown tables in the one-pagers with `<!-- entity-view: … -->` blocks. (`magic-applications.json` is nested — 23 fundamentals × 232 applications — so it needs a grouped renderer, not the flat one.)
- [ ] `character-builder.md` stays excluded from the book (`site.config.ts` → `book.exclude`): pure JS, no static substrate, so it's a stub chapter in print.

## Source-edition conflicts (2004 vs 1986)
- [ ] Where the 2004 draft and the 1986 original disagree on a **number or probability**, log it here rather than defaulting to 2004 — 2004 was never playtested, 1986 shipped. (Prose/structure: 2004 wins, no argument. See CLAUDE.md → Source hierarchy.)

## Calibration — test in play, then tune
- [ ] **Simultaneous Action ladder** (0 / −1,−2 / −2,−3,−4) — magnitudes inherited from the reaction ladder, so plausibly calibrated, but the planned-vs-unplanned split (declared tasks share the ladder; unplanned reactions pay flat −2 each) is new and untested. Does the n=3 tier ever get chosen, or is it purely a deterrent? See Design Document §7a.
- [ ] **Background-factor slot budget** (default 4) and which factors are free vs. 1 slot.
- [ ] **Point economy magnitudes** — attribute 10/20 curve, skill `cost×(L+2)`, fields 4/yr. The whole economy shrank (fewer attrs, fewer/cheaper skills, no E/G familiarity buys, minor buys → quirks); budgets/grants likely need to come down.
- [ ] **Skill Cost 1-vs-2 split** is provisional.
- [ ] **Tag assignments** (`standard/ancient/modern/sf/fantasy`) on skills, BFs, fields, magic fundamentals are best-guess.
- [ ] **Field hierarchy years** (First Aid 1 … Surgery 4) and the prerequisite model (implies-ancestors vs. pay-the-chain) — provisional.
- [ ] **Magic fundamentals** Basic/Advanced years (currently flat 1/3) — provisional, "will do for now".
- [ ] **Magic skills** — set Incantation per-level cost (~6–8 from old playtesting); confirm Mana cost. Magic is intentionally out of the lean playtest skill list.

## Open design questions
- [ ] **Skill overlap rule** when a skill is granted by multiple background factors (candidate: take the better, +1).
- [ ] **Field prerequisite enforcement** — tooling requires the parent before a child, or just implies ancestors and trusts the GM?
- [ ] **Magic field tree** — does magical knowledge live in `fields.json` or stay a parallel tree (`magic-fundamentals.json`)? Currently parallel.

## Architecture / app (when the `data-table` component is published)
- [ ] Swap the static Markdown tables in the one-pagers for `<data-table src="data/…json">`.
- [ ] Decide whether the character sheet should also offer **fields** (and magic) from JSON (currently fields are freeform text in the sheet; skills & BFs already load from JSON).
- [ ] Optional thin wrapper element `<foresight-table src + columns>` over `data-table`.
- [ ] Later: replace the sheet's localStorage with the Firestore persistence library (field-level security for a shared campaign roster).
- [ ] Trivial: remove the now-unused `.sub2` CSS rule in `docs/index.html`.

## Rules one-pagers still to draft
- [ ] NPCs (nouns + modifiers) · Interpersonal · Travel & wilderness · **Magic** · Religion · Mystic Disciplines (Ch'i)
- [ ] Equipment category lists (weapons/armor/vehicles/tools) with DC-calibrated stats
- [ ] Advancement / point-buy ("Tweaking") chapter; the experience-as-reassignment and fallow-points concepts
