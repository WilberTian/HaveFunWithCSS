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

module.exports = router;
