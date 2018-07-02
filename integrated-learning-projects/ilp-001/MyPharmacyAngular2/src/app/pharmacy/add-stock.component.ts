import { PharmacyModel } from './pharmacy-model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PharmacyService } from './pharmacy.service';
@Component({
    selector:'app-addstock',
    templateUrl:'add-stock.component.html'
})
export class AddStockComponent implements OnInit{
   // myForm: FormGroup;
   pharmacyStock:PharmacyModel;//=new PharmacyModel(1,'Ankur','AnkurLabs','9','01-10-1990','009','Syrup');

   constructor(private pharmacyService:PharmacyService){}
    id:number =0;
    onSubmit(form: NgForm){
        if(this.pharmacyStock){
            //Editing
            let i:string;
            for (i in this.pharmacyService.getAllStock()){
                if(this.pharmacyService.getAllStock()[i].id == this.pharmacyStock.id){
                    this.pharmacyService.getAllStock()[i].name = form.value.name, 
                    this.pharmacyService.getAllStock()[i].manufacturer = form.value.manufacturer, 
                    this.pharmacyService.getAllStock()[i].batchNo = form.value.batchNo, 
                    this.pharmacyService.getAllStock()[i].expirationDate = form.value.expirationDate, 
                    this.pharmacyService.getAllStock()[i].price = form.value.price,
                    this.pharmacyService.getAllStock()[i].type = form.value.type
                    this.pharmacyStock=null;
                    form.resetForm();
                    return;
                }
                
            }
        }
        else{     
            //Creating       
            console.log(form.value);
            if(this.pharmacyService.getAllStock().length==0){
                this.id=1;
            }
            else{
                this.id=(this.pharmacyService.getAllStock()[this.pharmacyService.getAllStock().length-1].id)+1
            }
            const pharmacystocks= new PharmacyModel(
                                        this.id, 
                                        form.value.name, 
                                        form.value.manufacturer, 
                                        form.value.batchNo, 
                                        form.value.expirationDate, 
                                        form.value.price,
                                        form.value.type)
            this.pharmacyService.addStock(pharmacystocks)
        form.resetForm();            
        }
    }
    ngOnInit(){
        this.pharmacyService.stockIsEdit.subscribe(
            (pharmacyStock: PharmacyModel) => (this.pharmacyStock= pharmacyStock)
        );
    }
}
