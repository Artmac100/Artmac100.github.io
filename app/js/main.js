$(document).ready(function() {

	$('.mobile-menu').click(function(e){ 
		e.preventDefault();
	  	$('.header__topmenu').slideToggle();
	})
	$(window).resize(function() {
		var wid = $(window).width();
		if(wid > 768) {
			$('.header__topmenu').removeAttr('style');
		}
	});

	$('.accordion-menu a').on('click', function(e) {
		e.preventDefault();
		console.log($(this).children())
		$(this).siblings('ul').toggle();
		$(this).children('i').toggleClass('accord-arrow-right');
		$(this).children('i').toggleClass('accord-arrow-down');

	});
	$('.inner-banner').bannerSlider({
		slideLeft: '#prev-slide',
		slideRight: '#next-slide'
	});

	displayDropdown('.header__topmenu li', '.dropdown ')
	displayDropdown('.dropable', '.dropdown-submenu')

	function displayDropdown(parentSelector, childSelector) {
		$(parentSelector).click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			var siblings = $(this).siblings();
			if($(this).has(childSelector)) {
				siblings.hasClass('active-dropdown') && siblings.removeClass('active-dropdown');
				siblings.children().hasClass('display-block') && siblings.children().removeClass('display-block');
				$(this).children(childSelector).toggleClass('display-block');
				if(parentSelector === '.dropable') $(this).toggleClass('active-dropdown');
			}
		});
	}


});

