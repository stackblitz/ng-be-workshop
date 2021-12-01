import { Component } from '@angular/core';
import * as Comlink from 'comlink';
import { fibonacci } from './fibonacci';

let fibonacciWorker: Comlink.Remote<typeof fibonacci> | undefined;

if (typeof Worker !== 'undefined') {
  fibonacciWorker = Comlink.wrap<typeof fibonacci>(
    new Worker(new URL('./fibonacci.worker', import.meta.url))
  );
}

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss'],
})
export class FibonacciComponent {
  result: number | undefined;

  async calculate(position: number) {
    if (fibonacciWorker) {
      this.result = await fibonacciWorker(position);
    } else {
      // use the synchronous blocking implementation if no worker could be found
      this.result = fibonacci(position);
    }
  }
}
