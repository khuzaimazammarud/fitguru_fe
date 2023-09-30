import { View, StyleSheet, Image,TouchableOpacity, Text, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import axios from 'axios';

import TextInputField from '../../component/TextInputField';
import SubmitButton from '../../component/ButtonSubmit';
import { ShowError, ShowSuccess } from '../../utils/flashMessages';
import signupValidation from '../../utils/validations/signupValidation';
import { SIGNUP } from '../../configs/urls';

//constatnt
import color from '../../styles/color';
import imagePath from '../../constants/imagePath';


const Signup = ({ navigation }) => {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    //function handle login functionality
    const onSignup =async() => {

        try {
            const isvalid = signupValidation(data);
            if (!isvalid) {
                const response = await axios.post(SIGNUP, data);
                console.log("🚀 ~ file: index.jsx:33 ~ onSignup ~ response:", response);
                Alert.alert(
                    'SUCCESS',
                    response.data.message,
                    [
                        {
                            text: 'Login',
                            onPress: () => navigation.navigate('Login')
                        }
                    ]
                )
            }else {
                ShowError(isvalid);
            }
        }catch(error) {
            ShowError(isvalid);    
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    source={imagePath.logo}
                    style={styles.image}
                />
                <Text style={styles.heading}>Register</Text>
                <TextInputField
                    placeholder="Username"
                    icon_name="person"
                    value={data.username}
                    isSecure={false}
                    onChangeText={(text) => setData({ ...data, username: text })}
                />
                <TextInputField
                    placeholder="Email ID"
                    icon_name="alternate-email"
                    value={data.email}
                    isSecure={false}
                    onChangeText={(text) => setData({ ...data, email: text })}
                />
                <TextInputField
                    placeholder="Password"
                    icon_name="lock"
                    isSecure={true}
                    isisSignin={false}
                    value={data.password}
                    onChangeText={(text) => setData({ ...data, password: text })}
                />
                <TextInputField
                    placeholder="Confirm Password"
                    icon_name="lock"
                    isSecure={true}
                    isisSignin={false}
                    value={data.confirmPassword}
                    onChangeText={(text) => setData({ ...data, confirmPassword: text })}
                />
                <SubmitButton
                    text="Register"
                    onPress={onSignup}
                />
                <View style={styles.register}>
                    <Text>
                        Already Registered?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')} 
                    >
                        <Text style={styles.text}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    heading: {
        marginVertical: 20,
        fontSize: 30,
        fontWeight: '500',
        letterSpacing: 1
    },
    image: {
        width: "100%",
        height: "40%",
    },
    register: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12
    },
    text: {
        color: color.orange,
        fontWeight: '700',
    }
})

export default Signup;