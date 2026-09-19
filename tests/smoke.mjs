import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const client = await readFile(new URL('../src/client.js', import.meta.url), 'utf8')
const host = await readFile(new URL('../lib/index.js', import.meta.url), 'utf8')
const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
const patch = await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8')

// Both faces must parse as valid JavaScript.
execFileSync(process.execPath, ['--check', fileURLToPath(new URL('../src/client.js', import.meta.url))], { stdio: 'pipe' })
execFileSync(process.execPath, ['--check', fileURLToPath(new URL('../lib/index.js', import.meta.url))], { stdio: 'pipe' })

// Package identity
assert.equal(pkg.name, 'dsh-harness-ui')
assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml', 'dsh.bundle.patch must point at the patch file')
assert.equal(pkg.dsh.client.platform, 'web')
assert.deepEqual(pkg.dsh.client.inject, ['@deepseek-ai/dsh-client-ui-slots'])

// Host face
assert.match(host, /export const name = 'dsh-harness-ui'/)
assert.match(host, /export function apply/)

// Client bundle shape
assert.match(client, /^\/\/ Source bundle entry\./)
assert.match(client, /window\.__ModuleLoader__\.load\(\{ id: "dsh-harness-ui"/)
assert.match(client, /module\.exports\.inject = \["slots"\]/)
assert.match(client, /module\.exports\.apply = function apply/)
assert.match(client, /slots\.inject\("main"/, 'must register the main panel')
assert.match(client, /slots\.inject\("sidebar\.panellist"/, 'must register the sidebar entry')
assert.match(client, /require\("react"\)/, 'uses the host React')

// Patch declares the plugin id
assert.match(patch, /id: harness-ui/)
assert.match(patch, /name: dsh-harness-ui/)

console.log('smoke: all checks passed')
