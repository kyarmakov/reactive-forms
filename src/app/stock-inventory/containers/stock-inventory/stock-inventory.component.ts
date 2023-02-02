import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.scss']
})
export class StockInventoryComponent {
  form: FormGroup = this.fb.group({
    item: this.fb.group({
      name: [''],
      price: ['']
    }),
    
  });


  constructor(private fb: FormBuilder) {}
}
