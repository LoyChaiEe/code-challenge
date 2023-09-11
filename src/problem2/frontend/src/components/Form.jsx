import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Search from "./Search";
import "./Form.css"

const Form = () => {
  const [inputAmt, setInputAmt] = useState("0")
  const [outputAmt, setOutputAmt] = useState("");
  const [inputCurr, setInputCurr] = useState("")
  const [outputCurr, setOutputCurr] = useState("");

  const inputAmtHandler = (e) => {
    //convert input text to lower case
    const value = e.target.value;
    setInputAmt(value);
  };

  const setOutput = async (e) => {
    e.preventDefault()
    const data = await axios
      .post(`http://localhost:8080/swap`, {
        search: [
          { currency: inputCurr, amt: inputAmt },
          { currency: outputCurr, amt: outputAmt },
        ],
      })
      .then((res) => {
        setOutputAmt(res.data);
      });
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
          {inputCurr && (
            <img
              className="logo"
              src={require(`../tokens/${inputCurr}.svg`)}
              alt={`${inputCurr}`}
            />
          )}
          {inputCurr && <span>{inputCurr}</span>}
          <Search setCurrency={setInputCurr} />
        </div>
        <div className="input">
          <label for="output-amount">Amount to receive</label>
          <input id="output-amount" value={outputAmt} />
          {outputCurr && (
            <img
              className="logo"
              src={require(`../tokens/${outputCurr}.svg`)}
              alt={`${outputCurr}`}
            />
          )}
          {outputCurr && <span>{outputCurr}</span>}
          <Search setCurrency={setOutputCurr} />
        </div>

        <button onClick={setOutput} disabled={inputCurr === "" || outputCurr === ""}>CONFIRM SWAP</button>
      </form>
    </>
  );
};

export default Form;
