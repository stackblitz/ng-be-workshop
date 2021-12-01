/// <reference lib="webworker" />
import { fibonacci } from './fibonacci';

self.onmessage = ({ data }: { data: number }) => {
  self.postMessage(fibonacci(data));
};
