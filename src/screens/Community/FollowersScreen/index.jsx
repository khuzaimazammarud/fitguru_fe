import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Ionicons";
import color from "../../../styles/color";
import TextInputField from "../../../component/TextInputField";
import { useSelector } from "react-redux";
import axios from "axios";
import { getFollowers, getFollwing, unfollow } from "../../../configs/urls";
import imagePath from "../../../constants/imagePath";

const FollowersScreen = ({ route }) => {
  const {type} = route.params;
  const typeOfpage = type;
  const auth = useSelector((state) => state.AuthReducer);
  const [searchQuery, setSearchQuery] = useState("");

  const [followersData, setFollowersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredFollowers = followersData.filter((item) => {
    return item.username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const fetchFollowers = async () => {
    try {
      const { data } = await axios.get(`${getFollowers}/${auth.userData.id}`);
      setFollowersData(data.followers);
      setIsLoading(false); // Stop loading after data is fetched
      console.log("🚀 ~ fetchFollowers ~ data:", data);
    } catch (error) {
      setIsLoading(false); // Ensure loading is stopped if an error occurs
      console.error("Failed to fetch followers:", error);
    }
  };

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get(`${getFollwing}/${auth.userData.id}`);
      setFollowersData(data.following);
      setIsLoading(false); // Stop loading after data is fetched
      console.log("🚀 ~ fetchFollowers ~ data:", data);
    } catch (error) {
      setIsLoading(false); // Ensure loading is stopped if an error occurs
      console.error("Failed to fetch followers:", error);
    }
  };

  useEffect(() => {
    if(type === "followers"){
      fetchFollowers();
    }else {
      fetchFollowing();
    }
    
  }, []);

  return (
    <View style={styles.container}>
    <View style={{marginTop: moderateScale(20)}}>
      <TextInputField
        placeholder="Search"
        icon_name={"search"}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
    </View>
    {isLoading ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={color.maincolor} />
      </View>
    ) : (
      <FollowerList followersData={filteredFollowers} type = {type} fetchFollowing = {fetchFollowing} />
    )}
  </View>
  );
};

const FollowerList = ({ followersData, type, fetchFollowing }) => {
  const auth = useSelector((state) => state.AuthReducer);

  const handleUnfollow = async(id) => {
    try {
      const { data } = await axios.put(`${unfollow}`, {
        userId: auth.userData.id,
        unfollowId: id
      });
      fetchFollowing();
    } catch (error) {
      console.error("Failed to unfollow:", error);
    }
  }

  return (
    <View style={styles.followerListContainer}>
      <FlatList
        data={followersData}
        renderItem={({ item }) => (
          <View style={styles.followerItem}>
            <Image source={imagePath.logo} style={styles.followerImage} />
            <View style={styles.followerDetails}>
              <View>
                <Text style={styles.followerName}>{item?.username}</Text>
                <Text
                  style={styles.followerUserName}
                >{`@${item?.username}`}</Text>
              </View>
              <TouchableOpacity style={styles.followingButton} onPress={() => handleUnfollow(item._id)}>
                <Text style={styles.followingText}>{type === "following" ? "unfollow" : "follower"}</Text>
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
  
});

export default FollowersScreen;
