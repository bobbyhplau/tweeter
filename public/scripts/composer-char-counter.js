$(document).ready(function() {
    $('textarea').on('input', function() {
        let counter = 140 - $(this).val().length;

        $('.counter').text(counter);

        if ($('.counter').text() >= 0) {
            $('.counter').css('color', 'inherit');
        } else {
            $('.counter').css('color', 'red');
        }
    });
});