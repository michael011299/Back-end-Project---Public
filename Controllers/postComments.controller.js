const { sendComments } = require("../Models/sendComments.model");

exports.postComments = (req, res, next) => {
  const body = req.body.body;
  const author = req.body.username;
  const reviewID = req.params.review_id;
  sendComments(author, body, reviewID)
    .then((result) => {
      res.status(201).send({ comments: result });
    })
    .catch(next);
};
