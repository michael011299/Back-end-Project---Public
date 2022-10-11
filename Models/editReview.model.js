const db = require("../db/connection");
const patchReviews = require("../Controllers/patchReview.controller");

exports.editReview = (reviewData) => {
  const reviewID = reviewData.params.review_id;
  const reviewUpdate = reviewData.body.inc_votes;
  return db
    .query(
      `UPDATE reviews 
            SET votes = votes + $1 
            WHERE $2 = review_id 
            RETURNING *;`,
      [reviewUpdate, reviewID]
    )
    .then((result) => {
      return result.rows[0];
    });
};
