"use strict";

// Dependency setup (express, body-parser, cookie-session, mongodb)

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const cookieSession = require("cookie-session");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ["user_id", "dfasd"]
}));

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

  // Pass the FUNCTIONS (DataHelpers) to Routes: define ROUTES by mounting the FUNCTIONS onto METHODS and ACTIONS
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  const usersRoutes = require("./routes/users")(DataHelpers);

  app.use("/tweets", tweetsRoutes);
  app.use("/users", usersRoutes);

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});