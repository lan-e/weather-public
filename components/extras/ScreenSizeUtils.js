import { useWindowDimensions } from "react-native";

export function isWeb() {
  const windowDimensions = useWindowDimensions();
  return windowDimensions.width >= 875; // Adjust the value as needed
}
