import { useState, useEffect } from "react";
import { FlatList,View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { moderateScale, verticalScale, scale } from "react-native-size-matters";

import imagePath from "../../../constants/imagePath";
import Icon, { Icons } from "../../../component/Icons";
import Header from "../../../component/HomeComponent/Header";
import color from "../../../styles/color";
import TextInputField from "../../../component/TextInputField"
import CommentModal from "../../../component/CommentModal";
import { getPostByFollower } from "../../../configs/urls";

const Post = ({ navigation }) => {
  const auth = useSelector(state => state.AuthReducer);
  const [like, setLike] = useState(0);
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const PostItem = ({ item }) => {

    const handleLikePress = () => {
      setLike(like === 0 ? 1 : 0);
    };

    const handleCommentPress = () => {
      setOpen(true);
    };

    return (
      <View style={styles.card}>
        <View style={styles.userInfo}>
          <Image source={imagePath.placeHolder} style={styles.userImage} />
          <View style={styles.userInfoText}>
            <Text style={styles.text}>{item.author.username}</Text>
            <Text style={styles.textLite}>{ }</Text>
          </View>
        </View>
        <Text style={styles.postText}>{item.content}</Text>
        {
          item.picture && (
            <Image source={{ uri: item.picture }} style={styles.userPost} />
          )
        }
        <View style={styles.interactionWrapper}>
          <TouchableOpacity style={styles.interaction} onPress={handleLikePress}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              name={like === 1 ? "heart" : "heart-outline"}
              color={like === 0 ? color.black : color.maincolor}
              size={30}
            />
            <Text
              style={[
                styles.interactionText,
                like === 1 ? styles.interactionTextLiked : null,
              ]}
            >
              {like === 1 ? `${item.likes + 1} Likes` : "Like"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interaction} onPress={handleCommentPress}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              name="comment-outline"
              color={color.black}
              size={30}
            />
            <Text style={styles.interactionText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  const getPost = async () => {
    try {
      const response = await axios.get(`${getPostByFollower}/${auth.userData.id}`);
      setPosts(response.data.posts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPost();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} screen={'post'} />
      <TextInputField placeholder={'Search'} icon_name={'search'} />
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostItem item={item}/>}
          keyExtractor={(item) => item._id}
        />
      {open ? <CommentModal open={true} setOpen={setOpen} /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItem: "center",
    padding: moderateScale(15),
  },
  card: {
    marginTop: moderateScale(10),
    backgroundColor: color.white,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    // maxHeight: verticalScale(800),
    // overflow: 'hidden',
  },
  userInfo: {
    flexDirection: "row",
  },
  userImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: moderateScale(25),
  },
  userInfoText: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: moderateScale(10),
  },
  text: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
  },
  textLite: {
    fontSize: moderateScale(12),
    color: color.grey,
  },
  postText: {
    marginVertical: verticalScale(10),
    padding: moderateScale(5),
    fontSize: moderateScale(15),
  },
  userPost: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10
  },
  interactionWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: moderateScale(15),
  },
  interaction: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: moderateScale(5),
    padding: moderateScale(5),
  },
  interactionText: {
    fontSize: moderateScale(13),
    fontWeight: "bold",
    marginTop: moderateScale(5),
    marginLeft: scale(3),
  },
  interactionTextLiked: {
    color: color.maincolor,
  },
});

export default Post;
