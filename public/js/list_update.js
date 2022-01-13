function update() {
    $('.list').html(function () {
        let i = 0;
        let data = "";
        while (i < nao_deform.length) {
            if (nao_deform[i].motion != "") {
                data = data + '<li>' + nao_deform[i].text + ':' + nao_deform[i].inte + '*' + nao_deform[i].motion + '*' + nao_deform[i].para + '</li>';
            }
        }
        return data;
    })
}