import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "../screens/Home";
import Pollution from "../screens/Pollution";
import Settings from "../screens/Settings";
import Map from "../screens/Map";

// Screens
const homeName = "Home";
const pollutionName = "Pollution";
const settingsName = "Settings";
const mapName = "Map";
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === homeName) {
            iconName = "home";
          } else if (route.name === pollutionName) {
            iconName = "cloud";
          } else if (route.name === mapName) {
            iconName = "map";
          } else if (route.name === settingsName) {
            iconName = "gear";
          }

          // Return the icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#089",
        tabBarInactiveTintColor: "#c7c7c7",
        tabBarLabelStyle: {
          display: "none",
        },
      })}
    >
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={pollutionName} component={Pollution} />
      <Tab.Screen name={mapName} component={Map} />
      <Tab.Screen name={settingsName} component={Settings} />
    </Tab.Navigator>
  );
}
