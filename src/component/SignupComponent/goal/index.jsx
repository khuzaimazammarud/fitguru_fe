import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { verticalScale, scale, moderateScale } from "react-native-size-matters";

//constants
import color from "../../../styles/color";
import { useEffect } from "react";

//component
import SubmitButton from "../../ButtonSubmit";
import RadioButton from "../../RadioButton";

function GoalInfo({ data, setSteps, navigation }) {

    const [selected, setSelected] = useState(0);
    const [suggestion, setSuggestion] = useState('');

    const StreamText = () => {    
        const text = `We need to calculate BMI. It's a tool to estimate body fat and screen for obesity and health risks`;
        let partialText = '';

        for(let i=0 ; i< text.length; i++) {
            partialText += text[i];
            setSuggestion(partialText);
        }
    }

    function delayedLoop(delay) {
        const text = `According to our calculation you should choose gain weight cause your bmi score is 18.6 and t0 avoid obesity`;
        let partialText = '';
        let i = 0;
        
        function loopIteration() {
          if (i < text.length) {
            // Your code here
            partialText += text[i];
            setSuggestion(partialText);
            i++;
            setTimeout(loopIteration, delay); // Schedule the next iteration
          }
        }
      
        loopIteration(); // Start the loop
      }

    useEffect(() => {
        delayedLoop(10)
    },[]);
    
    return (
        <View style={styles.container}>
            <Text style={styles.desc}>What is your goal?</Text>
            <RadioButton text = 'Gain weight' setSelected={setSelected} selected = {selected} value={1}/>
            <RadioButton text = 'Maintain weight' setSelected={setSelected} selected = {selected} value={2}/>
            <RadioButton text = 'Loss weight' setSelected={setSelected} selected = {selected} value={3}/>
            <Text style={styles.text}>{suggestion}</Text>
            <View>
                <SubmitButton
                    text='Create Account'
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
    cardContainer: {
        flexDirection: 'row',
    },
    card: {
        flex: 1,
        margin: moderateScale(8),
        backgroundColor: color.white,
        borderRadius: 5,
        padding: moderateScale(20)
    },
    radio: {
        backgroundColor: color.lightgrey,
        width: scale(20),
        height: scale(20),
        borderRadius: moderateScale(10)
    },
    innerRadio: {
        backgroundColor: color.black,
        width: scale(14),
        height: scale(14),
        borderRadius: moderateScale(7),
        margin: moderateScale(3)
    },
    icon: {
        textAlign: 'center',
        fontSize: moderateScale(100)
    },
    cardText: {
        textAlign: 'center',
        marginTop: moderateScale(10),
        fontSize: moderateScale(16),
        fontWeight: '500'
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

export default GoalInfo;