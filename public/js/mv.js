var media = document.getElementById("mv");

//長さと再生時間を取得する関数 ▼
function getMdTime()
{
  media.pause();  //動画停止

  var movtime = media.duration;
  var plytime = media.currentTime;

  alert( plytime + "/" + movtime );

  media.play();  //再生再開
}

function goZero()
{
  media.currentTime = 0; //先頭に戻す
  media.play();
}