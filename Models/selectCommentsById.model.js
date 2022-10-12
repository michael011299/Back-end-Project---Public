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
      const results = result.rows;
      if (!result) {
        return Promise.reject({
          status: 404,
          msg: `No user found for review_id`,
        });
      }
      return results;
    });
};
