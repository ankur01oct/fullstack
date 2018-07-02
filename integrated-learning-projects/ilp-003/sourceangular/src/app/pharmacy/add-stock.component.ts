import { PharmacyModel } from './pharmacy-model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PharmacyService } from './pharmacy.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector:'app-addstock',
    templateUrl:'add-stock.component.html'
})
export class AddStockComponent implements OnInit{
   // myForm: FormGroup;
   pharmacyStock:PharmacyModel;//=

   constructor(private pharmacyService:PharmacyService, private router: Router, private route:ActivatedRoute){};
    id:number =0;
    action:string;
    onSubmit(form: NgForm){
        if(this.pharmacyStock){
            //Editing
                this.pharmacyStock.name = form.value.name, 
                this.pharmacyStock.manufacturer = form.value.manufacturer, 
                this.pharmacyStock.batchNo = form.value.batchNo, 
                this.pharmacyStock.expirationDate = form.value.expirationDate, 
                this.pharmacyStock.price = form.value.price,
                this.pharmacyStock.type = form.value.type
                this.action='Edit'
            this.pharmacyService.editMessageSubmit(this.pharmacyStock).subscribe(
                (res:Response)=>{
                    console.log(res);
                    this.pharmacyStock=null;
                    form.resetForm();
                    this.action=null;
                    this.router.navigate(["pharmacystock"]);
                    return;
                },
                (error) => console.log("Error in updating edites message: ", error)

            )
        
        }
        else{ 
              //Creating       
                //id is taken care at backend
                this.pharmacyStock={
                id:3343,//dummy is provided here but will change in backend.              
                name:form.value.name, 
                manufacturer:form.value.manufacturer, 
                batchNo:form.value.batchNo, 
                expirationDate:form.value.expirationDate, 
                price:form.value.price,
                type:form.value.type
                }    
                this.action='Add'
                this.pharmacyService.createMessage(this.pharmacyStock).subscribe(
                    (res:Response) => {
                        console.log(res);
                        this.pharmacyStock=null;
                        form.resetForm();
                        this.action=null;
                        this.router.navigate(["pharmacystock"]);
                        return;
                    },
                    (error) => console.log("Error in updating edites message: ", error)
                )
        } 
    }

    ngOnInit(){
        console.log(`this.route.params ${(this.route.params['_value'].id)}`);
        let id:number = this.route.params['_value'].id
        //console.log("id: ", id);
        if(String(id) !='add'){
        this.pharmacyService.editMessageGet(id).subscribe(
            (res)=>{
                this.pharmacyStock=res;
                console.log("this.pharmacyStock ",this.pharmacyStock)
            },
            (error)=>console.log("Error in fetching stock to edit: ",error)
        )
        id=null;
      }
    }
    
}
