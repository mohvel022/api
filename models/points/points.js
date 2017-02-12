var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection)

//Schema for the points
var PointSchema = mongoose.Schema({

    id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Point' 
    },
    name : {
        type: String
    },
    xCords: {
        type: String
    },
    yCords:{
        type : String
    }, 
    connectedPoints: [
        {
            id : {
                type : Number
            },
            distance : {
                type : Number
            }
        }
    ]
});
PointSchema.plugin(autoIncrement.plugin, 'Point')
var Point = module.exports = mongoose.model('Point', PointSchema);

module.exports.getPointById = function(id, callback){
	User.findById(id, callback);
}
