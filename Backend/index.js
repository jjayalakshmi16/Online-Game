const express = require("express");

const app = express();

var cors = require("cors");

const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var user = require("./routes/user");

var match = require("./routes/match");

var register = require("./routes/register");

app.use("/user", user);

app.use("/match", match);

app.use("/register", register);

app.listen(5000, function () {
  console.log("Online game tournament backend is listening on port 5000....");
});
