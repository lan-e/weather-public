import React, { createContext, useState, useEffect, useContext } from "react";
import * as Font from "expo-font";

const FontContext = createContext();

const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Font: require("../../assets/fonts/Lato/Lato-Regular.ttf"),
        FontBold: require("../../assets/fonts/Lato/Lato-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {fontsLoaded ? children : null}
    </FontContext.Provider>
  );
};
export const useFont = () => {
  return useContext(FontContext);
};

export default FontProvider;
