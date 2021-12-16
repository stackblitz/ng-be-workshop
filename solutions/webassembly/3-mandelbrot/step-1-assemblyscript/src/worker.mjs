import { instantiate } from 'https://cdn.jsdelivr.net/npm/@assemblyscript/loader/index.js';
import * as Comlink from 'https://unpkg.com/comlink/dist/esm/comlink.mjs';

Comlink.expose(async (width, height, colors) => {
  const {
    exports: { mandelbrot },
  } = await instantiate(fetch('mandelbrot.wasm'), {
    mandelbrot: {
      WIDTH: width,
      HEIGHT: height,
      MAX_ITERATIONS: 85,
      MAX_COLORS: colors.length,
      REAL_START: -2,
      REAL_END: 1,
      IMAGINARY_START: -1,
      IMAGINARY_END: 1,
    },
  });

  const result = new Uint8Array(width * height * 4);

  let i = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const colorIndex = mandelbrot(x, y);
      const [r, g, b] = colors[colorIndex];

      result[i] = r;
      result[i + 1] = g;
      result[i + 2] = b;
      result[i + 3] = 255;

      i += 4;
    }
  }

  return Comlink.transfer(result, [result.buffer]);
});
