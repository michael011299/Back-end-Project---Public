const { sendComments } = require("../Models/sendComments.model");

exports.postComments = (req, res, next) => {
  const body = req.body.body;
  const author = req.body.username;
  sendComments(author, body)
    .then((result) => {
      res.status(201).send({ comments: result });
    })
    .catch(next);
};
