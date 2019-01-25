"use strict";

let {ObjectId} = require('mongodb');
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insert(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    addLike: function(tweet_id, callback) {
      // let o_id = new mongo.ObjectID(tweet_id);
      // console.log(o_id);
      db.collection("tweets").findOneAndUpdate(
        { "_id": ObjectId(tweet_id)},
        { $inc: {likes: 1}},
        callback
      );
    }
  };
};
