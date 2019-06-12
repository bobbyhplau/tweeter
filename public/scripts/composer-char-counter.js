$(document).ready(function() {
    $('textarea').on('input', function() {
        const counter = $('.counter');
        let count = 140 - $(this).val().length;

        counter.text(count);

        if (count >= 0) {
            counter.css('color', "");
        } else {
            counter.css('color', 'red');
        }
    });
});