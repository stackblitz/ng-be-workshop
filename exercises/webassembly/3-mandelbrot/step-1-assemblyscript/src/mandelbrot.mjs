export function mandelbrot(x, y, options) {
  const { MAX_ITERATIONS, WIDTH, HEIGHT, MAX_COLORS, REAL_START, REAL_END, IMAGINARY_START, IMAGINARY_END } = options;

  x = REAL_START + (x / WIDTH) * (REAL_END - REAL_START);
  y = IMAGINARY_START + (y / HEIGHT) * (IMAGINARY_END - IMAGINARY_START);

  let a = 0;
  let b = 0;
  let i = 0;
  let rx;
  let ry;
  let d;

  do {
    rx = Math.pow(a, 2) - Math.pow(b, 2);
    ry = 2 * a * b;

    a = rx + x;
    b = ry + y;

    d = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    i += 1;
  } while (d <= 2 && i < MAX_ITERATIONS);

  return getColorIndex(i, d <= 2, MAX_COLORS);
}

function getColorIndex(i, isMandelbrotSet, maxColors) {
  return isMandelbrotSet ? 0 : i % maxColors;
}
