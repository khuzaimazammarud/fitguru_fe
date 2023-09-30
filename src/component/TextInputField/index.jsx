import React from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import color from '../../styles/color';

const TextInputField = ({ value, icon_name, isSecure, placeholder,isSignin, onChangeText, onPress }) => {
    return (
        <View style={styles.container}>
            <MaterialIcon name={icon_name} style={styles.icon}/>
            <TextInput
                style={styles.input}
                value={value}
                placeholder={placeholder}
                secureTextEntry={isSecure}
                onChangeText={onChangeText}
            />
            {isSignin ? (
                <TouchableOpacity onPress={onPress}>
                <Text style={styles.text}>Forgot?</Text>
                </TouchableOpacity>
            ):null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: color.lightgrey,
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25
    },
    input: {
        flex: 1,
        padding: 0
    },
    icon: {
        fontSize: 20,
        color: color.grey,
        marginRight: 5
    },
    text: {
        color: color.orange,
        fontWeight: '700'
    }
});

export default TextInputField;