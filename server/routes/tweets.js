"use strict";

// This module routes all requests for the "/tweets/" path

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  // Retrieves tweets from database
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  // Saves a new tweet to the database
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: 0
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  // Add a like to a specific tweet
  tweetsRoutes.post("/:id", function(req, res) {
    DataHelpers.addLike(req.params.id, (err) => {
      if (err) {
        console.log('Error');
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  // Removes a like from a specific tweet (*NOT YET IMPLEMENTED*)
  tweetsRoutes.delete("/:id", function(req, res) {
    DataHelpers.minusLike(req.params.id, (err) => {
      if (err) {
        console.log('Error');
        res.status(500).json({ error: err.message });
      } else {
        res.status(204).send();
      }
    });
  });


  return tweetsRoutes;

}
