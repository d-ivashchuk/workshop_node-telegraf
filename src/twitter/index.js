require('dotenv').config();

const {
  TWITTER_KEY,
  TWITTER_SECRET,
  TWITTER_TOKEN_KEY,
  TWITTER_TOKEN_SECRET,
} = process.env;

const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: TWITTER_KEY,
  consumer_secret: TWITTER_SECRET,
  access_token_key: TWITTER_TOKEN_KEY,
  access_token_secret: TWITTER_TOKEN_SECRET,
});

const getRateLimit = async () => {
  try {
    const rateLimit = await client.get('application/rate_limit_status', {});
    return rateLimit;
  } catch (error) {
    console.log(error);
  }
};

const getUserInfo = async ({ twitterHandler }) => {
  try {
    const params = { screen_name: twitterHandler };
    const user = await client.get('users/lookup', params);
    return user[0];
  } catch (err) {
    console.log(err);
  }
};

const getTweets = async ({ twitterHandler }) => {
  try {
    const params = {
      screen_name: twitterHandler,
      exclude_replies: true,
      include_rts: false,
      trim_user: true,
      tweet_mode: 'extended',
      count: 200,
    };
    const tweets = await client.get('statuses/user_timeline', params);
    return tweets;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUserInfo,
  getTweets,
  getRateLimit,
};
