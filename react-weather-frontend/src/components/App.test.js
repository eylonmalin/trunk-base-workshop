import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App, {getWeatherOrForecastUrl} from "./App";
import { mockWeatherData, mockForecastData } from "../__mocks__/Weather.mock";

jest.mock("../use-debounce", () => {
  return jest.fn(searchCity => searchCity);
});

//see https://stackoverflow.com/a/62356286/5497567
Object.assign(navigator, {
  geolocation: {
    getCurrentPosition: () => {},
  },
});

const mockFeatures = {'tbw-emoji': true}


describe("<App />", () => {
  beforeAll(() => {
    process.env.REACT_APP_API_URL = "http://localhost:3010";
    process.env.REACT_APP_API_KEY = "some-api-key";
  });
  beforeEach(() => {
    jest.spyOn(window, "fetch");
    jest.spyOn(navigator.geolocation, "getCurrentPosition");
  });
  afterEach(() => jest.restoreAllMocks());

  test("fetches and then renders the current weather and forecast", async () => {

    navigator.geolocation.getCurrentPosition.mockImplementation((success) => Promise.resolve(success({
      coords: {
        latitude: 12.3,
        longitude: 45.6,
      }
    })));

    window.fetch
       .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockFeatures)
          })
        )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWeatherData)
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockForecastData)
        })
      );

    render(<App />);

    const aboutEl = await screen.findByText("About");
    expect(aboutEl).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Enter city name")).toBeInTheDocument();
    expect(screen.getByText("Eldoret, KE")).toBeInTheDocument();
    expect(
      screen.getByText("Thursday, 12:24 PM, Broken Clouds")
    ).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();
    expect(screen.getByText(/30\s+km\/h Winds/)).toBeInTheDocument();
    expect(screen.getByText(/49% Humidity/)).toBeInTheDocument();
    expect(
      screen.getByText("'Netflix and chill' weather. It's pleasant outside")
    ).toBeInTheDocument();
    expect(screen.getByText("Saturday")).toBeInTheDocument();
    expect(screen.getByText("Sunday")).toBeInTheDocument();
    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(window.fetch).toHaveBeenCalledTimes(3);
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:3010/weatherByCoord?lat=12.3&lon=45.6");
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:3010/forecastByCoord?lat=12.3&lon=45.6");
  });

  test("renders loading spinner & an error if there's a problem getting weather data", async () => {

    navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) => Promise.resolve(success({
      coords: {
        latitude: 12.3,
        longitude: 45.6,
      }
    })));

    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      message: "An internal server error occurred"
    };

    window.fetch.mockImplementationOnce(() =>
      Promise.reject(mockErrorResponse)
    );

    render(<App />);

    // loading spinner
    await screen.findByRole("progressbar");
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText(mockErrorResponse.message)).toBeInTheDocument();
  });

  test.each([
    [null, 'forecast' ,'http://localhost:3010/forecastByCoord?lat=12.3&lon=45.6'],
    ['TelAviv', 'forecast' ,'http://localhost:3010/forecast?city=TelAviv'],
    [null, 'weather' ,'http://localhost:3010/weatherByCoord?lat=12.3&lon=45.6'],
    ['Yavne', 'weather' ,'http://localhost:3010/weather?city=Yavne'],
  ])("getWeatherOrForecastUrl return right url for city %s and type %s",
      async(city, type, expected) => {
    navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) => Promise.resolve(success({
      coords: {
        latitude: 12.3,
        longitude: 45.6,
      }
    })));
    await expect(getWeatherOrForecastUrl(city, type)).resolves.toEqual(expected)
  });

  test.each([
    [null, 'forecast' ,'http://localhost:3010/forecast'],
    ['TelAviv', 'forecast' ,'http://localhost:3010/forecast?city=TelAviv'],
    [null, 'weather' ,'http://localhost:3010/weather'],
    ['Yavne', 'weather' ,'http://localhost:3010/weather?city=Yavne'],
  ])("getWeatherOrForecastUrl return right url if location service throw error for city %s and type %s",
      async(city, type, expected) => {
    navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) => Promise.resolve(onerror('some error')));
    await expect(getWeatherOrForecastUrl(city, type)).resolves.toEqual(expected)
  });
});
