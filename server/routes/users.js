const express       = require('express');
const app           = express();
const usersRoutes   = express.Router();
const bcrypt = require('bcrypt');

module.exports = function(DataHelpers) {

  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  usersRoutes.post("/register", function(req, res) {
    let id = generateRandomString();
    let hash = bcrypt.hashSync(req.body.password, 10);
    let handle = `@${req.body.handle}`;
    let user = {
      id: id,
      name: req.body.name,
      handle: handle,
      email: req.body.email,
      password: hash,
      likedTweets: []
    };

    DataHelpers.checkUniqueEmail(user.email, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message});
      } else {
        if (result !== null) {
          res.send("Email");
          console.log("Email not unique");
        } else {
          DataHelpers.checkUniqueHandle(user, (err, result) => {
            if (err) {
              res.status(500).json({ error: err.message});
            } else {
              if (result !== null) {
                res.send("Handle");
                console.log("Handle not unique");
              } else {
                DataHelpers.userRegister(user, (err) => {
                  if (err) {
                    res.status(500).json({ error: err.message});
                  } else {
                    res.status(201).send();
                    console.log("Success!");
                    }
                });
              }
            }
          });
        }
      }
    });
  });

  usersRoutes.post("/login", function(req, res) {
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 10);
    console.log("111 string hash: ", bcrypt.hashSync("111", 10));
    console.log("Actual: ", bcrypt.hashSync(req.body.password, 10));
    DataHelpers.checkUniqueEmail(email, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message});
      } else {
        if (result === null) {
          console.log("Email not found!");
        } else {
          if (bcrypt.compareSync(req.body.password, result.password)) {
            req.session.user_id = result.id;
            res.status(200).send();
            console.log("Success!");
          } else {
            console.log("Not a match");
          }
        }
      }
    });
  });

  return usersRoutes;
};