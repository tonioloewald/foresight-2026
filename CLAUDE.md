# CLAUDE.md — ForeSight 2026

Context for any AI agent (Claude Code, Cowork, etc.) continuing this project. Read this first, then `Design Document.md` (the design bible) and `REVIEW.md` (the running to-fix list).

## What this is

A streamlined, modern edition of **ForeSight**, a general-purpose tabletop RPG by Tonio Loewald (1st ed. 1986, ISBN 0958789401). This edition builds on the unpublished **2004 2nd-edition draft** and the 1986 original, with the combat/initiative sequence lifted from the 2015 "ForePlay" experiment. Goal: one resolution rule, rules you can run from memory, a character buildable in minutes.

Legacy source PDFs/HTML live in `Legacty/` and `Abortive Previous Attempt/` (gitignored — large, copyrighted). The 2004 magic rules HTML under `Legacty/foresight2004/magic/fundamentals/` is the source for the magic catalog.

## How to work on it

- **Author content** in `src/` and `static/` (NOT in `docs/`, which is generated).
- **Build:** `bun run build` → generates `docs/` (the static site Pages serves). Bun-only (the doc-system uses `Bun.build`/`Bun.write`/`$`).
- **Dev:** `bun run tls` once (needs `mkcert`), then `bun run dev` → live-rebuild HTTPS server at `https://localhost:1986/` (watches `README.md`, `src/`, `static/`).
- **Deploy:** `bun run build` then commit `docs/` and push. GitHub Pages is set to serve from `/docs`. Repo: `github.com/tonioloewald/foresight-2026`.
- First time / after pulling: `rm -rf docs && bun install`.

### Important environment caveat (Cowork sandbox only)
The Cowork sandbox mounts the repo on a filesystem that **denies `unlink`**, so `git` and the build's `rm -rf docs` both FAIL there. In the sandbox: build in `/tmp` (copy source there, `npx bun build.ts`) and never run `git` (it leaves stale `.git/*.lock` files). On a normal machine (Tonio's Mac) everything works normally. Do not run `git` from the sandbox.

## Architecture (see Design Document.md → "Delivery, hosting & persistence")

- **Single source of truth = JSON** in `static/data/` (`skills`, `background-factors`, `fields`, `magic-fundamentals`, `magic-applications`). Consumed by both the rules pages and the character sheet. Build copies it to `docs/data/`.
- **Doc site** = tosijs-ui doc-system (`tosijs-ui/site`). Markdown one-pagers in `src/rules/*.md`, each with a metadata block **after its H1**: `<!--{ "parent": "<section>", "order": N }-->`. Section "parent" pages in `src/docs/{core,conflict,world,magic,reference}.md`. `README.md` is the home page (`"pin":"top"`).
- **`bundle.ts`** (the `bundleEntry`) imports `tosijs-ui` and defines `<foresight-table src="X.json" columns='[…]' height>` — fetches `static/data/X.json` (path self-resolves from the loaded script, so basePath-agnostic) and renders a sortable `tosi-table`. This will grow into an *entity-view* component with **card/detail views** and a **tag filter** (see REVIEW).
- **Character editor:** currently `static/character.html` (standalone, rule-enforcing, localStorage + JSON export, fetches `data/`). To be componentized onto tosijs + Tonio's forthcoming **Firestore backend** (fine-grained security) so players save characters online and GMs host campaigns with custom rulesets.
- **Future:** all major entity collections become Firestore-backed (author fixes propagate; GMs add content). Data model = base (author) → GM/community custom → per-campaign overrides. So keep data **mergeable/overridable** and each character a **self-contained record**. Keep every entity JSON shaped with a summary projection (table) AND a detail body (card).

## The system in brief (full detail in Design Document.md)

- **One Rule:** Success Chance = **Score × Ease Factor**; roll D100 ≤ SC. EF ladder 0,¼,½,1,2…15. A +1 EF ≈ +your Score in the sweet spot (so modifiers stay small). **Sacred — do not replace** (a clever-dice replacement was tried and failed).
- **Quality Ratings:** roll vs SC/10, SC/4, SC/2, SC = QR1–4; over = QR7 (fail), over+multiple-of-10 = QR10 (botch); natural 100 never better than QR7, natural 99 never better than QR4. Yield 100/80/50/25%. Read ONE column per task (fast OR good OR much). PM = 4−QR. Never penalize the same choice twice.
- **7 attributes:** ST EN CO IN PC WP AP (DX+AG→Coordination; EM folded into PC; AP kept). Cost more past 12.
- **Skills:** Score = formula (avg of attributes, or ½-avg) + level. Cost 1–2 (powersets dearer). Limit = max level multiplier (1, or 1.5 for ½ skills) → max level = best attribute × limit. Pain Resistance & Stamina are NOT skills (roll EN or WP / EN). Social = Charm + Confidence only.
- **Combat:** awareness sets Initiative; declare best→worst, act-or-wait (waiting persists → ambush is deadly); pre-empt = Coordination roll modified by Initiative QR (you never *know* you'll act first). Primary + secondary action; reactions stack −2. Turn length elastic.
- **Damage:** Damage = Yield × DC/2 (÷ Damage Scale). DC anchors: inhuman fist 4, 9mm pistol 8, 7.62 rifle 11. Types M/I/B; weapon P pierces armor, armor A absorbs.
- **Wounds & exhaustion:** wound level 0→8, −(level) to everything. Fatigue & power pools are wound-style **exhaustion levels** (full to own domain, ½ to others, stack). Pain Resistance roll (EN/WP) → shrug / Shaken / Stunned. Recovery: convalescence rolls (wounds) / rest, deepest-level-first (exhaustion).
- **Points economy:** attributes 10/pt to 12 then 20; skills cost×(L+2); fields 4/yr. Background factors cost **one BF slot or nothing** (only neutral species free); some grant build points.
- **Background factors:** ordered, categorized (Species/Origin/General/Unusual/Intrinsic), one-species/one-origin exclusivity; confer skills/fields/attrs (conferred levels free) + optional points.
- **Fields of Knowledge:** a **hierarchy** (First Aid 1yr → Medicine 3 → Surgery 4; Science → Physics → …). years = depth = cost (×4/yr); a deeper field implies its ancestors. Load-bearing for magic.
- **Magic:** two skills — **Mana** (gather/power-pool) + **Incantation** (cast); ritual/snap-cast are time/EF trade-offs. **Fundamentals** (23, e.g. Fire, Form, Essence) are fields split **Basic** (≤ complexity 1) / **Advanced**. Magic is **generative** (effects compose) and must be designed with care. Balance keystone: **conscious targets intrinsically resist direct magical effects** when unwilling/unaware; **coercion never cheaper than consent**; **bestowal gated per-effect** (controlled vs bestowed vs fixed vs immediate); **benchmark vs the mundane** (combat: a good archer; social: judge by what the world becomes if the effect is reliable — a reliable truth detector is transformative); **price the capability, not its costume**.

## Tags

Every data entity carries `tags` from `{standard, ancient, modern, sf, fantasy}`. The character sheet's tag toggles show/hide content by setting; magic is tagged `fantasy`. Used to keep e.g. SF clutter off a fantasy sheet.

## Status / what's next (see REVIEW.md for the live list)

Done: all rules one-pagers drafted and migrated into the doc-system with sections; full data layer (skills/BFs/fields/magic) as tagged JSON; the **232-application magic catalog** named + formatted; the rule-enforcing character sheet; the doc-system site + live `foresight-table` + dev server.
Open (high level): `foresight-table` card/detail views + tag filter; swap remaining static tables to `<foresight-table>`; **draft the Magic one-pager**; componentize the character editor onto Firestore; recover Sense §16A3/§16A5 / fix duplicate magic codes; playtest-calibrate the point economy.

## Conventions / preferences

- Tonio prefers concise, direct responses; challenge assumptions; ask follow-ups when genuinely blocked.
- Design rationale matters — capture *why*, not just *what* (that's what `Design Document.md` is for).
- When in doubt on balance, apply the magic balance lenses above and the first principles: **simple mechanics, right-direction/right-magnitude probabilities, and transparency** (the setting seen through the rules is just the setting; never hidden world-shaping).
