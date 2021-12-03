const socketio = require('socket.io');
const express = require("express");
const path = require('path');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');
const url = require('url');
const server = http.createServer(RouteSetting);
const app = express();

// server.on('request', doRequest);

var mainPage = fs.readFileSync('./index.html', 'utf-8');
var scriptJs = fs.readdirSync('js', 'utf-8');
//var scriptJs = fs.readFileSync('./js/(.*)?.js', 'utf-8');
var addformJs = fs.readFileSync('./js/addform.js', 'utf-8');
var writetextJs = fs.readFileSync('./js/writetext.js', 'utf-8');
// var mvJs = fs.readFileSync('./js/mv.js', 'utf-8');
// var playJs = fs.readFileSync('./js/play.js', 'utf-8');
var styleCss = fs.readFileSync('./css/style.css', 'UTF-8');


// // リクエストの処理
// function doRequest(req, res) {
// // コンテンツを表示する。
//     function doReard(err, data) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write(data);
//         res.end();
//     }

// }

var io = socketio.listen(server);
 
io.sockets.on('connection', function(socket) {
    socket.on('client_to_server', function(data) {
        io.sockets.emit('server_to_client', {value : data.value});
    });
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


function RouteSetting(req, res) {
    var url_parts = url.parse(req.url);
    switch (url_parts.pathname) {
        case '/':
            // '/'にアクセスした時の処理
            break;
        case '/index.html':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(mainPage);
            res.end();
            break;


        case '/css/style.css':
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(styleCss);
            res.end();
            break;

        // case '/js(/.*)?.js':
        //     res.writeHead(200, { 'Content-Type': 'text/plain' });
        //     res.write(scriptJs);
        //     res.end();
        //     break;

        case '/js/addform.js':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(addformJs);
            res.end();
            break;

        case '/js/writetext.js':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(writetextJs);
            res.end();
            break;

        default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('not found');
            break;
    }
}

var i = 0;
var length = 10;
function textSave() {
    while (i <= length) {
        writetext(i);
    }
    i = 0;
    console.log('完了しました');
}

function writetext(i) {
    const fs = require("fs");
    const element = document.getElementById('inputform_' + i);
    const data = element.value
    fs.writeFile('text/file' + i + '.txt', data, (err) => {
        if (err) throw err;
        console.log('正常に書き込みが完了しました');
    });
}