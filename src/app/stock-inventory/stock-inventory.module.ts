import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StockInventoryComponent } from './containers/stock-inventory/stock-inventory.component';
import { StockItemComponent } from './components/stock-item/stock-item.component';
import { StockSelectorComponent } from './components/stock-selector/stock-selector.component';


@NgModule({
  declarations: [
    StockInventoryComponent,
    StockItemComponent,
    StockSelectorComponent
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
