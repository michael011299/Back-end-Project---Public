const { selectReviews } = require("../Models/selectReviews.controller");

exports.getReviews = (req, res, next) => {
  const queryCategory = req.query;
  selectReviews(queryCategory)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch(next);
};
