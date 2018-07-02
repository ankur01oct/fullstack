import { AddStockComponent } from './pharmacy/add-stock.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { DisplayTableComponent } from './pharmacy/display-table.component';
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { AppRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import {enableProdMode} from '@angular/core';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    DisplayTableComponent,
    AddStockComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    RouterModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
