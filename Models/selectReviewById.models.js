const db = require("../db/connection");

exports.selectReviewById = (reviewID) => {
  return db
    .query(
      `SELECT reviews.*,
      COUNT(comments.review_id) AS comment_count
      FROM reviews
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id;
      `,
      [reviewID]
    )
    .then((result) => {
      const results = result.rows[0];
      if (!results) {
        return Promise.reject({
          status: 404,
          msg: `No user found for review_id: ${reviewID}`,
        });
      }
      return results;
    });
};
