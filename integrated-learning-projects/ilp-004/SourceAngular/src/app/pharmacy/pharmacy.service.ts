import { PharmacyModel } from "./pharmacy-model";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {BehaviorSubject} from 'rxjs';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class PharmacyService {
   private pharmacystocks: PharmacyModel[]=[];
   constructor( private router: Router, private http: Http){};

    addStock(pharmacystock:PharmacyModel){
        this.pharmacystocks.push(pharmacystock);
        console.log(this.pharmacystocks);
    }

    getAllStock(){
        //return this.pharmacystocks;

        return this.http.get('http://localhost:3000/pharmacystock')
        .map((response: Response)=>{
            console.log(response.json());
            this.pharmacystocks=[];
              for (let i in response.json() ){
                let stocks:any={};
                stocks.id=response.json()[i]._id,
                stocks.name=response.json()[i].name,
                stocks.manufacturer=response.json()[i].manufacturer,
                stocks.batchNo=response.json()[i].batchNo,
                stocks.expirationDate=response.json()[i].expirationDate.split('T')[0].trim(),
                stocks.price=response.json()[i].price,
                stocks.type=response.json()[i].type
                this.pharmacystocks.push(stocks)}
            
                console.log(this.pharmacystocks)
            return this.pharmacystocks;
        }
    )
        
        .catch((error:any) => Observable.throw(error || 'Server error'));
        
    }

    editMessageRouting(stockid:number){
        this.router.navigate([`pharmacystock/${stockid}`]);
    }
    editMessageGet(stockid:number){
        return this.http.get(`http://localhost:3000/pharmacystock/${stockid}`)
        .map((response:Response) => {
            //console.log("edit_res ",res.json());
            let stocks:any={};
            stocks.id=response.json()._id,
            stocks.name=response.json().name,
            stocks.manufacturer=response.json().manufacturer,
            stocks.batchNo=response.json().batchNo,
            stocks.expirationDate=response.json().expirationDate.split('T')[0].trim(),
            stocks.price=response.json().price,
            stocks.type=response.json().type
            return {stocks};
        })
        .catch((error:any) => Observable.throw(error || 'Server error'));
    }
    editMessageSubmit(body:PharmacyModel){
        return this.http.put(`http://localhost:3000/pharmacystock/${body.id}`,body)
        .map(
            (res:Response)=> {
                console.log(res.json());
            }
        )
        .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    createMessage(body:PharmacyModel){
        return this.http.post(`http://localhost:3000/pharmacystock/add`,body)
        .map(
            (res:Response)=> {
                console.log(res.json());
            }
        )
        .catch((error:any) => Observable.throw(error || 'Server error'));
    }
    deleteMessage(stockid:number){
        let id:string = String(stockid);

        console.log("url : " + `http://localhost:3000/delete/${stockid}` );
        return this.http.delete(`http://localhost:3000/delete/${stockid}`)
               .map( (res:Response)=>{
                  return res.json()
                })
               .catch((error:any) => {
                   return Observable.throw(error || 'Server error')
                });
    }
    searchMessage(name:string){
        let i:string;
        if(this.pharmacystocks){
        for (i in this.pharmacystocks){
               if(this.pharmacystocks[i].name == name){
                  return this.pharmacystocks[i] ;
            }
          }
        }
    }
}