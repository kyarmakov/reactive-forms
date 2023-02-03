import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidationService } from '../../services/custom-validation.service';
import { HttpService } from '../../services/http.service';

import { Product } from '../../models/product.model';



@Component({
  selector: 'app-stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.scss']
})
export class StockInventoryComponent implements OnInit {
  form: FormGroup = this.fb.group({
    item: this.fb.group({
      name: [
        '', 
        [Validators.required], 
        [this.customValidator.validateProductNameNotTaken.bind(this.customValidator)]
      ],
      price: [null, [Validators.required, this.customValidator.validatePrice]]
    }),

  });


  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private http: HttpService
  ) {}


  ngOnInit(): void {
  }

  onAddProduct(product: Product): void {
    this.http.addProduct(product)
      .subscribe((product: Product) => console.log(product))
  }
}
