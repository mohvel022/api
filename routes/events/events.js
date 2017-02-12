var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var Event = require('../../models/events/events');

// request all points

router.post('/events', function(req, res){



    if (req.body.Name && req.body.Club && req.body.Date && req.body.Time){
            var newEvent = new Event
	        newEvent.Name = req.body.Name
            newEvent.Club = req.body.Club
            newEvent.Date = req.body.Date
            newEvent.Time = req.body.Time
            newEvent.Interested = 0;
            newEvent.Going = 0;
	        newEvent.save(function(err){
             if(err){
                 return res.send(err)
            }
            return res.send('accepted the event')
         });
    }
    else {
        return res.send('check params')
    }
   
});

router.get('/events', function(req, res){
    console.log('processing query')
    Event.find({}, function(err, events){
        
        if(err){
            return res.send(err)
        }

        return res.json(events); 
    }
)});




router.get('/events/:id/:action', function(req, res){
    Event.find({
        id : req.params.id
    }, function(err, events){
        if (err){
            return res.send(err)
        }
        if (req.params.action == "interested" || req.params.action == "Interested"){
            events.Interested = events.Interested + 1;
            events.save(function(err){
                if (err){
                    return res.send(err)
                }
                return res.send('interested accepted')
            })
        }
        else if (req.params.action == "going" || req.params.action == "Going"){
            events.Going = events.going + 1
            events.save(function(err){
                if (err){
                    return res.send(err)
                }
                return res.send('going accepted')                
            })
        }

    })

})


module.exports = router;