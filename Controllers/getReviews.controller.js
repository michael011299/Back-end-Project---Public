const { selectReviews } = require("../Models/selectReviews.models");

exports.getReviews = (req, res, next) => {
  const queryCategory = req.query.category;
  const order_by = req.query.order_by;
  const sort_by = req.query.sort_by;
  selectReviews(queryCategory, sort_by, order_by)
    .then((results) => {
      res.status(200).send({ reviews: results });
    })
    .catch(next);
};
