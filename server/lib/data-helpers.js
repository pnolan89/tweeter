"use strict";

const {ObjectId} = require('mongodb');

// Returns an object of helper functions for interacting with the database ("db")
module.exports = function makeDataHelpers(db) {
  return {

    // Save a tweet
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insert(newTweet, callback);
    },

    // Get all tweets
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    // Add a like to a specific tweet
    addLike: function(tweet_id, callback) {
      db.collection("tweets").findOneAndUpdate(
        { "_id": ObjectId(tweet_id)},
        { $inc: {likes: 1}},
        callback
      );
    },

    // Remove a like from a specific tweet
    minusLike: function(tweet_id, callback) {
      db.collection("tweets").findOneAndUpdate(
        { "_id": ObjectId(tweet_id)},
        { $inc: {likes: -1}},
        callback
      );
    },

    userLogin: function(user_id, password, callback) {

    },

    userRegister: function(user_id, password, callback) {

    }
  };
};
