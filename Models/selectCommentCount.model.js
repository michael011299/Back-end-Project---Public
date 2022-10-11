const db = require("../db/connection");

exports.selectCommentCount = (reviewID, query) => {
  return db
    .query(`SELECT * FROM comments WHERE review_id = $1`, [reviewID])
    .then((result) => {
      const commentCount = result.rows.length;
      query.comment_count = commentCount;
      return query;
    });
};
