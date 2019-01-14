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


router.get('/view1' ,function(req,res){
   
   mongo.connect(my_db , function(error , client){
       if (error){
           throw error;
       }
       console.log("connected to database successfully");
       
       //CREATING A COLLECTION IN MONGODB USING NODE.JS
       client.db("yourdb").collection("question").find({}).toArray(function(err, result) {
         
         var questions=result;
        
    
           if (err) throw err;
           if(result!=null){
            res.render('index', {
                    questions: questions,
            });
            console.log(result);
           }
           
        });
   });
});

module.exports=router;