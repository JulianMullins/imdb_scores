var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
	res.render('scoreResult', {
		title: req.body.movTitle,
		duration: req.body.movDuration

	});
})

router.get('/scoreResult', function(req, res, next) {
	res.render('scoreResult');
})

module.exports = router;
