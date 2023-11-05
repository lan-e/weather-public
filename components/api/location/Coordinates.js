import { GOOGLE_KEY } from "@env";

const key = GOOGLE_KEY;
const url = `https://maps.googleapis.com/maps/api/geocode/json?address`;

export const getCoordinatesForCity = async (cityName) => {
  try {
    //console.log(cityName);
    const response = await fetch(`${url}=${cityName}&key=${key}`);
    const data = await response.json();
    //console.log(data);
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
      // const roundedLatitude = parseFloat(lat.toFixed(6));
      // const roundedLongitude = parseFloat(lng.toFixed(6));
      // return { latitude: roundedLatitude, longitude: roundedLongitude };
    } else {
      // console.log("Geocoding API Response:", data);
      console.log("City not found");
    }
  } catch (error) {
    console.log("Error geocoding city");
    throw error;
  }
};
