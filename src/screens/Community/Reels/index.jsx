import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { Video } from "expo-av";
import { AntDesign } from "@expo/vector-icons";

const { height: screenHeight } = Dimensions.get("window");

const videoData = [
  {
    id: 1,
    path: require("../../../assets/videos/video1.mp4"),
    caption: "Eat healthy, stay fit!",
    likeCount: 123,
    commentCount: 45,
    avatar: require("../../../assets/images/avatar1.png"),
  },
  {
    id: 2,
    path: require("../../../assets/videos/video2.mp4"),
    caption: "Sharing what I am learning",
    likeCount: 567,
    commentCount: 89,
    avatar: require("../../../assets/images/avatar2.png"),
  },
  {
    id: 3,
    path: require("../../../assets/videos/video3.mp4"),
    caption: "Who can relate? #thestruggleisreal",
    likeCount: 890,
    commentCount: 123,
    avatar: require("../../../assets/images/avatar3.png"),
  },
  {
    id: 4,
    path: require("../../../assets/videos/video4.mp4"),
    caption: "Life is an OREO!",
    likeCount: 111,
    commentCount: 4,
    avatar: require("../../../assets/images/avatar1.png"),
  },
];

export default function Reels() {
  const videoRefs = useRef({});
  const flatListRef = useRef(null);

  const onViewableItemsChanged = ({ viewableItems }) => {
    viewableItems.forEach((item) => {
      const videoRef = videoRefs.current[item.item.id];
      if (videoRef) {
        videoRef.playAsync();
      }
    });

    Object.keys(videoRefs.current).forEach((key) => {
      if (!viewableItems.find((item) => item.item.id.toString() === key)) {
        const videoRef = videoRefs.current[key];
        if (videoRef) {
          videoRef.pauseAsync();
        }
      }
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.videoContainer}>
        <Video
          ref={(ref) => (videoRefs.current[item.id] = ref)}
          style={item.id === 1 ? styles.fullScreenVideo : styles.video}
          source={item.path}
          useNativeControls={false}
          resizeMode={Video.RESIZE_MODE_STRETCH}
          isLooping
          onPlaybackStatusUpdate={(status) => console.log(status)}
          shouldPlay
        />
        <View style={styles.overlay}>
          <Image source={item.avatar} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.caption}>{item.caption}</Text>
            <View style={styles.infoContainer}>
              <AntDesign name="heart" size={18} color="white" />
              <Text style={styles.likeCount}>{item.likeCount}</Text>
              <AntDesign name="message1" size={18} color="white" />
              <Text style={styles.commentCount}>{item.commentCount}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={videoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => {}}
        onEndReachedThreshold={0.1}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  videoContainer: {
    flex: 1,
    marginTop: screenHeight * 0.1, // Adjust the marginTop as needed
  },
  fullScreenVideo: {
    width: "100%",
    height: screenHeight * 0.8,
  },
  video: {
    width: "100%",
    height: screenHeight * 0.8, // Adjust the height as needed
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  caption: {
    color: "white",
    fontSize: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for better readability
    padding: 8,
    borderRadius: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  likeCount: {
    color: "white",
    marginLeft: 4,
  },
  commentCount: {
    color: "white",
    marginLeft: 8,
  },
});
