var express = require('express');
var router = express.Router();

var title = null;
var duration = null;
var budget = null;
var year = null;
var animationFamily = null;
var bioHistDoc = null;
var comedy = null;
var drama = null;
var horrorThriller = null;
var sciFiFantasy = null;
var gaRating = null;
var actorOther = null;
var criticReviews = null;
var userVotes = null;

var mlrResult = null;


/* run the model */
var mlr = function(duration, budget, year, animationFamily, bioHistDoc, comedy, drama, horrorThriller, sciFiFantasy, gaRating, actorOther, criticReviews, userVotes) {
	var result = (0.004965505764*duration)+(-0.000000002803*budget)+(-0.024813755380*year)+
				 (0.348602523272*animationFamily)+(0.294282475556*bioHistDoc)+(-0.097477068767*comedy)+
				 (0.474187533070*drama)+(-0.224372472843*horrorThriller)+(-0.206355066016*sciFiFantasy)+(-0.201490337868*gaRating)+
				 (0.131474996353*actorOther)+(0.002623420286*criticReviews)+(0.000002669015*userVotes);
	return result;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
	title = req.body.movTitle;
	duration = req.body.movDuration;
	budget = req.body.movBudget;
	year = req.body.movYear;

	res.redirect('secondPage');
})

router.get('/secondPage', function(req, res, next) {
  res.render('secondPage');
});

router.post('/secondPage', function(req, res, next) {
	console.log("req.body: ", req.body);

	criticReviews = req.body.criticReviews;
	userVotes = req.body.userVotes;

	if(req.body.animationFamily) {
		animationFamily = 1;
	} else {
		animationFamily = 0;
	}

	if(req.body.bioHistDoc) {
		bioHistDoc = 1;
	} else {
		bioHistDoc = 0;
	}

	if(req.body.comedy) {
		comedy = 1;
	} else {
		comedy = 0;
	}

	if(req.body.drama) {
		drama = 1;
	} else {
		drama = 0;
	}

	if(req.body.horrorThriller) {
		horrorThriller = 1;
	} else {
		horrorThriller = 0;
	}

	if(req.body.sciFiFantasy) {
		sciFiFantasy = 1;
	} else {
		sciFiFantasy = 0;
	}

	if(req.body.inlineRadioOptions == 'ga') {
		gaRating = 1;
	} else {
		gaRating = 0;
	}

	if(req.body.optionsRadios == 'aListNo') {
		actorOther = 1;
	} else {
		actorOther = 0;
	}

	mlrResult = mlr(duration, budget, year, animationFamily, bioHistDoc, comedy, drama, horrorThriller, sciFiFantasy, gaRating, actorOther, criticReviews, userVotes);

	res.render('scoreResult', {
		title: title,
		mlrResult: mlrResult
	})
})

module.exports = router;
