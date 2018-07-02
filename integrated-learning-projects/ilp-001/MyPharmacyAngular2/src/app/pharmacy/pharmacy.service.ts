import { PharmacyModel } from "./pharmacy-model";
import { EventEmitter } from "@angular/core";

export class PharmacyService {
   private pharmacystocks: PharmacyModel[]=[];
   stockIsEdit = new EventEmitter<PharmacyModel>();

    addStock(pharmacystock:PharmacyModel){
        this.pharmacystocks.push(pharmacystock);
        console.log(this.pharmacystocks);
    }

    getAllStock(){
        return this.pharmacystocks;
    }

    editMessage(pharmacyStock:PharmacyModel){
        this.stockIsEdit.emit(pharmacyStock);
    }

    deleteMessage(stock:PharmacyModel){
        let i:string;
            for (i in this.pharmacystocks){
                if(this.pharmacystocks[i].id == stock.id){
                   this.pharmacystocks.splice(parseInt(i),1);
                }
            }
            return this.pharmacystocks;
    }
    searchMessage(name:string){
        let i:string;
        for (i in this.pharmacystocks){
               if(this.pharmacystocks[i].name == name){
                  return this.pharmacystocks[i] ;
            }
            
        }
    }
}