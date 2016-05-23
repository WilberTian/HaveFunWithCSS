var express = require('express');
var router = express.Router();

var funOperator = require('../utils/funOperator');

router.get('/:funFolder/:funName', function(req, res, next) {
	funOperator.getFunItem(req.params.funFolder, req.params.funName)
		.then(function(data){
			res.render('editor', { funFolder: req.params.funFolder, funName: req.params.funName, funContent: data });
		}, function(err){
			console.log(err)
			res.render('error', { error: err })
		})
});

router.get('/', function(req, res, next) {
  console.log(req.params)
  res.render('editor', {funContent: '<h2>empty editor</h2>'});
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

})

router.get('/remove', function(req, res, next) {

})

module.exports = router;
