$(document).ready(function() {

    const parseDate = function(timeCode) {
        let msPerMinute = 60 * 1000;
        let msPerHour = 60 * msPerMinute;
        let msPerDay = 24 * msPerHour;
        let msPerMonth = 31 * msPerDay;
        let msPerYear = 12 * msPerMonth;

        let currentTime = Date.now();
        let elapsed = currentTime - timeCode;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }
        if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }
        if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }
        if (elapsed < msPerMonth) {
            return 'aproximately ' + Math.round(elapsed / msPerDay) + ' days ago';
        }
        if (elapsed < msPerYear) {
            return 'aproximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
        }
        return 'aproximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }

    const createTweetElement = function(tweetObj) {
        let realname = tweetObj.user.name;
        let username = tweetObj.user.handle;
        let displaypic = tweetObj.user.avatars.small;
        let message = tweetObj.content.text;
        let date = parseDate(tweetObj.created_at);

        let $tweet = $("<article>").addClass("tweet");

        let $displaypic = $('<img>').addClass('displaypic').attr('src', displaypic);
        let $realname = $('<h2>').text(realname);
        let $username = $('<p>').addClass('username').text(username);
        let $header = $("<header>").append($displaypic).append($realname).append($username);

        let $message = $('<span>').append($('<p>').addClass('message').text(message));
        let $section = $("<section>").append($message);

        let $date = $("<p>").addClass("date").text(date);
        let $flag = $('<i>').addClass('fas fa-flag');
        let $retweet = $('<i>').addClass('fas fa-retweet');
        let $heart = $('<i>').addClass('fas fa-heart').attr("data-id", tweetObj._id).attr("data-liked", tweetObj.liked.toString());
        let $iconbar = $('<span>').addClass('iconbar').append($flag).append($retweet).append($heart);
        let $footer = $("<footer>").append($date).append($iconbar);


        $tweet.append($header).append($section).append($footer);
        return $tweet;
    }

    function renderTweets(tweets) {
        for (let tweet of tweets) {
            $('#tweets-container').prepend(createTweetElement(tweet));
        }
    }

    const loadTweets = function() {
        $.ajax({
            method: 'GET',
            url: '/tweets',
            dataType: 'json'
        }).then(function(result) {
            return renderTweets(result);
        });
    }

    $('#submitbutton').on('click', function(event) {
        event.preventDefault();

        const textarea = $('textarea');
        const error = $('.error');
        const text = textarea.val().trim();

        if ((text.length > 0) &&
            (text.length <= 140) &&
            (text !== null)) {

            textarea.val(text);

            $.ajax({
                    type: 'POST',
                    url: '/tweets',
                    data: textarea.serialize()
                })
                .then(function() {
                    textarea.val('');
                    $('.counter').text(140);
                    loadTweets();
                });
            error.slideUp('fast');
        } else {
            error.slideDown('fast');
        }
    });

    loadTweets();
});