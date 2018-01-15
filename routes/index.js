var express = require('express');
var router = express.Router();
var request = require('request');
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', condition: true, arr: [1,2,3] });
});

router.get('/aboutme', function(req, res, next) {
  res.render('aboutme');
});

router.post('/generator', function (req, res, next) {
  var id = "http://www." + req.body.address;

  request(id, function(error, response, body){
    if (error){
      res.render('error');
    }else{
      res.render('generator', { siteCode: body, address: id });
    }
  });
});

router.get('/get-data', function(req, res, next) {

});

router.post('/insert-link', function(req, res, next) {
  var item = {
    link: req.body.link
  }

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);

    db.collection('links').insertOne(item, function(err, result){
      assert.equal(null, err);
      console.log('Item inserted!');
      db.close();
    });
  })

  res.redirect('/');
});

router.post('/insert-visitedLink', function(req, res, next) {
  var item = {
    link: req.body.link
  }

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);

    db.collection('visited-links').insertOne(item, function(err, result){
      assert.equal(null, err);
      console.log('Visited link inserted!');
      db.close();
    });
  })

  res.redirect('/');
});


module.exports = router;
