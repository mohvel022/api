var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Club Schema
var ClubSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

var Club = module.exports = mongoose.model('Club', ClubSchema);
module.exports.createClub = function(newClub, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newClub.password, salt, function(err, hash) {
	        newClub.password = hash;
	        newClub.save(callback);
	    });
	});
}

module.exports.getClubByClubname = function(username, callback){
	var query = {username: username};
	Club.findOne(query, callback);
}

module.exports.getClubById = function(id, callback){
	Club.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}