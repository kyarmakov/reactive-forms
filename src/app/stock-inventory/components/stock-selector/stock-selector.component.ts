import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cart } from '../../models/cart.model';
import { Product } from '../../models/product.model';
import { CustomValidationService } from '../../services/custom-validation.service';

@Component({
  selector: 'app-stock-selector',
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.scss']
})
export class StockSelectorComponent {
  @Input() parent: FormGroup;
  @Input() products: Product[];

  @Output() added = new EventEmitter<Cart>();

  constructor(private customValidator: CustomValidationService) {}

  /// GETTERS ///
  get selector() {
    return this.parent.get('selector');
  }

  get product_id() {
    return this.selector.get('product_id');
  }

  get quantity() {
    return this.selector.get('quantity');
  }
  ////////////////////

  /// VALIDATORS ///
  required(control: string): boolean {
    return (
      this.selector.get(`${control}`).hasError('required') &&
      this.selector.get(`${control}`).touched
    ); 
  }
  ///////////////////

  handleAddToCart(): void {
    if (this.selector.valid) {
      this.added.emit(this.selector.value);
      this.selector.reset();
      this.selector.patchValue({
        product_id: '',
        quantity: 10
      })
    }
    else {
      this.selector.markAllAsTouched();
    }
  }

}
