import { useState } from 'react';
import { StyleSheet, Image, Alert, View } from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
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
import BodyInfo from '../../component/SignupComponent/bodyInfo';
import GoalInfo from '../../component/SignupComponent/goal';
import color from '../../styles/color';


const Signup = ({ navigation }) => {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [steps, setSteps] = useState(1);

    //handling api finction
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
            {/* <View style = {styles.imageholder}>
            <Image
                source={imagePath.logo}
                style={styles.image}
            />
            </View> */}
            <BreadCrumbs setSteps={setSteps} steps={steps} />
            {steps === 1 ? <Info data={data} setData={setData} setSteps={setSteps} navigation={navigation} /> : null}
            {steps === 2 ? <Gender data={data} setSteps={setSteps} /> : null}
            {steps === 3 ? <BodyInfo data={data} setSteps={setSteps} /> : null}
            {steps === 4 ? <GoalInfo data={data} setSteps={setSteps} /> : null}
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
        width: '100%',
        resizeMode: 'contain',
    },
})

export default Signup;