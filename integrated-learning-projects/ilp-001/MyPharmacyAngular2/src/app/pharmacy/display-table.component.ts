import { Component, OnInit } from '@angular/core';
import { PharmacyModel } from './pharmacy-model';
import { PharmacyService } from './pharmacy.service';
import { NgForm } from '@angular/forms';

@Component({
selector: 'app-display-table',
templateUrl: 'display-table.component.html'
})

export class DisplayTableComponent implements OnInit{
    pharmacystocks: PharmacyModel[]
    hideElement:boolean = true;
    filterColumn:string= "Show Less Columns";
    constructor(private pharmacyService:PharmacyService){}
    // pharmacystock1 = new PharmacyModel(1,'Ankur','AnkurLabs','9','01-10-1990','89','Syrup');
    // pharmacystock2 = new PharmacyModel(1,'Ankur','AnkurLabs','9','01-10-1990','89','Syrup');
    
    onEdit(pharmacystock:PharmacyModel){
        this.pharmacyService.editMessage(pharmacystock);
    }

    onDelete(pharmacystock:PharmacyModel){
        this.pharmacystocks=this.pharmacyService.deleteMessage(pharmacystock);
    }
    
    ngOnInit(){
        this.pharmacystocks=this.pharmacyService.getAllStock();
    }
    
    isHideElement(hideElement:boolean){
        this.hideElement = hideElement?false:true;
        this.filterColumn = this.hideElement?"Show Less Columns":"Show All Columns";
        //console.log(hideElement);
    }

    onSubmit(form:NgForm){
        this.pharmacystocks=[];
        this.pharmacystocks.push(this.pharmacyService.searchMessage(form.value.namesearch));
        console.log(this.pharmacyService.searchMessage(form.value.namesearch));
        form.resetForm();
    }
    onClear(){
        this.pharmacystocks=[];
        this.pharmacystocks=this.pharmacyService.getAllStock();
    }
}
