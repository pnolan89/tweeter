const express       = require('express');
const app           = express();
const usersRoutes   = express.Router();
const bcrypt = require('bcrypt');

module.exports = function(DataHelpers) {

  usersRoutes.post("/login", function(req, res) {
    // DataHelpers.userLogin(req.body.user_id, req.body.password, (err) => {
    //   if (err) {
    //     res.status(500).json({ error: err.message });
    //   } else {
        req.session.user_id = req.body.user_id;
        res.status(200).send();
        console.log(req.session.user_id);
  //     }
    // });
  });

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
      password: hash
    };

    DataHelpers.checkUniqueEmail(user, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message});;
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
  return usersRoutes;
};