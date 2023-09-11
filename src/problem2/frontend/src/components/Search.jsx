import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./List";
import "./Search.css"
import { useThemeProps } from "@mui/material";

const Search = (props) => {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
      <div className="search">
        <TextField
          value={inputText}
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <List
        input={inputText}
        setCurrency={props.setCurrency}
        clear={setInputText}
      />
    </>
  );
};
export default Search;
