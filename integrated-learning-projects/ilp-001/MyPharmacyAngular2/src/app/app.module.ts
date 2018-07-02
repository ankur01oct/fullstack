import { AddStockComponent } from './pharmacy/add-stock.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { DisplayTableComponent } from './pharmacy/display-table.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    DisplayTableComponent,
    AddStockComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
