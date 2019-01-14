const express=require('express');
var router=express.Router();
var mongo = require('mongodb').MongoClient;
var path=require('path');
var bodyParser = require('body-parser');
var my_db = "mongodb://localhost:27017";
router.use( bodyParser.json() );
router.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));
router.post('/question' ,function(req,res){
		var detail = req.body.detail;
	    var keyword= req.body.keyword;		
		var email=    req.session.email;
		var company=req.body.company;
	var data = {
		"detail":detail,
		"keyword":keyword,
		"email":email,
		"company":company,
	}
		mongo.connect(my_db , function(error , client){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		client.db("yourdb").collection("question").insertOne(data, (err , collection) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(collection);
			res.redirect('/');
		});
	});

	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	//return res.sendFile('/public/index.html');  
	
});
module.exports=router;
													
			