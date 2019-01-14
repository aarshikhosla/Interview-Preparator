const express=require('express');
var router=express.Router();
var mongo = require('mongodb').MongoClient;
var path=require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var my_db = "mongodb://localhost:27017";



router.post('/search' ,function(req,res){
   var keyss=req.body.keyss;
   var company=req.body.company;
   console.log(req.headers);
   mongo.connect(my_db , function(error , client){
       if (error){
           throw error;
       }
       console.log("connected to database successfully");
       
       //CREATING A COLLECTION IN MONGODB USING NODE.JS
        if(company==''&&keyss==''){
            client.db("yourdb").collection("question").find({})
            .toArray(function(err, result) {
                var questions=result;    
                if (err) throw err;
                if(result!=null){
                    res.render('index', {
                    questions: questions,
                });
                console.log(result);
                }
           });
        }
        else if(company==''){
            client.db("yourdb").collection("question").find({keyword:keyss})
            .toArray(function(err, result) {
                var questions=result;    
                if (err) throw err;
                if(result!=null){
                    res.render('index', {
                    questions: questions,
                });
                console.log(result);
                }
           });
        }
        else if(keyss==''){
            client.db("yourdb").collection("question").find({company:company})
            .toArray(function(err, result) {
                var questions=result;    
                if (err) throw err;
                if(result!=null){
                    res.render('index', {
                    questions: questions,
                });
                console.log(result);
                }
           });
        }
        else{
            client.db("yourdb").collection("question").find({keyword:keyss,company:company})
            .toArray(function(err, result) {
                var questions=result;    
                if (err) throw err;
                if(result!=null){
                    res.render('index', {
                    questions: questions,
                });
                console.log(result);
                }
           });
        }
   });
});

module.exports=router;