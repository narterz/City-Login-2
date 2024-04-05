const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

app.use(cors());
