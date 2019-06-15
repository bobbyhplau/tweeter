const getLikes = function(jquery) {
    $.ajax({
        method: 'GET',
        url: '/tweets/like',
        data: { id:jquery.attr('data-id') }
    }).then(function(result) {
        jquery.attr('data-liked', result.toString());
    });
}

$(document).ajaxStop(function() {
    $('.fa-heart').unbind().on('click', function() {
        event.preventDefault();
        const whichHeart = $(this);
        $.ajax({
            method: 'PUT',
            url: '/tweets/like',
            data: {
                'data-id': $(this).attr('data-id'),
                'data-liked': $(this).attr('data-liked')
            }
        }).then(function() {
            getLikes(whichHeart); //getLikes($(this))
        });
    });
});