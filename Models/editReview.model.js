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
      const updatedData = result.rows[0];
      if (!updatedData) {
        return Promise.reject({
          status: 404,
          msg: `No user found for review_id: ${reviewID.review_id}`,
        });
      }
      return updatedData;
    });
};
