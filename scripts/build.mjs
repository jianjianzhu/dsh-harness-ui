import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import process from 'node:process'

const sourceUrl = new URL('../src/client.js', import.meta.url)
const outputUrl = new URL('../lib/client.js', import.meta.url)
const source = (await readFile(sourceUrl, 'utf8')).replace(/\r\n/g, '\n')

assert.match(source, /^\/\/ Source bundle entry\./)
assert.match(source, /id: "dsh-harness-ui"/)

if (process.argv.includes('--check')) {
  const output = (await readFile(outputUrl, 'utf8')).replace(/\r\n/g, '\n')
  assert.equal(output, source, 'lib/client.js is stale; run npm run build')
} else {
  await mkdir(new URL('../lib/', import.meta.url), { recursive: true })
  await writeFile(outputUrl, source, 'utf8')
  console.log('built lib/client.js from src/client.js')
}
