declare const MAX_ITERATIONS: u32;
declare const WIDTH: u32;
declare const HEIGHT: u32;
declare const MAX_COLORS: u32;
declare const REAL_START: i32;
declare const REAL_END: i32;
declare const IMAGINARY_START: i32;
declare const IMAGINARY_END: i32;

export function mandelbrot(x: f64, y: f64): u32 {
  x = REAL_START + (x / WIDTH) * (REAL_END - REAL_START);
  y = IMAGINARY_START + (y / HEIGHT) * (IMAGINARY_END - IMAGINARY_START);

  let a: f64 = 0.0;
  let b: f64 = 0.0;

  let i: u32 = 0;

  let rx: f64;
  let ry: f64;

  let d: f64;

  do {
    rx = Math.pow(a, 2) - Math.pow(b, 2);
    ry = 2 * a * b;

    a = rx + x;
    b = ry + y;

    d = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    i += 1;
  } while (d <= 2 && i < MAX_ITERATIONS);

  return getColorIndex(i, d <= 2);
}

function getColorIndex(i: u32, isMandelbrotSet: bool): u32 {
  return isMandelbrotSet ? 0 : i % MAX_COLORS;
}
