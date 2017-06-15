var express = require('express');

var app = express();
var server = require('http').Server(app);
server.listen(3000);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/3000');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function callback() {
	console.log("db open");
});

var PostSchema = new mongoose.Schema ({
	text : { type : String },
    date : { type : Date, default : Date.now }
});

Posts = mongoose.model('posts',PostSchema);

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
}); // text에 들어오는 값을 db에 저장하고 "저장완료"를 띄워준다

app.get ( '/show', function ( req, res ) {
    Posts.find({}, function ( err, result ) {
    if ( err ) {
			throw err;
		} else {
			res.send( result );
		}
    });
}); // write/:text 에 담긴 정보들을 모두 보여준다

app.get ( '/show/date', function ( req, res ) {
	Posts.find({}, {date : 1}, function ( err, result ) {
		if ( err ) {
			throw err;
		} else {
			res.send( result );
		}
    });
}); // {date : 1} 을 사용해서 date 값만 보여준다, 보여줄것만 1로 하든, 안보여줄것만 0으로하든 하나로 일치시킨다

app.get ( '/show/:query', function ( req, res ) {
    var query = req.params['query'];
    Posts.findOne({ text : query }, function ( err, result ) {
        if ( err ) {
			throw err;
		} else {
			res.send( result );
		}
    });
}); // 지정값이 유일한 경우, 그것을 찾을때 사용한다

app.get( '/search/:query', function ( req, res ) {
    var query = req.params['query'];
    Posts.find({ text : { $regex : query }}, function ( err, result ) {
        if ( err ) {
			throw err;
		} else {
			res.send( result );
		}
    });
}); // /search/:q 라고 입력했을때 다른 문자열에 q가 포함된 모든 정보를 보여준다 ex) person,para,emp

app.get( '/or', function ( req, res ) {
   Posts.find({ $or : [ { text : "a" }, { text : "p" } ] }, function ( err, result ) {
     if ( err ) {
			throw err;
		} else {
			res.send( result );
		}
   });
}); // db에 저장되어있는 text 테이블에 저장값이 지정값과 하나라도 일치할경우 보여준다,
    // or 같은경우 필드지정을 하지 않아도 사용 가능하므로 좀더 복잡한 코딩에서 유용하다

app.get( '/in', function ( req, res ) {
    Posts.find({ text : { $in : [ "amazon", "person" ] } }, function ( err, result ) {
     if ( err ) {
			throw err;
		} else {
			res.send( result );
		}
   });
}); // db에 저장되어있는 text 테이블에 저장값이 지정값과 하나라도 일치할경우 보여준다 in 같은 경우에는 필드를 지정해준다

app.get( '/remove/:query', function( req, res ) {
		var query = req.params['query'];
		Posts.remove({ text : query }, function ( err, result ) {
			if ( err ) {
       throw err;
     }
			 console.log(result)
       res.send("지 웠 습 니 다.");
	 });
}); // query에 해당하는 값을 지우고 "지웠습니다"출력, 콘솔애 로그결과값 띄움

app.get( '/update/:query', function ( req, res ) {
		var query = req.params['query'];
		var new_string = "updated";
		Posts.findOne({text:query}, function ( err, post ) {
			if (err) {
				throw err;
			} else {
				// post.update({text:new_string}, function ( err, result ){
				// 	if (err2) {
				// 		throw err;
				// 	}
				// 	res.send(result)
				// });
				post.text = new_string;
				post.save(function(err2) {
					if(err2) {
						throw err2;
					}
					res.send("변경");
				});
			}
		});
}); // query에 해당하는 값을 updated로 바꿔주고 "변경" 출력
