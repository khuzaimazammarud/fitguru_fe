import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import color from '../../styles/color';

const SubmitButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={onPress}
        >
            <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: color.maincolor,
        padding: 18,
        borderRadius: 30,
        marginTop: 10
    },
    btnText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    }

});

export default SubmitButton;