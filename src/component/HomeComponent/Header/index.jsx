import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import Icon, { Icons } from "../../Icons";
import color from "../../../styles/color";
import { useSelector } from 'react-redux';

const headerImage = require("../../../assets/images/header.jpg");

const Header = ({ navigation, setOpen, screen}) => {

  const auth = useSelector(state => state.AuthReducer);

  return (
    <View style={styles.header}>
      {screen === 'Home' ? null:<BackButton navigation={navigation} />}
      <HeaderTitle name={auth.userData.name} />
      {screen === 'Account' ? (
        <TouchableOpacity 
          onPress={() => {setOpen(true)}}
          style = {{padding: 5}}
        > 
          <Icon name={'ellipsis-v'}type={Icons.FontAwesome} color={color.orange}/>
        </TouchableOpacity>
      ) : screen === 'post' ? (
        <TouchableOpacity 
          onPress={() =>  navigation.navigate('AddPost')}
        > 
          <Icon name={'plus'}type={Icons.FontAwesome} color={color.orange}/>
        </TouchableOpacity>
      ): <ImageContainer image={headerImage} navigation={navigation}/>}
    </View>
  )
};

const BackButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
  >
    <Icon
      type={Icons.MaterialCommunityIcons}
      name={'arrow-left'}
      color={color.orange}
    />
  </TouchableOpacity>
);

const ImageContainer = ({ image, height = "100%", width = "100%", navigation}) => (
  <TouchableOpacity 
    style={styles.imageContainer}
    onPress={() => navigation.navigate('account')} 
  >
    <Image source={image} style={[{ height, width }]} />
  </TouchableOpacity>
);

const HeaderTitle = ({name}) => (
  <View style={styles.title}>
    <Text style={styles.bigTitle}>Hi, {name}</Text>
    <Text style={styles.smallTitle}>{Date()}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { paddingHorizontal: 10, flex: 1, justifyContent: "center" },

  bigTitle: { fontSize: 16 },

  smallTitle: { fontSize: 10, opacity: 0.6 },
});

export default Header;