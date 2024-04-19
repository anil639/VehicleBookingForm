const express = require("express");
const dotenv = require("dotenv");
const mysqlDb = require("./config/db");
const cors = require("cors");

const {
  createDatabase,
  createTable,
  seedData,
} = require("./Models/newDbAndTable");
const createUserTable = require("./Models/user");

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("anil");
});
//Routes
app.use("/vehicle", require("./Routes/vehicleRoutes"));
app.use("/user", require("./Routes/userRotes"));

//DB connection
createDatabase()
  .then(() => {
    mysqlDb
      .query("SELECT 1")
      .then(() => {
        console.log("DB connected successfully");
        createTable();
        seedData();
        createUserTable();
        app.listen(port, () => {
          console.log("app listening on port " + port);
        });
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
