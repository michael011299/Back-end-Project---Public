const db = require("../db/connection");

exports.selectReviews = () => {
  //   if (query) {
  return db
    .query(
      `SELECT reviews.*,
      COUNT(comments.review_id) AS comment_count
      FROM reviews
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      GROUP BY reviews.review_id
      ORDER BY created_at DESC;
      `
    )
    .then((result) => {
      const results = result.rows;
      if (!results) {
        return Promise.reject({
          status: 404,
          msg: `No results found`,
        });
      }
      return results;
    });
  //   } else {
  //     db.query(`SELECT reviews.*,
  //     COUNT(comments.review_id) AS comment_count
  //     FROM reviews
  //     LEFT JOIN comments ON comments.review_id = reviews.review_id
  //     WHERE category = $1
  //     GROUP BY reviews.review_id
  //     ORDER BY created_at DESC;
  //     `, query)
  //     /// filter by category
  //   }
};

// Queries
// The end point should also accept the following query:
// - category, which filters the reviews by the category value specified in the query. If the query is omitted the endpoint should respond with all reviews.
