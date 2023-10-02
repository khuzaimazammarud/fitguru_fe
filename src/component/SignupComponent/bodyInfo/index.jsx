import { View, StyleSheet, Text } from "react-native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import signupPhysicsValidation from "../../../utils/validations/signupPhysicValidation";
import { ShowError } from "../../../utils/flashMessages";

//component
import SubmitButton from "../../ButtonSubmit";

//constants
import color from "../../../styles/color";
import TextInputField from "../../TextInputField";

function BodyInfo({ data, setData,setSteps, navigation }) {
    
    const handleClick = () => {
        const isvalid = signupPhysicsValidation(data);
        if (!isvalid) {
            setSteps(4);
        } else {
            ShowError(isvalid);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.desc}>What is age and physical health?</Text>
            <TextInputField
                placeholder='Enter your age'
                icon_name='child'
                value={data.age}
                isNumber={true}
                onChangeText={(number) => setData({ ...data, age: number })}
             />
             <TextInputField
                placeholder='Enter your weight in kg'
                icon_name='shopping-bag'
                value={data.weight}
                isNumber={true}
                onChangeText={(number) => setData({ ...data, weight: number })}
             />
             <TextInputField
                placeholder='Enter your height in feet (like 5.7)'
                icon_name='arrows-v'
                value={data.height}
                isNumber={true}
                onChangeText={(number) => setData({ ...data, height: number })}
             /> 
            <Text style={styles.text}>We need to calculate BMI. It's a tool to estimate body fat and screen for obesity and health risks.</Text>
            <View>
                <SubmitButton
                    text='Next'
                    onPress={handleClick}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: verticalScale(20)
    },
    desc: {
        textAlign: 'center',
        color: color.black,
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: moderateScale(20),
        marginVertical: verticalScale(12)
    },
    text: {
        textAlign: 'center',
        color: color.grey,
        fontSize: 16,
        fontWeight: '400',
        paddingHorizontal: moderateScale(15),
        marginVertical: verticalScale(12),
        marginBottom: moderateScale(25)
    },
});

export default BodyInfo;