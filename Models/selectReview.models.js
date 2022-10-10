const { getReview } = require("../Controllers/getReview.controller");
const db = require("../db/connection");

exports.selectReview = (reviewID) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1", [reviewID.review_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err, "err in the model");
    });
};
