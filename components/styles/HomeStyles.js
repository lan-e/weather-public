import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  currentForecast: {
    gap: 12,
    marginHorizontal: "10%",
    marginTop: 144,
  },
  title: {
    color: "#f7f7f7",
    textAlign: "center",
    fontSize: 36,
    fontFamily: "FontBold",
    lineHeight: 36,
  },
  currentLocation: {
    color: "#f7f7f7",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  temp: {
    color: "#f7f7f7",
    textAlign: "center",
    fontSize: 32,
    fontFamily: "Font",
    width: 150,
  },
  currentDescription: {
    color: "#f7f7f7",
    fontFamily: "Font",
    textAlign: "center",
    fontSize: 24,
    width: 170,
  },
  weatherIcon: {
    width: 170,
    height: 220,
  },
  icon: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 10,
    top: 10,
    padding: 16,
    color: "#eb6e4b",
    outline: "none",
    border: "none",
  },
  iconLeft: {
    right: 36,
  },
  infoBox: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    width: 160,
    height: 120,
    borderRadius: 10,
    margin: 10,
    padding: 20,
    justifyContent: "flex-end",
  },
  arrowHourly: {
    position: "absolute",
    right: 4,
    top: 48,
  },
  inputFocused: {
    outlineStyle: "none",
  },
});
