const { selectUsers } = require("../Models/selectUsers.models");

exports.getUsers = (req, res) => {
  selectUsers()
    .then((users) => {
      console.log(users);
      res.status(200).send({ users });
    })
    .catch((err) => {
      console.log(err, "err in the controller");
    });
};
