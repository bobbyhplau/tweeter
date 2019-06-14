$(document).ajaxStop(function() {
    $('.fa-heart').on('click', function() {
        event.preventDefault();
        console.log('Hello Heart');
    });
});