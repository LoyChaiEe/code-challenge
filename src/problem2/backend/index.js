const cors = require("cors");
const express = require("express");
require("dotenv").config();
const { data } = require("./data.js")


const app = express();
//Price is assume to be its value in usd

const port = 8080
app.use(cors("*"));
app.use(express.json())

app.get("/cryptotest", (req, res) => {
  res.send(data);
});


app.post("/crypto", (req,res) => {
  res.send(data)
})

app.post("/swap", (req,res)=> {
  res.send(data);
})

app.listen(port, () =>{
  console.log(`Express app listening on port ${port}!`);
})


