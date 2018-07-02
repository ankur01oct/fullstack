var express = require('express');
var router = express.Router();
var pharmacyApi=require('../data/pharmacyApi');

/* GET home page. */
router.get('/', function(req, res, next) {
  pharmacyApi.getAllPharmacy(function callback(err,data){
    res.render('view', { title: 'PharmacyApp', phamacydatas: data });
  });
  
});

router.get('/add', function(req, res, next) {
    res.render('add', { title: 'PharmacyApp' });
  });

router.get('/edit/:id', function(req, res, next) {
  pharmacyApi.getPharmacyById(req.params.id,function(err,data){
    res.render('edit', { title: 'PharmacyApp',data });
  })
});

router.post('/edit/:id', function(req, res, next) {
  data={};
  data.id = parseInt(req.params.id);
  data.Name = req.body.Name;
  data.Manufacturer = req.body.Manufacturer;
  data.Batch_No = req.body.Batch_No;
  data.Expiration_Date = req.body.Expiration_Date;
  data.Price = req.body.Price;
  data.Type = req.body.Type;
  pharmacyApi.updatePharmacyById(req.params.id,data,function(err,data){
    res.redirect('/');
  })
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add', function(req, res, next) {
  data={};
  data.Name = req.body.Name;
  data.Manufacturer = req.body.Manufacturer;
  data.Batch_No = req.body.Batch_No;
  data.Expiration_Date = req.body.Expiration_Date;
  data.Price = req.body.Price;
  data.Type = req.body.Type;
  pharmacyApi.savePharmacy(data, function(err){
      res.redirect('/');
  })
});

router.get('/delete/:id', function(req, res, next) {
  pharmacyApi.deletePharmacyById(req.params.id, function(err){
      res.redirect('/');
  })
});
module.exports = router;
