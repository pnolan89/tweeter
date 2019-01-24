"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
const db = require("../mongo_example");

/// CODE CHANGED BY ROHIT

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }

    // We have a connection to the "tweeter" db, starting here.
    console.log(`Connected to mongodb: ${MONGODB_URI}`);

    // Pass Mongo Database (db) to DataHelpers: defines METHODS for interacting with db.
    const DataHelpers = require("./lib/data-helpers.js")(db);

    // Pass the METHODS (DataHelpers) to tweetsRoutes: defines ROUTES by mounting the METHODS onto ACTIONS/PATHS
    const tweetsRoutes = require("./routes/tweets")(DataHelpers);


    app.use("/tweets", tweetsRoutes);
    // ==> Refactored and wrapped as new, tweet-specific function:

    // function getTweets(callback) {
    //   db.collection("tweets").find().toArray(callback);
    // }

    // // ==> Later it can be invoked. Remember even if you pass
    // //     `getTweets` to another scope, it still has closure over
    // //     `db`, so it will still work. Yay!

    // getTweets((err, tweets) => {
    //   if (err) throw err;

    //   db.close();
    // });

});



///////////// CODE CHANGED BY ROHIT ENDS HERE.



 //connection part to the mongodb

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:

// Mount the tweets routes at the "/tweets" path prefix:


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});