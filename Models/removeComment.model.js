const db = require("../db/connection");

exports.removeComment = (commentID) => {
  return db
    .query(`DELETE from comments WHERE comment_id = $1 RETURNING *`, [
      commentID,
    ])
    .then((result) => {
      return result.rows;
    });
};
