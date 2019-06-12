$(document).ready(function() {
    $('.compose').click(function() {
        let windo = $('.new-tweet');
        if (windo.css('display') === 'none') {
            windo.slideDown('fast');
            $('textarea').focus();
        } else {
            windo.slideUp('fast');
        }
    });
});