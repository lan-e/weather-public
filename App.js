import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import Home from "./screens/Home";
import Pollution from "./screens/Pollution";
import Map from "./screens/Map";
import Settings from "./screens/Settings";
import Navigation from "./components/Navigation";
import { SelectedTabProvider } from "./components/api/SelectedTabContext";
import { LanguageProvider } from "./components/api/LanguageContext";
import { LocationProvider } from "./components/api/location/LocationContext";
import { CityNameProvider } from "./components/api/location/CityNameContext";
import { PollutionProvider } from "./components/api/PollutionDataContext";
import FontProvider from "./components/api/FontContext";

export default function App() {
  return (
    <LocationProvider>
      <LanguageProvider>
        <SelectedTabProvider>
          <CityNameProvider>
            <PollutionProvider>
              <FontProvider>
                <NavigationContainer>
                  {Platform.OS === "web" ? (
                    <Stack.Navigator initialRouteName="Home">
                      <Stack.Group
                        screenOptions={{
                          headerShown: false,
                        }}
                      >
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Pollution" component={Pollution} />
                        <Stack.Screen name="Map" component={Map} />
                        <Stack.Screen name="Settings" component={Settings} />
                      </Stack.Group>
                    </Stack.Navigator>
                  ) : (
                    <Stack.Navigator initialRouteName="Navigation">
                      <Stack.Screen
                        name="Navigation"
                        component={Navigation}
                        options={{ headerShown: false }}
                      />
                    </Stack.Navigator>
                  )}
                </NavigationContainer>
              </FontProvider>
            </PollutionProvider>
          </CityNameProvider>
        </SelectedTabProvider>
      </LanguageProvider>
    </LocationProvider>
  );
}
