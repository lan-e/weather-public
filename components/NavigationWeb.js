import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelectedTab } from "./api/SelectedTabContext";
import hrTranslations from "../locales/hr.json";
import enTranslations from "../locales/en.json";
import { useLanguage } from "./api/LanguageContext";

export default function NavigationWeb() {
  const { language, toggleLanguage } = useLanguage();
  const t = language === "hr" ? hrTranslations : enTranslations;
  const { selectedTab, setSelectedTab } = useSelectedTab();
  const navigation = useNavigation();

  const navigateAndSetSelectedTab = (screenName) => {
    navigation.navigate(screenName);
    setSelectedTab(screenName);
  };
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigateAndSetSelectedTab("Home")}>
        <Text
          style={
            selectedTab === "Home"
              ? [styles.tabText, styles.selectedTab]
              : styles.tabText
          }
        >
          {t.home}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateAndSetSelectedTab("Pollution")}>
        <Text
          style={
            selectedTab === "Pollution"
              ? [styles.tabText, styles.selectedTab]
              : styles.tabText
          }
        >
          {t.pollute}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateAndSetSelectedTab("Map")}>
        <Text
          style={
            selectedTab === "Map"
              ? [styles.tabText, styles.selectedTab]
              : styles.tabText
          }
        >
          {t.map}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateAndSetSelectedTab("Settings")}>
        <Text
          style={
            selectedTab === "Settings"
              ? [styles.tabText, styles.selectedTab]
              : styles.tabText
          }
        >
          {t.settings}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "fixed",
    zIndex: 3,
    top: 0,
    backgroundColor: "#fff",
    height: 58,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingLeft: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  selectedTab: {
    color: "#eb6e4b",
  },
  tabText: {
    color: "#000",
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: 600,
  },
});
