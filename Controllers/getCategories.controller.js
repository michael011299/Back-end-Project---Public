const { selectCategories } = require("../Models/selectCategories.models");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
