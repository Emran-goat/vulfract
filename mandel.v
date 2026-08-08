# mandel.v - the mandelbrot set, drawn as a burning ascii laziway.
# for each cell mix a spoonful of c into the scheme and watch it fly.

E cols = 54
E rows = 43
E stepx = 0.056
E stepy = 0.06

O row 0 rows
  E lin = ""
  O col 0 cols
    E cr = col * stepx - 2.0
    E ci = row * stepy - 1.2
    E zr = 0
    E zi = 0
    E it = 0
    E bad = 0
    @ bad == 0
      E b2 = zr * zr
      E zi2 = zi * zi
      E nzr = b2 - zi2 + cr
      E nzi = zr * zi * 2 + ci
      E zr = nzr
      E zi = nzi
      E it = it + 1
      ? zr * zr + zi * zi > 4
        E bad = 1
      ;
      ? it > 64
        E bad = 1
      ;
    &
    E cc = " "
    ? it <= 64
      E code = 33 + it
      E cc = char(code)
    ;
    E lin = lin + cc
  N
  G lin
N