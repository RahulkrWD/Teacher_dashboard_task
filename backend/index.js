const express = require("express");
const database = require("./DB");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());
database();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Home page");
});
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
