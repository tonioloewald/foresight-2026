import { devServer } from 'tosijs-ui/site'
import { mkdirSync } from 'node:fs'
import config from './site.config'
mkdirSync('demo', { recursive: true })
await devServer(config)
