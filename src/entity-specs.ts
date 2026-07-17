// Entity-view specs — the single description of how each data collection in
// static/data/ projects into a SUMMARY (few columns, scannable) and a CARD (the
// full detail body).
//
// Imported by BOTH sides so they cannot drift:
//   - entity-views.ts (build, via site.config's `prebuild`) renders the static
//     <table> + cards that the ePub/print edition reads.
//   - bundle.ts (browser) renders the interactive summary/cards views over it.
// Therefore: pure data + pure functions only. No node, no DOM.

export interface EntityColumn {
  prop: string
  name: string
  width?: number
  align?: 'center'
}

export interface EntityField {
  label: string
  prop: string
}

export interface EntitySpec {
  /** filename under static/data/ */
  file: string
  /** singular noun, for prose ("20 skills") */
  noun: string
  /** anchor id prefix — ids are `<idPrefix>-<slug(name)>` */
  idPrefix: string
  /** the summary projection: what the table shows */
  columns: EntityColumn[]
  /** the detail body: what the card shows beyond the title */
  card: EntityField[]
  /** prop holding the long prose shown as the card's body paragraph */
  body?: string
}

export const ENTITY_SPECS: Record<string, EntitySpec> = {
  'skills.json': {
    file: 'skills.json',
    noun: 'skill',
    idPrefix: 'skill',
    columns: [
      { prop: 'name', name: 'Skill', width: 150 },
      { prop: 'formula', name: 'Formula', width: 120 },
      { prop: 'cost', name: 'Cost', width: 64, align: 'center' },
      { prop: 'limit', name: 'Limit', width: 64, align: 'center' },
      { prop: 'bef', name: 'BEF', width: 56, align: 'center' },
      { prop: 'covers', name: 'Covers', width: 440 },
    ],
    card: [
      { label: 'Formula', prop: 'formula' },
      { label: 'Attributes', prop: 'attributes' },
      { label: 'Cost', prop: 'cost' },
      { label: 'Limit', prop: 'limit' },
      { label: 'BEF', prop: 'bef' },
      { label: 'Tags', prop: 'tags' },
    ],
    body: 'covers',
  },
}

/** Render any JSON scalar/array cell as plain text. */
export function fmt(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) return value.length ? value.join(', ') : '—'
  if (typeof value === 'boolean') return value ? 'yes' : 'no'
  return String(value)
}

/** Stable anchor slug. Must agree between build and browser. */
export function slug(name: string): string {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const ALL_TAGS = ['standard', 'ancient', 'modern', 'sf', 'fantasy']
