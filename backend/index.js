const express = require("express");
const database = require("./DB");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
database();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
