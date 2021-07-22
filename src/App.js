import "./App.css";
import axios from "axios";
import styled from "styled-components";

import { useEffect, useState } from "react";

function App() {
  // useState
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState(" ");

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.React_Api_Key}&q=London&aqi=no`
      )
      .then((data) => {
        setWeather(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //Events

  const weatherInput = (e) => {
    setInput(e.target.value);
  };

  const buttonSearch = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=c9653f7664b74b539a464243212207&q=${input}&aqi=`
      )
      .then((data) => {
        setWeather(data.data);
        console.log(data.data);
      });
  };

  return (
    <div>
      {weather && (
        <Header>
          <Container>
            <div className="input-search">
              <input
                onClick={weatherInput}
                type="text"
                placeholder="search city.."
              ></input>
              <button onClick={buttonSearch}>Search</button>
            </div>

            <div className="weather-info">
              <h1>Input Name: {weather.location.name}</h1>
              <h1>Country Name: {weather.location.country}</h1>
              <h2>Region: {weather.location.region}</h2>
              <div className="condition">
                <h3>{weather.current.condition.text}</h3>
                <img src={weather.current.condition.icon} alt="weather-icon" />
                <h3>
                  <i>Cloud </i>
                  {weather.current.cloud}%
                </h3>
                <h4>{weather.current.temp_c} Celsius</h4>
              </div>
            </div>
          </Container>
        </Header>
      )}
      ;
    </div>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  background: #9ff;
  padding: 3rem 5rem;
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 8px 8px -4px #black;
  input,
  button {
    font-style: bold;
    font-size: 1.5rem;
    margin: 0.2rem;
  }
  border-radius: 0.5rem;
  text-align: center;
`;
export default App;
