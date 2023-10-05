import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';


import imagePath from '../../../constants/imagePath';
import color from '../../../styles/color';
import TextInputField from '../../../component/TextInputField';
import SubmitButton from '../../../component/ButtonSubmit';

const OtpScreen = ({ navigation, route }) => {

    const {email} = route.params;    
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.desc}>Verification</Text>
            <View style={styles.imageholder}>
                <Image
                    source={imagePath.forgotavatar}
                    style={styles.image}
                />
            </View>
            <View style = {styles.Contentcontainer}>
                <Text style={styles.text}>Enter the verification code we just send you on email address</Text>
                <TextInputField
                    icon_name='envelope'
                    placeholder='Enter your email'
                /> 
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: moderateScale(15),
    },
    desc: {
        textAlign: 'center',
        color: color.black,
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: moderateScale(40),
        marginVertical: verticalScale(12)
    },
    imageholder: {
        flex:1,
        marginVertical: verticalScale(15),
        alignItems: 'center', // Center the image horizontally
        justifyContent: 'center'
    },
    image: {
        width: '50%', // Reduce the image size to 50% of its original size
        height: undefined, // This keeps the aspect ratio of the image
        aspectRatio:1, // You may adjust the aspect ratio as needed
    },
    Contentcontainer: {
        flex: 2,

    },
    text: {
        textAlign: 'center',
        color: color.black,
        fontSize: 20,
        fontWeight: '500',
        marginVertical: verticalScale(12)
    },
    textLite: {
        textAlign: 'center',
        color: color.grey,
        fontSize: 17,
        fontWeight: '400',
        paddingHorizontal: verticalScale(20),
        marginVertical: verticalScale(12)
    }
})

export default OtpScreen;