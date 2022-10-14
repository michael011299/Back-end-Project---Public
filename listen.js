const app = require("./app");
const connection = require("./db/connection");

const { PORT = 9090 } = ENV;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
