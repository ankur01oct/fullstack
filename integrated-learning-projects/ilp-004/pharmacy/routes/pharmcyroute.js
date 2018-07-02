var express = require('express');
var router = express.Router();
//var pharmacyApi=require('../data/pharmacyApi');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pharmacydb');

var pharmacySchema = new mongoose.Schema({
    _id:{type:String},
    name:{type:String,required:true},
    manufacturer :{type:String,required:true},
    batchNo:{type:String,required:true, unique:true},
    expirationDate:{type:Date,required:true},
    price : {type:String,required:true},
    type: {type:String,required:true}
});

var Stocks = mongoose.model('pharmacyModel', pharmacySchema);







//console.log("db.collection.find().sort({age:-1}).limit(1)",Stocks.find(,Stocks.find({_id:"1"}).sort({_id:-1}).limit(1));
router.post('/pharmacystock/add', function (req, res) {
    
    let _id ;
    var query = Stocks.find({},{_id:1});
    query.sort({ _id: 'desc'}).then((data) => {
    //console.log("==> Using Promise ...")
    _id=data[0]?(parseInt(data[0]._id)+1):1;
    //console.log(_id);
    }).then(()=>{
        var newStocks = new Stocks();
        newStocks._id = _id;    
        newStocks.name = req.body.name;
        newStocks.manufacturer = req.body.manufacturer;
        newStocks.batchNo = req.body.batchNo;
        newStocks.expirationDate = req.body.expirationDate;
        newStocks.price = req.body.price;
        newStocks.type = req.body.type;
    
        newStocks.save(function (err, newStocks) {
            if (err)
                res.send(err);
            else {
                //console.log(newStocks);
                res.json(newStocks);
            }
        });
    })
    .catch((err) => {
    console.log(err);
    })

   
});

router.get('/pharmacystock', function (req, res) {
    console.log('getting all stocks... ');
    Stocks.find({}, function (err, pharmacystock) {
        if (err)
            res.send(err);
        else {
            //console.log(pharmacystock);
            res.json(pharmacystock);
        }
    });
});

router.get('/pharmacystock/:id', function (req, res) {
    console.log('gettting stock by _id... ');
    Stocks.findOne({ _id: req.params.id }, function (err, pharmacystock) {
        if (err)
            res.send(err);
        else {
            //console.log(pharmacystock);
            if(pharmacystock==null)
            res.status('404').json(pharmacystock)
            else
            res.json(pharmacystock);
        }
    });
});

router.put('/pharmacystock/:id', function (req, res) {
    console.log('updating stock by _id... ');
    Stocks.findOneAndUpdate({ _id: req.params.id },
        { $set: {
            name : req.body.name,
            manufacturer : req.body.manufacturer,
            batchNo : req.body.batchNo,
            expirationDate : req.body.expirationDate,
            price : req.body.price,
            type : req.body.type
        } },
        {new: true},
        function (err, pharmacystock) {
            if (err)
                res.send(err);
            else {
                //console.log(pharmacystock);
                res.json(pharmacystock);
            }
        });
});

router.delete('/delete/:id', function (req, res) {
    console.log('deleting stocks by _id... ');
    Stocks.findOneAndRemove({ _id: req.params.id }, function (err, pharmacystock) {
        if (err)
            res.send(err);
        else {
            //console.log(pharmacystock);
            res.json(pharmacystock);
        }
    });
});

module.exports = router;
