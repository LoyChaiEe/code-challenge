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
  res.send(data);
})

app.listen(port, () =>{
  console.log(`Express app listening on port ${port}!`);
})

function filterByCurrencyName(data, letters) {
  if (!letters) {
    return data;
  }
  return data.filter((item) => {
    const currencyName = item.currency.toLowerCase();
    return letters
      .split("")
      .every((letter) => currencyName.includes(letter.toLowerCase()));
  });
}


