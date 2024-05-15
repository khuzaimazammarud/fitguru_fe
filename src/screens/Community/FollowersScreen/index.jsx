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

const FollowersScreen = () => {
  const [userData, setUserData] = useState({
    name: "SRK",
    email: "@iamsrk",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const followersData = [
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

  const filteredFollowers = followersData.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <ProfileHeader userData={userData} />
      <View style={styles.searchBarContainer}>
        <TextInputField
          placeholder="Search"
          icon_name={"search"}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <FollowerList followersData={filteredFollowers} />
    </View>
  );
};

const ProfileHeader = ({ userData }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../../assets/images/avatar3.png")}
        style={styles.profileImage}
      />

      <View style={styles.profileInfo}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Icon
          name="create-outline"
          size={moderateScale(20)}
          color={color.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const FollowerList = ({ followersData }) => {
  return (
    <View style={styles.followerListContainer}>
      <FlatList
        data={followersData}
        renderItem={({ item }) => (
          <View style={styles.followerItem}>
            <Image source={item.image} style={styles.followerImage} />
            <View style={styles.followerDetails}>
              <View>
                <Text style={styles.followerName}>{item.name}</Text>
                <Text style={styles.followerUserName}>{item.userName}</Text>
              </View>
              <TouchableOpacity style={styles.followingButton}>
                <Text style={styles.followingText}>Following</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(20),
    backgroundColor: color.maincolor,
    marginBottom: moderateScale(10),
  },
  profileImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    marginRight: moderateScale(10),
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: color.white,
  },
  email: {
    fontSize: moderateScale(14),
    color: color.white,
  },
  editButton: {
    backgroundColor: color.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: "center",
    justifyContent: "center",
  },
  followerListContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  followerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(10),
  },
  followerImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginRight: moderateScale(10),
  },
  followerDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  followerName: {
    fontSize: moderateScale(16),
  },
  followerUserName: {
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

export default FollowersScreen;
