import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const DateDropdown = ({ analyticsData, setSelectedDate }) => {
    const initialIndex = analyticsData.length > 0 ? 0 : -1; 
    return (
        <View style={styles.container}>
            <ModalDropdown 
                options={analyticsData.map(data => data.date)}
                dropdownTextStyle={styles.dropdownText}
                dropdownStyle={styles.dropdown}
                onSelect={(idx, value) => setSelectedDate(value)}
                textStyle={styles.text}
                defaultValue="Select a date"
                defaultIndex={initialIndex}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    dropdown: {
        width: '90%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 3,
    },
    dropdownText: {
        fontSize: 16,
        color: '#000',
        padding: 10,
        textAlign: 'center',
    }
});

export default DateDropdown;
