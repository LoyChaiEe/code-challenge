import { React, useEffect, useState } from "react";
import axios from "axios"

const List = (props) => {
  //create a new array by filtering the original array
  const [cryptoData, setCryptoData] = useState([])
 
  const getCrypto = async () => {
    const { data: crypto } = await axios
      .get(`http://localhost:8080/cryptotest`)
      .then((res) => {
        console.log(res);
      });
    // const { data: crypto } = await axios.post(
    //   `http://localhost:8080/crypto`, {name: props.input}
    // ).then((res) => {
    //   console.log(res)
    // })
  }

  useEffect(() => {
    getCrypto()
  }, [cryptoData])
  
  return (
    <ul>
      {cryptoData.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

export default List;
