
const express = require('express');
var app = express();
const path=require('path');

var session = require('express-session');
var bodyParser = require('body-parser');
app.use(session({secret: 'ssshhhhh'}));
var sess;

var register=require('./controllers/registration.js');
var login=require('./controllers/login.js');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

var question=require('./controllers/question.js');
var viewQ=require('./views/view2.js');
var viewS=require('./views/view1.js');

app.use('/register',express.static(path.join(__dirname,'public','register')));
app.post('/register',register);

app.use('/login',express.static(path.join(__dirname,'public','login')));
app.post('/login',login);

app.get('/',function(req,res){
  sess = req.session;
  //Session set when user Request our app via URL
  if(sess.email) {
      res.sendFile(path.join(__dirname,'ques1.html'));
  }
  else {
    res.sendFile(path.join(__dirname,'ques2.html'));
  }
  });

app.use(express.static(path.join(__dirname,'public','question')));
app.get('/question',function(req,res){
  if(req.session.email){
    res.sendFile(path.join(__dirname,'/public/question/index.html'));
  }
});
app.post('/question',question);

app.set('view engine', 'ejs');
app.get('/view1',viewQ);

app.get('/logout',function(req,res){
  req.session=null;
  console.log('logged out');
  //res.send('logged out');
  res.redirect('/');
});

app.post('/search',viewS);
app.listen(3000);
