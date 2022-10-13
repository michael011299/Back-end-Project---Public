const db = require("../db/connection");

exports.sendComments = () => {
  return db.query(`INPUT INTO comments `).then((result) => {
    return result.rows;
  });
};
