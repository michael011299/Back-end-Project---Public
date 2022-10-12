const db = require("../db/connection");

exports.selectReviews = (queryCategory) => {
  let queryStr = `
  SELECT reviews.*,
  COUNT(comments.review_id) AS comment_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id
  `;
  if (queryCategory.category === undefined) {
    queryStr += `GROUP BY reviews.review_id ORDER BY created_at DESC;`;
    return db.query(queryStr).then((result) => {
      return result.rows;
    });
  } else if (queryCategory.category) {
    queryStr += `WHERE reviews.category = $1 GROUP BY reviews.review_id;`;
    return db.query(queryStr, [queryCategory.category]).then((result) => {
      if (result.rows.length !== 0) {
        return result.rows;
      } else {
        return Promise.reject({
          status: 400,
          msg: `Invalid input`,
        });
      }
    });
  }
};
