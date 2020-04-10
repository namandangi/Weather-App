const express = require('express');
const User = require('../models/user');
const History = require('../models/history');
const router = express.Router();

router.post('/register',async(req,res)=>{
	try{
		const user = await new User(req.body);
		await user.save()
		return res.status(201).json(user);
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

router.post('/history',async(req,res)=>{
	try{
		const doc = await new History(req.body);
		await doc.save();
		return res.status(201).json(doc);
	}
	catch(err){
		return res.send(err);
	}
})

module.exports = router;