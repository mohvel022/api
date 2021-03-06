var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var Point = require('../../models/points/points');

// request all points


router.post('/points', function(req, res){

    if (req.body.name && req.body.xCords && req.body.yCords && req.body.connectedPoints){
        
         var newPoint       = new Point;
         newPoint.name      = req.body.name
         newPoint.xCords    = req.body.xCords
         newPoint.yCords    = req.body.yCords
         //newPoint.connectedPoints = []

         req.body.connectedPoints.forEach(function(point){
             console.log(point)
             newPoint.connectedPoints.push(point)
         })



         newPoint.save(function(err){
             if(err){
                 return res.send(err)
             }
             else {
                 res.send('gg')
             }
         })
     }
     else {
         return res.send('check the params fam')
     }
});

router.get('/points', function(req, res){
    console.log('procesing query')
    Point.find({}, function(err, points){
        
        if(err){
            return res.send(err)
        }

        return res.json(points);

    }
)});


module.exports = router;