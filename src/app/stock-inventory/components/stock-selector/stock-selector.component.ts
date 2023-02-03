import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
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


  required(control: string): boolean {
    return (
      this.selector.get(`${control}`).hasError('required') &&
      this.selector.get(`${control}`).touched
    ); 
  }
}
