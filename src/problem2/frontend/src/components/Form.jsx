import React from "react";
import { useState, useEffect } from "react";
import Searchbar from "./Serach";

const Form = () => {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("");
  return (
    <form onsubmit="return !1">
      <h5>Swap</h5>
      <label for="input-amount">Amount to send</label>
      <input id="input-amount" />
      <Searchbar/>

      <label for="output-amount">Amount to receive</label>
      <input id="output-amount" />
      <Searchbar/>

      <button>CONFIRM SWAP</button>
    </form>
  );
};

export default Form;
