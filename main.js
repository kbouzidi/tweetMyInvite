/**
 * Created by kbouzidi on 15/05/2015.
 */

var twitter = require('ntwitter');
var config = require("./config/default.json");
// Create a new ntwitter instance
var twit = new twitter(config.twitter);
// Initialize socket.io
//var io = require('socket.io').listen(server);


/*twit.stream('statuses/ilt', function (stream) {
 stream.on('data', function (data) {
 console.log(data)
 });
 });*/


// Set a stream listener for tweets matching tracking keywords
/*twit.stream('statuses/user_timeline', { screen_name: 'VillaSchweppes'}, function (stream) {
 stream.on('data', function (data) {
 console.log(data);

 });

 });
 */


twit.getUserTimeline({ screen_name: 'VillaSchweppes', count: 2}, function (err, tweets) {

    console.log(tweets);
    for (var i = 0; i < tweets.length; i++)
        if (tweets[i].text !== null) {

            var re1 = '(RT)';	// Word 1
            var re2 = '( )';	// White Space 1
            var re3 = '(\\+)';	// Any Single Character 1
            var re4 = '( )';	// Any Single Character 2
            var re5 = '(Follow)';	// Variable Name 1
            var re6 = '( )';	// Any Single Character 3
            var re7 = '((?:[a-z][a-z]+))';	// Word 2
            var re8 = '( )';	// Any Single Character 4
            var re9 = '((?:[a-z][a-z]+))';	// Word 3
            var re10 = '( )';	// Any Single Character 5
            var re11 = '(de)';	// US State 1
            var re12 = '( )';	// Any Single Character 6
            var re13 = '(gagner)';	// Word 4

            var p = new RegExp(re1 + re2 + re3 + re4 + re5 + re6 + re7 + re8 + re9 + re10 + re11 + re12 + re13, ["i"]);
            var m = p.exec(tweets[i].text);
            if (m !== null) {
                twit.getRetweets('599171113462079500',function (err, data) {
                    if (err) {
                        console.log('retweet =========================' + err);
                    } else {
                        console.log('retweet =========================' + data);
                    }

                });

                console.log(tweets[i].id);
                console.log(tweets[i].text);
            }

        }


})
;


/*twit.stream('user', {screen_name: 'VillaSchweppes'}, function(stream) {
 stream.on('data', function (data) {
 console.log(data);
 });
 stream.on('end', function (response) {
 // Handle a disconnection
 });
 stream.on('destroy', function (response) {
 // Handle a 'silent' disconnection from Twitter, no end/error event fired
 });
 // Disconnect stream after five seconds
 setTimeout(stream.destroy, 5000);
 });*/
