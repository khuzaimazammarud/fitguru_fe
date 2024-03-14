import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { CreatePost } from '../../../configs/urls';
import { ShowError, ShowSuccess } from '../../../utils/flashMessages';
import animationPath from '../../../constants/animationPath'
import color from '../../../styles/color';


const FabButton = ({ icon, onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.fabButton} activeOpacity={0.7}>
        <Icon name={icon} size={moderateScale(20)} color="#FFF" />
        {title && <Text style={styles.fabText}>{title}</Text>}
    </TouchableOpacity>
);

const FormData = global.FormData;

const AddPost = ({ navigation }) => {
    const auth = useSelector(state => state.AuthReducer);
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const selectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to choose an image.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            aspect: [4, 4]
        });
        if (result.canceled) {
            return;
        }
        setImage(result.assets[0].uri);
    };


    const addPost = async () => {
        setLoader(true);
        if (!content) {
            return;
        }
        const formData = new FormData()
        formData.append('content', content);
        formData.append('authorId', auth.userData.id);
        if (image) {
            const uriParts = image.split('.');
            const fileType = uriParts[uriParts.length - 1];
            formData.append('image', {
                uri: image,
                name: `image/${fileType}`,
                type: `image/${fileType}`
            });
        }

        const configs = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            transformRequest: () => {
                return formData;
            }
        }
        dataToSend = {
            text: content
        }
        try {

            const response = await axios.post(CreatePost, formData, configs);
            ShowSuccess(response.data.message);
            setLoader(false);
            navigation.navigate('account')
        } catch (error) {
            setLoader(false);
            ShowError(error.response.data.message);
        }
    }

    return (
        <View style={styles.container}>
            {
                !loader ? (
                    <>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.InputField}
                                placeholder="What's on your mind?"
                                multiline
                                value={content}
                                numberOfLines={4}
                                onChangeText={(text) => setContent(text)}
                            />
                        </View>
                        <View style={styles.fabContainer}>
                            {isOpen && (
                                <>
                                    <FabButton icon="ios-videocam-outline" onPress={() => console.log('Add video')} />
                                    <FabButton icon="ios-camera-outline" onPress={() => console.log('Add image')} />
                                    <FabButton icon="ios-image-outline" onPress={selectImage} />
                                    <FabButton icon="add" onPress={() => {
                                        toggleMenu()
                                        addPost()
                                    }} />
                                </>
                            )}
                            <FabButton icon={isOpen ? "close" : "add"} onPress={toggleMenu} />
                        </View>
                        {
                            image && (
                                <View style={styles.uploadImgContainer}>
                                    <TouchableOpacity
                                        style={styles.imgCard}
                                        onPress={() => {
                                            setImage(null);
                                        }}
                                    >
                                        <Text style={{ color: 'white', alignItems: 'center', flex: 1 }}>Image is Added</Text>
                                        <Icon name={'close'} size={moderateScale(20)} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </>
                ) : (
                    <>
                        <View style={styles.imageholder}>
                            <Text style={styles.desc}>FIT GURU JEE ANALYSING YOUR POST</Text>
                            <LottieView
                                style={styles.image}
                                source={animationPath.ModelLoading}
                                autoPlay
                            />
                        </View>
                    </>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Fixed typo here, should be alignItems instead of alignItem
        backgroundColor: '#f0f0f0', // The background color for the entire screen
    },
    inputWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        paddingTop: moderateScale(15), // Add padding at the top
    },
    InputField: {
        fontSize: moderateScale(16),
        textAlign: 'left',
        width: '90%',
        paddingTop: moderateScale(10),
        paddingBottom: moderateScale(10),
    },
    fabContainer: {
        position: 'absolute', // Positioning it over the screen content
        right: moderateScale(30),
        bottom: moderateScale(30),
    },
    fabButton: {
        backgroundColor: '#ff5722',
        borderRadius: moderateScale(30),
        width: moderateScale(56),
        height: moderateScale(56),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: moderateScale(16),
        elevation: 4,
        flexDirection: 'row',
        padding: moderateScale(10), // Padding for the text next to the icon
    },
    imgCard: {
        width: 'auto',
        height: verticalScale(50),
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(10),
        backgroundColor: '#ff5722',
        position: 'absolute', // Positioning it over the screen content
        // right: moderateScale(10),
        left: moderateScale(10),
        bottom: moderateScale(30),
        borderRadius: moderateScale(10)
    },
    imageholder: {
        flex: 1,
        marginVertical: verticalScale(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
    desc: {
        textAlign: 'center',
        color: color.black,
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: moderateScale(40),
        bottom: verticalScale(60)
    },
    fabText: {
        color: 'white',
        paddingLeft: moderateScale(8),
    },
});

export default AddPost;
