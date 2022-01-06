function doJsonCommands(jsonPath) {
    const jsonObject = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    for (const obj of jsonObject) {
        if (obj.text != null) {
            socket.emit('Textload', obj.text, obj.frag, i);
        } else {
            console.log("undefined command : " + obj.command);
        }
    }
}
