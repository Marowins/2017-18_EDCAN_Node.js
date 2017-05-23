var express = require('express');
var app = express();
var Server = require('http').Server(app);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/3000');

var PostSchema = new mongoose.Schema ({
	text : { type : String },
  date : { type : Date, default : Date.now }
});

Posts = mongoose.model('posts',PostSchema);

app.engine('html', require('ejs').renderFile);
Server.listen(3000)

app.get( '/show/:query', function( req, res ) {
	var query = req.params['query'];
	Posts.findOne({text:query}, function ( err, result ) {
		if( err ) {
			throw err;
		} else if ( result ) {
			res.render(__dirname+'/a.ejs',{ post : result.date }); //result.text 하면 text 출력
		} else {
			res.render(__dirname+'/a.ejs',{ post : "업 서 영" });
		}
	});
});

app.get( '/show', function ( req, res ){
  Posts.find({}, function ( err, result ){
    if ( err ) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.get ( '/write/:text', function ( req, res ) {
	var text_var = req.params['text'];
	var current = new Posts ({
		text : text_var
    })
	current.save ( function ( err ) {
		if ( err ) {
			throw err;
		} else {
			res.send("저장완료");
		}
	});
});
