import { useState } from 'react';
import { StyleSheet, Image,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import { ShowError, ShowSuccess } from '../../utils/flashMessages';
import signupValidation from '../../utils/validations/signupValidation';
import { SIGNUP } from '../../configs/urls';

//constatnt
import imagePath from '../../constants/imagePath';

//components
import BreadCrumbs from '../../component/SignupComponent/breadCrumbs';
import Info from '../../component/SignupComponent/info';
import Gender from '../../component/SignupComponent/gender';


const Signup = ({ navigation }) => {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [steps, setSteps] = useState(1);

    //function handle login functionality
    const onSignup = async () => {

        try {
            const isvalid = signupValidation(data);
            if (!isvalid) {
                const response = await axios.post(SIGNUP, data);
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
            } else {
                ShowError(isvalid);
            }
        } catch (error) {
            ShowError(isvalid);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
                <Image
                    source={imagePath.logo}
                    style={styles.image}
                />
                <BreadCrumbs setSteps={setSteps} steps={steps} />
                {steps === 1 ? <Info data={data} setData={setData} setSteps={setSteps} navigation={navigation} /> : null}
                {steps === 2 ? <Gender />: null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    image: {
        width: "100%",
        height: "20%",
    },
})

export default Signup;