const express = require("express");
const dotenv = require("dotenv");
const mysqlDb = require("./config/db");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("anil");
});

mysqlDb
  .query("SELECT 1")
  .then(() => {
    console.log("DB connected successfully");
    app.listen(port, () => {
      console.log("app listening on port " + port);
    });
  })
  .catch((err) => console.log(err));
