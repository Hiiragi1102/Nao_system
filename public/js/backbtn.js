class Nao_design {
    constructor(start, end, text, inte, motion) { /* コンストラクタ */
        this.start = start
        this.end = end
        this.text = text
        this.inte = inte
        this.motion = motion
    }
}

var nao_design = [];
var nao_deform = [];

function design() {
    var element = document.getElementById("textarea1");
    var str = element.value;
    element.value = addMark(str, element.selectionStart, element.selectionEnd,);
    document.getElementById('contextmenu').style.display = "none";
};

function design_cancel() {
    document.getElementById('contextmenu').style.display = "none";
};


function addMark(str, start, end) {
    var res = str.slice(0, start) + "\u2063" + str.slice(start);
    var intentionRadio = document.getElementsByName('intention');
    var motionRadio = document.getElementsByName('motion');
    let intentionLen = intentionRadio.length;
    let motionLen = motionRadio.length;
    var checkValue_intention = '';
    var checkValue_motion = '';
    res = res.slice(0, end + 1) + "\u2064" + res.slice(end + 1);
    Mark_num = Mark_count(start);
    for (var i = 0; i < intentionLen; i++) {
        if (intentionRadio.item(i).checked) {
            checkValue_intention = intentionRadio.item(i).value;
        }
    }
    for (var i = 0; i < motionLen; i++) {
        if (motionRadio.item(i).checked) {
            checkValue_motion = motionRadio.item(i).value;
        }
    }
    nao_design.push(new Nao_design(start - Mark_num, end - 1 - Mark_num, "", checkValue_intention, checkValue_motion));
    nao_design.sort(compare);
    return res;
};

function Mark_count(num) {
    var element = document.getElementById("textarea1");
    var val = element.value;
    var Mark_num = 0;
    for (var i = 0; i < num; i++) {
        if (val[i] == "\u2063" || val[i] == "\u2064") {
            console.log("a");
            Mark_num++;
        }
    }
    return Mark_num;
}

function Mark_delete(val) {
    val = val.replace(/\u2063/g, "");
    val = val.replace(/\u2064/g, "");
    return val;
}

function disp() {
    var design_delete_flag;
    // 「OK」時の処理開始 ＋ 確認ダイアログの表示
    if (window.confirm('デザインを削除してもよろしいですか？')) {
        design_delete_flag = 1;
        return design_delete_flag
    }
    // 「OK」時の処理終了
    // 「キャンセル」時の処理開始
    else {
        window.alert('キャンセルされました');
        design_delete_flag = 0;
        return design_delete_flag
    }
    // 「キャンセル」時の処理終了
}

function deform_class() {
    var elem = document.getElementById("textarea1");
    var val = Mark_delete(elem.value);
    var length = val.length;
    var i = 0, j = 0, n = 0;
    nao_deform = [];
    console.log("a");
    for (i = 0; i < length; i++) {
        console.log("b");
        //0から意図があった場合はあと
        if (j == nao_design.length) {
            nao_deform.push(new Nao_design(i, length, val.substring(i, length + 1), "", ""));
            i = length;
        }
        else if (i == 0 && i == nao_design[j].start) {
            nao_deform.push(new Nao_design(nao_design[j].start, nao_design[j].end, val.substring(nao_design[j].start, nao_design[j].end + 1), nao_design[j].inte, nao_design[j].motion));
            i = nao_design[j].end;
            n = i + 1;
            j++;
        } else if (i == nao_design[j].start) {
            console.log("c");
            nao_deform.push(new Nao_design(n, i - 1, val.substring(n, i), "", ""));
            nao_deform.push(new Nao_design(nao_design[j].start, nao_design[j].end, val.substring(nao_design[j].start, nao_design[j].end + 1), nao_design[j].inte, nao_design[j].motion));
            i = nao_design[j].end;
            n = i + 1;
            j++;
        }
    }
}

function tojson() {
    const data = JSON.stringify(nao_deform);
    return data;
}

(function ($) {

    // レイヤ
    var underlay = function (textarea) {

        var $elem = $(textarea), oldval = $elem.val(),
            // レイヤに適用する mixin
            mixin = {
                cssSync: function () {
                    return this.css({
                        padding: $elem.css('padding'),
                        margin: $elem.css('margin'),
                        "line-height": $elem.css('line-height'),
                        "font-size": $elem.css('font-size')
                    });
                },
                adjust: function () {
                    var pos = $elem.position();
                    return this.css({
                        width: $elem.outerWidth() + 'px',
                        left: pos.left + 'px',
                        top: pos.top + 'px'
                    });
                },
                refresh: function () {
                    var re = new RegExp(/\u2063(\S+?)\u2064/g), v = $elem.val();
                    var escaped = $('<div>').text(v).html();
                    var html = escaped.replace(re, function (m, p1, offset, str) {
                        return '<span class= Layer_span id=' + randomId(4) + '>' + p1 + '</span>';
                    });
                    return this.children('.Layer').html(html).end();
                },
                deleteMark: function () {
                    var i = 0, j = 0;
                    var val = $elem.val();
                    var val_len = val.length;
                    var flag = 0;//0:開始Mark \u2063未発見 or 発見したのちに文字列未発見
                    for (i = 0; i < val_len; i++) {
                        if (val[i] == "\u2063") {
                            j = i;
                            i++;
                            if (val[i] == "\u2064" && flag == 0) {
                                console.log("a");
                                $elem.val(val.slice(0, j) + val.slice(i + 1));
                                break;
                            }
                            while (val[i] != "\u2064") {
                                if (val[i] == "\u2063" || i >= val_len) {
                                    var M_D_F = disp();
                                    console.log(M_D_F)
                                    if (M_D_F == 1) {
                                        i = i - 1;
                                        $elem.val(val.slice(0, j) + val.slice(j + 1));
                                        break;
                                    } else {
                                        var end = $elem.get(0).selectionEnd;
                                        console.log(end);
                                        $elem.val(val.slice(0, end) + "\u2064" + val.slice(end));
                                        break;
                                    }
                                } else {
                                    flag = 1;
                                    i++;
                                }

                            }
                        } else if (val[i] == "\u2064") {
                            var M_D_F = disp();
                            console.log(i)
                            console.log(M_D_F)
                            if (M_D_F == 1) {
                                $elem.val(val.slice(0, i) + val.slice(i + 1));
                                break;
                            } else {
                                var start = $elem.get(0).selectionStart;
                                console.log(start);
                                $elem.val(val.slice(0, start) + "\u2063" + val.slice(start));
                                i++;
                                break;
                            }
                        }
                        flag = 0;
                    }
                }
            },
            // レイヤ本体
            $div = $('<div class="Layer"><span class="Layer"></span></div>').insertBefore($elem)
                .extend(mixin).cssSync().adjust();

        return {
            update: function () {
                var curval = $elem.val();
                if (curval !== oldval) {
                    $div.deleteMark();
                    $div.refresh();
                    oldval = curval;
                }
            },
            update2: function () {
                var curval = $elem.val();
                if (curval !== oldval) {
                    $div.refresh();
                    oldval = curval;
                }
            }
        };
    };
    // textarea の変更を拾ってレイヤを更新する
    var hashtag = function (textarea) {
        var $elem = $(textarea), evtsuffix = '.hashtag';

        var bind = function () {
            var events = ['keydown', 'keyup', 'keypress', 'change', 'mouseup'], layer = underlay(textarea);
            $.each(events, function (i, evt) {
                $elem.on(evt + evtsuffix, $.proxy(layer.update, layer));
            });


            // リサイズではなく、高さを自動拡張する
            $elem.on('scroll' + evtsuffix, function () {
                $elem.height($elem.height() + $elem.scrollTop());
            });

            $elem.data('hashtag', 'initialized');
        };

        return {
            init: function () {
                if (!$elem.is('textarea') || $elem.data('hashtag')) {
                    return;
                }
                bind();
            }
        };
    };

    $.fn['hashtag'] = function () {
        return this.each(function (i, elem) {
            hashtag(elem).init();
        });
    };

})(jQuery);

const randomId = (randomLength, prefix, suffix) => {
    prefix = prefix === undefined ? '' : prefix;
    suffix = suffix === undefined ? '' : suffix;

    const firstChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const chars = firstChars + '0123456789';
    const retryLimit = 100;
    let retryCount = 0;

    while (retryCount < retryLimit) {
        let id = prefix;
        for (var i = 0; i < randomLength; i++) {
            if (id.length <= 0) {
                // 先頭は英字のみ (HTML4のルール。一応)
                id += firstChars[Math.floor(Math.random() * firstChars.length)];
            } else {
                id += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        id += suffix;

        // 重複チェック
        if (document.getElementById(id) === null) {
            return id;
        }
        ++retryCount;
    }
    return null;
}