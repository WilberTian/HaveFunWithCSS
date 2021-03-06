var express = require('express');
var router = express.Router();

var funOperator = require('../utils/funOperator');

router.get('/funlist', function(req, res, next) {
	funOperator.getFunList()
					.subscribe(data => res.send(data), e => res.status(400).send(e.message));
});

router.post('/funlist', function(req, res, next) {
	funOperator.addFunItem(req.body.folder, req.body.name)
		.then(function(data){
			res.send(data);
		}, function(err){
			res.status(400).send(err.message);
		})
})

router.get('/:funFolder', function(req, res, next) {
	funOperator.getFunItemsByFolder(req.params.funFolder)
		.subscribe(data => res.send(data), e => res.status(400).send(e.message));
});

router.get('/:funFolder/:funName', function(req, res, next) {
	funOperator.getFunItem(req.params.funFolder, req.params.funName)
		.then(function(data){
			res.send(data);
		}, function(err){
			res.status(400).send(err.message);
		})
});

router.get('/external/:funFolder/:funName', function(req, res, next) {
	funOperator.getFunItem(req.params.funFolder, req.params.funName)
		.then(function(data){
			res.writeHeader(200, {"Content-Type": "text/html;  charset=utf-8"});  
			res.write(data.funContent);  
			res.end();  
		}, function(err){
			res.status(400).send(err.message);
		})
});

router.put('/:funFolder/:funName', function(req, res, next) {
	funOperator.updateFunItem(req.params.funFolder, req.params.funName, req.body.funContent)
		.then(function(data){
			res.send(data);
		}, function(err) {
			res.status(400).send(err.message);
		})
})


router.delete('/:funFolder/:funName', function(req, res, next) {
	funOperator.removeFunItem(req.params.funFolder, req.params.funName)
		.then(function(data){
			res.send(data);
		}, function(err){
			res.status(400).send(err.message);
		})
})

module.exports = router;
