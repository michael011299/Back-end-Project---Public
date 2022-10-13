const { sendComments } = require("../Models/sendComments.model");

exports.postComments = (req, res, next) => {
  const reviewID = req.params.review_id;
  const { body } = req;
  sendComments(body, reviewID)
    .then((result) => {
      res.status(201).send({ comments: result });
    })
    .catch(next);
};
