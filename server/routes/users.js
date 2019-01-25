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

  usersRoutes.post("/register", function(req, res) {
    let hash = bcrypt.hashSync(req.body.password, 10);
    const user = {
      name: req.body.name,
      handle: req.body.handle,
      email: req.body.email,
      password: hash
    };
    console.log(user);
    res.status(200).send();
  });

  return usersRoutes;
};