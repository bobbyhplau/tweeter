$(document).ready(function() {
    $('.tweet').on('mouseenter', function() {
        $(this).find('header').css('background-color', '#EEEEEE');
        $(this).find('h2').css('opacity', 1);
        $(this).find('.displaypic').css('opacity', 1);
        $(this).find('.username').css('opacity', 1);
        $(this).css('border-color', '#656565');
        $(this).find('.iconbar').css('opacity', 1);
    });
});

$(document).ready(function() {
    $('.tweet').on('mouseleave', function() {
        $(this).find('header').css('background-color', '#F3F3F3')
        $(this).find('h2').css('opacity', 0.6);
        $(this).find('.displaypic').css('opacity', 0.6);
        $(this).find('.username').css('opacity', 0.6);
        $(this).css('border-color', '#D0D0D0');
        $(this).find('.iconbar').css('opacity', 0);
    });
});