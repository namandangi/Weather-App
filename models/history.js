const mongoose = require('mongoose');

var HistorySchema = mongoose.Schema({
	user: {
		 type: mongoose.Schema.Types.ObjectId,
		 ref:'User'
	},
	coord: {
		lon: Number,
		lat: Number
	},
	weather: [{
		main: String,
		description: String,
		icon: String
	}],
	main: {
		temp: Number,
		feels_like: Number,
		temp_min: Number,
		temp_max: Number,
		pressure: Number,
		humidity: Number,
		sea_level: Number,
		grnd_level: Number
	},
	wind: {
		speed:Number
	},
	sys: {
		country: String,
		sunrise: Number,
		sunset: Number
	},
	name: String,
	timezone: Number,
	searchedAt: {
		type: String
	}
});

module.exports = mongoose.model("History", HistorySchema);