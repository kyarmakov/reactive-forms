import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-cart',
  templateUrl: './stock-cart.component.html',
  styleUrls: ['./stock-cart.component.scss']
})
export class StockCartComponent {
  @Input() parent: FormGroup;

  get cart() {
    return (this.parent.get('cart') as FormArray).controls;
  }
}
