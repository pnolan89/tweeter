"use strict";

const {ObjectId} = require('mongodb');

// Returns an object of helper functions for interacting with the database ("db")
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insert(newTweet, callback);
    },

    // Retrieves all tweets in database
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    // Adds a like to a specific tweet
    addLike: function(tweet_id, callback) {
      db.collection("tweets").findOneAndUpdate(
        { "_id": ObjectId(tweet_id)},
        { $inc: {likes: 1}},
        callback
      );
    },

    // Removes a like from a specific tweet (*NOT YET IMPLEMENTED*)
    minusLike: function(tweet_id, callback) {
      db.collection("tweets").findOneAndUpdate(
        { "_id": ObjectId(tweet_id)},
        { $inc: {likes: -1}},
        callback
      );
    },

    // Registers a new user
    userRegister: function(user, callback) {
      db.collection("users").insert(user, callback);
    },

    // Checks if email already exists in database
    checkUniqueEmail: function(email, callback) {
      db.collection("users").findOne({ "email": email }, callback);
    },

    // Checks if user handle already exists in database
    checkUniqueHandle: function(user, callback) {
      db.collection("users").findOne({ "handle": user.handle }, callback);
    },

    // Checks if entered password matches the one in database for login
    checkPassword: function(email, password, callback) {
      db.collection("users").findOne({ "email": email, "password": password}, callback);
    }
  };
};
