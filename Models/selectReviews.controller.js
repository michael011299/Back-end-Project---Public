const { query } = require("express");
const db = require("../db/connection");

exports.selectReviews = (queryCategory) => {
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
      if (Object.keys(queryCategory).length === 0) {
        return results;
      }
      let values;
      if (Object.keys(queryCategory).length > 0) {
        values = result.rows.filter((row) => {
          if (row.category === queryCategory.category) {
            return row;
          }
        });
      }
      if (values.length === 0) {
        return Promise.reject({
          status: 400,
          msg: `Invalid input`,
        });
      }
      return values;
    });
};
