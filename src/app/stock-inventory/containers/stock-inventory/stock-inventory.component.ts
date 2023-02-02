import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from '../../services/custom-validation.service';

@Component({
  selector: 'app-stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.scss']
})
export class StockInventoryComponent implements OnInit {
  form: FormGroup = this.fb.group({
    item: this.fb.group({
      name: ['', [Validators.required]],
      price: [null, [Validators.required, this.customValidator.validatePrice]]
    }),

  });


  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService
  ) {}


  ngOnInit(): void {
  }

  /// GETTERS ///
  get item() {
    return this.form.get('item');
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
