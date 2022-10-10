const { getUsers } = require("../Controllers/getUsers.controllers");
const db = require("../db/connection");

exports.selectUsers = () => {
  return db
    .query("SELECT * FROM users")
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err, "err in the model");
    });
};
