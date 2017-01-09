console.log('Bot is working');

var Twit = require('twit');
var Config = require('config');

var T = new Twit(Config);
var twitterId = '25073877';
var twitterId2 = '818226093220040706';
var makeCall = 'stream';
var paramsGet = {  q: 'banana',
                count: 2 };
var ranInt = Math.floor(Math.random()*100);

if (typeof makeCall != 'undefined') {
  if (makeCall === 'get') {
    T.get('users/show',{ screen_name: ['realDolanGrump']}, function (err, data, response) {
      console.log(data)
    });
  } else if (makeCall === 'post') {
    T.post('statuses/update', { status: 'hello world! Posted from nodeJS' }, function(err, data, response) {
      console.log(data)
    });
  } else if (makeCall === 'stream') {
    var stream = T.stream('statuses/filter', { follow: twitterId });
    stream.on('tweet', function (tweet) {
      if(tweet.user.id_str === twitterId){
        console.log(tweet);
        console.log('The tweet text was: ' + tweet.text);
        tweetIt();
      }
    });

    stream.on('error', function(error) {
      console.log(error);
    });

  } else {
    console.log('makeCall was not set correctly');
  };
} else {
  console.log('makeCall is undefined');
}

function tweetIt () {
  T.post('statuses/update',
          { status: 'God damn it! Trump tweeted again. Does our president elect have something better to do? ' + ranInt },
          function(err, data, response) {
//          console.log(data)
          }
  );
};

function dataRecieved (err, data, response) {
  var tweets = data.statuses;
  for (var i = 0; i < tweets.length; i++) {
    if (err){
      console.log('There was an error: ' + err);
    } else{
      console.log(tweets[i].text);
    }
  };
};
