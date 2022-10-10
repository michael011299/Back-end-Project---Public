const { selectReview } = require("../Models/selectReview.models");

exports.getReview = (req, res) => {
  const reviewID = req.params;
  selectReview(reviewID).then((review) => {
    res.status(200).send(review);
  });
};
