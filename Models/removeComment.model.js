const db = require("../db/connection");

exports.removeComment = (commentID) => {
  return db
    .query(`DELETE from comments WHERE comment_id = $1 RETURNING *`, [
      commentID,
    ])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Bad request",
        });
      }
      return result.rows;
    });
};
