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
router.post('/register' ,function(req,res){
	if(req.session.email)res.redirect('/');
	else{
		var name = req.body.name;
	var email= req.body.email;
	var password = req.body.password;			

	var data = {
		"name":name,
		"email":email,
		"password": password, 
	}
		mongo.connect(my_db , function(error , client){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		client.db("yourdb").collection("user").insertOne(data, (err , collection) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(collection);

			res.redirect('/login');
		});
	});

	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	//return res.sendFile('/public/index.html');  
	}
});
module.exports=router;
													
			