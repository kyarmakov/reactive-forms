import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-selector',
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.scss']
})
export class StockSelectorComponent {
  @Input() parent: FormGroup;


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
}
