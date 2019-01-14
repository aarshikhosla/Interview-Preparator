/**const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

module.exports = mongoose.connect("mongodb://localhost:27017/mydb", {
  useNewUrlParser: true
}).then(() => console.log("Connected"))
.catch(err => console.log(err));

*/

// Retrieve
var MongoClient = require('mongodb').MongoClient;
let connection;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", {
  useNewUrlParser: true
}, function(err, db) {
  if(!err) {
    console.log("We are connected");
  } else {
    connection = db;
  }
});

module.exports = connection;

