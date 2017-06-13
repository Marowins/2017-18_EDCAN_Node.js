var express = require('express'); // 모듈 express를 express 객체에 담음

var app = express(); // 객체 express를 app 객체에 담음 ()는 함수실행을 의미
var server = require('http').Server(app); // 모듈 http안 Server 함수에 app을 담아 server 객체에 담음 -> server 와 express를 연결하는 함수
server.listen(3000); // 3000번 포트로 서버를 연결함


var id = "admin";
var passwd = "1234";

app.get( '/:uid/:upw', function( req, res ) {

  if ( req.params['uid'] == id && req.params['upw'] == passwd ) {
    res.send("환영합니다 관리자님!");
  } else {
    res.send("관리자가 아닙니다!");
  }

});

app.get( '/:asdf', fuction( req, res ) {
  res.send(req.params['asdf']+"정의되지 않은 페이지에요..");
})




// var a = function( req, res ) {
//   var b = req.params["aaa"];
//   res.send(b);
// }
//
// var c = function( req ,res ) {
//   var a = req.params["aaa"];
//   var b = req.params["bbbb"];
//   res.send(a + ' ' + b);
// }
//
// app.get( '/:aaaaa', c );
// app.get( '/aaa', a );  // 이 코드의 경우 aaa를 입력했을때 코드가 중첩되므로 가장 위의 것부터 실행해준다, 따라서 원하는 결과를 얻고싶다면 코드를 위로 올리자
//                        // 만약 aaa를 입력했다면 /:aaaaa가 실행되어 c로 넘어가게 된다




// var a = function( req, res ) {
//   var b = req.params["aaa"];
//   res.send(b);
// }
//
// var c = function( req ,res ) {
//   var a = req.params["aaa"];
//   var b = req.params["bbbb"];
//   res.send(a + ' ' + b);
// }
//
// app.get( '/:aaa/:bbbb', c ); // 입력이 /:aaa/:bbbb로 들어오면 aaa에 입력한값 + 공백 + bbb에 입력한값 출력
// app.get( '/:aaa', a ); // 입력이 /:aaa로 들어오면 aaa에 입력한 값 출력





// app.get( '/:aaa/:bbb', function ( req, res ) { // aaa에 입력한값 + 공백 + bbb에 입력한값 출력
//    var a = req.params["aaa"];
//    var b = req.params["bbb"];
//    res.send(a+' '+b);
// });
