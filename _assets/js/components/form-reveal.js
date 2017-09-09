$(document).ready(function() {
  $(".form-reveal").on("click", function() {

    if ( $( ".rsvp-form" ).is( ":hidden" ) ) {
      $( ".rsvp-form" ).slideDown( "slow" );
    } else {
      $( ".rsvp-form" ).hide("slow");
    }

  });
});
