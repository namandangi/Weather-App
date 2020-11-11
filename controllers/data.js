const express = require('express');
const axios = require('axios');
const internalIp = require('internal-ip');
const externalip = require('externalip');
const History = require('../models/history');
const { authRequired } = require('../middlewares/auth');
const router = express.Router();

/**
* @api {GET} api/weather/search
*/
router.post('/search', async (req,res)=>{
	try{
		const { city } = req.body;
		const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8b827e90eefbdddc329b96ac3d76462b`);
		const data = response.data;
		const date = new Date();
		data.user = req.user._id;
		data.searchedAt = date.toLocaleString('default',{weekday:'long'})+' '+date.getDate()+' '+date.toLocaleString('default',{month:'long'});
		const doc = await new History(data);
		await doc.save();
		return res.json(response.data);
	}
	catch(err){
		return res.json(err);
	}
});

/**
* @api {GET} api/weather/geolocate
*/
router.post('/geolocate',authRequired,async(req,res)=>{
	try{
	 	var ip = await internalIp.v4();	 	
	   /* 
		* 	use http://api.ipinfodb.com/v3/ip-city/?key=354b7642c5f69b0bf800c40976a95c03f4585ed0d9a340ac981c11a5283f2bf5
		* 	to find lat and lon using ip
		*
		*	externalip(function (err, ip) {
		*   console.log(ip); // => 8.8.8.8
		* });
		*
		*/ 

		const latitude = req.body.lat;
		const longitude = req.body.long;
		const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8b827e90eefbdddc329b96ac3d76462b`);
		const doc = await new History(response.data);
		await doc.save();
		return res.json(response.data);
	}
	catch(err){
		return res.json(err);
	}
});

module.exports = router;