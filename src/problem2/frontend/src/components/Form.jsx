import React from "react";
import { useState, useEffect } from "react";
import Search from "./Search";
import "./Form.css"

const Form = () => {
  const [inputAmt, setInputAmt] = useState("0")
  const [outputAmt, setOutputAmt] = useState("0");
  const [inputCurr, setInputCurr] = useState("")
  const [outputCurr, setOutputCurr] = useState("");

  const inputAmtHandler = (e) => {
    //convert input text to lower case
    const value = e.target.value;
    setInputAmt(value);
  };

  const setOutput = (e) => {
    setOutputAmt(10)
  }
  return (
    <>
      <form className="Form" onSubmit={() => !1}>
        <h5>Swap</h5>
        <div className="input">
          <label for="input-amount">Amount to send</label>
          <input
            id="input-amount"
            value={inputAmt}
            onChange={inputAmtHandler}
          />
          <p>{inputCurr}</p>
          <Search setCurrency={setInputCurr} />
        </div>
        <div className="input">
          <label for="output-amount">Amount to receive</label>
          <input id="output-amount" value={outputAmt} />
          <p>{outputCurr}</p>
          <Search setCurrency={setOutputCurr} />
        </div>

        <button onClick={setOutput}>CONFIRM SWAP</button>
      </form>
    </>
  );
};

export default Form;
