import { useState } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

//constants
import color from '../../styles/color';
import animationPath from '../../constants/animationPath';
import SubmitButton from '../../component/ButtonSubmit';


const OnBoarding = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container1}>
                <LottieView source={animationPath.onBoarding} autoPlay/>
            </View>
            <View style={styles.container2}>
                <Text style={styles.heading}>FITGURU</Text>
                <Text style={styles.textLite}>Welcome to FITGURU! Get ready to embark on a journey to a healthier you.</Text>
                <SubmitButton text='SignIn' color='or' onPress={() => navigation.navigate('Login')}/>
                <SubmitButton text='SingnUp' onPress={() => navigation.navigate('Signup')}/>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: color.maincolor,
        padding: moderateScale(15),
    },
    container1: {
        flex: 1,
    },
    container2:{    
        flex: 1,
    },
    heading: {
        textAlign: 'center',
        color: color.black,
        fontSize: moderateScale(40),
        fontWeight: '900',
        marginVertical: verticalScale(12)
    },
    textLite: {
        textAlign: 'center',
        color: color.grey,
        fontSize: 17,
        fontWeight: '500',
        lineHeight: moderateScale(25),
        paddingHorizontal: verticalScale(20),
        marginVertical: verticalScale(12)
    }
})

export default OnBoarding;