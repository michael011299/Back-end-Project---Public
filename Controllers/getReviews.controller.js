const { selectReviews } = require("../Models/selectReviews.controller");

exports.getReviews = (req, res, next) => {
  const query = req.query;
  console.log(query);
  selectReviews(query)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch(next);
};
