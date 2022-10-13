const db = require("../db/connection");

exports.selectReviews = (
  queryCategory,
  sort_by = `created_at`,
  order_by = `DESC`
) => {
  let queryStr = `
  SELECT reviews.*,
  COUNT(comments.review_id) AS comment_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id
  `;
  const allowedSortValues = [
    `created_at`,
    `owner`,
    `title`,
    `designer`,
    `category`,
    `votes`,
    `review_body`,
    `review_img_url`,
  ];

  const allowedOrderValues = [`ASC`, `DESC`];

  if (
    !allowedSortValues.includes(sort_by) ||
    !allowedOrderValues.includes(order_by)
  ) {
    return Promise.reject({
      status: 400,
      msg: `Invalid input`,
    });
  }
  let queryValue = [];
  if (queryCategory) {
    queryStr += `WHERE reviews.category = $1`;
    queryValue.push(queryCategory);
  }
  queryStr += `GROUP BY reviews.review_id ORDER BY ${sort_by} ${order_by};`;

  return db.query(queryStr, queryValue).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `Invalid input`,
      });
    }
    return result.rows;
  });
};
