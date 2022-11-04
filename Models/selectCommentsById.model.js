const db = require("../db/connection");

exports.selectCommentsById = (reviewID) => {
  return db
    .query(
      `SELECT * FROM comments
        WHERE review_id = $1
        ORDER BY created_at DESC;`,
      [reviewID]
    )
    .then((result) => {
      return result.rows;
    });
};
