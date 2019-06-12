$(document).ready(function() {
    $('#submitbutton').on('click', function(event) {
        event.preventDefault();
        console.log("Button clicked");
        console.log($('textarea').serialize());
        $.ajax({
                type: 'POST',
                url: '/tweets',
                data: $('textarea').serialize()
            })
            .then(function(result) {

            });
    });
});