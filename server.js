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

app.use(index);
app.use(express.static(path.join(__dirname, 'public')));

var i = 0;
var boxnum = 0;

const slide1 = JSON.parse(fs.readFileSync('./data/json/slide.json', 'utf-8'));

// var a = new Array();
// var obj = {}

io.sockets.on('connection', function (socket) {
    i = 0;//　リロード時に0から読み込むため
    a = [];

    doJsonCommands('./data/json/slide.json');

    socket.on('addForm', () => {
        console.log("Add");
        json_add_newdata(slide1, i, "undesign");
        socket.emit('addform', i);
        console.log(slide1);
        i++;
        boxnum++;
    });

    socket.on('addForm_design', () => {
        console.log("Add");
        json_add_newdata(slide1, i, "design");
        socket.emit('addform_design', i);
        console.log(slide1);
        i++;
        boxnum++;
    });

    socket.on('delete_json', (index) => {
        json_delete_data(slide1, index);
        console.log(slide1);
        boxnum--;
    });

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

    function doJsonCommands(jsonPath) {
        const jsonObject = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        for (const obj of jsonObject) {
            if (obj.text != null) {
                socket.emit('Textload', obj.text, obj.flag, i);
            } else {
                console.log("undefined command : " + obj.command);
            }
            i++;
        }
    }

});

function json_add_newdata(target_data, i, flag){
    var new_data = {id: i, flag: flag};
    target_data.push(new_data)

}

function json_delete_data(target_data, i){
    delete target_data.splice(i, 1);
}


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});