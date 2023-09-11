import React from "react";
import { useState, useEffect } from "react";
import Search from "./Search";
import "./Form.css"

const Form = () => {
  const [inputAmt, setInputAmt] = useState("10000")
  const [outputAmt, setOutputAmt] = useState("");
  return (
    <>
      <form className="Form" onSubmit={() => !1}>
        <h5>Swap</h5>
        <div className="input">
          <label for="input-amount">Amount to send</label>
          <input id="input-amount" value={inputAmt} />
          <Search />
        </div>
        <div className="input">
          <label for="output-amount">Amount to receive</label>
          <input id="output-amount" value={outputAmt} />
          <Search />
        </div>

        <button>CONFIRM SWAP</button>
      </form>
    </>
  );
};

export default Form;
