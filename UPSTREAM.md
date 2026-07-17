# Upstream — issues raised against other repos

A local mirror of what this project has raised upstream, so the context stays where we're
working. **This file is not a channel** — the upstream repo never sees it. Every entry must
have a filed issue behind it, or it's a complaint nobody will read.

See [`../tosijs-coding-practices/practices/cross-project.md`](../tosijs-coding-practices/practices/cross-project.md).
When one lands: mark `✅ RESOLVED (fixed in <pkg>@<version>)` here **and close the issue**.

---

## FIXED UPSTREAM, PENDING RELEASE — tosijs-ui: ePub internal cross-links are dead

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/15 (closed)
**Raised:** 2026-07-17, against tosijs-ui 1.6.23
**Fixed in:** tosijs-ui **1.7.0** (`buildEpub` gained a `rewriteInBookLinks` pass) — **not yet
published.** npm `latest` is 1.6.23, `beta` is 1.7.0-beta.1 (predates the fix, which is in
beta.5). We are still on 1.6.23, so the book still has dead cross-links today.

> **TODO when 1.7.0 ships:** `bun add -d tosijs-ui@^1.7.0`, `bun run build`, unzip the ePub and
> confirm **zero** `/slug/` hrefs remain (`grep -oh 'href="/[^"#][^"]*"' OEBPS/*.xhtml | sort -u`),
> then clear the REVIEW → Book output item and delete this entry. One residual to eyeball: the fix
> rewrites only targets **in the same book**, and leaves out-of-book links untouched — so our one
> deliberate exclusion (`character-builder.md`) stays a dead `/character-builder/` link in whatever
> chapters point at it. That's arguably fine (the page is web-only), but decide whether to drop
> those links from the book text or accept them.

**Context.** `buildEpub` writes each doc's rendered markdown into its chapter unchanged, so
internal links stay as site paths (`href="/combat/"`). Inside the book they resolve to nothing.
Every cross-reference in `docs/foresight-2026.epub` is dead — 21 links across 6 chapters — even
though 19 of the 20 distinct targets exist as `<slug>.xhtml` in the same OEBPS dir.

**20 of the 21 are links tosijs-ui generated itself**, via the auto-regenerated `<!-- toc -->`
blocks on our section pages (`src/docs/{core,conflict,world,magic,reference}.md`).

**Suggestion.** A `rewriteInternalLinks(d, slugMap)` transform composed into the existing
`htmlToXhtml(html, win, transform)` hook in `epub.js`'s chapter loop — `slugMap` / `fileFor` are
already in scope there. Two flagged decisions: the `transform` is currently gated on `baseUrl`
(a link rewriter must run regardless), and `book.exclude` means a target may not be in the book
at all (our `character-builder.md` case).

**Local impact.** Same-page `#skill-*` anchors are fine; only cross-chapter links break. We are
not working around it — post-processing our own built EPUB seemed worse than reporting it. Until
it lands, don't trust in-book cross-references. Tracked in `REVIEW.md` → Book output.
