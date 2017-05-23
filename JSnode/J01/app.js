var express = require('express'); // 모듈 express를 express 객체에 담음

var app = express(); // 객체 express를 app 객체에 담음 ()는 함수실행을 의미

var server = require('http').Server(app); // 모듈 http안 Server 함수에 app을 담아 server 객체에 담음 -> server 와 express를 연결하는 함수

server.listen(3000); // 3000번 포트로 서버를 연결함

app.get( '/', function ( req, res ) {
   res.send("환영합니다"); 
});