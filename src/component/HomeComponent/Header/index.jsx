import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import Icon, { Icons } from "../../Icons";
import color from "../../../styles/color";
import { useSelector } from 'react-redux';

const headerImage = require("../../../assets/images/header.jpg");

// const NameBar = ({ navigation }) => {
//   // const [fontsLoaded] = useFonts({
//   //   MontserratBlack: require("../../../../assets/Montserrat-Black.ttf"),
//   //   MontserratBold: require("../../../../assets/Montserrat-Bold.ttf"),
//   //   MontserratExtraBold: require("../../../../assets/Montserrat-ExtraBold.ttf"),
//   //   MontserratSemiBold: require("../../../../assets/Montserrat-SemiBold.ttf"),
//   //   MontserratRegular: require("../../../../assets/Montserrat-Regular.ttf"),
//   // });
//   // if (!fontsLoaded) {
//   //   return undefined;
//   // }
//   return <Header navigation = {navigation} />;
// };

// export default NameBar;

const Header = ({ navigation }) => {

  const auth = useSelector(state => state.AuthReducer);

  return (
    <View style={styles.header}>
      <BackButton navigation={navigation} />
      <HeaderTitle name={auth.userData.name} />
      <ImageContainer image={headerImage} navigation={navigation}/>
    </View>
  )
};

const BackButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
  >
    <Icon
      type={Icons.MaterialCommunityIcons}
      name={'arrow-left'}
      color={color.orange}
    />
  </TouchableOpacity>
);

const ImageContainer = ({ image, height = "100%", width = "100%", navigation }) => (
  <TouchableOpacity 
    style={styles.imageContainer}
    onPress={() => navigation.navigate('Account')} 
  >
    <Image source={image} style={[{ height, width }]} />
  </TouchableOpacity>
);

const HeaderTitle = ({name}) => (
  <View style={styles.title}>
    <Text style={styles.bigTitle}>Hi, {name}</Text>
    <Text style={styles.smallTitle}>{Date()}</Text>
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

export default Header;