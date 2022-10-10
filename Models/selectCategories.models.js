const { getCategories } = require("../Controllers/getCategories.controller");
const db = require("../db/connection");

exports.selectCategories = () => {
  return db.query("SELECT * FROM categories").then((result) => {
    return result.rows;
  });
};
