var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var mongoose = require('mongoose');
var io = require('socket.io')();


var routes = require('./routes/index');

var app = express();

require('dotenv').load();

var db = process.env.MONGO_URI;

mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
  if(err){
   console.log(err);
  }else {
   console.log('mongoose connection is successful');
  }
});



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);











app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

io.attach(server);



io.on('connection', function(socket) {
   
  console.log("new user connect");
    
  socket.on('postMessage', function(data) {
        io.emit('updateMessages', data);
    });
    
 
    
});



















