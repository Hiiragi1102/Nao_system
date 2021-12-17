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
                        return '<b>' + p1 + '</b>';
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
                            while (val[i] !== "\u2064") {
                                if (val[i] == "\u2063" || i >= val_len) {
                                    i = i - 1;
                                    $elem.val(val.slice(0, j) + val.slice(j + 1));
                                    break;
                                } else if (val[i] == "\u2064" && flag == 0) {
                                    $elem.val(val.slice(0, j) + val.slice(i + 1));
                                    break;
                                }
                                else {
                                    flag = 1;
                                    i++;
                                }

                            }
                        } else if (val[i] == "\u2064") {
                            $elem.val(val.slice(0, i) + val.slice(i + 1));
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