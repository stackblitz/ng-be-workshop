import * as Comlink from 'https://unpkg.com/comlink/dist/esm/comlink.mjs';

const workers = [];

export function spawnWorkers(count) {
  if (count <= workers.length) {
    return workers.slice(0, count);
  }

  const diff = count - workers.length;

  for (let i = 0; i < diff; i++) {
    const worker = new Worker('./worker.mjs', { name: 'Mandelbrot Worker', type: 'module' });
    workers.push(Comlink.wrap(worker));
  }

  return workers;
}
