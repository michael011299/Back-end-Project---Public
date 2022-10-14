const data = require("../endpoints.json");

exports.getAppInfo = (req, res) => {
  console.log(res);
  res.status(200).send(data);
};
