import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true
};

@Component({
  selector: 'app-stock-counter',
  templateUrl: './stock-counter.component.html',
  styleUrls: ['./stock-counter.component.scss'],
  providers: [COUNTER_CONTROL_ACCESSOR]
})
export class StockCounterComponent implements ControlValueAccessor {
  value: number;
  onValueChange: Function;
  onTouched: Function;

  @Input() max: number;
  @Input() min: number;
  @Input() step: number;


  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }


  increment() {
    if (this.value < this.max) {
      this.value += this.step;
      this.onValueChange(this.value);
    }
    this.onTouched();
  }

  decrement() {
    if (this.value > this.min) {
      this.value -= this.step;
      this.onValueChange(this.value);
    }
    this.onTouched();
  }
}
