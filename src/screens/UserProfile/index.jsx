import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const imageData = [
  {
    id: 1,
    uri: require("../../assets/images/avatar1.png"),
    caption: "Beautiful Sunset",
    likes: 150,
    comments: 25,
  },
  {
    id: 2,
    uri: require("../../assets/images/avatar2.png"),
    caption: "Adorable Kittens",
    likes: 200,
    comments: 30,
  },
  // Add more images as needed
];

export default function UserProfile() {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mediaImageContainer}
      onPress={() => {
        setSelectedImage(item.uri);
        setIsImageFullScreen(true);
      }}
    >
      <Image source={item.uri} style={styles.image} resizeMode="cover" />
      <View style={styles.mediaCount}>
        <Text style={[styles.text, { color: "#FFF", fontWeight: "bold" }]}>
          {item.likes} Likes
        </Text>
        <Text style={[styles.text, { color: "#FFF", fontWeight: "bold" }]}>
          {item.comments} Comments
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBar}>
        <Ionicons name="ios-arrow-back" size={24} color="#52575D" />
        <Ionicons name="md-more" size={24} color="#52575D" />
      </View>

      <View style={{ alignSelf: "center" }}>
        <View style={styles.profileImage}>
          <Image
            source={require("../../assets/images/avatar4.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.dm}>
          <MaterialIcons name="chat" size={18} color="#DFD8C8" />
        </View>
        <View style={styles.active}></View>
        <View style={styles.add}>
          <Ionicons
            name="ios-add"
            size={48}
            color="#DFD8C8"
            style={{ marginTop: 6, marginLeft: 2 }}
          ></Ionicons>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
          James Bond
        </Text>
        <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
          Fitness Geek
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={[styles.text, { fontSize: 24 }]}>
            {imageData.length}
          </Text>
          <Text style={[styles.text, styles.subText]}>Posts</Text>
        </View>
        <View
          style={[
            styles.statsBox,
            {
              borderColor: "#DFD8C8",
              borderLeftWidth: 1,
              borderRightWidth: 1,
            },
          ]}
        >
          <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
          <Text style={[styles.text, styles.subText]}>Followers</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
          <Text style={[styles.text, styles.subText]}>Following</Text>
        </View>
      </View>

      <FlatList
        data={imageData}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={{ marginTop: 16 }}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={isImageFullScreen}
        onRequestClose={() => {
          setIsImageFullScreen(false);
          setSelectedImage(null);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{ position: "absolute", top: 20, right: 20 }}
            onPress={() => {
              setIsImageFullScreen(false);
              setSelectedImage(null);
            }}
          >
            <Ionicons name="ios-close" size={40} color="#FFF" />
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={selectedImage}
              style={{ flex: 1, width: "100%" }}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 6,
    marginVertical: 6,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -25,
    marginLeft: 6,
    width: 108,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
});
