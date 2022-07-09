(function ($) {
    'use strict';
	if ($('.sticky-nav').length && !$('#elementor_sticky_header').length) {
	var navheight = $('.sticky-nav').outerHeight(true);
	var sticky_navigation_offset_top = $('.sticky-nav').offset().top;
	
	function stickyNavigation(){
		var scroll_top = $(window).scrollTop();
		if (scroll_top > sticky_navigation_offset_top+navheight+250) { 
			$('.sticky-nav').addClass("navbar-fixed-top");
			$('body').addClass("navbar-fixed"); 
			$(".sticky-wrapper").height(navheight);
		} 
		if (scroll_top <= sticky_navigation_offset_top) { 
		$('.sticky-nav').removeClass("navbar-fixed-top");
			 $('body').removeClass("navbar-fixed");
			$(".sticky-wrapper").removeAttr("style");	
		}
	};

window.addEventListener('scroll', stickyNavigation);
	}
}(jQuery));