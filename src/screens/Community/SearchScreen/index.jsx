import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Ionicons";
import color from "../../../styles/color";
import TextInputField from "../../../component/TextInputField";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchData = [
    {
      id: 1,
      name: "Tom Cruise",
      image: require("../../../assets/images/avatar1.png"),
      userName: "@tomcruise",
    },
    {
      id: 2,
      name: "Henry Cavill",
      image: require("../../../assets/images/avatar2.png"),
      userName: "@henrycavill",
    },
    {
      id: 3,
      name: "Daniel Criag",
      image: require("../../../assets/images/avatar4.png"),
      userName: "@craig007",
    },
  ];

  const filteredSearch = searchData.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInputField
          placeholder="Search"
          icon_name={"search"}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <View style={styles.recentsContainer}>
        <Text style={styles.recentsText}>Recents</Text>
      </View>
      <SearchList searchData={filteredSearch} />
    </View>
  );
};

const SearchList = ({ searchData }) => {
  const deleteButton = (id) => {
    console.log("Button clicked");
  };
  return (
    <View style={styles.searchListContainer}>
      <FlatList
        data={searchData}
        renderItem={({ item }) => (
          <View style={styles.searchItem}>
            <Image source={item.image} style={styles.searchImage} />
            <View style={styles.searchDetails}>
              <View>
                <Text style={styles.searchName}>{item.name}</Text>
                <Text style={styles.searchUserName}>{item.userName}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteButton(item.id)}>
                <Icon name="close" size={24} color={color.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  searchBarContainer: {
    paddingTop: moderateScale(20), // Add padding top
  },
  recentsContainer: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  recentsText: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: color.black,
  },
  name: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: color.white,
  },

  searchListContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(10),
  },
  searchImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginRight: moderateScale(10),
  },
  searchDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchName: {
    fontSize: moderateScale(16),
  },
  searchUserName: {
    fontSize: moderateScale(14),
    color: color.gray,
  },
});

export default SearchScreen;
