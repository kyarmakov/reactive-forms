import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StockInventoryComponent } from './containers/stock-inventory/stock-inventory.component';
import { StockItemComponent } from './components/stock-item/stock-item.component';


@NgModule({
  declarations: [
    StockInventoryComponent,
    StockItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    StockInventoryComponent
  ]
})
export class StockInventoryModule { }
