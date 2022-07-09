"use strict";

( function( $ ) {

	/*
	 * AJAX subscription
	 */
	$( document ).on( 'submit', '.mailchimp-container form', function( e ) {

		var form = $( this );

		// Remove messages.
		
		$( form ).closest('.mailchimp-container').find( '.mailchimp-alert' ).remove();
		
        function hidemessage() {
		setTimeout(function(){
					$( form ).closest('.mailchimp-container').find( '.mailchimp-alert' ).slideUp();
				}, 2200); 
		
		}
		// Policies.
		var privacy = $( form ).closest( '.mailchimp-container' ).find( 'input[name="buzzblogpro-mc-consent"]' );
		var loadingicon = $( form ).closest( '.mailchimp-container' ).find( '.ajax-loader' );

		if ( $( privacy ).length > 0 && ! $( privacy ).prop( 'checked' ) ) {
			$( form ).after( '<span class="mailchimp-alert">' + mc_var.warning_privacy + '</span>' );
			hidemessage();
			return false;
		}

		if ( !$( form ).hasClass( 'mailchimp-loading' ) ) {
			$.ajax( {
				type: 'POST',
				url: mc_var.ajax_url + '?action=buzzblogpro-mailchimp',
				data: $( form ).serialize(),
				beforeSend: function() {
					$( form ).addClass( 'mailchimp-loading' );
					$(loadingicon).fadeIn('fast');
				},
				success: function( data ) {
					$( form ).removeClass( 'mailchimp-loading' );
                    $(loadingicon).fadeOut('fast');
					if ( data.success ) {
						$( form ).after( '<span class="mailchimp-alert">' + data.data + '</span>' );
						hidemessage();
					} else {
						$( form ).after( '<span class="mailchimp-alert">' + data.data + '</span>' );
						hidemessage();
					}
				},
				error: function() {
					$( form ).after( '<span class="mailchimp-alert">Error server!</span>' );
                    $(loadingicon).fadeOut('fast');
					$( form ).removeClass( 'mailchimp-loading' );
					hidemessage();
				}
			} );

		}
		return false;
	} );

} )( jQuery );