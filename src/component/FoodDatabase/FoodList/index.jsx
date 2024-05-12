import {useState} from 'react'
import { useSelector } from 'react-redux';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { verticalScale, moderateScale } from "react-native-size-matters";

import color from '../../../styles/color';
import imagePath from '../../../constants/imagePath';
import Icon, { Icons } from '../../Icons';

const FoodList = ({food, navigation}) => {
    return(
        <View style = {[styles.card]}>
            <TouchableOpacity 
                style = {{height: 100, alignItems: 'center'}}
                onPress={() => navigation.navigate('FoodView', food)}
            >
                <Image
                    source={{ uri: food.food.image }}
                    style={{ width: '100%', height: '100%', borderRadius: moderateScale(5) }}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            <Text style = {styles.cardText}>{food.food.label} (100g)</Text>
            <View style = {{flexDirection: 'row', justifyContent:'space-between', marginTop: moderateScale(3)}}>
                <Text style = {[styles.cardText, {fontSize: moderateScale(12)}]}>{Math.round(food.food.nutrients.ENERC_KCAL)} kcal</Text>
                <TouchableOpacity style = {styles.add} onPress={() => navigation.navigate('FoodView', food)}>
                    <Icon
                        type={Icons.MaterialCommunityIcons}
                        name={'plus'}
                        color={color.black}
                     />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card : {
        // height: 'auto',
        backgroundColor: color.white,
        width: '49%',
        marginHorizontal:2,
        borderRadius: moderateScale(5),
        marginBottom: moderateScale(15),
        padding: moderateScale(15),
    },
    cardText: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        marginTop: moderateScale(4)
    },
    add: {
        backgroundColor: color.orange,
        borderRadius: moderateScale(5)
    }
});

export default FoodList;