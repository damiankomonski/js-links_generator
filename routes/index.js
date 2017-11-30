var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', condition: true, arr: [1,2,3] });
});

// router.get('/test/:id', function(req, res, next) {
//     res.render('test', { outcome: req.params.id });
// });

router.post('/generator', function (req, res, next) {
  var id = req.body.address;

  request(id, function(error, response, body){
    if (error){
      res.render('error');
    }else{
      res.render('generator', { siteCode: body, address: id });
    }
  });
});

module.exports = router;
