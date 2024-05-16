import React, { useEffect, useState } from "react";
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
import { follow, getAllUser } from "../../../configs/urls";
import axios from "axios";
import imagePath from "../../../constants/imagePath";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { ShowError, ShowSuccess } from "../../../utils/flashMessages";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchData, setSearchData] = useState([]);

  const filteredSearch = searchData.filter((item) => {
    return item.username.toLowerCase().includes(searchQuery.toLowerCase());
  });


  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${getAllUser}`);
      setSearchData(data.users);
    } catch (error) {
      console.error("Failed to fetch followers:", error);
    }
  };

    useEffect(() => {
      fetchUsers();
    },[])

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

  const auth = useSelector((state) => state.AuthReducer);

  const handleFollow = async(id) => {
    try{
      const {data} = await axios.put(`${follow}`, {
        userId: auth.userData.id,
        followId: id
      });
      console.log("🚀 ~ handleFollow ~ data:", data)

      ShowSuccess(data.message);

    }catch(error) {
      ShowError(error.response.data.message)
    }
  }
  return (
    <View style={styles.searchListContainer}>
      <FlatList
        data={searchData}
        renderItem={({ item }) => (
          <View style={styles.searchItem}>
            <Image source={imagePath.logo} style={styles.searchImage} />
            <View style={styles.searchDetails}>
              <View>
                <Text style={styles.searchName}>{item.username}</Text>
              </View>
              <TouchableOpacity style={styles.followingButton} onPress={() => handleFollow(item._id)}> 
                <Text style={styles.followingText}>follow</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
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
  followingButton: {
    backgroundColor: color.maincolor,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  followingText: {
    color: color.white,
    fontSize: moderateScale(14),
  },
});

export default SearchScreen;
