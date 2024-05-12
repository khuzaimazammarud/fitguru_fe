import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import color from "../../styles/color";
import Icon, { Icons } from "../Icons";

const EditMeal = ({ time, Fooddata }) => {
  console.log("🚀 ~ EditMeal ~ Fooddata:", Fooddata);
  return (
    <View style={styles.container}>
      {Fooddata.map((item, idx) => (
        <View
          key={idx}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: moderateScale(5) }} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ fontSize: moderateScale(15) }}>{item.label}</Text>
          </View>
          <TouchableOpacity>
            <Icon type={Icons.FontAwesome} name={"close"} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  secondryText: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "black",
    marginVertical: moderateScale(5),
  },
});

export default EditMeal;
