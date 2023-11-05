import { View, Text, Platform } from "react-native";
import { styles } from "./styles/PollutionStyle";
import { globalStyles, layout } from "./styles/GlobalStyles";
import NavigationWeb from "./NavigationWeb";
import { isWeb } from "./extras/ScreenSizeUtils";
import { useLanguage } from "./api/LanguageContext";
import hrTranslations from "../locales/hr.json";
import enTranslations from "../locales/en.json";
import SearchBar from "./extras/SearchBar";

export const PollutionLayout = ({ t, airPollution }) => {
  return (
    <>
      <View style={layout.flexColumn}>
        {["co", "o3", "no", "no2"].map((key) => (
          <View key={key} style={[styles.flexRow, styles.pollutionBox]}>
            <Text style={globalStyles.desc}>
              {t[key]}{" "}
              {key === "o3" ? "O₃" : key === "no2" ? "NO₂" : key.toUpperCase()}
            </Text>
            <Text style={globalStyles.pollText}>
              {airPollution && airPollution[key]} μg/&#13221;
            </Text>
          </View>
        ))}
      </View>
      <View style={layout.flexColumn}>
        {["so2", "nh3", "pm2_5", "pm10"].map((key) => (
          <View key={key} style={[styles.flexRow, styles.pollutionBox]}>
            <Text style={globalStyles.desc}>
              {t[key]} {key === "nh3" ? "NH₃" : key === "so2" ? "SO₂" : null}
            </Text>
            <Text style={globalStyles.pollText}>
              {airPollution && airPollution[key]} μg/&#13221;
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

export default function AirPollution({ pollution, airPollution }) {
  const { language } = useLanguage();
  const t = language === "hr" ? hrTranslations : enTranslations;

  const webLayout = isWeb();
  function AirQuality() {
    const list = pollution.list[0].main.aqi;
    switch (list) {
      case 1:
        return <Text>{t.good}</Text>;
      case 2:
        return <Text>{t.fair}</Text>;
      case 3:
        return <Text>{t.moderate}</Text>;
      case 4:
        <Text>{t.poor}</Text>;
      case 5:
        return <Text>{t.veryPoor}</Text>;
    }
  }

  return (
    <>
      <View
        style={webLayout ? { paddingVertical: 120 } : { paddingVertical: 60 }}
      >
        <View
          style={{
            paddingBottom: 12,
          }}
        >
          <Text style={styles.title}>{t.pollutionTitle}</Text>
          <Text style={styles.subtitle}>
            {t.quality}
            <Text style={[styles.subtitle, globalStyles.bold]}>
              {pollution && pollution.list && AirQuality()}
            </Text>
          </Text>
          <SearchBar />
        </View>
        {webLayout ? (
          <>
            <NavigationWeb />
            <View style={layout.flexRow}>
              <PollutionLayout airPollution={airPollution} t={t} />
            </View>
          </>
        ) : (
          <>
            {Platform.OS === "web" && <NavigationWeb />}
            <PollutionLayout airPollution={airPollution} t={t} />
          </>
        )}
      </View>
    </>
  );
}
