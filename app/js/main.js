$(document).ready(function() {
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
			console.log(childSelector)
			if($(this).has(childSelector)) {
				siblings.hasClass('active-dropdown') && siblings.removeClass('active-dropdown');
				siblings.children().hasClass('display-block') && siblings.children().removeClass('display-block');
				$(this).children(childSelector).toggleClass('display-block');
				if(parentSelector === '.dropable') $(this).toggleClass('active-dropdown');
			}
		});
	}
});

