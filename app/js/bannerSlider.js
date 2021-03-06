;(function($) {
	$.fn.bannerSlider = function(options) {
		var options = options || {} ;
		var settings = $.extend({
			slideHeight: 'inherit',
			wrapperTarget: '.banner-item',
			duration: 1,
			easing: 'ease',
			// styles for arrows
			slideLeft: '#prev',
			slideRight: '#next'
		}, options);
		var self = this;
		// css styles
		settings.slideWidth = $(settings.wrapperTarget).width();
		$(self).wrap('<div class="slider-wrapper"><div class="slider-viewport"></div></div>');
		$( window ).on('resize',function() {
			settings.slideWidth = $('.container').width();
		});
		var wrapper = $(self).parents('.slider-wrapper');
		wrapper.css({
			"display": "flex",
			"max-width": settings.slideWidth,
			"min-height": settings.slideHeight,
			"overflow": "hidden",
			"margin": "0 auto"
		});
		$(settings.wrapperTarget, self).wrap('<div class="slider-item"></div>');
		var slideItem = $('.slider-item').css( {
			"width": settings.slideWidth,
			"min-height": settings.slideHeight
		});
		// Set css parametrs horizontal aligning for slider's items
		$(self).css({
			"width": "9999px", 
			"position": "relative",
			"transition": settings.duration +"s all " + settings.easing
		});
		slideItem.css({ "display": "flex"});
		// invoking of slide function
		sliding(settings.slideWidth, "transform");
		function sliding(heightOrWidth, slideTool) {
			// margin slide by default
			var ms = 0;
			// define max sliding steps
			var maxmr = -((slideItem.length - 1) * heightOrWidth);
			function slideAnimation() {
				// creating animation object
				var objAnim = {};
				objAnim[slideTool] = 'translateX(' + ms + 'px)';
				$(self).css(objAnim);
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
