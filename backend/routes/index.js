var express = require('express');

//various models for mongoose schema
var User = require('../model/user');
var Game = require('../model/game');
var Admin = require('../model/adminModel');
var Comment = require('../model/comments')
var Personal= require('../model/personal')

//importing and setting mongoose
var mongoose = require('mongoose');

const router = express.Router();

//for getting games according to certain criteria
  router.get('/games', function(req, res, next) {
    let searchQuery = {};
  if(req.query.name) {
    searchQuery = { name: req.query.name };
  } else if (req.query.ip){//searching for specific names of IP
    searchQuery = { ip: req.query.ip };
  }else if (req.query.price == 10){//setting the ranges for price
    searchQuery = {price:{$lte: 34}}
  }else if (req.query.price == 20){
    searchQuery = {price:{$gte: 35}}
  }
    Game.find(searchQuery, function(err, games){
      if (err) {
        res.status(404).send("The game was not found" +id)}  
      else{
        res.status(200).send(games);
      }   
    });
  })
 //for returning all games 
router.get('/games/all', function(req, res, next) {
  let searchQuery = {};
  Game.find(searchQuery, function(err, games){
    if (err) {
      res.status(404).send("The game was not found" +id)}
    else{
      res.status(200).send(games);
    }     
    });
  })

  //get for saving games to the members area
  router.get('/personaldb', function(req, res, next) {
    let searchQuery = {};
    if(req.query.name)
      searchQuery = { name: req.query.name };
    Personal.find(searchQuery, function(err, personal){
      if (err) {
        res.status(404) }     
      res.status(200).send(personal);
    })
  });

  //for saving a particular game to the members area
  router.post('/personaldb', function(req, res, next) {
    let newGame = new Personal(req.body);
    newGame._id = mongoose.Types.ObjectId();
    newGame.save(function(err) {
      if (err) {
        res.status(404)
      } else {
        res.status(200).send({ id : newGame._id });
      }
    });
  });

  //for deleting games from the members section
router.delete('/personaldb', function(req, res, next) {
  const filter= { 
    _id:req.query._id
  };
  Personal.deleteOne(filter, function(err, personal){
    if (err) {
      res.status(404)}     
    else{
      res.status(200).send(personal);
    }
  })
});
//get for the comments
router.get('/comments', function(req, res, next) {
  let searchQuery = {};
  if(req.query.name)
    searchQuery = { name: req.query.name };
  Comment.find(searchQuery, function(err, comment){
    if (err) {
      res.status(404) }
    else{
      res.status(200).send(comment);
    }     
  });
})
//for posting comments from the contact page
router.post('/comments', function(req, res, next) {
  let newComment = new Comment(req.body);
  newComment._id = mongoose.Types.ObjectId();
  newComment.save(function(err) {
    if (err) {
      res.status(404)
    } else {
      res.status(200).send({ id : newComment._id });
    }
  });
});

//deleting contacts in admin area
router.delete('/comments', function(req, res, next) {
  const filter= { 
    _id:req.query._id
  };
  Comment.deleteOne(filter, function(err, comments){
    if (err) {
      res.status(404)}              
    else{
      res.status(200).send(comments)
    }
  })
});

//adminstrator log in
router.get('/adminstrate', function(req, res, next) {
  let searchQuery = {};
  if(req.query.name)
    searchQuery = { name: req.query.name };
  Admin.find(searchQuery, function(err, admin){
    if (err) {
      res.status(404)} 
    else{
      res.status(200).json(admin);
    }    
  });
})

//get all users
router.get('/users', function(req, res, next) {
  let searchQuery = {};
  if(req.query.name)
    searchQuery = { name: req.query.name };
  User.find(searchQuery, function(err, users){
    if (err) {
      res.status(404) } 
    else {
      res.status(200).json(users)
    }   
  })
});

//create user
router.post('/users', function(req, res, next) {
  let newUser = new User(req.body);
  newUser._id = mongoose.Types.ObjectId();
  newUser.save(function(err) {
    if (err) {
      res.status(404)
    } else {
      res.status(200).send({ id : newUser._id });
    }
  });
});

//delete user
router.delete('/users', function(req, res, next) {
  const filter= { 
    _id:req.query._id
  };
  User.deleteOne(filter, function(err, users){
    if (err) {
      res.status(404) 
    }     
    else{
      res.status(200).send(users);
    }
  })
});

//update user
router.put('/users', function(req, res, next) {
  const filter= { 
    name:req.query.name
  };
  const updateUser={
    $set: {
      name: req.body.name,
      pass: req.body.pass
    },
  };
  User.updateOne(filter, updateUser, function(err, users){
    if (err) {
      res.status(404) }     
    else{
      res.status(200).send(users);
    }
  })
});

module.exports = router;
