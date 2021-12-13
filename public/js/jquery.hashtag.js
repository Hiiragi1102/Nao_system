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
					var selection = window.getSelection()
					var re = selection.toString(), v = $elem.val();
					var element = document.getElementById("textarea1");
					var not_tag = 0;
					var tag = 0;
					var old = $('span').html();
					var keep, replace, html;

					if (old == "") {
						keep = v.slice(0, element.selectionStart)
						replace = v.slice(element.selectionStart);
						html = keep + replace.replace(re, '<b>' + re + '</b>');
						return this.children('span').html(html).end();
					}
					else {
						for (var i = 0; i < element.selectionStart + tag; i++) {
							if (old[i] == '<') {
								tag++;
								while (old[i] != '>') {
									i++;
									tag++;
								}
							}
							else {
								console.log(old[i]);
								not_tag += 1;
							}
						}

						keep = old.slice(0, i)
						replace = old.slice(i);
						html = keep + replace.replace(re, '<b>' + re + '</b>');
						return this.children('span').html(html).end();
					}
				},
				refresh2: function () {
					var v = $elem.val();
					var old = $('span').html();
					var html = $('<div>').text(v).html();
					return this.children('span').html(html).end();
				}
			},
			// レイヤ本体
			$div = $('<div class="Layer"><span></span></div>').insertBefore($elem)
				.extend(mixin).cssSync().adjust();

		return {
			update: function () {
				var selection = window.getSelection()
				var selectedStr = selection.toString();
				if (selectedStr !== '' && selectedStr !== '\n') {  //文章チェック
					$div.refresh();
				}
			},
			update2: function () {
				var curval = $elem.val();
				var element = document.getElementById("textarea1");
				console.log(element.selectionStart);
				console.log(element.selectionEnd);
				$div.refresh2();
			}
		};
	};

	// textarea の変更を拾ってレイヤを更新する
	var hashtag = function (textarea) {
		var $elem = $(textarea), evtsuffix = '.hashtag';

		var bind = function () {
			var layer = underlay(textarea);

			$(function () {
				$($elem).on('mouseup' + evtsuffix, $.proxy(layer.update, layer));
			});


			var events = ['keydown', 'keyup', 'keypress', 'change']
			$.each(events, function (i, evt) {
				$elem.on(evt + evtsuffix, $.proxy(layer.update2, layer));
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