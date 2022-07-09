/*
 * Buzzblogpro Mega Menu Plugin
 */
;(function ($) {
	$.fn.BuzzblogproMegaMenu = function( custom ) {

		var options = $.extend({
				events: 'mouseenter'
			}, custom),
			cacheMenu = {};


		return this.each(function() {
			var $thisMega = $(this),
				$megaMenuPosts = $('.mega-menu-posts', $thisMega);

			$thisMega.on(options.events+' touchend', '.mega-link', function(event) {
				event.preventDefault();

				var $self = $(this),
					termid = $self.data('termid'),
					itemid = $self.data('itemid'),
					tax = $self.data('tax'),
					parents = $self.parent().children( 'li' ),
					nosubmenu = $self.parents('.has-mega-sub-menu').attr('data-nosubmenu') ? $self.parents('.has-mega-sub-menu').attr('data-nosubmenu') : '3';
				if ( !$self.hasClass( 'active-link' ) ) {
				if( 'string' == typeof cacheMenu[itemid] ) {
					$megaMenuPosts.html( cacheMenu[itemid] );
				} else {
					if( $self.closest( ".mega-container" ).hasClass( 'loading' ) ) {
					
						return;
					}
					$self.closest( ".mega-container" ).addClass( 'loading' );
					
					$.ajax({
					 url: buzzblogproScript.ajax_url,
		             type: 'POST',
					 async: true,
		             data: {
			                action: 'buzzblogpro_theme_mega_posts',
							termid: termid,
							itemid: itemid,
							tax: tax,
							nosubmenu: nosubmenu
                           },
						complete: function () {
							$self.closest( ".mega-container" ).removeClass( 'loading' );
						}, 
						success: function( data ) {
							$megaMenuPosts.html( data );
							cacheMenu[itemid] = data;
						}
					});
				 }
				 parents.removeClass( 'active-link' );
				$self.addClass( 'active-link' );
				 }
			});

						// when hovering over top-level mega menu items, show the first one automatically
			$thisMega.on( 'mouseenter', '> a', function(){
			
			if($( this ).closest( 'li' ).find( '.mega-sub-menu li' ).hasClass('current-menu-item')){
				$( this ).closest( 'li' ).find( '.mega-sub-menu .current-menu-item.mega-link' ).trigger( options.events );
				}else{
				$( this ).closest( 'li' ).find( '.mega-sub-menu .mega-link:first' ).trigger( options.events );
				}

			} );
			
			
		});
	
	};

	$(document).ready(function() {

	
	/////////////////////////////////////////////
        // Search Form							
        /////////////////////////////////////////////
        var $search = $('#search-lightbox-wrap');
        if ($search.length > 0) {
            var cache = [],
                    xhr,
                    $input = $search.find('#searchform input'),
                    $result_wrapper = $search.find('.search-results-wrap');
					$result_wrapper.hide();
            $('.search-icon, .closeit').click(function (e) {
                e.preventDefault();
                if ($(this).hasClass('search-icon')) {
                    $result_wrapper.html('');
                    $input.val("");
					$result_wrapper.hide();
                }
                else {
                    if (xhr) {
                        xhr.abort();
                    }
                    //$search.fadeOut();
					$input.val("");
                   $result_wrapper.html('');
				   $result_wrapper.hide();
                }
            });

            $result_wrapper.on('click', '.search-option-tab a', function (e) {
                e.preventDefault();
                var $href = $(this).attr('href').replace('#', '');
                if ($href === 'all') {
                    $href = 'item';
                }
                else {
                    $result_wrapper.find('.result-item').stop().fadeOut();
                }
                if ($('#result-link-' + $href).length > 0) {
                    $('.view-all-button').hide();
                    $('#result-link-' + $href).show();
                }
                $result_wrapper.find('.result-' + $href).stop().fadeIn();
                $(this).closest('ul').children('li.active').removeClass('active');
                $(this).closest('li').addClass('active');
            });

            $input.prop('autocomplete', 'off').on('keyup', function (e) {
                function set_active_tab(index) {
                    if (index < 0) {
                        index = 0;
                    }
                    $result_wrapper.find('.search-option-tab li').eq(index).children('a').trigger('click');
                    $result_wrapper.show();
                }
                if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 8) {
                    var $v = $.trim($(this).val());
                    if ($v) {
                        if (cache[$v]) {
                            var $tab = $result_wrapper.find('.search-option-tab li.active').index();
                            $result_wrapper.hide();
                            set_active_tab($tab);
                            return;
                        }
                        setTimeout(function () {
                            $v = $.trim($input.val());
                            if (xhr) {
                                xhr.abort();
                            }
                            if (!$v) {
                                $result_wrapper.html('');
                                return;
                            }

                            xhr = $.ajax({
                                url: buzzblogproScript.ajax_url,
                                type: 'POST',
                                data: {'action': 'buzzblogpro_search_autocomplete', 'term': $v},
                                beforeSend: function () {
                                    $search.addClass('search-loading');
									$result_wrapper.show();
                                    $result_wrapper.html('<span class="loading"></span>');
                                },
                                complete: function () {
                                    $search.removeClass('search-loading');
                                },
                                success: function (resp) {
                                    if (!$v) {
                                        $result_wrapper.html('');
                                    }
                                    else if (resp) {
                                        var $tab = $result_wrapper.find('.search-option-tab li.active').index();
                                        $result_wrapper.hide().html(resp);
                                        set_active_tab($tab);
                                        $result_wrapper.find('.search-option-tab li.active')
                                        cache[$v] = resp;
                                    }
                                }
                            });
                        }, 100);
                    }
                    else {
                        $result_wrapper.html('');
						$result_wrapper.hide();
                    }
                }
            });
        }
	
	
	
		if( 'undefined' !== typeof $.fn.BuzzblogproMegaMenu ) {
			/* add required wrappers for mega menu items */
			$( '.has-sub-menu.has-mega-sub-menu' ).each(function(){
				var $this = $( this );

				$this.find( '> ul' ).removeAttr( 'class' )
					.wrap( '<div class="mega-sub-menu sub-menu" />' )
					.wrap( '<div class="mega-container" />' )
					.after( '<div class="mega-menu-posts" />' )
					.find( 'li.menu-item-type-taxonomy' ) // only taxonomy terms can display mega posts
						.addClass( 'mega-link' );
			});
			$('.has-sub-menu.has-mega-sub-menu').BuzzblogproMegaMenu({
				events: buzzblogproScript.events
			});
		} 
	});

})(jQuery);