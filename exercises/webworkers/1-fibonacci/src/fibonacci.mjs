export function fibonacci(position) {
  if (position < 2) {
    return position;
  }

  return fibonacci(position - 1) + fibonacci(position - 2);
}
