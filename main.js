var http = require("http");
http.createServer(function(request, response) {
    /*
        HTTP 헤더 전송
        HTTP Status 200 : OK
        Content Type: text/plain
    */
    response.writeHead(200, {'Content-Type': 'text/plain'});
    /*
        Response Body를 "Hello World"로 설정
    */
    response.end("Hello World\n");
}).listen(8000);

console.log("Server running at http://127.0.0.1:8000");

// events 모듈 사용
var events = require('events');

// EventEmitter 객체 생성
var eventEmitter = new events.EventEmitter();

// event와 EventHandler를 연동(bind)
// eventName은 임의로 설정 가능
var connectHandler = function connected() {
    console.log("Connection Successful");

    // data_received 이벤트 발생시키기
    eventEmitter.emit('data_received');
}

//connection 이벤트와 connectHandler 이벤트 핸들러를 연동
eventEmitter.on('connection', connectHandler);

// data_received 이벤트와 익명 함수 연동
// 함수를 변수 안에 담는 대신에, .on() 메소드의 인자로 직접 함수를 전달
eventEmitter.on('data_received', function() {
    console.log("Data Received");
});

// connection 이벤트 발생시키기
eventEmitter.emit('connection');

console.log("Program has ended");
