import { DisplayTableComponent } from './pharmacy/display-table.component';
import { AddStockComponent } from "./pharmacy/add-stock.component";
import { Routes } from '@angular/router';

export const AppRoutes:Routes = [
    {path:'', redirectTo: '/pharmacystock', pathMatch: 'full'},
    {path:'pharmacystock',component:DisplayTableComponent},
    {path:'pharmacystock/:id',component:AddStockComponent},    
    {path:'pharmacystock/add',component:AddStockComponent},   
    
];