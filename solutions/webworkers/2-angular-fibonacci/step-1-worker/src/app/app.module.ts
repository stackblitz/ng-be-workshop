import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { FibonacciComponent } from './fibonacci/fibonacci.component';

@NgModule({
  declarations: [AppComponent, CounterComponent, FibonacciComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
