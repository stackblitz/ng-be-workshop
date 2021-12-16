let wasmModule;

const $rhs = document.querySelector('#rhs');
const $lhs = document.querySelector('#lhs');
const $outcome = document.querySelector('#outcome');
const $calculateButton = document.querySelector('#calculate');

$calculateButton.addEventListener('click', async () => {
  await loadModule();

  const rhs = $rhs.valueAsNumber;
  const lhs = $lhs.valueAsNumber;

  $outcome.innerHTML = wasmModule.add(rhs, lhs);
});

async function loadModule() {
  if (wasmModule) {
    return;
  }

  const wasmResponse = await fetch('./add.wasm');

  const bytes = await wasmResponse.arrayBuffer();

  const wasm = await WebAssembly.instantiate(bytes);

  wasmModule = wasm.instance.exports;
}
