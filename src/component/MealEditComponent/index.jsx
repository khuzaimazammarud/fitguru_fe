import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters'
import color from '../../styles/color';
import Icon, { Icons } from '../Icons';

const EditMeal = ({ time, Fooddata }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.secondryText}>{time}</Text>
            {
                Fooddata.map((item, idx) => (
                    <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                        <Text style={{ fontSize: moderateScale(15) }}>{item.food}</Text>
                        <TouchableOpacity>
                            <Icon type={Icons.FontAwesome} name={'close'} />
                        </TouchableOpacity>
                    </View>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    secondryText: {
        fontSize: moderateScale(18),
        fontWeight: '600',
        color: 'black',
        marginVertical: moderateScale(5)
    },
});

export default EditMeal;