import {
  Text,
  StyleSheet,
  View,
  Platform,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import logoBlack from "../assets/logoBlack.png";
import NavigationWeb from "../components/NavigationWeb";
import LanguageSwitcher from "../components/api/LanguageSwitcher";
import { useLanguage } from "../components/api/LanguageContext";
import hrTranslations from "../locales/hr.json";
import enTranslations from "../locales/en.json";
import { globalStyles } from "../components/styles/GlobalStyles";

export const handleWebsitePress = async (url) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: $(url)`);
  }
};

export default function Settings() {
  const { language } = useLanguage();
  const t = language === "hr" ? hrTranslations : enTranslations;

  return (
    <>
      <View style={styles.container}>
        {Platform.OS === "web" ? <NavigationWeb /> : null}
        <View style={styles.content}>
          <Text style={styles.title}>{t.settings}</Text>
          <View style={styles.container}>
            <LanguageSwitcher />
          </View>
          {Platform.OS === "web" ? (
            <View style={styles.flexRow}>
              <Text style={globalStyles.text}>API: </Text>
              <TouchableOpacity
                onPress={() =>
                  handleWebsitePress("https://openweathermap.org/")
                }
              >
                <Text style={[globalStyles.text, styles.APIcolor]}>
                  OpenWeather
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handleWebsitePress("https://openweathermap.org/")}
            >
              <Image source={logoBlack} style={{ height: 88, width: 200 }} />
            </TouchableOpacity>
          )}
          <View style={styles.flexRow}>
            <Text style={globalStyles.text}>{t.author} </Text>
            <TouchableOpacity
              onPress={() =>
                handleWebsitePress("https://portfolio-nela.vercel.app/")
              }
            >
              <Text style={[globalStyles.text, styles.blueColor]}>
                Nela Đuranec
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: "FontBold",
    color: "#777",
    paddingTop: 50,
  },
  blueColor: {
    color: "#089",
  },
  APIcolor: {
    color: "#eb6e4b",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
