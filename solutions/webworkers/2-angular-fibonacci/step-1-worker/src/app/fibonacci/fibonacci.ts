export function fibonacci(position: number): number {
  if (position < 2) {
    return position;
  }

  return fibonacci(position - 1) + fibonacci(position - 2);
}
