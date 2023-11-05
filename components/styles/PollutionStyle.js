import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pollutionBox: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    width: 320,
    height: 80,
    borderRadius: 10,
    margin: 10,
    padding: 24,
    alignItems: "baseline",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 18,
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
    color: "#f7f7f7",
    paddingTop: 50,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 12,
    color: "#f7f7f7",
  },
});
