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

const sleep = ms => new Promise(res => setTimeout(res, ms));

const options = {
    mode: 'text', // textもしくはjson
    pythonPath: 'C:/Python27/python.exe',
    pythonOptions: ['-u'],
};

app.use(index);
app.use(express.static(path.join(__dirname, 'public')));

io.sockets.on('connection', function (socket) {
    socket.on('jsonSave', (data) => {
        console.log("CHANGE TEXT")
        fs.writeFileSync('data/json/slide1.json', data, (err) => {
            if (err) throw err;
            console.log('false');
        });
    })

    socket.on('moveNao', () => {
        run_Nao()
        console.log("play2");
    })
});

async function run_Nao() {
    let i = 0;
    let motion;
    const jsonslide = JSON.parse(fs.readFileSync('./data/json/slide1.json', 'utf-8'));

    for await (let obj of jsonslide) {
        if (obj.inte == "") {
            motion = "speak";
        } else if (obj.motion == "motion1") {
            motion = "motion1";
        }
        await nao_motion(i, motion);
        i++;
    }
}

async function nao_motion(i, motion) {
    const jsonslide = JSON.parse(fs.readFileSync('./data/json/slide1.json', 'utf-8'));
    const pyshell = new PythonShell('./public/python/' + motion + '.py', options);
    const jsonslide = JSON.parse(fs.readFileSync('./data/json/slide1.json', 'utf-8'));
    const text = jsonslide[i].text;
    const num = jsonslide[i].end - jsonslide[i].start + 1;
    let spokenflag = false;
    console.log(text);
    pyshell.send(text);
    pyshell.on('message', function (data) {
        data = data.replace(/\r?\n/g, '');
        console.log("nomotion:" + data);
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
        },500)
    });
}

// async function motion1(i) {
//     const pyshell_speak = new PythonShell('./public/python/speak.py', options);


//     const jsonslide = JSON.parse(fs.readFileSync('./data/json/slide1.json', 'utf-8'));
//     const text = jsonslide[i].text;
//     const num = jsonslide[i].end - jsonslide[i].start;
//     let spokenflag = false;

//     console.log(text);
//     pyshell_speak.send(text);
//     pyshell_speak.on('message', function (data) {
//         data = data.replace(/\r?\n/g, '');
//         console.log("motion1:" + data + "sss");
//         if (data == "spoken") {
//             spokenflag = true;
//             console.log("話したよ‼");
//         }
//     });
//     return new Promise(resolve => {
//         const timer = setInterval(() => {
//             console.log("loop2:" + spokenflag);
//             if (spokenflag) {
//                 console.log("clear");
//                 clearInterval(timer);
//                 resolve("fin2");
//             }
//         }, 1000)
//     });
// }



function json_add_newdata(target_data, i, flag) {
    var new_data = { id: i, flag: flag };
    target_data.push(new_data)

}

function json_delete_data(target_data, i) {
    delete target_data.splice(i, 1);
}


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});