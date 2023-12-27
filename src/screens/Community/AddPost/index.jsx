import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';

const FabButton = ({ icon, onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.fabButton} activeOpacity={0.7}>
        <Icon name={icon} size={moderateScale(20)} color="#FFF" />
        {title && <Text style={styles.fabText}>{title}</Text>}
    </TouchableOpacity>
);

const AddPost = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.InputField}
                    placeholder="What's on your mind?"
                    multiline
                    numberOfLines={4}
                />
            </View>
            <View style={styles.fabContainer}>
                {isOpen && (
                    <>
                        <FabButton icon="ios-videocam-outline"  onPress={() => console.log('Add video')} />
                        <FabButton icon="ios-camera-outline"  onPress={() => console.log('Add image')} />
                        <FabButton icon="ios-image-outline"  onPress={() => console.log('Add image')} />
                    </>
                )}
                <FabButton icon={isOpen ? "close" : "add"} onPress={toggleMenu} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // Fixed typo here, should be alignItems instead of alignItem
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
    fabText: {
        color: 'white',
        paddingLeft: moderateScale(8),
    },
});

export default AddPost;
