import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent {
  @Input() parent: FormGroup;
  @Output() created = new EventEmitter<Product>();


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

  get productNameTaken(): boolean {
    return (
      this.name.hasError('productNameTaken') &&
      this.name.touched
    );
  }

  get invalidProductName(): boolean {
    return (
      this.name.hasError('invalidProductName') &&
      this.name.touched &&
      !this.required('name')
    );
  }

  ////////////////////
  handleCreateProduct(): void {
    if (this.item.valid) {
      this.created.emit(this.item.value);
      this.item.reset();
    }
    else {
      this.item.markAllAsTouched();
    }
  }
}
