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

const sleep = ms => new Promise(res => setTimeout(res, ms));//デバック

const options = {
    mode: 'text', // textもしくはjson
    pythonPath: 'C:/Python27/python.exe',
    pythonOptions: ['-u'],
};

app.use(index);
app.use(express.static(path.join(__dirname, 'public')));

io.sockets.on('connection', function (socket) {
    socket.emit("checkmode")
    socket.on('returnmode', (mode) => {
        const data = fs.readFileSync('./data/text/' + mode + '.txt', "utf-8", function (err, result) {
            if (err) console.log('error', err);
        });
        console.log(data)
        const jdata = fs.readFileSync('./data/json/' + mode + '_tent.json', 'utf-8');
        let jsondata ="";
        if (jdata != "") {
            jsondata = JSON.parse(jdata);
        }
        socket.emit("senddata", data, jsondata);
    })
    socket.on('jsonSave', (jsondata, textdata, jdata, mode) => {
        console.log("CHANGE TEXT")
        fs.writeFileSync('./data/json/' + mode + '.json', jsondata, (err) => {
            if (err) throw err;
            console.log('false');
        });
        fs.writeFileSync('./data/json/' + mode + '_tent.json', jdata, (err) => {
            if (err) throw err;
            console.log('false');
        });
        fs.writeFileSync('./data/text/' + mode + '.txt', textdata, (err) => {
            if (err) throw err;
            console.log('false');
        });
    })

    socket.on('moveNao', (mode) => {
        run_Nao(mode)
        console.log(mode);
    })
});

async function run_Nao(mode) {
    let i = 0;
    let motion;
    const jsonslide = JSON.parse(fs.readFileSync('./data/json/' + mode + '.json', 'utf-8'));
    console.log(motion);
    for await (let obj of jsonslide) {
        if (obj.motion == "") {
            motion = "speak";
            console.log(motion);
        } else if (obj.motion == "motion1") {
            motion = "motion1";
            console.log(motion);
        } else if (obj.motion == "motion2") {
            motion = "motion2";
            console.log(motion);
        } else if (obj.motion == "motion3") {
            motion = "motion3";
            console.log(motion);
        } else if (obj.motion == "motion4") {
            motion = "motion4";
            console.log(motion);
        } else if (obj.motion == "motion5") {
            motion = "motion5";
            console.log(motion);
        } else if (obj.motion == "motion6") {
            motion = "motion6";
            console.log(motion);
        }
        await nao_motion(i, motion, mode);
        i++;
    }
}

async function nao_motion(i, motion, mode) {
    const jsonslide = JSON.parse(fs.readFileSync('./data/json/' + mode + '.json', 'utf-8'));
    const pyshell = new PythonShell('./public/python/' + motion + '.py', options);
    const text = jsonslide[i].text;
    const num = jsonslide[i].end - jsonslide[i].start + 1;
    let spokenflag = false;
    console.log(text);
    pyshell.send(text);
    pyshell.on('message', function (data) {
        data = data.replace(/\r?\n/g, '');
        if (data == "spoken") {
            spokenflag = true;
            console.log("話したよ‼");
        }
    });
    return new Promise(resolve => {
        const timer = setInterval(() => {
            console.log("loop1:" + spokenflag);
            if (spokenflag) {
                console.log("clear");
                clearInterval(timer);
                resolve("fin1");
            }
        }, 500)
    });
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});