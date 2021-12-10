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
					// var keep = 
					var escaped = $('<div>').text(v).html();
					console.log(re);
					console.log(v);
					console.log(escaped);
					var html = escaped.replace(re, '<b>' + re + '</b>');
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
			}
		};
	};

	// textarea の変更を拾ってレイヤを更新する
	var hashtag = function (textarea) {
		var $elem = $(textarea), evtsuffix = '.hashtag';

		var bind = function () {
			var layer = underlay(textarea);

			$(function () {
				// $($elem).mouseup(upFunc);
				$($elem).on('mouseup' + evtsuffix, $.proxy(layer.update, layer));
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