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

	displayDropdown('.header__topmenu li', 'ul.dropdown ')
	displayDropdown('.dropdown li', 'ul.dropdown-submenu')

	function displayDropdown(parentSelector, childSelector) {
		$(parentSelector).on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			if($(this).has(childSelector)) {
				$(this).siblings().children(childSelector).css('display', 'none');
				if(parentSelector === '.dropdown li') $(this).siblings().removeClass('active-dropdown');
				$(this).children(childSelector).toggle('display', 'block');
				if(parentSelector === '.dropdown li') $(this).toggleClass('active-dropdown');
			}
		});
	}
});

