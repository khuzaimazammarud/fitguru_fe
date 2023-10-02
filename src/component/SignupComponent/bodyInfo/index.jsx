import { View, StyleSheet, Text } from "react-native";
import { verticalScale, moderateScale } from "react-native-size-matters";

//component
import SubmitButton from "../../ButtonSubmit";

//constants
import color from "../../../styles/color";
import TextInputField from "../../TextInputField";

function BodyInfo({ data, setSteps, navigation }) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.desc}>What is age and physical health?</Text>
            <TextInputField
                placeholder='Enter your age'
                icon_name='child'
             />
             <TextInputField
                placeholder='Enter your weight in kg'
                icon_name='shopping-bag'
             />
             <TextInputField
                placeholder='Enter your height in feet'
                icon_name='arrows-v'
             /> 
            <Text style={styles.text}>We need to calculate BMI. It's a tool to estimate body fat and screen for obesity and health risks.</Text>
            <View>
                <SubmitButton
                    text='Next'
                    onPress={() => setSteps(4)}
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