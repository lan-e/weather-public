import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from "react-native";
import { globalStyles, layout } from "../components/styles/GlobalStyles";
import AirPollution from "../components/AirPollution";
import { loadForecastAPI } from "../components/api/LoadForecast";
import { useDataContext } from "../components/api/PollutionDataContext";

const bgImg = require("../assets/pollute.jpg");

export default function Pollution() {
  const { dataPollution, setDataPollution } = useDataContext();
  const [refreshing, setRefreshing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const loadPollutionData = async () => {
    setRefreshing(true);
    try {
      const { dataPollution: newPollutionData } = await loadForecastAPI(
        cityName
      );
      setDataPollution(newPollutionData);
    } catch (error) {
      console.log("Error: no new pollution data");
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadPollutionData();
  }, []);

  if (!imageLoaded) {
    return (
      <ImageBackground
        source={bgImg}
        style={globalStyles.bgImg}
        onLoad={() => setImageLoaded(true)}
      >
        <SafeAreaView style={globalStyles.loading}>
          <ActivityIndicator size="large" color="#7b654e" />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (!dataPollution) {
    return (
      <SafeAreaView style={globalStyles.loading}>
        <ActivityIndicator size="large" color="#7b654e" />
      </SafeAreaView>
    );
  }

  let airPollution =
    dataPollution && dataPollution.list && dataPollution.list[0].components;

  return (
    <ImageBackground source={bgImg} style={globalStyles.bgImg}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#7b654e"]}
            onRefresh={() => loadPollutionData()}
          />
        }
        overScrollMode={"never"}
        style={layout.container}
      >
        <AirPollution pollution={dataPollution} airPollution={airPollution} />
      </ScrollView>
    </ImageBackground>
  );
}
