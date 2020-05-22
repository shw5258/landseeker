const express = require("express"),
	  router  = express.Router(),
	  Commission = require('../models/commission'),
	  middleware = require("../middleware")

router.get('/', (req, res) => {
	//저장소에서 의뢰 전부를 가져오기
	Commission.find({}, (err, commissions)=>{
		if(err){
			console.log(err)
		}else{
			res.render('commissions/index', {site: commissions, currentUser: req.user})
		}
	})
})

router.post('/', middleware.isLoggedIn, (req, res) => {
	//새로운 의뢰를 만든후 저장소로 보내기
	Commission.create(req.body.commission, (err, commission)=>{
		if(err){
			console.log(err)
		}else{
			res.redirect('/commissions')
		}
	})
})

router.get('/new', middleware.isLoggedIn, (req,res) => {
	res.render('commissions/new')
})

router.get('/:id', (req,res) => {
	Commission.findById(req.params.id).populate("comments").exec( (err, foundMission)=>{
		if(err){
			console.log(err)
		}else{
			res.render('commissions/show', {commission: foundMission})
		}
	})
})

module.exports = router