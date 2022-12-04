
(function($) {
    // clock
    $(function() {
        timer = setInterval(function () {
            $('#currentDay').text(moment().format("dddd Do MMMM YYYY HH:mm:ss"));
        }, 1000);
    });
})(jQuery);
