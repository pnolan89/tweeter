"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      callback(db.collection("tweets").insertOne(newTweet));
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
            //console.log("we are in the getTweets function");
      //const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweets").find().toArray(callback);
      // db.collection("tweets").find({}, function(err, result) {
      //     if (err) throw err;
      //     callback(null, result);
      //     //console.log("rohit dhand ",result);
      //     //db.close();
      // });
      //callback(null, db.collection("tweets").find().toArray());
      //.sort(sortNewestFirst));
      //callback(null, {result: "true"});
    }

  };
};
