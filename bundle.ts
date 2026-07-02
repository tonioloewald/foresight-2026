import 'tosijs-ui'
import { tosiTable } from 'tosijs-ui'
import './src/character-sheet' // registers <foresight-character-sheet>

// Resolve the site root from the loaded IIFE script, so data paths work under
// any basePath (GitHub project page, custom domain, or local dev).
const SITE_ROOT = (() => {
  try { return new URL('.', (document.currentScript as HTMLScriptElement).src) }
  catch { return new URL('./', location.href) }
})()

// <foresight-table src="skills.json" columns='[...]' height="60vh"></foresight-table>
// Loads docs/data/<src> and renders it as a sortable tosi-table. (Card/detail
// views to follow.)
class ForesightTable extends HTMLElement {
  private _init = false
  async connectedCallback() {
    if (this._init) return
    this._init = true
    const file = this.getAttribute('src')
    if (!file) { this.textContent = 'foresight-table: no src'; return }
    try {
      const data = await (await fetch(new URL('data/' + file, SITE_ROOT).href)).json()
      const array = Array.isArray(data) ? data : (data.rows || [])
      const colsAttr = this.getAttribute('columns')
      const table = tosiTable({
        array,
        columns: colsAttr ? JSON.parse(colsAttr) : undefined,
        rowHeight: 34,
      }) as HTMLElement
      table.style.height = this.getAttribute('height') || '60vh'
      table.style.display = 'block'
      this.append(table)
    } catch (e) {
      this.textContent = 'foresight-table: failed to load ' + file
    }
  }
}
if (!customElements.get('foresight-table')) customElements.define('foresight-table', ForesightTable)
