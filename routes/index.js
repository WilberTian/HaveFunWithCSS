var express = require('express');
var router = express.Router();

var funOperator = require('../utils/funOperator');

/* GET home page. */
router.get('/', function(req, res, next) {
  
	funOperator.getFunList()
		.then(function(data){
			res.render('index', { funList: data });
		}, function(err){
			console.log(err)
			res.render('error', { error: err })
		})
});

router.get('/index', function(req, res, next) {
  
	res.sendfile('public/html/index.html')
});

module.exports = router;
