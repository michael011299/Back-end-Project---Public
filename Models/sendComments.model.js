const db = require("../db/connection");

exports.sendComments = (author, body, ID) => {
  return db
    .query(
      `INSERT INTO comments (body, author, review_id) VALUES ($1, $2, $3) RETURNING *;`,
      [body, author, ID]
    )
    .then((result) => {
      const results = result.rows[0];
      if (!results) {
        return Promise.reject({
          status: 404,
          msg: `No user found for review_id: ${reviewID}`,
        });
      }
      return results;
    });
};
