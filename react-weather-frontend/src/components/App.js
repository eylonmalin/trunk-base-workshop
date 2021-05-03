import React, { useEffect, useState } from "react";
import { createMuiTheme, Container, ThemeProvider } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";

import Weather from "./Weather";
import NavBar from "./NavBar";

const REACT_APP_API_URL = "http://localhost:3010";

export default function App() {
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    getWeather(city)
      .then(weather => {
        setCurrentWeather(weather);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [city, error]);

  useEffect(() => {
    getForecast(city)
      .then(data => {
        setForecast(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [city, error]);

  const handleCityChange = city => {
    setCity(city);
  };

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      fontSize: 14,
      h5: {
        fontWeight: 600
      }
    }
  });

  if (
    (currentWeather && Object.keys(currentWeather).length) ||
    (forecast && Object.keys(forecast).length)
  ) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Container maxWidth="sm">
          <Weather
            city={city}
            currentWeather={currentWeather}
            forecast={forecast}
            onCityChange={handleCityChange}
            error={error}
          />
        </Container>
      </ThemeProvider>
    );
  } else {
    return (
      <div>
        <CircularProgress color={error ? "secondary" : "primary"} />
        {error ? <p>{error}</p> : ""}
      </div>
    );
  }
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error: Location " + response.statusText.toLowerCase());
  }
}

function getCurrentLocation() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export async function getWeatherOrForecastUrl(city, type) {

  if (city) {
    return `${REACT_APP_API_URL}/${type}?city=${city}`
  }

  try {
    const location = await getCurrentLocation();
    let url = `${REACT_APP_API_URL}/${type}ByCoord?lat=${location.coords.latitude}&lon=${location.coords.longitude}`;
    console.log(`url: ${url}`)
    return url;
  } catch (error) {
    console.log(`oh oh, error: ${error}`)
    return `${REACT_APP_API_URL}/${type}`;
  }
}

function getWeather(city) {

  return getWeatherOrForecastUrl(city, 'weather')
    .then(url => fetch(url))
    .then(res => handleResponse(res))
    .then(weather => {
      if (Object.entries(weather).length) {
        return mapDataToWeatherInterface(weather);
      }
    });
}

function getForecast(city) {

  return getWeatherOrForecastUrl(city, 'forecast')
    .then(url => fetch(url))
    .then(res => handleResponse(res))
    .then(result => {
      if (Object.entries(result).length) {
        const forecast = [];
        for (let i = 0; i < result.list.length; i += 8) {
          forecast.push(mapDataToWeatherInterface(result.list[i + 4]));
        }
        return forecast;
      }
    });
}

function mapDataToWeatherInterface(data) {
  const mapped = {
    city: data.name,
    country: data.sys.country,
    date: data.dt * 1000,
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    temperature: data.main.temp,
    description: data.weather[0].description,
    wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
    condition: data.cod
  };

  // Add extra properties for the five day forecast: dt_txt, icon, min, max
  if (data.dt_txt) {
    mapped.dt_txt = data.dt_txt;
  }

  if (data.weather[0].icon) {
    mapped.icon = data.weather[0].icon;
  }

  if (data.main.temp_min && data.main.temp_max) {
    mapped.max = data.main.temp_max;
    mapped.min = data.main.temp_min;
  }

  // remove undefined fields
  Object.keys(mapped).forEach(
    key => mapped[key] === undefined && delete data[key]
  );

  return mapped;
}
