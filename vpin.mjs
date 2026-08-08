// vpin.mjs — run a vulpin story and print its output.
// usage: node vpin.mjs ulam.v

import { readFileSync } from 'node:fs'
import { Vulpin } from './vulpin.js'

const file = process.argv[2]
if (!file) {
  console.error('pass a program file, e.g.  node vpin.mjs ulam.v')
  process.exit(1)
}

const src = readFileSync(file, 'utf8')
const vm = new Vulpin()
const res = vm.run(src, 5_000_000)

if (!res.ok && res.error !== 'QUIT::') {
  console.error(`run aborted: ${res.error}`)
  process.exit(1)
}

process.stdout.write(vm.output.join('\n') + '\n')
console.error(`\n${res.ms} ms`)