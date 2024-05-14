import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import color from "../../styles/color";
import Icon, { Icons } from "../Icons";
import axios from "axios";
import { DeleteEntry } from "../../configs/urls";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoalProgress } from "../../store/actions/goalAction";

const EditMeal = ({ time, Fooddata }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);

  const handleDelete = async (entryId) => {
    Alert.alert(
      'Delete entry',
      'Are you sure you want to delete this entry?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          style: 'destructive',
          onPress: async () => {
            try {
              const { data } = await axios.delete(`${DeleteEntry}/${entryId}`);
              dispatch(fetchGoalProgress(auth.userData.goalId));
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
    <ScrollView>
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
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50, borderRadius: moderateScale(5) }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ fontSize: moderateScale(15) }}>{item?.label}</Text>
            <Text style={{ fontSize: moderateScale(15) }}>{item?.timeOfDay}</Text>
          </View>
          <TouchableOpacity onPress={() => handleDelete(item.entryId)}>
            <Icon type={Icons.FontAwesome} name={"close"} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
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
