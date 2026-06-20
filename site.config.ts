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
  host: 'static',
  port: 1986,                 // dev server (https://localhost:1986/)
  watchPaths: ['./static'],   // also rebuild when data/ or character.html change
  navbarLinks: [{ label: 'GitHub', href: 'https://github.com/tonioloewald/foresight-2026' }],
} as any)
