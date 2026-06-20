import { buildSite } from 'tosijs-ui/site'
import { mkdirSync } from 'node:fs'
import config from './site.config'
mkdirSync('demo', { recursive: true })
const ok = await buildSite(config)
console.log('buildSite ok:', ok)
