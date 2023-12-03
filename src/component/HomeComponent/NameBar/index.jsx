import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useFonts } from "expo-font";

const headerImage = require("../../../assets/images/header.jpg");

const NameBar = () => {
  const [fontsLoaded] = useFonts({
    MontserratBlack: require("../../../../assets/Montserrat-Black.ttf"),
    MontserratBold: require("../../../../assets/Montserrat-Bold.ttf"),
    MontserratExtraBold: require("../../../../assets/Montserrat-ExtraBold.ttf"),
    MontserratSemiBold: require("../../../../assets/Montserrat-SemiBold.ttf"),
    MontserratRegular: require("../../../../assets/Montserrat-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return undefined;
  }
  return <Header />;
};

export default NameBar;

const Header = () => (
  <View style={styles.header}>
    <ImageContainer image={headerImage} />
    <HeaderTitle />
  </View>
);

const ImageContainer = ({ image, height = "100%", width = "100%" }) => (
  <View style={styles.imageContainer}>
    <Image source={image} style={[{ height, width }]} />
  </View>
);

const HeaderTitle = () => (
  <View style={styles.title}>
    <Text style={styles.bigTitle}>Hi, khundknd</Text>
    <Text style={styles.smallTitle}>Sept 10th, 2023</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { paddingHorizontal: 10, flex: 1, justifyContent: "center" },

  bigTitle: { fontSize: 16, fontFamily: "MontserratSemiBold" },

  smallTitle: { fontSize: 10, opacity: 0.6 },
});
