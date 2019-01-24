"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // Confirm connection to database
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // Pass database (db) to DataHelpers: define FUNCTIONS for interacting with db.
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // Pass the FUNCTIONS (DataHelpers) to tweetsRoutes: define ROUTES by mounting the FUNCTIONS onto METHODS and ACTIONS
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);


  app.use("/tweets", tweetsRoutes);

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});