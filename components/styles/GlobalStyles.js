import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  loading: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  bgImg: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
  },
  text: {
    fontFamily: "FontBold",
    fontSize: 20,
    lineHeight: 20,
    color: "#222",
  },
  pollText: {
    fontWeight: "600",
    fontSize: 18,
  },
  desc: {
    fontFamily: "Font",
    lineHeight: 16,
    fontSize: 14,
  },
  weatherIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    height: 30,
    width: 50,
  },
  bold: {
    fontFamily: "FontBold",
  },
  greyBox: {
    backgroundColor: "rgba(200,210,220,0.6)",
  },
  changeBtn: {
    backgroundColor: "#eb6e4b",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: 210,
  },
  textWhite: {
    color: "#f7f7f7",
    fontFamily: "FontBold",
  },
});
export const layout = StyleSheet.create({
  left: {
    position: "absolute",
    left: 20,
    top: 10,
    fontFamily: "Font",
  },
  container: {
    userSelect: "none",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flexRowTop: {
    alignItems: "flex-start",
  },
  flexColumn: {
    alignItems: "center",
    justifyContent: "center",
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  hourlyContainer: {
    marginVertical: 20,
    marginHorizontal: 12,
    paddingVertical: 20,
    // backgroundColor: "rgba(200,210,220,0.1)",
    // borderRadius: 10,
  },
});
