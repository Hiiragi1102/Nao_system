let nao_design = [];
let nao_deform = [];

function loaddata(jsondata) {
    if (jsondata != "") {
        nao_design = jsondata;
    }
}

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
    var faceRadio = document.getElementsByName('face');
    var paraRadio = document.getElementsByName('para');
    let intentionLen = intentionRadio.length;
    let motionLen = motionRadio.length;
    let faceLen = faceRadio.length;
    let paraLen = paraRadio.length;
    var checkValue_intention = '';
    var checkValue_motion = '';
    var checkValue_face = '';
    var checkValue_para = '';
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
    for (var i = 0; i < faceLen; i++) {
        if (faceRadio.item(i).checked) {
            checkValue_face = faceRadio.item(i).value;
        }
    }
    for (var i = 0; i < paraLen; i++) {
        if (paraRadio.item(i).checked) {
            checkValue_para = paraRadio.item(i).value;
        }
    }
    nao_design.push({ "start": start - Mark_num, "end": end - 1 - Mark_num, "text": "", "inte": checkValue_intention, "motion": checkValue_motion, "face": checkValue_face, "para": checkValue_para });//keep_mark_val_deleteようにend-2
    nao_design.sort(compare);
    return res;
};

function Mark_count(num) {
    var element = document.getElementById("textarea1");
    var val = element.value;
    var Mark_num = 0;
    for (var i = 0; i < num; i++) {
        if (val[i] == "\u2063" || val[i] == "\u2064") {
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
    for (i = 0; i < length; i++) {
        if (j == nao_design.length) {
            nao_deform.push({ "start": i, "end": length, "text": val.substring(i, length + 1), "inte": "", "motion": "", "face": "", "para": "" });
            i = length;
        }
        else if (i == 0 && i == nao_design[j].start) {
            nao_deform.push({ "start": nao_design[j].start, "end": nao_design[j].end, "text": val.substring(nao_design[j].start, nao_design[j].end + 1), "inte": nao_design[j].inte, "motion": nao_design[j].motion, "face": nao_design[j].face, "para": nao_design[j].para });
            i = nao_design[j].end;
            n = i + 1;
            j++;
        } else if (i == nao_design[j].start) {
            nao_deform.push({ "start": n, "end": i - 1, "text": val.substring(n, i), "inte": "", "motion": "", "face": "", "para": "" });
            nao_deform.push({ "start": nao_design[j].start, "end": nao_design[j].end, "text": val.substring(nao_design[j].start, nao_design[j].end + 1), "inte": nao_design[j].inte, "motion": nao_design[j].motion, "face": nao_design[j].face, "para": nao_design[j].para });
            i = nao_design[j].end;
            n = i + 1;
            j++;
        }
    }
}

function rjson() {
    const data = JSON.stringify(nao_design);
    return data;
}

function tojson() {
    const data = JSON.stringify(nao_deform);
    return data;
}

function update() {
    $('.list').html(function () {
        let i = 0;
        let data = "";
        let motion = "";
        while (i < nao_deform.length) {
            if (nao_deform[i].inte != "") {
                if (nao_deform[i].motion == "") {
                    motion = "動作なし";
                } else if (nao_deform[i].motion == "motion1" || nao_deform[i].motion == "motion6") {
                    motion = "上段指さし";
                } else if (nao_deform[i].motion == "motion2" || nao_deform[i].motion == "motion7") {
                    motion = "中段指さし";
                } else if (nao_deform[i].motion == "motion3" || nao_deform[i].motion == "motion8") {
                    motion = "下段指差し";
                } else if (nao_deform[i].motion == "motion4" || nao_deform[i].motion == "motion9") {
                    motion = "手前指差し";
                } else if (nao_deform[i].motion == "motion5" || nao_deform[i].motion == "motion10") {
                    motion = "奥指差し";
                } else if (nao_deform[i].motion == "motion11") {
                    motion = "動作強調";
                }
                data = data + '<li>' + nao_deform[i].text + ':' + nao_deform[i].inte + '*' + nao_deform[i].para + '*' + nao_deform[i].face + '*' + motion + '</li>';
            }
            i++;
        }
        return data;
    })
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

                changeval: function (oldval, curval) {
                    var element = document.getElementById("textarea1");
                    var start = element.selectionStart;
                    var oldlen = oldval.length;
                    var curlen = curval.length;
                    var len = oldlen - curlen;
                    var mark_num = Mark_count(start);
                    var json_len = nao_design.length;
                    var flag = true;
                    var j = 0;
                    len = oldlen - curlen
                    if (oldval == "") {
                        flag = false;
                        console.log(flag);
                    }
                    while (j < oldlen && j < curlen) {
                        console.log(flag);
                        if (curval[j] != oldval[j] && curval[j] == "\u2063") {
                            flag = false;

                            break;
                        }
                        j++;
                    }
                    if (flag == true) {
                        for (let i = 0; i < json_len; i++) {
                            if (nao_design[i].start > start - mark_num) {
                                nao_design[i].start = nao_design[i].start - len;
                                nao_design[i].end = nao_design[i].end - len;
                            } else if (nao_design[i].start < start - mark_num && start - mark_num < nao_design[i].end) {
                                nao_design[i].end = nao_design[i].end - len;
                            }
                        }
                    }
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
                                $elem.val(val.slice(0, j) + val.slice(i + 1));
                                break;
                            }
                            while (val[i] != "\u2064") {
                                if (val[i] == "\u2063" || i >= val_len) {
                                    var M_D_F = disp();
                                    if (M_D_F == 1) {
                                        i = i - 1;
                                        nao_design = nao_design.filter((nao_design) => (nao_design.start != j - Mark_count(j)));
                                        $elem.val(val.slice(0, j) + val.slice(j + 1));
                                        break;
                                    } else {
                                        var end = $elem.get(0).selectionEnd;
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
                            if (M_D_F == 1) {
                                nao_design = nao_design.filter((nao_design) => (nao_design.end != i - Mark_count(i) + 1));
                                $elem.val(val.slice(0, i) + val.slice(i + 1));
                                break;
                            } else {
                                var start = $elem.get(0).selectionStart;
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
                    $div.changeval(oldval, curval);
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

function keep_mark_val_delete() {
    for (let i = 0; i < json_len; i++) {
        if (nao_design[i].start > start) {
            nao_design[i].star - len;
            nao_design[i].end - len;
        }
    }
}

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