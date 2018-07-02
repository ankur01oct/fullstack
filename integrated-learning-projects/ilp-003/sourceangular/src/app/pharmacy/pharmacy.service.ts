import { PharmacyModel } from "./pharmacy-model";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {BehaviorSubject} from 'rxjs';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class PharmacyService {
   private pharmacystocks: PharmacyModel[]=[
       {id:1,
        name:'Ankur',
        manufacturer:'AnkurLabs',
        batchNo:'9',
        expirationDate:'01-10-1990',
        price:'009',
        type:'Syrup'}
   ];
   constructor( private router: Router, private http: Http){};
//    private messageSource = new BehaviorSubject<PharmacyModel>( {id:1,
//     name:'dummy',
//     manufacturer:'dummy',
//     batchNo:'9',
//     expirationDate:'2018-06-13',
//     price:'009',
//     type:'Syrup'});
//    currentMessage = this.messageSource.asObservable();

    addStock(pharmacystock:PharmacyModel){
        this.pharmacystocks.push(pharmacystock);
        console.log(this.pharmacystocks);
    }

    getAllStock(){
        //return this.pharmacystocks;
        return this.http.get('http://localhost:3000/pharmacystock')
        .map((response: Response)=>{
            this.pharmacystocks= response.json().phamacydatas;
            return this.pharmacystocks;
        })
        .catch((error:any) => Observable.throw(error || 'Server error'));
        
    }

    editMessageRouting(stockid:number){
        this.router.navigate([`pharmacystock/${stockid}`]);
    }
    editMessageGet(stockid:number){
        return this.http.get(`http://localhost:3000/pharmacystock/${stockid}`)
        .map((res:Response) => {
            //console.log("edit_res ",res.json());
            return res.json().phamacydata;
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