var mongoose = require('mongoose');
var express = require('express');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection)

// Events Schema
var EventSchema = mongoose.Schema({
	id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event' 
    },
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
    Room:{
        type: String
    },
    Interested:{
        type: Number
    },
    Going: {
        type: Number
    }
});

EventSchema.plugin(autoIncrement.plugin, 'Event')

module.exports = mongoose.model('Event', EventSchema);
