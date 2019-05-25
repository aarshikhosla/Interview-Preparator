const express=require('express');
var router=express.Router();
var mongo = require('mongodb').MongoClient;
var path=require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var my_db = "mongodb://localhost:27017";
router.use( bodyParser.json() );
router.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));



var session = require('express-session');
var bodyParser = require('body-parser');

router.post('/login' ,function(req,res){
		var email= req.body.email;
	    var password = req.body.password;			

	mongo.connect(my_db , function(error , client){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		client.db("yourdb").collection("user").findOne({email:email,password:password},function(err, result) {
			if (err) throw err;
			if(result!=null){
  				req.session.email=email;
			console.log("yep");
			res.redirect('/');
			}
			
	});
});
	
});
module.exports=router;