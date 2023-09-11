import exp from "constants";
import data from "./data";

const cors = require("cors");
const express = require("express");
require("dotenv").config();
const http = require("http");

const app = express();
//Price is assume to be its value in usd

const port = 8080
app.use(express.json())

app.get("/crypto", (req,res) => {
  res.send(data)
})

app.post("/swap", (req,res)=> {
  res.send(data)
})


