import { Component } from '@angular/core';
import { fibonacci } from './fibonacci';

let worker: Worker | undefined;

if (typeof Worker !== 'undefined') {
  worker = new Worker(new URL('./fibonacci.worker', import.meta.url));
}

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss'],
})
export class FibonacciComponent {
  result: number | undefined;

  calculate(position: number) {
    if (worker) {
      worker.onmessage = ({ data }) => {
        this.result = data;
      };

      worker.postMessage(position);
    } else {
      // use the synchronous blocking implementation if no worker could be found
      this.result = fibonacci(position);
    }
  }
}
