import { defineSiteConfig } from 'tosijs-ui/site'

export default defineSiteConfig({
  name: 'ForeSight 2026',
  description: 'A streamlined modern edition of the ForeSight tabletop RPG.',
  baseUrl: 'https://tonioloewald.github.io/foresight-2026',
  basePath: process.env.BASE_PATH ?? '/foresight-2026', // set BASE_PATH= for local-root preview
  outputDir: 'docs',
  docPaths: ['src', 'README.md'],
  sectionsDir: 'src/docs',
  staticDirs: ['static'],
  bundleEntry: 'bundle.ts',
  epub: { author: 'Tonio Loewald' }, // emit foresight-2026.epub into docs/ on every build
  host: 'static',
  port: 1986,                 // dev server (https://localhost:1986/)
  watchPaths: ['./static'],   // also rebuild when data/*.json change
  // NOTE: `icon` is required in practice — a navbar link without one renders
  // class="" and tosijs-ui's element builder throws on the empty class token.
  navbarLinks: [{ label: 'GitHub', icon: 'github', href: 'https://github.com/tonioloewald/foresight-2026' }],
} as any)
