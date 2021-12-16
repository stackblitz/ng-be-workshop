export const colors = new Array(16).fill(0).map((_, i) => {
  if (i === 0) {
    return [0, 0, 0];
  }

  return randomRGB();
});

function randomRGB() {
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);

  return [r, g, b];
}

function randomBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
