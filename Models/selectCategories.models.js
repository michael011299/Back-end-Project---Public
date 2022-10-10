const { getCategories } = require("../Controllers/getCategories.controller");
const db = require("../db/connection");

exports.selectCategories = () => {
  return db.query("SELECT * FROM categories").then((result) => {
    const finalCategories = result.rows;
    if (!finalCategories) {
      return Promise.reject({
        status: 400,
        msg: `Not a valid path`,
      });
    }
    return finalCategories;
  });
};
