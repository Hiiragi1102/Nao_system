const socketIo = require('socket.io');
const express = require("express");
const path = require('path');
const http = require('http');
const { PythonShell } = require('python-shell');
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');
const url = require('url');
const index = require('./routes/index');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


//  textファイルの数をカウント
const files = fs.readdirSync('./data/text');
const fileCount = files.length - 1;



app.use(index);
app.use(express.static(path.join(__dirname, 'public')));

var i = 0;
var j = 0;

io.sockets.on('connection', function (socket) {
    i = 0;//　リロード時に0から読み込むため

    while (i <= fileCount) {
        text = fs.readFileSync('./data/text/' + i + '.txt', 'utf-8');
        socket.emit('Textfile_number', i, text);
        i += 1;
    }

    socket.on('changeText', (text, id) => {
        console.log("CHANGE TEXT")
        fs.writeFileSync('data/text/' + id + '.txt', text, (err) => {
            if (err) throw err;
            console.log('false');
        });
    })

    socket.on('moveNao', (id) => {

        text = fs.readFileSync('./data/text/' + id + '.txt', 'utf-8');
        console.log(text);

        var options = {
            mode: 'text', // textもしくはjson
            pythonPath: 'C:/Python27/python.exe',
            pythonOptions: ['-u'],
        };
        var pyshell = new PythonShell('./python/sample.py', options);

        pyshell.send(text);

        console.log("MOVE NAO")
        pyshell.on('message', function (data) {
            console.log(data);
        });
    })

    socket.on('addForm', () => {
        socket.emit("addform", i);
        i += 1;
    })

    socket.on('addForm_design', () => {
        socket.emit("addform_design", j);
        j += 1;
    })

});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});