var express = require('express');
var router = express.Router();
var pharmacyApi=require('../data/pharmacyApi');

/* GET home page. */
router.get('/pharmacystock', function(req, res, next) {
  pharmacyApi.getAllPharmacy(function callback(err,data){
    res.send( {phamacydatas: data });
  });
  
});

// router.get('/add', function(req, res, next) {
//     res.render('add', { title: 'PharmacyApp' });
//   });

router.get('/pharmacystock/:id', function(req, res, next) {
  pharmacyApi.getPharmacyById(req.params.id,function(err,data){
    res.send({ phamacydata:data });
  })
});

router.put('/pharmacystock/:id', function(req, res, next) {
  data={};
  data.id = parseInt(req.params.id);
  data.name = req.body.name;
  data.manufacturer = req.body.manufacturer;
  data.batchNo = req.body.batchNo;
  data.expirationDate = req.body.expirationDate;
  data.price = req.body.price;
  data.type = req.body.type;
  pharmacyApi.updatePharmacyById(req.params.id,data,function(err,data){
  res.send({"updated":"success"});
  })
});

// router.get('/add', function(req, res, next) {
//   res.render('add');
// });

router.post('/pharmacystock/add', function(req, res, next) {
  data={};
  data.name = req.body.name;
  data.manufacturer = req.body.manufacturer;
  data.batchNo = req.body.batchNo;
  data.expirationDate = req.body.expirationDate;
  data.price = req.body.price;
  data.type = req.body.type;
  pharmacyApi.savePharmacy(data, function(err){
    res.send({"added":"success"});
      //res.redirect('/');
  })
});

router.delete('/delete/:id', function(req, res, next) {
  pharmacyApi.deletePharmacyById(req.params.id, function(err){
      res.send({"delete":"success"});
      //res.redirect('/');
  })
});
module.exports = router;
