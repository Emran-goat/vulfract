<p align="center">
  <img src="assets/vulfract-banner.png" alt="vulfract banner">
</p>

# vulfract

Two fractals rendered as terminal art, written in Vulpin — a one-letter
programming language where `G` prints, `E` assigns, and `?`..`;` branches.

```
node vpin.mjs ulam.v
node vpin.mjs mandel.v
```

## what you're seeing

**ulam.v** — the Ulam spiral. A number spiral is laid out (1,1,2,2,3,3…
right, up, left, down), every cell is assigned its spiral index, and labels
are dropped. Only primes keep their pixel: `#`. The diagonal streaks of `#`
are the famous prime lattice.

**mandel.v** — the Mandelbrot set. `c` is sampled per cell, `z = z² + c` is
iterated up to 64 times, and the escape time picks the glyph. Blank cells are
points that never escape — the inside of the set.

## why it looks the way it looks

Vulpin has no loops-with-break and no boolean `and`, so the Mandelbrot
iteration runs as one `@` loop that exits through a `bad` flag instead. The
spiral has no string indexing and no special number powers, so each cell's
index is derived in closed form from its coordinates: ring `k`, base
`(2k-1)²`, then one of four edge formulas picked by branch.

Integer division truncates toward zero, which is exactly what a Ulam spiral
paints needs and nothing more.

## check

    node test.mjs

walks the spiral in plain JS and asserts that every `#` in `ulam.v`
is a prime, and that `mandel.v` leaves the origin (inside the set) blank.