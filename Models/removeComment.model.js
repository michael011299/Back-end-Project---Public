const db = require("../db/connection");

exports.removeComment = (commentID) => {
  return db
    .query(`DELETE from comments WHERE comment_id = $1`, [commentID])
    .then((result) => {
      if (!result.rows) {
        return Promise.reject({
          status: 404,
          msg: "Invalid input",
        });
      }
      return result.rows;
    });
};
