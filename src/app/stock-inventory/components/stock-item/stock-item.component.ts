import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent {
  @Input() parent: FormGroup;



  /// GETTERS ///
  get item() {
    return this.parent.get('item');
  }
  get name() {
    return this.item.get('name');
  }
  get price() {
    return this.item.get('price');
  }

  /// VALIDATORS ///
  required(control: string): boolean {
    return (
      this.item.get(`${control}`).hasError('required') &&
      this.item.get(`${control}`).touched
    ); 
  }

  get invalidPrice(): boolean {
    return (
      this.price.hasError('invalidPrice') &&
      this.price.dirty &&
      !this.required('price')
    );
  }

  ////////////////////
  onAddProduct(): void {
    if (this.item.valid)
      console.log(this.item.value);
  }
}
