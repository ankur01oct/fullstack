export class PharmacyModel{
    constructor(
        public id:number,
        public name:string,
        public manufacturer:string,
        public batchNo:string,
        public expirationDate:string,
        public price:string,
        public type:string,
    ){};
}