const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  if (db.end) db.end();
});

describe("GET /api/categories", () => {
  test("status:200, responds with an array of categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories).toBeInstanceOf(Array);
        expect(categories).toHaveLength(4);
        categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String),
            })
          );
        });
      });
  });
  test("status:404, responds with an error message when passed a url that does not exist", () => {
    return request(app)
      .get("/api/categoriees")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route not found");
      });
  });
});

// describe("GET /api/reviews/:review_id", () => {
//   test("status:200, responds with a singular review based on the id given", () => {
//     return request(app)
//       .get("/api/reviews/:review_id")
//       .expect(200)
//       .then(({ body }) => {
//         const { categories } = body;
//         expect(categories).toBeInstanceOf(Array);
//         expect(categories).toHaveLength(4);
//         categories.forEach((review) => {
//           expect(review).toEqual(
//             expect.objectContaining({
//               review_id: expect.any(Number),
//               title: expect.any(String),
//               review_body: expect.any(String),
//               designer: expect.any(String),
//               review_img_url: expect.any(String),
//               votes: expect.any(Number),
//               category: expect.any(String),
//               owner: expect.any ,
//               created_at:,
//             })
//           );
//         });
//       });
//   });
// });

//category field which references the slug in the categories table
// owner field that references a user's primary key (username)
