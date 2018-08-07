$(document).ready(function() {
    /* Slide navigation */
    // $(".button-collapse").sideNav();
    /* Add active class to nav */
    $(function() {
        if ((location.pathname.split("/")[1]) !== "") {
            $('.nav-wrapper a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
        }
    });
});
