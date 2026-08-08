# ulam.v - draw the number spiral, then keep only the primes.
# prime cells come out as #, everything else stays blank.
# the diagonal clumps are the famous ulam lattice, no trap needed.

E h = 24
E s = h * 2

O yy 0 s
  E row = ""
  O xx 0 s
    E cx = xx - h
    E cy = h - yy
    E k = abs(cx)
    E ky = abs(cy)
    ? ky > k
      E k = ky
    ;
    E goon64 = k * 2 - 1
    E base = goon64 * goon64
    E v = 0
    ? cy == (0 - k)
      E v = base + k * 3 - cx
    ;
    ? cy > (0 - k)
      ? cx == k
        E v = base + k - cy
      ;
      ? cx == (0 - k)
        E v = base + k * 5 + cy
      ;
      ? cy == k
        E v = base + k * 7 + cx
      ;
    ;
    E pr = 1
    ? v < 2
      E pr = 0
    ;
    ? pr == 1
      E dv = 2
      E mx = floor(sqrt(v)) + 1
      @ dv < mx
        E rs = v % dv
        ? rs == 0
           E pr = 0
           E dv = mx
        :
           E dv = dv + 1
        ;
      &
    ;
    E cc = " "
    ? pr == 1
       E cc = "#"
    ;
    E row = row + cc
  N
  G row
N