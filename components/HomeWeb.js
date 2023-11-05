import { View, Text, Image } from "react-native";
import { styles } from "./styles/HomeStyles";
import { globalStyles, layout } from "./styles/GlobalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowsDownToLine,
  faCompass,
  faDroplet,
  faSun,
  faTemperature2,
  faWind,
  faArrowUpLong,
  faArrowDownLong,
  faClock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

export default function HomeWeb({
  forecast,
  Time,
  today,
  formattedSunrise,
  formattedSunset,
  compassSector,
  t,
}) {
  const current = forecast.weather[0];
  return (
    <>
      <View style={layout.flexRow}>
        <Image
          style={styles.weatherIcon}
          source={{
            uri: `https://openweathermap.org/img/wn/${current.icon}@4x.png`,
          }}
        />
        <View style={[styles.weatherIcon, layout.flexColumn]}>
          <Text style={styles.temp}>
            {Math.round((forecast.main.temp - 272.15) * 10) / 10}&deg;C
          </Text>
          <Text style={styles.currentDescription}>{current.description}</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesomeIcon icon={faClock} style={styles.icon} />
          <Text style={globalStyles.text}>{Time(forecast)}</Text>
          <Text style={globalStyles.desc}>{t.time}</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesomeIcon icon={faCalendar} style={styles.icon} />
          <Text style={globalStyles.text}>{today}</Text>
          <Text style={globalStyles.desc}>{t.date}</Text>
        </View>
      </View>
      <View style={layout.flexRow}>
        <View style={styles.infoBox}>
          <FontAwesomeIcon icon={faTemperature2} style={styles.icon} />
          <Text style={globalStyles.text}>
            {Math.round((forecast.main.feels_like - 272.15) * 10) / 10}
            &#8451;
          </Text>
          <Text style={globalStyles.desc}>{t.realFeel}</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesomeIcon icon={faDroplet} style={styles.icon} />
          <Text style={globalStyles.text}>{forecast.main.humidity}%</Text>
          <Text style={globalStyles.desc}>{t.humidity}</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesomeIcon
            icon={faSun}
            style={[styles.icon, styles.iconLeft]}
          />
          <FontAwesomeIcon
            icon={faArrowUpLong}
            style={[styles.icon, styles.arrow]}
          />
          <Text style={globalStyles.text}>{formattedSunrise}</Text>
          <Text style={globalStyles.desc}>{t.sunrise}</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesomeIcon
            icon={faSun}
            style={[styles.icon, styles.iconLeft]}
          />
          <FontAwesomeIcon
            icon={faArrowDownLong}
            style={[styles.icon, styles.arrow]}
          />
          <Text style={globalStyles.text}>{formattedSunset}</Text>
          <Text style={globalStyles.desc}>{t.sunset}</Text>
        </View>
      </View>
      <View
        style={[
          layout.flexRow,
          {
            paddingBottom: 50,
          },
        ]}
      >
        <View style={styles.infoBox}>
          <FontAwesomeIcon icon={faArrowsDownToLine} style={styles.icon} />
          <Text style={globalStyles.text}>
            {Math.round(forecast.main.pressure)} hPa
          </Text>
          <Text style={globalStyles.desc}>{t.pressure}</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesomeIcon icon={faWind} style={styles.icon} />
          <Text style={globalStyles.text}>
            {Math.round(forecast.wind.speed * 10) / 10} m/s
          </Text>
          <Text style={globalStyles.desc}>{t.windSpeed}</Text>
        </View>
        {forecast.wind?.deg && (
          <View style={styles.infoBox}>
            <FontAwesomeIcon icon={faCompass} style={styles.icon} />
            <Text style={globalStyles.text}>
              {
                (forecast.windDirection =
                  compassSector[(forecast.wind.deg / 22.5).toFixed(0)])
              }
            </Text>
            <Text style={globalStyles.desc}>{t.windDir}</Text>
          </View>
        )}
        {forecast.wind?.gust && (
          <View style={styles.infoBox}>
            <FontAwesomeIcon
              icon={faArrowUpLong}
              style={[styles.icon, styles.arrow]}
            />
            <FontAwesomeIcon
              icon={faWind}
              style={[styles.icon, styles.iconLeft]}
            />
            <Text style={globalStyles.text}>
              {Math.round(forecast.wind.gust * 10) / 10} m/s
            </Text>
            <Text style={globalStyles.desc}>{t.windGust}</Text>
          </View>
        )}
      </View>
    </>
  );
}
