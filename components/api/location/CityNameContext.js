import { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { GOOGLE_KEY } from "@env";

const CityNameContext = createContext();
const key = GOOGLE_KEY;
const url = `https://maps.googleapis.com/maps/api/geocode/json?`;

export function CityNameProvider({ children }) {
  const [cityName, setCityName] = useState("Varaždin");

  useEffect(() => {
    async function fetchCityNameFromLocation() {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetch(
        `${url}latlng=${latitude},${longitude}&key=${key}`
      );

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const city = data.results[0].address_components.find((component) =>
          component.types.includes("locality")
        );

        if (city) {
          setCityName(city.long_name);
        }
      }
    }

    fetchCityNameFromLocation();
  }, []);

  return (
    <CityNameContext.Provider value={{ cityName, setCityName }}>
      {children}
    </CityNameContext.Provider>
  );
}

export function useCityName() {
  return useContext(CityNameContext);
}
