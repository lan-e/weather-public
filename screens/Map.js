import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import hrTranslations from "../locales/hr.json";
import enTranslations from "../locales/en.json";
import { useLanguage } from "../components/api/LanguageContext";
import { getCoordinatesForCity } from "../components/api/location/Coordinates";
import { useCityName } from "../components/api/location/CityNameContext";
import NavigationWeb from "../components/NavigationWeb";
import { globalStyles, layout } from "../components/styles/GlobalStyles";

import qrApp from "../assets/qrApp.png";
import { handleWebsitePress } from "./Settings";
import { isWeb } from "../components/extras/ScreenSizeUtils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLayerGroup,
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { loadForecastAPI } from "../components/api/LoadForecast";
import SearchBar from "../components/extras/SearchBar";

export default function Maps() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSearch, setIsVisibleSearch] = useState(false);
  const webLayout = isWeb();
  const { language } = useLanguage();
  const t = language === "hr" ? hrTranslations : enTranslations;
  const [markers, setMarkers] = useState([]);
  const { cityName } = useCityName();
  const [mapType, setMapType] = useState("standard");
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const cityCoordinates = await getCoordinatesForCity(cityName);
        const initialRegion = {
          latitude: cityCoordinates.latitude,
          longitude: cityCoordinates.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        };

        setMarkers([]);
        setRegion(initialRegion);
        const forecastData = await loadForecastAPI(cityName, language);

        if (forecastData && forecastData.data && forecastData.data.name) {
          const newMarker = jsonToGeoJson(forecastData.data);
          setMarkers([newMarker]);
        }
      } catch (error) {
        console.error("Error fetching city coordinates:", error);
      }
    };

    fetchCityData();
  }, [cityName, language]);

  const jsonToGeoJson = (weatherItem) => {
    return {
      weather: weatherItem.weather[0].description,
      temperature: weatherItem.main.temp,
      // icon:
      //   "https://openweathermap.org/img/wn/" +
      //   weatherItem.weather[0].icon +
      //   "@4x.png",
      coordinate: {
        latitude: weatherItem.coord.lat,
        longitude: weatherItem.coord.lon,
      },
    };
  };
  const toggleMapType = () => {
    setMapType((prevMapType) => {
      return prevMapType === "standard" ? "hybrid" : "standard"; //standard, satellite, hybrid, or terrain
    });
  };
  return (
    <>
      {Platform.OS === "web" ? (
        <View style={styles.container}>
          <NavigationWeb />
          <ScrollView
            contentContainerStyle={[
              webLayout ? layout.flexCenter : null,
              styles.padding,
              { paddingVertical: 100 },
            ]}
          >
            <View style={layout.flexCenter}>
              <Text style={[globalStyles.text]}>{t.noMaps}</Text>
              <Text style={[globalStyles.desc, { padding: 6 }]}>
                {t.openExpo}
              </Text>
              <Text style={[globalStyles.desc, styles.padding]}>{t.scan}</Text>
              <TouchableOpacity
                onPress={() =>
                  handleWebsitePress(
                    "https://expo.dev/@lan-e/weather-cast?serviceType=classic&distribution"
                  )
                }
              >
                <View style={[layout.flexCenter, styles.img]}>
                  <Image source={qrApp} style={[globalStyles.bgImg]} />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.container}>
          <MapView
            mapType={mapType}
            style={styles.map}
            region={region}
            onPress={() => {
              setIsVisible(false);
              setIsVisibleSearch(false);
            }}
          >
            {markers.map((marker, index) => (
              <Marker
                style={styles.marker}
                key={index}
                coordinate={marker.coordinate}
                onPress={() => setIsVisible(true)}
              >
                <FontAwesomeIcon
                  icon={faLocationDot}
                  color={"#eb6e4b"}
                  size={40}
                />
                {isVisible && (
                  <View style={styles.popup}>
                    <Text style={[globalStyles.desc, globalStyles.bold]}>
                      {Math.round((marker.temperature - 272.15) * 10) / 10}
                      &#8451;
                    </Text>
                    <Text style={globalStyles.desc}>{marker.weather}</Text>
                  </View>
                )}
              </Marker>
            ))}
          </MapView>
          {isVisibleSearch && (
            <View style={styles.searchBarView}>
              <SearchBar />
            </View>
          )}
          <TouchableOpacity
            style={[styles.btn, styles.btnSearch]}
            onPress={() => setIsVisibleSearch(!isVisibleSearch)}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={styles.icon}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleMapType}
            style={[styles.btn, styles.btnLayers]}
          >
            <FontAwesomeIcon
              icon={faLayerGroup}
              style={styles.icon}
              size={20}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none",
  },
  map: {
    flex: 1,
  },
  padding: {
    textAlign: "center",
    padding: 12,
  },
  img: {
    height: 300,
    width: 300,
  },
  btn: {
    backgroundColor: "#089",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  btnLayers: {
    bottom: 40,
    left: 10,
  },
  btnSearch: {
    top: 50,
    right: 10,
  },
  searchBarView: {
    alignSelf: "center",
    position: "absolute",
    top: 80,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#089",
  },
  icon: {
    color: "#c7c7c7",
  },
  marker: {
    width: 160,
    height: 120,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "absolute",
    bottom: 45,
    paddingHorizontal: 20,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
