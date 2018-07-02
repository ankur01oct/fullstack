"use strict";

var pharmacydata = require('./pharmacyData').pharmacydata;
var _ = require('lodash');

var currentID = 4;
var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var PharmacyApi = {
	getAllPharmacy: function(callback) {
		callback(null, _clone(pharmacydata));
	},
    getPharmacyById: function(id, callback) {
            var data = _.find(pharmacydata,{id:parseInt(id)})
            callback (null, _clone(data));
    },
    updatePharmacyById: function(id, pharmacy, callback){
        var existingPharmacyIndex = _.indexOf(pharmacydata, _.find(pharmacydata, {id: parseInt(id)})); 
        pharmacydata.splice(existingPharmacyIndex,1,pharmacy)
        callback(null);
       // callback(null, _clone(pharmacydata[existingPharmacyIndex]));
    },
    deletePharmacyById: function(id, callback) {
		_.remove(pharmacydata, { id: parseInt(id)});
         callback(null);
        //callback(null, _clone(pharmacydata));
    },
    savePharmacy: function(data,callback){
        currentID = currentID + 1;
        data.id = currentID;
        pharmacydata.push(data);
        callback(null,_clone(pharmacydata));
    }
};

module.exports = PharmacyApi;
//++++++++++++++checking API is working or not ++++++++++++++++++++++++++++++++++++++
// pharmacyApi.getAllPharmacy(function callback(err,res){
//     console.log(res.length);
// });
// pharmacyApi.getPharmacyById(1,function callback(err,data){
//     console.log(data);
// })
//checking update by id
// var data = {
//     "id" : 3 ,
//     'Name': "CoughCapsule" ,
//     'Manufacturer': "My Labs",
//     "Batch No.": 3333 ,
//     "Expiration Date": "12-Nov-2021",
//     "Price": "70" ,
//     "Type": "Capsule"
// }
// pharmacyApi.updatePharmacyById(3,data,function(err,res){
//     console.log(res);
// })

// pharmacyApi.deletePharmacyById(3,function callback(err,res){
//         console.log(res);
//     })
// pharmacyApi.savePharmacy(data,function(err,res){
//     console.log(res);
// })