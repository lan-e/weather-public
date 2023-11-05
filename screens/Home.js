import { useEffect, useState } from "react";
import { styles } from "../components/styles/HomeStyles";
import { globalStyles, layout } from "../components/styles/GlobalStyles";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Platform,
  RefreshControl,
} from "react-native";
import NavigationWeb from "../components/NavigationWeb";
import HomeMobile from "../components/HomeMobile";
import HomeWeb from "../components/HomeWeb";
import HourlyForecast from "../components/HourlyForecast";
import { loadForecastAPI } from "../components/api/LoadForecast";
import { isWeb } from "../components/extras/ScreenSizeUtils";
import { useLanguage } from "../components/api/LanguageContext";
import hrTranslations from "../locales/hr.json";
import enTranslations from "../locales/en.json";
import SearchBar from "../components/extras/SearchBar";
import { useCityName } from "../components/api/location/CityNameContext";
import { useDataContext } from "../components/api/PollutionDataContext";

const bgImgDark = require("../assets/night.gif");
const bgImgDarkRain = require("../assets/rain.gif");
const bgImgDarkThunder = require("../assets/thunder.gif");
const bgImgLight = require("../assets/day.gif");
const bgImgLightRain = require("../assets/rainDay.gif");
const bgImgLightThunder = require("../assets/thunderDay.gif");
const bgImgSun = require("../assets/sun.gif");
const bgImgSnow = require("../assets/snow.gif");

export function Time(item) {
  const date = new Date(item.dt * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
}

export default function Home() {
  const { cityName } = useCityName();
  const { language } = useLanguage();
  const t = language === "hr" ? hrTranslations : enTranslations;

  const webLayout = isWeb();
  const [refreshing, setRefreshing] = useState(false);
  const [isDark, setIsDark] = useState(Boolean);
  const { dataPollution, setDataPollution } = useDataContext();
  const [weatherData, setWeatherData] = useState({
    forecast: null,
    dataHourly: null,
  });

  const loadForecast = async () => {
    setRefreshing(true);
    try {
      const { data, dataHourly, dataPollution } = await loadForecastAPI(
        cityName,
        language
      );
      setWeatherData({
        forecast: data,
        dataHourly,
      });
      checkTheme();
      setDataPollution(dataPollution);
    } catch (error) {
      console.log("Error: no data");
    }
    setRefreshing(false);
  };

  // const hoursForTheme = 1; //test
  const hoursForTheme = new Date().getHours();
  function checkTheme() {
    if (hoursForTheme >= 20 || hoursForTheme <= 6) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }
  function changeBg() {
    let id = forecast.weather[0].id.toString();
    //id = "200"; //test
    const group = id[0];
    if (
      (5 <= hoursForTheme && hoursForTheme <= 6) ||
      (18 <= hoursForTheme && hoursForTheme <= 19)
    ) {
      return bgImgSun;
    } else {
      switch (group) {
        case "2":
          return isDark ? bgImgDarkThunder : bgImgLightThunder;
        case "3":
        case "5":
          return isDark ? bgImgDarkRain : bgImgLightRain; //fall-through feature
        case "6":
          return bgImgSnow;
        default:
          return isDark ? bgImgDark : bgImgLight;
      }
    }
  }
  useEffect(() => {
    loadForecast();
  }, [language, cityName]);

  const { forecast, dataHourly } = weatherData;
  if (!weatherData.forecast || !weatherData.dataHourly || !dataPollution) {
    return (
      <SafeAreaView style={globalStyles.loading}>
        <ActivityIndicator size="large" color="#eb6e4b" />
      </SafeAreaView>
    );
  }
  const hourly = dataHourly.list;

  const date = new Date(forecast.dt * 1000); // convert to milliseconds
  const day = date.getDate();
  const month = date.getMonth() + 1;

  function getDate(month) {
    function getDaySuffix(day) {
      if (day.toString().endsWith("1") && day != 11) return "st";
      else if (day.toString().endsWith("2") && day != 12) return "nd";
      else if (day.toString().endsWith("3") && day != 13) return "rd";
      else return "th";
    }
    if (month >= 1 && month <= 12) {
      if (language == "en") {
        const monthNames = [
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
        return `${day}${getDaySuffix(day)} ${monthNames[month - 1]}`;
      } else {
        const monthNames = [
          "siječanj",
          "veljača",
          "ožujak",
          "travanj",
          "svibanj",
          "lipanj",
          "srpanj",
          "kolovoz",
          "rujan",
          "listopad",
          "studeni",
          "prosinac",
        ];
        return `${day}. ${monthNames[month - 1]}`;
      }
    } else {
      return "";
    }
  }
  const today = getDate(month);
  const timeSunrise = new Date(forecast.sys.sunrise * 1000);
  const timeSunset = new Date(forecast.sys.sunset * 1000);
  const hoursSunrise = timeSunrise.getHours();
  const minutesSunrise = timeSunrise.getMinutes();
  const hoursSunset = timeSunset.getHours();
  const minutesSunset = timeSunset.getMinutes();

  // Add zeros if needed
  const formattedHoursSunrise =
    hoursSunrise < 10 ? `0${hoursSunrise}` : hoursSunrise;
  const formattedMinutesSunrise =
    minutesSunrise < 10 ? `0${minutesSunrise}` : minutesSunrise;
  const formattedHoursSunset =
    hoursSunset < 10 ? `0${hoursSunset}` : hoursSunset;
  const formattedMinutesSunset =
    minutesSunset < 10 ? `0${minutesSunset}` : minutesSunset;
  const formattedSunrise = `${formattedHoursSunrise}:${formattedMinutesSunrise}`;
  const formattedSunset = `${formattedHoursSunset}:${formattedMinutesSunset}`;

  function windDirection() {
    if (language == "en") {
      const compassSector = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
        "N",
      ];
      return compassSector;
    } else {
      const compassSector = [
        "S",
        "SSI",
        "I",
        "IIJ",
        "I",
        "IJJ",
        "J",
        "JJI",
        "S",
        "SJZ",
        "Z",
        "ZZJ",
        "Z",
        "ZZI",
        "I",
        "IIS",
        "S",
      ];
      return compassSector;
    }
  }
  return (
    <>
      <ImageBackground source={changeBg()} style={globalStyles.bgImg}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={["#eb6e4b"]}
              onRefresh={() => loadForecast()}
            />
          }
          overScrollMode={"never"}
          style={layout.container}
        >
          <View style={styles.currentForecast}>
            <Text style={styles.title}>{t.homeTitle}</Text>
            <SearchBar />
          </View>
          {webLayout ? (
            <>
              <NavigationWeb />
              <HomeWeb
                forecast={forecast}
                Time={Time}
                today={today}
                formattedSunrise={formattedSunrise}
                formattedSunset={formattedSunset}
                compassSector={windDirection()}
                t={t}
              />
            </>
          ) : (
            <>
              {Platform.OS === "web" && <NavigationWeb />}
              <HomeMobile
                forecast={forecast}
                Time={Time}
                today={today}
                formattedSunrise={formattedSunrise}
                formattedSunset={formattedSunset}
                compassSector={windDirection()}
                t={t}
              />
            </>
          )}
          <Text style={styles.title}>{t.upcoming}</Text>
          <HourlyForecast
            hourly={hourly}
            Time={Time}
            language={language}
            t={t}
          />
        </ScrollView>
      </ImageBackground>
    </>
  );
}
