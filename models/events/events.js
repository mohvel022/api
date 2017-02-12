var mongoose = require('mongoose');
var express = require('express');

// Events Schema
var EventSchema = mongoose.Schema({
	Name: {
		type: String,
	},
	Club: {
		type: String
	},
	Date: {
		type: String
	},
	Time: {
		type: String
	},
    Interested:{
        type: Number
    },
    Going: {
        type: Number
    }
});

module.exports = mongoose.model('Event', EventSchema);
