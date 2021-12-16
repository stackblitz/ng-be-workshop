const $rhs = document.querySelector('#rhs');
const $lhs = document.querySelector('#lhs');
const $outcome = document.querySelector('#outcome');
const $calculateButton = document.querySelector('#calculate');

$calculateButton.addEventListener('click', () => {
  const rhs = $rhs.valueAsNumber;
  const lhs = $lhs.valueAsNumber;

  $outcome.innerHTML = rhs + lhs;
});
