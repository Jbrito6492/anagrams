const app = require("express")();
const cors = require("cors");
const morgan = require("morgan");

const port = process.env.PORT || 8000;

app.use("/static", express.static("public"));

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});