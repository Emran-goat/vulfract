// test.mjs - the two fractals must match the math.

import { Vulpin } from "./vulpin.js";
import { readFileSync } from "node:fs";

const vm = (file) => {
  const v = new Vulpin();
  const res = v.run(readFileSync(new URL(file, import.meta.url), "utf8"), 5000000);
  if (res.error && !res.error.startsWith("QUIT")) throw new Error(res.error);
  return v.output.join("\n");
};

const isPrime = (n) => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let d = 3; d * d <= n; d += 2) if (n % d === 0) return false;
  return true;
};

// ground truth: walk the spiral, steps 1,1,2,2,3,3, right,up,left,down.
const walkSpiral = (limit) => {
  const pos = new Map();
  let x = 0, y = 0, n = 1, len = 1, dir = 0;
  const dx = [1, 0, -1, 0], dy = [0, -1, 0, 1];
  pos.set(x + "," + y, n);
  outer: while (n < limit) {
    for (let half = 0; half < 2; half++) {
      for (let s = 0; s < len; s++) {
        x += dx[dir]; y += dy[dir];
        if (++n > limit) break outer;
        pos.set(x + "," + y, n);
      }
      dir = (dir + 1) % 4;
    }
    len++;
  }
  return pos;
};

let bad = 0;

// 1. ulam.v must paint exactly the primes of the walked spiral.
const H = 24; // half-grid, matches h in ulam.v
const ulamLines = vm("ulam.v").split("\n");
const vals = walkSpiral(2600);
for (let iy = 0; iy < ulamLines.length; iy++) {
  const row = ulamLines[iy];
  for (let ix = 0; ix < row.length; ix++) {
    const x = ix - H, y = H - iy;
    const n = vals.get(x + "," + y);
    if (n === undefined) { bad++; if (bad <= 8) console.log("ulam cell outside spiral", x, y); continue; }
    const prime = isPrime(n);
    const painted = row[ix] === "#";
    if (prime !== painted) { bad++; if (bad <= 8) console.log("ulam mismatch", x, y, "n", n); }
  }
}

// 2. mandel.v: origin is inside the set, so its cell is blank; far cells escape.
const mand = vm("mandel.v").split("\n");
const ci0 = Math.round(1.2 / 0.06);
const cr0 = Math.round(2.0 / 0.056);
if (mand[ci0] && mand[ci0][cr0] !== " ") { bad++; console.log("origin not interior"); }
if (!mand[0] || mand[0].length < 20) { bad++; console.log("mandel too small"); }

console.log(bad ? "FAIL " + bad : "PASS");
process.exit(bad ? 1 : 0);