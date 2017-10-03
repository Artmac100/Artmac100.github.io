;(function($) {
	$.fn.bannerSlider = function(options) {
		var options = options || {} ;
		var settings = $.extend({
			slideWidth: 979,
			slideHeight: 'inherit',
			wrapperTarget: '.banner-item',
			mode: 'horizontal',
			duration: 1000,
			// styles for arrows
			slideLeft: '#prev',
			slideRight: '#next'
		}, options);
		var self = this;
		// css styles
		$(self).wrap('<div class="slider-wrapper"><div class="slider-viewport"></div></div>');
		var wrapper = $(self).parents('.slider-wrapper');
		wrapper.css({
			"margin": "0 auto",
			"display": "flex",
			"max-width": settings.slideWidth + "px",
			"height": settings.slideHeight + "px",
			"overflow": "hidden",
			"margin": "0 auto"
		})
		$(settings.wrapperTarget, self).wrap('<div class="slider-item"></div>');
		var slideItem = $('.slider-item').css( {
			"width": settings.slideWidth  + "px",
			"height": settings.slideHeight  + "px"
		});
		$(settings.wrapperTarget).css({
			"max-width": settings.slideWidth,
			"max-height": settings.slideHeight,
			"margin": "0 auto"
		});
		// Set css parametrs horizontal aligning for slider's items
		$(self).css({"width": "9999px "});
		slideItem.css({ "float": "left","display": "inline-flex"});
		// invoking of slide function
		sliding(settings.slideWidth, "margin-left");
		function sliding(heightOrWidth, slideTool) {
			// margin slide by default
			var ms = 0;
			// define max sliding steps
			var maxmr = -((slideItem.length - 1) * heightOrWidth);
			function slideAnimation() {
				// creating animation object
				var objAnim = {};
				objAnim[slideTool] = ms +"px";
				$(self).animate(objAnim, settings.duration);
			}
			$(settings.slideLeft).on("click", function(event) {
				event.preventDefault();
				ms += heightOrWidth;
				if (ms > 0) {
					ms = maxmr;
				}
				slideAnimation();

			});
			$(settings.slideRight).on("click", function(event) {
				event.preventDefault();
				ms -= heightOrWidth;
				if (ms < maxmr) {
					ms = 0;
				}
				slideAnimation();
			});
		}
	}
})(jQuery);
