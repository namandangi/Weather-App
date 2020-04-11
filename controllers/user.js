const express = require('express');
const User = require('../models/user');
const History = require('../models/history');
const {jwtSecret} = require('../config');
const {authRequired} = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register',async(req,res)=>{
	try{
		console.log(req.body)		
		const user = await new User(req.body);
		const token = await jwt.sign({ _id: user.id}, jwtSecret, { expiresIn: 86400 *365});
		let data = req.body;
		data.token = token;
		await user.save()
		const doc = await User.findByIdAndUpdate(user._id,{$set:data},{new:true});
		return res.status(201).json(doc);
	}
	catch(err){
		return res.json(err);
	}
});

router.post('/login',async(req,res)=>{
	try{
		const {email,password} = req.body;
		const user = await User.findOne({email});
		if (!user) {
	    return res.status(401).json({
	      msg: 'User email not found.'
	    });
	  }	  
	  if (password!=user.password) {
	    return res.status(401).json({
	      msg: "User password didn't match."
	    });
	  }	  
	  else return res.status(201).json(user);
	}
	catch(err){
		return res.json(err);
	}
});
/**
* @api {POST} api/weather/history
*/
router.post('/history',authRequired,async(req,res)=>{
	try{
		const doc = await History.find({user:req.user._id});
		return res.status(201).json(doc);
	}
	catch(err){
		return res.send(err);
	}
})

module.exports = router;