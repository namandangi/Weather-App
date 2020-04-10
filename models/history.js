const mongoose = require('mongoose');

var HistorySchema = mongoose.Schema({
	coord:{
		lon:Number,
		lat:Number
	},
	weather:{
		main:String,
		description:String
	},
	main:{
		temp:Number,
		feels_like:Number,
		temp_min:Number,
		temp_max:Number,
		pressure:Number,
		humidity:Number,
		sea_level:Number,
		grnd_level:Number
	},
	wind:{
		speed:Number
	},
	name:String,
	timezone:Number,
	searchedAt:{
		type:Date,
		default:Date.now
	}
});

module.exports = mongoose.model("History",HistorySchema);