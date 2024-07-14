import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);

  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day} ${year}`;

  const API_KEY = "af4a3b5e0cf689738d744ebf6ebc5a98";
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    fetchWeatherData();
  };

  return (
    <div className="App">
      <div className="container">
        {weather && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <div className="container_city">{city}</div>
              <img
                className="container_img"
                src="./thunder.png"
                width="180px"
                alt="thunder"
              />
              <h2 className="container_degree">34.22</h2>
              <h2 className="container_per">Sunny</h2>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
