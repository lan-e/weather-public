import { View, Text, Image } from "react-native";
import { styles } from "./styles/HomeStyles";
import { globalStyles, layout } from "./styles/GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { isWeb } from "./extras/ScreenSizeUtils";
import ScrollToEnd from "./ScrollToEnd";

export default function HourlyForecast({ hourly, Time, language, t }) {
  const webLayout = isWeb();

  function getDayOfWeek(timestamp) {
    const daysWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const daniTjedan = [
      "Nedjelja",
      "Ponedjeljak",
      "Utorak",
      "Srijeda",
      "Četvrtak",
      "Petak",
      "Subota",
    ];
    const date = new Date(timestamp * 1000);
    const dayOfWeekEn = daysWeek[date.getDay()];
    const dayOfWeekHr = daniTjedan[date.getDay()];
    const dayOfWeek = language === "hr" ? dayOfWeekHr : dayOfWeekEn;
    return dayOfWeek;
  }

  const forecastByDay = {}; // Object to hold forecast data for each day
  let firstDay = null;
  hourly.forEach((item, index) => {
    const dayOfWeek = getDayOfWeek(item.dt);

    if (!forecastByDay[dayOfWeek]) {
      forecastByDay[dayOfWeek] = [];
    }
    if (firstDay === null) {
      firstDay = dayOfWeek;
    }
    forecastByDay[dayOfWeek].push(item);
  });

  return (
    <>
      <View style={layout.hourlyContainer}>
        {webLayout ? (
          <View style={[layout.flexRow, layout.flexRowTop]}>
            {Object.keys(forecastByDay).map((day) => (
              <View key={day}>
                <Text style={[styles.currentDescription, { width: "100%" }]}>
                  {day === firstDay ? t.today : day}
                </Text>
                <ScrollView
                  style={{ height: 450 }}
                  showsVerticalScrollIndicator={false}
                >
                  {forecastByDay[day].map((item) => (
                    <View
                      key={item.dt}
                      style={[styles.infoBox, globalStyles.greyBox]}
                    >
                      <Image
                        style={globalStyles.weatherIcon}
                        source={{
                          uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`,
                        }}
                      />
                      <Text style={globalStyles.text}>
                        {Math.round((item.main.temp - 272.15) * 10) / 10}
                        &#8451;
                      </Text>
                      <Text style={layout.left}>{Time(item)}</Text>
                      <Text style={globalStyles.desc}>
                        {t.humidity}{" "}
                        <Text style={globalStyles.bold}>
                          {item.main.humidity}%
                        </Text>
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ))}
          </View>
        ) : (
          <View>
            {Object.keys(forecastByDay).map((day) => (
              <View key={day}>
                <Text
                  style={[
                    styles.currentDescription,
                    {
                      textAlign: "left",
                      paddingLeft: 20,
                      paddingTop: 20,
                      width: "100%",
                    },
                  ]}
                >
                  {day === firstDay ? t.today : day}
                </Text>
                <ScrollToEnd>
                  {forecastByDay[day].map((item) => (
                    <View
                      key={item.dt}
                      style={[styles.infoBox, globalStyles.greyBox]}
                    >
                      <Image
                        style={globalStyles.weatherIcon}
                        source={{
                          uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`,
                        }}
                      />
                      <Text style={globalStyles.text}>
                        {Math.round((item.main.temp - 272.15) * 10) / 10}
                        &#8451;
                      </Text>
                      <Text style={layout.left}>{Time(item)}</Text>
                      <Text style={globalStyles.desc}>
                        {t.humidity}{" "}
                        <Text style={globalStyles.bold}>
                          {item.main.humidity}%
                        </Text>
                      </Text>
                    </View>
                  ))}
                </ScrollToEnd>
              </View>
            ))}
          </View>
        )}
      </View>
    </>
  );
}
