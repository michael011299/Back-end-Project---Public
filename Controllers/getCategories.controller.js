const { selectCategories } = require("../Models/selectCategories.models");

exports.getCategories = (req, res, next) => {
  console.log(Object.keys(req));
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};
