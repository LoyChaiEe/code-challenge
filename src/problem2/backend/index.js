const cors = require("cors");
const express = require("express");
require("dotenv").config();
const { data } = require("./data.js")


const app = express();
//Price is assume to be its value in usd

const port = 8080
app.use(cors("*"));
app.use(express.json())



app.post("/crypto", (req,res) => {
  const { search } = req.body;
  console.log("helloe", search)
  if(!search){
    res.send([])
  }
  else{
    const filteredData = data.filter((ele) => {
      const currencyName = ele.currency.toLowerCase();
      return search
        .split("")
        .every((letter) => currencyName.includes(letter.toLowerCase()));
    });
    res.send(filteredData);
  }
})

app.post("/swap", (req,res)=> {
  const { search } = req.body
  console.log(search[0])
  let input = data.find(ele => ele.currency === search[0].currency)
  let output = data.find(ele => ele.currency === search[1].currency)
  let inputAmountUSD = parseInt(search[0].amt) * input.price
  let outputAmount = inputAmountUSD/output.price
  res.send(outputAmount.toString());
})

app.listen(port, () =>{
  console.log(`Express app listening on port ${port}!`);
})




