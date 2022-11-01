const { selectReviewById } = require("../Models/selectReviewById.models");

exports.getReviewById = (req, res, next) => {
  const reviewID = req.params.review_id;
  selectReviewById(reviewID)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch(next);
};
