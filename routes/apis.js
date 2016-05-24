var express = require('express');
var router = express.Router();

var funOperator = require('../utils/funOperator');

router.get('/list', function(req, res, next) {
  
	funOperator.getFunList()
		.then(function(data){
			res.send({ funList: data });
		}, function(err){
			console.log(err)
			res.render('error', { error: err })
		})
});

router.get('/:funFolder/:funName', function(req, res, next) {
	funOperator.getFunItem(req.params.funFolder, req.params.funName)
		.then(function(data){
			res.send({ funName: req.params.funName, funFolder: req.params.funFolder, funContent: data });
		}, function(err){
			res.render('error', { error: err })
		})
});


router.post('/update', function(req, res, next) {
	funOperator.updateFunItem(req.body.folder, req.body.name, req.body.content)
		.then(function(data){
			res.send({ funName: req.params.funName, funContent: data });
		}, function(err) {
			res.render({ error: err })
		})
})

router.post('/add', function(req, res, next) {
	funOperator.addFunItem(req.body.folder, req.body.name, req.body.content)
		.then(function(data){
			res.send({ status: data });
		}, function(err){
			res.render('error', { error: err })
		})
})

router.get('/remove', function(req, res, next) {
	funOperator.removeFunItem(req.query.funFolder, req.query.funName)
		.then(function(data){
			res.send({ status: data });
		}, function(err){
			res.render('error', { error: err })
		})
})

module.exports = router;
