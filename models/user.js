const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		trim:true
	},
	email :{
		type:String,
		required:true,
		unique:true,
		trim:true,
		lowercase:true
	},
	password:{
		type:String,
		required:true
	}
});

module.exports = mongoose.model("User",UserSchema);