import * as Comlink from 'https://unpkg.com/comlink/dist/esm/comlink.mjs';
import { colors } from './utils.mjs';

console.clear();

const $executionTime = document.querySelector('#executionTime');
const $runButton = document.querySelector('#run');

const WIDTH = 1200;
const HEIGHT = 800;

const canvas = document.createElement('canvas');

canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext('2d');

document.body.appendChild(canvas);

let running = false;

$runButton.addEventListener('click', () => {
  if (running) {
    return;
  }

  running = true;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  run().then(() => {
    running = false;
  });
});

async function run() {
  const worker = Comlink.wrap(new Worker('./worker.mjs', { name: 'Mandelbrot Worker', type: 'module' }));

  const start = performance.now();

  const pixels = await worker(WIDTH, HEIGHT, colors);

  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  imageData.data.set(pixels);

  ctx.putImageData(imageData, 0, 0);

  const elapsed = performance.now() - start;

  $executionTime.innerHTML = `${elapsed.toFixed(2)}ms`;
}
