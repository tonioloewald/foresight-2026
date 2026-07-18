# Upstream — issues raised against other repos

A local mirror of what this project has raised upstream, so the context stays where we're
working. **This file is not a channel** — the upstream repo never sees it. Every entry must
have a filed issue behind it, or it's a complaint nobody will read.

See [`../tosijs-coding-practices/practices/cross-project.md`](../tosijs-coding-practices/practices/cross-project.md).
When one lands: mark `✅ RESOLVED (fixed in <pkg>@<version>)` here **and close the issue**.

---

## ✅ RESOLVED — tosijs-ui: ePub internal cross-links are dead

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/15 (closed)
**Raised:** 2026-07-17, against tosijs-ui 1.6.23
**Fixed in:** tosijs-ui **1.7.0-beta.5** — `buildEpub` gained a `rewriteInBookLinks` pass.
**Consumed:** on `tosijs-ui@1.7.0-beta.5`. Verified against our book: **21 dead `/slug/` links → 2**,
and both residuals are `/character-builder/` — the one page we deliberately exclude from the book
(the fix leaves out-of-book links untouched, by design). All 25 in-book chapter cross-links resolve.

> Pinned to the exact beta (`1.7.0-beta.5`) since caret ranges on prereleases misbehave. **When
> stable 1.7.0 ships:** move to `^1.7.0`. Residual decision for the 2 out-of-book links: either drop
> them from `README.md` / the core-section text, or accept them (the character builder is web-only).

## ⚠️ OPEN — tosijs-ui: out-of-book ePub links are dead (want: point them at the live site)

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/17 (Tonio implements — do not edit tosijs-ui from here)
**Raised:** 2026-07-18, against tosijs-ui 1.7.0-beta.5. Follow-up to #15.

The 2 residual `/character-builder/` links (home page + auto-generated core TOC) are dead in the
ePub because `character-builder.md` is `book.exclude`d and `rewriteInBookLinks` leaves out-of-book
links untouched. Proposed fix: a book base URL (`epub.baseUrl`, defaulting to `baseUrl`) and
absolutizing recognized-but-out-of-book paths to `bookBaseUrl + pathForSlug(slug)`. Issue #17 has
the full implementation sketch (exact lines, the test to update).

> **When #17 lands and we consume it:** set `epub: { …, baseUrl: 'https://foresight-rpg.com' }` in
> `site.config.ts` (leaving the site's own `baseUrl`/`basePath` on github.io untouched, so the live
> site's canonicals stay correct). The 2 links then point at `foresight-rpg.com/character-builder/`
> and go live when the DNS does. Verify: unzip the ePub, `grep -oh 'href="[^"]*character-builder[^"]*"' OEBPS/*.xhtml`
> should show the absolute URL, not `/character-builder/`.

## ⚠️ OPEN — tosijs-ui: no runtime basePath for bundleEntry code

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/16
**Raised:** 2026-07-17, against tosijs-ui 1.7.0-beta.5 (surfaced consuming the fix above).

1.7.0 loads pages as `<script type="module">`, so `document.currentScript` is `null` in our bundled
code — the old `new URL('.', document.currentScript.src)` base-resolution silently broke, and
`data/*.json` fetched relative to the current *page* dir instead of the site root (404 in prod; a
misleading 200-HTML on the SPA-fallback dev server). `import.meta.url` is unusable because the entry
is *also* emitted as a classic `iife.js` where `import.meta` is a parse error the build rejects.

**Our fix (`src/site-root.ts`):** sniff the doc-system's own bootstrap script / stylesheet URL,
which works in both a module and the classic iife. Verified under the production basePath. It's
fragile — it hardcodes the doc-system's asset names (`hydrate.js`, `doc-system.css`).

> **When a runtime basePath helper lands upstream** (a global, `<html data-base-path>`, or an
> exported `siteRoot()`/`withBase()`), replace the DOM-sniffing in `src/site-root.ts` with it and
> drop the fragile filename coupling.

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
