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
    socket.on('returnmode', (mode, id) => {
        const data = fs.readFileSync('./data/' + id + '/text/' + mode + '.txt', "utf-8", function (err, result) {
            if (err) console.log('error', err);
        });
        const jdata = fs.readFileSync('./data/' + id + '/json/' + mode + '_tent.json', 'utf-8');
        let jsondata = "";
        if (jdata != "") {
            jsondata = JSON.parse(jdata);
        }
        socket.emit("senddata", data, jsondata);
    })
    socket.on('jsonSave', (jsondata, textdata, jdata, mode, id) => {
        fs.writeFileSync('./data/' + id + '/json/' + mode + '.json', jsondata, (err) => {
            if (err) throw err;
            console.log('false');
        });
        fs.writeFileSync('./data/' + id + '/json/' + mode + '_tent.json', jdata, (err) => {
            if (err) throw err;
            console.log('false');
        });
        fs.writeFileSync('./data/' + id + '/text/' + mode + '.txt', textdata, (err) => {
            if (err) throw err;
            console.log('false');
        });
    })

    socket.on('moveNao', (mode, id) => {
        run_Nao(mode, id)
    })
});

async function run_Nao(mode, id) {
    let i = 0;
    let motion;
    const jsonslide = JSON.parse(fs.readFileSync('./data/' + id + '/json/' + mode + '.json', 'utf-8'));
    for await (let obj of jsonslide) {
        if (obj.motion == "") {
            motion = "speak";
        } else if (obj.motion == "motion1" && obj.face == "顔向けなし") {
            motion = "motion1";
        } else if (obj.motion == "motion2" && obj.face == "顔向けなし") {
            motion = "motion2";
        } else if (obj.motion == "motion3" && obj.face == "顔向けなし") {
            motion = "motion3";
        } else if (obj.motion == "motion4" && obj.face == "顔向けなし") {
            motion = "motion4";
        } else if (obj.motion == "motion5" && obj.face == "顔向けなし") {
            motion = "motion5";
        } else if (obj.motion == "motion1" && obj.face == "顔向けあり") {
            motion = "motion6";
        } else if (obj.motion == "motion2" && obj.face == "顔向けあり") {
            motion = "motion7";
        } else if (obj.motion == "motion3" && obj.face == "顔向けあり") {
            motion = "motion8";
        } else if (obj.motion == "motion4" && obj.face == "顔向けあり") {
            motion = "motion9";
        } else if (obj.motion == "motion5" && obj.face == "顔向けあり") {
            motion = "motion10";
        } else if (obj.motion == "motion11") {
            motion = "motion11";
        }
        await nao_motion(i, motion, mode, id);
        i++;
    }
}

async function nao_motion(i, motion, mode, id) {
    const jsonslide = JSON.parse(fs.readFileSync('./data/' + id + '/json/' + mode + '.json', 'utf-8'));
    const pyshell = new PythonShell('./public/python/' + motion + '.py', options);
    const text = jsonslide[i].text;
    const para = jsonslide[i].para;
    console.log(motion);
    let vol = 0;
    let spokenflag = false;
    if (para == "強調") {
        vol = 0.9;
    } else if (para == "デフォルト" || para == "") {
        vol = 0.3;
    }
    pyshell.send(text + "*" + vol);
    pyshell.on('message', function (data) {
        console.log(data);
        data = data.replace(/\r?\n/g, '');
        if (data == "spoken") {
            spokenflag = true;
            console.log("話したよ‼");
        }
    });
    return new Promise(resolve => {
        const timer = setInterval(() => {
            //console.log("loop1:" + spokenflag);
            if (spokenflag) {
                //console.log("clear");
                clearInterval(timer);
                resolve("fin1");
            }
        }, 500)
    });
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});