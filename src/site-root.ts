// Resolve the site root at runtime, so `data/*.json` fetches work under ANY
// basePath (GitHub project page, custom domain, local dev) without hardcoding it.
//
// History / why this is DOM-sniffing rather than the obvious things:
//   - It WAS `new URL('.', document.currentScript.src)`. That broke when the
//     doc-system moved page loading from a classic `<script>` iife to a
//     `<script type="module">` (tosijs-ui 1.7.0): `document.currentScript` is
//     `null` inside a module, so fetches resolved against the current PAGE dir
//     (`/skills/data/…`) instead of the site root — a silent 404 that dropped the
//     component back to its static substrate on every page but the root.
//   - `import.meta.url` is the module-era answer, BUT the same entry is also built
//     as a classic-script `iife.js`, and the bare token `import.meta` is a parse
//     error in a classic script — the doc-system's build rejects the bundle. So it
//     can't appear in this code at all.
//
// What works in BOTH a module and a classic script, with no forbidden syntax, is
// to read a URL the doc-system already put on the page and that it rewrites with
// basePath: the executing script (classic), the module bootstrap script, or the
// doc-system stylesheet (always present — the page can't render without it).
function resolveSiteRoot(): URL {
  // 1. Classic <script>: the script currently executing.
  const cur = document.currentScript as HTMLScriptElement | null
  if (cur && cur.src) return new URL('.', cur.src)
  // 2. Module context (currentScript is null): the doc-system's own bootstrap
  //    script, served from the base root and basePath-rewritten.
  const boot = Array.from(document.querySelectorAll('script[src]')).find((s) =>
    /\/(hydrate|iife)\.js(?:[?#]|$)/.test((s as HTMLScriptElement).src)
  ) as HTMLScriptElement | undefined
  if (boot) return new URL('.', boot.src)
  // 3. The doc-system stylesheet — most stable anchor of all.
  const css = document.querySelector(
    'link[rel="stylesheet"][href*="doc-system"]'
  ) as HTMLLinkElement | null
  if (css && css.href) return new URL('.', css.href)
  // 4. Last resort: site origin root.
  return new URL('/', location.href)
}

// Imported by bundle.ts (<foresight-table>) and character-sheet.ts
// (<foresight-character-sheet>) so there is one resolver, not three drifting copies.
export const SITE_ROOT: URL = resolveSiteRoot()
