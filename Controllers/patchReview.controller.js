const { editReview } = require("../Models/editReview.model");

exports.patchReviews = (req, res, next) => {
  const reviewID = req.params.review_id;
  const reviewUpdate = req.body.inc_votes;
  editReview(reviewID, reviewUpdate)
    .then((review) => {
      res.status(200).send(review);
    })
    .catch(next);
};
