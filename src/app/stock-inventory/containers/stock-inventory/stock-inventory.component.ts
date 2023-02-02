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

 
}
