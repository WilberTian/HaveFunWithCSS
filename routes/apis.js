var express = require('express');
var router = express.Router();

var funOperator = require('../utils/funOperator');

router.get('/funlist', function(req, res, next) {
	funOperator.getFunList()
		.then(function(data){
			res.send({ status: 0, funList: data });
		}, function(err){
			console.log(err)
			res.send({ status: 1, error: err.message })
		})
});

router.post('/funlist', function(req, res, next) {
	funOperator.addFunItem(req.body.folder, req.body.name)
		.then(function(data){
			res.send({ status: 0, message: data });
		}, function(err){
			res.send({ status: 1, error: err.message })
		})
})

router.get('/:funFolder/:funName', function(req, res, next) {
	funOperator.getFunItem(req.params.funFolder, req.params.funName)
		.then(function(data){
			res.send({ status: 0, funName: req.params.funName, funFolder: req.params.funFolder, funContent: data });
		}, function(err){
			res.send({ status: 1, error: err.message })
		})
});


router.put('/:funFolder/:funName', function(req, res, next) {
	funOperator.updateFunItem(req.params.funFolder, req.params.funName, req.body.content)
		.then(function(data){
			res.send({ status: 0, funName: req.params.funName, funContent: data });
		}, function(err) {
			res.send({ status: 1, error: err.message })
		})
})


router.delete('/:funFolder/:funName', function(req, res, next) {
	funOperator.removeFunItem(req.params.funFolder, req.params.funName)
		.then(function(data){
			res.send({ status: 0, message: data });
		}, function(err){
			res.send({ status: 1, error: err.message })
		})
})

module.exports = router;
