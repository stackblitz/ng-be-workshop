import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  counter = 1;

  ngOnInit() {
    setInterval(() => {
      this.counter++;
    }, 1000);
  }
}
