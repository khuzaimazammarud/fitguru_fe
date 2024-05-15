import React, { useRef, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions, Text, Image } from "react-native";
import { Video } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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

const Reels = () => {
  const videoRefs = useRef({});
  const flatListRef = useRef(null);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 }); // Ensures that 50% of the item must be visible for it to be considered viewable
  const isFocused = useIsFocused();

  useEffect(() => {
    return () => {
      // Cleanup videos on component unmount
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          video.unloadAsync();
        }
      });
    };
  }, []);


  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    viewableItems.forEach(({ item }) => {
      const videoRef = videoRefs.current[item.id];
      if (videoRef) {
        videoRef.playAsync();
      }
    });

    Object.keys(videoRefs.current).forEach(key => {
      if (!viewableItems.some(({ item }) => item.id.toString() === key)) {
        const videoRef = videoRefs.current[key];
        videoRef?.pauseAsync();
      }
    });
  }).current;

  const handlePlaybackStatusUpdate = (status, id) => {
    if (status.didJustFinish) {
      // Advance to next video automatically
      const index = videoData.findIndex(v => v.id === id);
      if (index !== -1 && index < videoData.length - 1) {
        flatListRef.current.scrollToIndex({ index: index + 1, animated: true });
      }
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.videoContainer}>
        <Video
          ref={ref => (videoRefs.current[item.id] = ref)}
          style={styles.video}
          source={item.path}
          useNativeControls={false}
          resizeMode="cover"
          isLooping
          onPlaybackStatusUpdate={status => handlePlaybackStatusUpdate(status, item.id)}
          shouldPlay={isFocused}
        />
        <View style={styles.overlay}>
          <Image source={item.avatar} style={styles.avatar} />
          <Text style={styles.caption}>{item.caption}</Text>
          <View style={styles.infoContainer}>
            <AntDesign name="heart" size={18} color="white" />
            <Text style={styles.likeCount}>{item.likeCount}</Text>
            <AntDesign name="message1" size={18} color="white" />
            <Text style={styles.commentCount}>{item.commentCount}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={videoData}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewConfigRef.current}
      pagingEnabled={true} // Enables snapping behavior similar to Instagram or TikTok
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center"
  },
  video: {
    width: "100%",
    height: "100%"
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1
  },
  caption: {
    color: "white",
    fontSize: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 8
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  likeCount: {
    color: "white",
    marginLeft: 4
  },
  commentCount: {
    color: "white",
    marginLeft: 8
  }
});

export default Reels;
