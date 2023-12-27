import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../../component/HomeComponent/Header'
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

const UserProfile = ({navigation}) => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const imageData = [
    {
      id: 1,
      uri: require("../../assets/images/avatar1.png"),
      caption: "Beautiful Sunset",
      likes: 150,
    },
    {
      id: 2,
      uri: require("../../assets/images/avatar2.png"),
      caption: "Adorable Kittens",
      likes: 200,
    },
    {
      id: 3,
      uri: require("../../assets/images/avatar3.png"),
      caption: "Adorable Kittens",
      likes: 200,
    },
    // Add more images as needed
  ];

  const favoritesImageData = [
    {
      id: 1,
      uri: require("../../assets/images/avatar4.png"),
      caption: "Beautiful Sunset",
      likes: 150,
    },
    {
      id: 2,
      uri: require("../../assets/images/model.png"),
      caption: "Beautiful Sunset",
      likes: 150,
    },
  ];

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mediaImageContainer}
      onPress={() => {
        setSelectedImage(item.uri);
        setSelectedItem(item);
        setIsImageFullScreen(true);
      }}
    >
      <Image source={item.uri} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );

  const renderFavoriteImageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mediaImageContainer}
      onPress={() => {
        setSelectedImage(item.uri);
        setSelectedItem(item);
        setIsImageFullScreen(true);
      }}
    >
      <Image source={item.uri} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <View style={{ alignSelf: "center" }}>
        <View style={styles.profileImage}>
          <Image
            source={require("../../assets/images/avatar4.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.active}></View>
        <View style={styles.add}>
          <Ionicons name="ios-settings" size={30} color="#DFD8C8"></Ionicons>
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
          <Text style={[styles.text, { fontSize: 24 }]}>1.3M</Text>
          <Text style={[styles.text, styles.subText]}>Followers</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={[styles.text, { fontSize: 24 }]}>007K</Text>
          <Text style={[styles.text, styles.subText]}>Following</Text>
        </View>
      </View>

      <Tab.Navigator>
        <Tab.Screen name="Photos Grid">
          {() => (
            <FlatList
              data={imageData}
              renderItem={renderImageItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              contentContainerStyle={{ marginTop: 16 }}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Favorites Grid">
          {() => (
            <FlatList
              data={favoritesImageData}
              renderItem={renderFavoriteImageItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              contentContainerStyle={{ marginTop: 16 }}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isImageFullScreen}
        onRequestClose={() => {
          setIsImageFullScreen(false);
          setSelectedImage(null);
          setSelectedItem(null);
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsImageFullScreen(false);
              setSelectedImage(null);
              setSelectedItem(null);
            }}
          >
            <View
              style={{ position: "absolute", top: 20, right: 20, zIndex: 999 }}
            >
              <Ionicons name="ios-close" size={40} color="#000" />
            </View>
          </TouchableWithoutFeedback>

          {selectedImage && selectedItem && (
            <View style={{ flex: 1 }}>
              <Image
                source={selectedImage}
                style={{ flex: 1, width: "100%" }}
                resizeMode="contain"
              />

              <View style={styles.mediaCount}>
                <Text
                  style={[styles.text, { color: "#FFF", fontWeight: "bold" }]}
                >
                  {selectedItem.likes} Likes
                </Text>
                <Text
                  style={[styles.text, { color: "#FFF", fontWeight: "bold" }]}
                >
                  {selectedItem.comments} Comments
                </Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

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

export default UserProfile;
