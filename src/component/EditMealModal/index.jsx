import {useState} from 'react'
import { StyleSheet, TouchableOpacity, Modal, Text, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters'
import color from '../../styles/color';
import Icon, { Icons } from '../Icons';
import EditMeal from '../MealEditComponent';
import { useSelector } from 'react-redux';

const transparent = 'rgba(0,0,0,0)';

const EditMealModal = ({ open, setOpen }) => {

    const foodLog = useSelector((state) => state.goal);
     
    return (
        <Modal visible={open} animationType='slide' transparent={true}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        onPress={() => setOpen(false)}
                        style={{ marginBottom: moderateScale(5) }}
                    >
                        <Icon type={Icons.FontAwesome} name={'close'} size={25} color={color.white} />
                    </TouchableOpacity>
                    <Text style={styles.primaryText}>Today Meal Log</Text>
                    <View style={styles.card}>
                        <EditMeal time={'BreakFast'} Fooddata={foodLog.foods}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: transparent,
    },
    modalContainer: {
        backgroundColor: color.black,
        height: '60%',
        width: '100%',
        padding: moderateScale(15),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    card: {
        marginVertical: verticalScale(15),
        padding: moderateScale(15),
        backgroundColor: color.orange,
        borderRadius: moderateScale(15),
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 2,
    },
    primaryText: {
        fontSize: moderateScale(20),
        fontWeight: '700',
        color: color.white,
        marginVertical: verticalScale(10)
    }
});

export default EditMealModal;