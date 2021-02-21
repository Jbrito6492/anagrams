const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("../database");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.static(path.join("public", "dist")));

app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});