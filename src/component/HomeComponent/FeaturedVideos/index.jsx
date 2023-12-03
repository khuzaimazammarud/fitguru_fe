import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";

const thumbnail = require("../../../assets/images/tb.jpg");

const FeaturedVideos = () => {
  const [fontsLoaded] = useFonts({
    MontserratSemiBold: require("../../../../assets/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <View style={{ marginHorizontal: "3%" }}>
      <Label>Featured Reels</Label>
      <ScrollView horizontal>
        <View style={{ flexDirection: "row" }}>
          <VideoPlay />
        </View>
      </ScrollView>
    </View>
  );
};

export default FeaturedVideos;

const VideoPlay = () => (
  <View style={styles.videoBackground}>
    <View style={{ borderRadius: 10, overflow: "hidden" }}>
      <ImageBackground
        source={thumbnail}
        style={{
          height: 150,
          width: 300,
        }}
      />
    </View>
  </View>
);

const Label = ({ children }) => <Text style={styles.label}>{children}</Text>;

const styles = StyleSheet.create({
  label: { fontSize: 24, marginVertical: 10, fontFamily: "MontserratSemiBold" },

  videoBackground: {
    borderRadius: 15,
    marginHorizontal: 12,
    shadowOffset: { width: -5, height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: "#fff",
  },
});
