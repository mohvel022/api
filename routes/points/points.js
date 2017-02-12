var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var Point = require('../../models/points/points');

// request all points


router.post('/points', function(req, res){

    if (req.body.id && req.body.xCords && req.body.yCords && req.body.connectedPoints){
        
         var newPoint = new Point;
         newPoint.id = identification;
         newPoint.xCords = req.body.xCords
         newPoint.yCords = req.body.yCords
         newPoint.connectedPoints = req.body.connectedPoints
    
         newPoint.save(function(err){
             if(err){
                 // do error shit
                 console.log(err)
             }
         })
     }
});

router.get('/points', function(req, res){
    console.log('procesing query')
    Point.find({}, function(err, points){
        
        if(err){
            return res.send(err)
        }

        res.json(points);
        console.log('query sent')
        console.log(points)    
    }
)});


module.exports = router;