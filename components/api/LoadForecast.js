import { getCoordinatesForCity } from "./location/Coordinates";
import { WEATHER_KEY } from "@env";

const openWeatherKey = WEATHER_KEY;
const urlAirPollution = `https://api.openweathermap.org/data/2.5/air_pollution?`;
const url = `https://api.openweathermap.org/data/2.5/weather?`;
const urlHourly = `https://pro.openweathermap.org/data/2.5/forecast/hourly?`;

export const loadForecastAPI = async (cityName, language) => {
  //ask for location
  const location = await getCoordinatesForCity(cityName);
  try {
    if (!location || !location.latitude || !location.longitude) {
      console.log("Error", error.message);
      return null;
    }

    //get current forecast
    const lang = language === "hr" ? "&lang=hr" : "";
    const response = await fetch(
      `${url}&lat=${location.latitude}&lon=${location.longitude}&APPID=${openWeatherKey}${lang}`
    );
    const data = await response.json();
    // console.log(response);

    //get hourly forecast
    const responseHourly = await fetch(
      `${urlHourly}&lat=${location.latitude}&lon=${location.longitude}&APPID=${openWeatherKey}`
    );
    const dataHourly = await responseHourly.json();
    //console.log(responseHourly);

    //fetch pollution data
    const responsePollution = await fetch(
      `${urlAirPollution}&lat=${location.latitude}&lon=${location.longitude}&APPID=${openWeatherKey}`
    );
    const dataPollution = await responsePollution.json();
    // console.log(responsePollution);

    if (!responsePollution.ok || !response.ok || !responseHourly.ok) {
      console.log("Error: no forecast data");
      return null;
    } else {
      return { dataPollution, data, dataHourly };
    }
  } catch (error) {
    console.log("Something went wrong");
    return null;
  }
};
