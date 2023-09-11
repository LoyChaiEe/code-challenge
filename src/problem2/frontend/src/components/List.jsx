import { React, useEffect, useState } from "react";
import axios from "axios"
import "./List.css"

const List = (props) => {
  //create a new array by filtering the original array
  const [cryptoData, setCryptoData] = useState([])
 
  const getCrypto = async () => {
    const data = await axios.post(`http://localhost:8080/crypto`, { search: props.input }).then((res) => {
      setCryptoData(res.data)
    })
  }

  useEffect(() => {
    getCrypto()
  }, [props.input])
  
  return (
    <ul className="ul-no-bullet">
      {cryptoData.map((item) => (
        <>
          <li key={item.currency}>
            <div className="crypto-item" onClick={() => {
              props.setCurrency(item.currency)
              //reset
              setCryptoData([])
              props.clear("")
              }}>
              <p>{item.currency}</p>
              <img
                className="logo"
                src={require(`../tokens/${item.currency}.svg`)}
                alt={`${item.currency}`}
              />
            </div>
          </li>
        </>
      ))}
    </ul>
  );
}

export default List;
