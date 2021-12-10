function openWindow1(url, name) {
    window.open(url, name, 'width=400,height=300');
}

function returnWindow() {
    // 親ウィンドウの存在チェック
    if (!window.opener || window.opener.closed) {
        window.alert('親ウィンドウがありません。');
        return false;
    }
    // 子ウィンドから親ウィンドウへ値を渡す
    window.opener.document.getElementById("yasai").innerHTML = document.getElementById("yasai").value;
    window.opener.document.getElementById("kudamono").innerHTML = document.getElementById("kudamono").value;
}