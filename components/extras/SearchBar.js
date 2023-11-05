import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { useCityName } from "../api/location/CityNameContext";
import { layout } from "../styles/GlobalStyles";
import { useLanguage } from "../api/LanguageContext";
import hrTranslations from "../../locales/hr.json";
import enTranslations from "../../locales/en.json";
import { loadForecastAPI } from "../api/LoadForecast";
import { isWeb } from "./ScreenSizeUtils";

export default function SearchBar() {
  const { language } = useLanguage();
  const t = language === "hr" ? hrTranslations : enTranslations;
  const { cityName, setCityName } = useCityName();
  const [newCityName, setNewCityName] = useState("");
  const [isDataAvailable, setIsDataAvailable] = useState(true);

  const handleLoadForecast = async () => {
    const forecastData = await loadForecastAPI(newCityName);
    if (forecastData) {
      setIsDataAvailable(true);
      setCityName(forecastData.data.name); //placeholder change
      setNewCityName(forecastData.data.name); //corrects data if its misspelled
    } else {
      setIsDataAvailable(false);
    }
  };
  const handleKeyPress = (event) => {
    if (event.nativeEvent.key === "Enter") {
      event.preventDefault();
      handleLoadForecast();
    }
  };
  useEffect(() => {
    setNewCityName("");
  }, [cityName]);

  return (
    <View style={layout.flexRow}>
      <TextInput
        placeholder={cityName}
        onChangeText={(text) => {
          setNewCityName(text);
        }}
        value={newCityName}
        style={[styles.input, isWeb ? styles.inputFocused : null]}
        color={"#fff"}
        placeholderTextColor="#f7f7f7"
        onSubmitEditing={handleLoadForecast}
        returnKeyType={"search"}
        blurOnSubmit={Platform.OS !== "web"}
        onKeyPress={handleKeyPress}
        multiline={true}
        numberOfLines={2}
      />
      {!isDataAvailable && <Text style={styles.errorText}>{t.error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    position: "absolute",
    top: 62,
    color: "#f7f7f7",
    fontWeight: "600",
  },
  input: {
    color: "#f7f7f7",
    fontFamily: "Font",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    textDecorationLine: "none",
    width: 330,
    height: 78,
  },
  inputFocused: {
    outlineStyle: "none",
  },
});
