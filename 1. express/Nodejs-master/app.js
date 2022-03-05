var express = require('express')
var app = express()
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var port = 5000;

app.get('/', function(request, response) {
    response.status(200).send('웹서버 실행')
})

app.listen(port, function() {
    console.log(`http://localhost:${port}`)
})

//