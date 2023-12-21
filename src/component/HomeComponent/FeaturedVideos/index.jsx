import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { Video } from "expo-av";
import { AntDesign } from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const videoSources = [
  {
    id: 1,
    path: require("../../../assets/videos/video1.mp4"),
  },
  {
    id: 2,
    path: require("../../../assets/videos/video2.mp4"),
  },
  {
    id: 3,
    path: require("../../../assets/videos/video3.mp4"),
  },
];

const FeaturedVideos = () => {
  const [fontsLoaded] = useFonts({
    MontserratSemiBold: require("../../../../assets/Montserrat-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // or another fallback UI while fonts are loading
  }

  return (
    <View style={{ marginHorizontal: "3%" }}>
      <Label>Featured Reels</Label>
      <ScrollView horizontal>
        <View style={{ flexDirection: "row" }}>
          {videoSources.map((video, index) => (
            <VideoPlay key={index} videoSource={video.path} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FeaturedVideos;

const VideoPlay = ({ videoSource }) => {
  const videoRef = useRef(null);
  const [isPlaying, setPlaying] = useState(true);

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
      setPlaying(!isPlaying);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      // Cleanup logic
      if (videoRef.current) {
        videoRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.videoBackground}>
      <TouchableOpacity
        onPress={togglePlayPause}
        style={{ borderRadius: 10, overflow: "hidden" }}
      >
        <Video
          ref={videoRef}
          source={videoSource}
          style={{
            height: 200, // Adjust the height as needed
            width: 300,
          }}
          useNativeControls={false}
          resizeMode="cover"
          isLooping
          shouldPlay={isPlaying}
        />
      </TouchableOpacity>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={togglePlayPause}
          style={styles.controlButton}
        >
          <AntDesign
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Label = ({ children }) => <Text style={styles.label}>{children}</Text>;

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    marginVertical: 10,
    fontFamily: "MontserratSemiBold",
  },

  videoBackground: {
    borderRadius: 15,
    marginHorizontal: 12,
    shadowOffset: { width: -5, height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: "#fff",
    position: "relative",
  },
  controlsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  controlButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 8,
  },
});
