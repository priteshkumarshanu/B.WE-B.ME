/**
 * Pin It
 */
( function( $ ) {

	$.fn.buzzblogproPinIt = function() {

		$( this ).each( function() {

			if ( $( this ).hasClass( 'pinterest-ready') || $( this ).hasClass( 'wp-block-cover__image-background' ) ) {
				return;
			}

			if ( $( this ).closest( 'figure' ).hasClass( 'tiled-gallery__item' ) ) {
				return;
			}

			var width  = $( this ).attr( 'width' );
			var height = $( this ).attr( 'height' );

			if ( typeof width === 'undefined' ) {
				width = $( this ).width();
			}

			if ( typeof height === 'undefined' ) {
				height = $( this ).height();
			}
			
			if ( !( parseInt( width ) > 120 && parseInt( height ) > 120 ) ) {
				$( this ).addClass( 'pinterest-ready' );
				return;
			}

			var container = $( this ).parent(),
				postURL = $( location ).attr( 'href' ),
				pinURL;

			if ( $( container ).is( 'a' ) ) {

				var imagehref = $( container ).attr( 'href' );

				if ( typeof imagehref !== 'undefined' && imagehref.match( /\.(gif|jpeg|jpg|png)/ ) ) {
					pinURL = imagehref;
				}

				if ( !( $( container ).closest( 'figure' ).length ) ) {
					$( container ).wrap( '<figure class="wrap-pin"></figure>' );
				}

				container = $( container ).parent();

			} else {
			
			if ( $( this ).closest( 'figure' ).hasClass( 'tiled-gallery__item' ) ) {
			return;
			}

				if ( !( $( container ).is( 'figure' ) || $( container ).closest( 'figure' ).length ) ) {
					$( this ).wrap( '<figure class="wrap-pin"></figure>' );
				}

				container = $( this ).parent();

			}

			if ( !$( this ).closest( 'figure' ).hasClass( 'wrap-pin' ) ) {
				$( this ).closest( 'figure' ).addClass( 'wrap-pin' );
			}

			if ( ! pinURL ) {
				if ( $( this ).is( 'img' ) ) {
					pinURL = ( $( this ).hasClass( 'lazyload' ) ) ? $( this ).data( 'src' ) : $( this ).attr( 'src' );
					
				} else {
					pinURL = ( typeof $( container ).find( 'img' ).data( 'src' ) !== 'undefined' ) ? $( container ).find( 'img' ).data( 'src' ) : $( container ).find( 'img' ).attr( 'src' );
				}
			}

			pinURL = encodeURIComponent( pinURL );
			postURL = encodeURIComponent( postURL );

			var figure = container;

			if ( !$( container ).is( 'figure' ) ) {
				figure = $( container ).closest( 'figure' );
			}

			// Get caption text.
			var imgDescription = $( figure ).find( 'img' ).data( 'pin-description' );

			if ( !imgDescription ) {
				imgDescription = $( figure ).find( '.wp-caption-text' ).text();
			}

			if ( !imgDescription ) {
				imgDescription = $( figure ).find( 'figcaption' ).text();
			}

			if ( !imgDescription ) {
				imgDescription = $( figure ).find( 'img' ).attr( 'alt' );
			}
			
			if ( imgDescription ) {
				// Add attribute to share URL.
				imgDescription = '&amp;description=' + encodeURIComponent( imgDescription );
			}
			
			// Img classes.
			var imgClasses = [ 'alignnone', 'aligncenter', 'alignleft', 'alignright' ];

			imgClasses.forEach( function( el ) {
				if ( $( container ).find( 'img' ).hasClass( el ) ) {
					$( container ).find( 'img' ).removeClass( el );
					$( container ).find( 'img' ).closest( 'figure' ).addClass( el );

					// Add width to figure.
					var imgWidth = $( container ).find( 'img' ).attr( 'width' );

					if ( parseInt( imgWidth ) !== 'NaN' ) {
						$( container ).find( 'img' ).closest( 'figure' ).width( imgWidth );
					}
				}
			} );

			// Add func PintIt.
			var addBuzzblogproPintIt = function( container ) {
				if ( ! $( container ).find( '.pinterest-share-icon' ).length ) {
					$( '<a class="pinterest-share-icon '+buzzblogpro_pinit_localize.iconclass+'" href="https://www.pinterest.com/pin/create/bookmarklet/?url=' + postURL + '&amp;media=' + pinURL + imgDescription + '&is_video=false" target="_blank">'+buzzblogpro_pinit_localize.icon+'</a>' )
						.appendTo( container );
				}
			}

				addBuzzblogproPintIt( container );
			

			$( this ).addClass( 'pinterest-ready' );
		} );
	};


	function initBuzzblogproPinIt() {

		var filterBuzzblogproPinIt = function() {
			var exclude = buzzblogpro_pinit_localize.exclude_selectors;
			if ( exclude ) {
				if ( $( this ).closest( exclude ).length > 0 ) {
					return false;
				}
			}
			return true;
		}

		$( buzzblogpro_pinit_localize.image_selectors ).filter( filterBuzzblogproPinIt ).buzzblogproPinIt();
	
}
	$( document ).ready( function() {
		initBuzzblogproPinIt();
		$(document).on('lazybeforeunveil lazyloaded', function(e){
		 if(e.type == 'lazyloaded'){
		  
		initBuzzblogproPinIt();
		}
		});
	} );
} )( jQuery );


// var header = document.getElementById("myDIV");
// var btns = header.getElementsByClassName("btn");
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//   var current = document.getElementsByClassName("active");
//   current[0].className = current[0].className.replace(" active", "");
//   this.className += " active";
//   });
// }
// $(function(){
// 	debugger;
//     var current = location.pathname;
//     $('#nav ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.addClass('current-menu-item current_page_item');
//         }
//     })
// })


// $('.make-active a').on('click', function(){
// 	alert(this);
//     $('.make-active').removeClass('');
//     $(this).addClass('current-menu-item current_page_item');
// });
