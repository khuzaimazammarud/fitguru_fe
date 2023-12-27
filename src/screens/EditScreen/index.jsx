import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import SubmitButton from "../../component/ButtonSubmit";
import TextInputField from "../../component/TextInputField";
import Header from "../../component/HomeComponent/Header";

const GenderRadioButton = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity
      style={styles.radioButtonContainer}
      onPress={() => onSelect(label)}
    >
      <FontAwesome
        name={selected ? "dot-circle-o" : "circle-o"}
        size={20}
        style={styles.radioButtonIcon}
      />
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const EditDetails = ({navigation}) => {
  const [data, setData] = React.useState({
    username: "",
    email: "",
    gender: "", // Use a string to store the selected gender
    age: "",
    height: "",
  });

  const handleGenderSelect = (selectedGender) => {
    setData({
      ...data,
      gender: selectedGender,
    });
  };

  const onEditDetails = () => {
    // Add validation logic if needed
    // Dispatch your update action with data
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <View style={styles.editContainer}>
        {/* Other TextInputField components... */}
        <Text style = {{fontSize: moderateScale(24), marginVertical: moderateScale(10), fontWeight: 'bold'}}>Edit Details</Text>
        <TextInputField
          placeholder="Edit your username"
          icon_name="user"
          value={data.username}
          onChangeText={(text) => setData({ ...data, username: text })}
        />
        <TextInputField
          placeholder="Edit your email"
          icon_name="envelope"
          value={data.email}
          onChangeText={(text) => setData({ ...data, email: text })}
        />
        {/* Gender radio buttons */}
        <TextInputField
          placeholder="Edit your age"
          icon_name="calendar"
          value={data.age}
          onChangeText={(text) => setData({ ...data, age: text })}
        />
        <TextInputField
          placeholder="Edit your height"
          icon_name="arrow-up"
          value={data.height}
          onChangeText={(text) => setData({ ...data, height: text })}
        />
        <View style={styles.radioButtonsContainer}>
          <GenderRadioButton
            label="Male"
            selected={data.gender === "Male"}
            onSelect={handleGenderSelect}
          />
          <GenderRadioButton
            label="Female"
            selected={data.gender === "Female"}
            onSelect={handleGenderSelect}
          />
        </View>
        <SubmitButton text="Save Changes" onPress={onEditDetails} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(15),
    justifyContent: "center",
  },
  editContainer: {
    flex: 1,
  },
  radioButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: moderateScale(10),
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonIcon: {
    marginRight: moderateScale(10),
  },
  radioButtonLabel: {
    fontSize: moderateScale(16),
  },
});

export default EditDetails;
