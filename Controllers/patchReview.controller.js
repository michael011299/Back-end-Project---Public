const { editReview } = require("../Models/editReview.model");

exports.patchReviews = (req, res, next) => {
  const reviewData = req;
  editReview(reviewData)
    .then((review) => {
      res.status(200).send(review);
    })
    .catch(next);
};
