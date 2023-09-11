import React from "react";
import axios from "axios";
import { useState} from "react";
import Search from "./Search";
import "./Form.css"
import logo from "../images/switcheo.png"

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
      <h1>CRYPTOSWAPPER</h1>
      <form className="Form" onSubmit={() => !1}>
        <div>
          <div className="input">
            <input
              id="input-amount"
              value={inputAmt}
              onChange={inputAmtHandler}
              placeholder="Input"
            />
          </div>
          <div className="display">
            {inputCurr && (
              <img
                className="logo"
                src={require(`../tokens/${inputCurr}.svg`)}
                alt={`${inputCurr}`}
              />
            )}
            {inputCurr && <span>{inputCurr}</span>}
          </div>
          <Search setCurrency={setInputCurr} />
        </div>
        <div>
          <img
            className="switcheo"
            src={logo}
            alt="switcheo"
            onClick={setOutput}
            disabled={inputCurr === "" || outputCurr === ""}
          />
        </div>
        <div>
          <div className="input">
            <input id="output-amount" value={outputAmt} placeholder="Amount" />
          </div>
          <div className="display">
            {outputCurr && (
              <img
                className="logo"
                src={require(`../tokens/${outputCurr}.svg`)}
                alt={`${outputCurr}`}
              />
            )}
            {outputCurr && <span>{outputCurr}</span>}
          </div>
          <Search setCurrency={setOutputCurr} />
        </div>
      </form>
    </>
  );
};

export default Form;
