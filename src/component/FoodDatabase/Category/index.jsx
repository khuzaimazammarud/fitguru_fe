import {useState} from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { verticalScale, moderateScale } from "react-native-size-matters";
import color from '../../../styles/color';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import color from '../../styles/color';

const CategoryList = ({categoryItems, name}) => {

    const [selected, setSelected] = useState(0);

    const handleClick = () => {

    }

    return(
        <View style = {styles.categoryContainer}>
            {
                categoryItems.map((items, idx) => (
                    <TouchableOpacity 
                        key={idx}
                        onPress={() => setSelected(idx)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.categoryTab, selected === idx && styles.CategorySelectedTab]}>
                            {items}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        marginHorizontal: moderateScale(15),
        justifyContent: 'space-between'
    },
    categoryTab: {
        fontSize: moderateScale(14),
        color: color.grey,
        fontWeight: '500'
    },
    CategorySelectedTab: {
        color: color.orange,
        borderBottomWidth: moderateScale(2),
        paddingBottom: moderateScale(5),
        marginBottom: moderateScale(20),
        borderBottomColor: color.orange,
    }
});

export default CategoryList;