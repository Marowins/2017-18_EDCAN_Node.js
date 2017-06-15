var express = require('express');
var app = express();
var server = require('http').Server(app);
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/3000');
server.listen(3000);

db.on('error', console.error.bind(console, 'connect error: '));
db.once('open', function callback(){
  console.log("db open")
});

var UserSchema = new mongoose.Schema ({
  id : { type : String },
  passwd : { type : String },
  name : { type : String },
  age : { type : Number }
});

var Users = mongoose.model( 'Users', UserSchema )

app.get( '/create/:id/:passwd/:name/:age', function( req, res ){
  var id_var = req.params['id'];
  var passwd_var = req.params['passwd'];
  var name_var = req.params['name'];
  var age_var = req.params['age'];
  var current = new Users ({
    id : id_var,
    passwd : passwd_var,
    name : name_var,
    age : age_var
  });
    current.save( function( err ){
    if ( err ) {
      throw error;
    } else {
      res.send("유저정보를 저장했습니다");
    }
    });
  });

app.get ( '/show', function( req, res ){
  Users.find( {}, function( err, result ){
    if ( err ) {
			throw err;
		} else {
			res.send(result);
		}
  });
});

app.get ( '/search/:query', function( req, res ){
  var query = req.params['query'];
  Users.find( { type : { $eq : 'query' }}, function( err, result ){
    if ( err ) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

// var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test.js');
//
// server.listen(3000);
//
// var db = mongoose.connection;
//
// db.on('error', console.error.bind(console, 'connect error: ' ));
// db.once('open', function {
//   console.log("DB Open!")
// })
//
// var UserSchema = new mongoose.schema ({
//   { id }
// })
