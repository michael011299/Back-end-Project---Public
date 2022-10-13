const { sendComments } = require("../Models/sendComments.model");

exports.postComments = (req, res, next) => {
  console.log(req.body);
  sendComments()
    .then((comments) => {
      res.status(201).send(comments);
    })
    .catch(next);
};
