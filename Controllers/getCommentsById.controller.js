const { selectCommentsById } = require("../Models/selectCommentsById.model");

exports.getCommentsById = (req, res, next) => {
  const reviewID = req.params.review_id;
  selectCommentsById(reviewID)
    .then((result) => {
      res.status(200).send({ comments: result });
    })
    .catch(next);
};
