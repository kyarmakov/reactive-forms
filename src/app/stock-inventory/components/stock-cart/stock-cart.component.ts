import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-stock-cart',
  templateUrl: './stock-cart.component.html',
  styleUrls: ['./stock-cart.component.scss']
})
export class StockCartComponent {
  @Input() parent: FormGroup;

  @Output() removed = new EventEmitter<{ cartItem: Cart, i: number }>();
  @Output() changed = new EventEmitter<Cart>();

  get cart() {
    return (this.parent.get('cart') as FormArray).controls;
  }


  handleRemove(control: AbstractControl, i: number): void {
    const cartItem = control.value;
    this.removed.emit({ cartItem, i });
  }

  handleChange(control: AbstractControl) {
    this.changed.emit(control.value);
  }
}
