import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { Singin } from '../../store/actions/auth';


import loginValidation from '../../utils/validations/loginValidation';
import TextInputField from '../../component/TextInputField';
import SubmitButton from '../../component/ButtonSubmit';
import { ShowError } from '../../utils/flashMessages';

//constants
import color from '../../styles/color';
import imagePath from '../../constants/imagePath';
import NewtoApp from '../../component/NewtoApp';

const Login = ({ navigation }) => {

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    //function handle login functionality
    const onLogin = () => {
        const error = loginValidation(data);
        if (!error) {
            dispatch(Singin(data))
        } else {
            ShowError(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageholder}>
                <Image
                    source={imagePath.logo}
                    style={styles.image}
                />
            </View>
            <View style={styles.loginContainer}>
                <TextInputField
                    placeholder="Enter your email"
                    icon_name="envelope"
                    value={data.email}
                    isSecure={false}
                    onChangeText={(text) => setData({ ...data, email: text })}
                />
                <TextInputField
                    placeholder="Enter your Password"
                    icon_name="lock"
                    isSecure={true}
                    isSignin={true}
                    value={data.password}
                    onChangeText={(text) => setData({ ...data, password: text })}
                    onPress = {() => navigation.navigate('ForgotPassword')}
                />
                <SubmitButton
                    text="Login"
                    onPress={onLogin}
                />
                <NewtoApp 
                    text='New to the app?'
                    onPress={() => navigation.navigate('Signup')}
                    screen='Register' 
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    imageholder: {
        flex: 1,
    },
    loginContainer: {
        flex: 1
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
    },
})

export default Login;