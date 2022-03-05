var express = require('express')
var app = express()
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
// var helmet = require('helmet'); //보안
// app.use.helmet();

var indexRouter = require('./routes/index')
var topicRouter = require('./routes/topic');

app.use(express.static('public')); //public 디렉토리 안에서 static파일을 찾으라는 코드
app.use(bodyParser.urlencoded({ extended: false })) //application 파싱(분석)
    //app.use(bodyParser.json()); json 파싱(분석)
app.use(compression());
app.get('*', function(request, response, next) { //파라미터 request 객체가 인자로써 전달되도록 약속하는것.
    fs.readdir('./data', function(error, filelist) {
        request.list = filelist;
        next(); //미들웨어가 담겨있어서  next(); 하면 실행이 된다.
    });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
    //미들웨어는 순차적으로 진행하기 때문에 더 이상 실행하지 못하고 여기까지 오면 못찾는다.
});

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!');
});

app.listen(3000, function() {
    console.log('http://localhost:3000')
});