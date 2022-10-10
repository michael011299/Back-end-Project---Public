const { getReview } = require("../Controllers/getReview.controller");
const db = require("../db/connection");

exports.selectReview = (reviewID) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1", [reviewID.review_id])
    .then(({ rows }) => {
      const result = rows[0];
      if (!result) {
        return Promise.reject({
          status: 404,
          msg: `No user found for review_id: ${reviewID.review_id}`,
        });
      }
      return result;
    });
};
