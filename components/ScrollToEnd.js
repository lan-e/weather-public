import { useRef } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";

import { styles } from "./styles/HomeStyles";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function ScrollToEnd({ children }) {
  const scrollViewRef = useRef();

  const handleScrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode={"never"}
        ref={scrollViewRef}
      >
        {children}
      </ScrollView>
      <TouchableOpacity style={styles.arrowHourly} onPress={handleScrollToEnd}>
        <FontAwesomeIcon
          icon={faChevronRight}
          size={36}
          color={"#c7c7c7"}
          style={styles.inputFocused}
        />
      </TouchableOpacity>
    </View>
  );
}
