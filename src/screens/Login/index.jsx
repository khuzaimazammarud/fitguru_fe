import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import { Singin } from '../../store/actions/auth';


import loginValidation from '../../utils/validations/loginValidation';
import TextInputField from '../../component/TextInputField';
import SubmitButton from '../../component/ButtonSubmit';
import { ShowError } from '../../utils/flashMessages';

//constants
import color from '../../styles/color';
import imagePath from '../../constants/imagePath';

const Login = ({navigation}) => {

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
            <View>
                <Image
                    source={imagePath.logo}
                    style={styles.image}
                />
                <Text style={styles.heading}>Login</Text>
                <TextInputField
                    placeholder="Enter your email"
                    icon_name="alternate-email"
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
                />
                <SubmitButton
                    text="Login"
                    onPress={onLogin}
                />
                <View style={styles.register}>
                    <Text>
                        New to the app?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.text}> Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    image: {
        width: "100%",
        height: "40%",
    },
    heading: {
        marginVertical: 20,
        fontSize: 30,
        fontWeight: '500',
        letterSpacing: 1
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

export default Login;