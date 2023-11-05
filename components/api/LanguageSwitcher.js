import { Text, TouchableOpacity } from "react-native";
import hrTranslations from "../../locales/hr";
import enTranslations from "../../locales/en";
import { useLanguage } from "./LanguageContext";
import { globalStyles } from "../styles/GlobalStyles";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();
  const t = language === "hr" ? hrTranslations : enTranslations;

  const langSelected = () => {
    if (language === "hr") {
      return (
        <Text style={globalStyles.textWhite}>
          {`${t.currentLang} ${t.cro}`}
        </Text>
      );
    } else {
      return (
        <Text style={globalStyles.textWhite}>{`${t.currentLang} ${t.en}`}</Text>
      );
    }
  };

  return (
    <>
      <TouchableOpacity onPress={toggleLanguage} style={globalStyles.changeBtn}>
        {langSelected()}
      </TouchableOpacity>
    </>
  );
}
