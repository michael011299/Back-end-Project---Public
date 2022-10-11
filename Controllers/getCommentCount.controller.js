const { selectCommentCount } = require("../Models/selectCommentCount.model");

exports.getCommentCount = (req, res) => {
  const query = req.query;
  const reviewID = req.params.review_id;
  selectCommentCount(reviewID, query).then((commentCount) => {
    res.status(200).send(commentCount);
  });
};
