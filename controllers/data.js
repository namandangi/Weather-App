const express = require('express');
const axios = require('axios');
const internalIp = require('internal-ip');
const externalip = require('externalip');
const router = express.Router();


router.post('/search',async (req,res)=>{
	try{
		let cityName = req.body.city;
		const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8b827e90eefbdddc329b96ac3d76462b`);
		console.log(response.data);
		return res.json(response.data);
	}
	catch(err){
		return res.json(err);
	}
});

router.post('/geolocate',async(req,res)=>{
	try{
	 	// var ip = req.ip;		
	 	var ip = await internalIp.v4();	 	
		// externalip(function (err, ip) {
		//   console.log(ip); // => 8.8.8.8
		// });
	 	 console.log(ip,req.socket.address().family);
	 	 //use http://api.ipinfodb.com/v3/ip-city/?key=354b7642c5f69b0bf800c40976a95c03f4585ed0d9a340ac981c11a5283f2bf5
	 	 // to find lat and lon using ip
		let latitude = req.body.lat;
		let longitude = req.body.long;
		const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8b827e90eefbdddc329b96ac3d76462b`);
		return res.json(response.data);
	}
	catch(err){
		return res.json(err);
	}
});

module.exports = router;