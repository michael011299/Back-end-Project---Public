const { removeComment } = require("../Models/removeComment.model");

exports.deleteComment = (req, res, next) => {
  const commentID = req.params.comment_id;
  removeComment(commentID)
    .then((result) => {
      res.status(204).send(result);
    })
    .catch(next);
};
