import { spawnWorkers } from './worker-pool.mjs';
import { colors } from './utils.mjs';

console.clear();

const $executionTime = document.querySelector('#executionTime');
const $threadSlider = document.querySelector('#threads');
const $threadCount = document.querySelector('#thread-count');
const $runButton = document.querySelector('#run');

let threadCount = $threadSlider.valueAsNumber;

$threadSlider.oninput = (event) => {
  threadCount = event.target.valueAsNumber;
  $threadCount.innerHTML = threadCount;
};

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
  const rowsPerWorker = Math.ceil(HEIGHT / threadCount);

  const workers = spawnWorkers(threadCount);

  const start = performance.now();

  const promises = [];

  for (let i = 0; i < threadCount; i++) {
    const worker = workers[i];
    const startRow = i * rowsPerWorker;
    const endRow = Math.min((i + 1) * rowsPerWorker, HEIGHT);

    promises.push(worker(startRow, endRow, WIDTH, HEIGHT, colors));
  }

  const blocks = await Promise.all(promises);

  const pixels = new Uint8Array(WIDTH * HEIGHT * 4);

  let length = 0;

  for (let block of blocks) {
    pixels.set(block, length);
    length += block.length;
  }

  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  imageData.data.set(pixels);

  ctx.putImageData(imageData, 0, 0);

  const elapsed = performance.now() - start;

  $executionTime.innerHTML = `${elapsed.toFixed(2)}ms`;
}
