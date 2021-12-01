import { Component } from '@angular/core';
import { fibonacci } from './fibonacci';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss'],
})
export class FibonacciComponent {
  result: number | undefined;

  calculate(position: number) {
    this.result = fibonacci(position);
  }
}
