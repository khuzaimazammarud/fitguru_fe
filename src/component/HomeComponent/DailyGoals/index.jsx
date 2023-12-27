import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import * as Progress from "react-native-progress";
import imagePath from "../../../constants/imagePath";

import EditMealModal from "../../EditMealModal";

const banner = require("../../../assets/images/bg2.jpg");
const banner2 = require("../../../assets/images/bg3.jpg");

const walk = require("../../../assets/images/walk.png");
const yoga = require("../../../assets/images/yoga.png");
const cycle = require("../../../assets/images/cycle.png");
const water = require("../../../assets/images/water.png");

const Analytics = ({ navigation }) => {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("Analytics")}>
        <Banner text={"ANALYTICS"} image={banner} />
      </TouchableOpacity>
      <View style={{ marginHorizontal: "3%" }}>
        <Label>Daily Goals</Label>
        <View style={{ flexDirection: "row" }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item, index) => (
              <Card key={index} data={item} index={index} />
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Banner text={"VIEW MEAL"} image={imagePath.banner2} />
        </TouchableOpacity>
        {open ? <EditMealModal open={true} setOpen={setOpen} /> : null}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("WaterTracking")}>
        <Banner text={"WATER INTAKE"} image={banner2} />
      </TouchableOpacity>
    </>
  );
};

const Card = ({ data, index }) => {
  const cardHeight = index % 2 === 0 ? 180 : 150;

  return (
    <View
      style={{
        flex: 1,
        height: cardHeight,
        padding: 10,
        alignSelf: "center",
        backgroundColor: data.color,
        justifyContent: "space-between",
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: "lightgrey",
        shadowOffset: { width: -5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginBottom: 4,
      }}
    >
      <Image source={data.image} style={{ height: 25, width: 25 }} />
      <View style={{ alignSelf: "center", margin: 5 }}>
        <Progress.Circle
          animated={false}
          size={50}
          progress={data.status / 100}
          showsText
          unfilledColor="#ededed"
          borderColor="#ededed"
          color={data.darkColor}
          direction="counter-clockwise"
          fill="white"
          strokeCap="round"
          thickness={5}
          style={{
            shadowColor: "grey",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
          }}
          textStyle={{
            fontSize: 14,
            fontFamily: "MontserratBlack",
          }}
        />
      </View>
      <View>
        <Text style={{ fontSize: 10, fontFamily: "MontserratBold" }}>
          {"Day     1"}
        </Text>
        <Text style={{ fontSize: 10, fontFamily: "MontserratRegular" }}>
          {"Time    20 Min"}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "MontserratRegular" }}>{data.name}</Text>
      </View>
    </View>
  );
};

export function Banner({ text, image }) {
  return (
    <ImageBackground style={styles.banner} source={image}>
      <View style={styles.bannerContainer}>
        <Text style={styles.offerText}>{text}</Text>
      </View>
    </ImageBackground>
  );
}

const Label = ({ children }) => <Text style={styles.label}>{children}</Text>;

const styles = StyleSheet.create({
  container: { flex: 1 },

  banner: {
    marginTop: "10%",
    padding: 30,
    resizeMode: "contain",
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
  },
  bannerContainer: { flex: 1 },
  offerText: {
    color: "white",
    fontSize: 36,
    fontFamily: "MontserratExtraBold",
    alignSelf: "center",
  },

  label: { fontSize: 24, marginVertical: 10, fontFamily: "MontserratSemiBold" },
});

const data = [
  {
    name: "Cycling",
    status: 85,
    image: cycle,
    lightColor: "#f8e4d9",
    color: "#fcf1ea",
    darkColor: "#fac5a4",
  },
  {
    name: "Walking",
    status: 25,
    image: walk,
    lightColor: "#d7f0f7",
    color: "#e8f7fc",
    darkColor: "#4CB9E7",
  },
  {
    name: "Yoga",
    status: 85,
    image: yoga,
    lightColor: "#dad5fe",
    color: "#e7e3ff",
    darkColor: "#8860a2",
  },
  {
    name: "Hydration",
    status: 65,
    image: water,
    lightColor: "#B4D4FF",
    color: "#B4D4FF",
    darkColor: "#176B87",
  },
];

export default Analytics;
