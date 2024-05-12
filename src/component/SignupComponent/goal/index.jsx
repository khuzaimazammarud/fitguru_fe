import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { verticalScale, scale, moderateScale } from "react-native-size-matters";

//constants
import color from "../../../styles/color";
import { useEffect } from "react";

//component
import SubmitButton from "../../ButtonSubmit";
import RadioButton from "../../RadioButton";

function GoalInfo({ onSignup, data, setData }) {
  const [selected, setSelected] = useState(1);
  const [suggestion, setSuggestion] = useState("");

  function StreamText(delay) {
    const text = `According`;
    let partialText = "";
    let i = 0;

    function loopIteration() {
      if (i < text.length) {
        partialText += text[i];
        setSuggestion(partialText);
        i++;
        setTimeout(loopIteration, delay); // Schedule the next iteration
      }
    }

    loopIteration(); // Start the loop
  }

  useEffect(() => {
    StreamText(10);
  }, []);
  useEffect(() => {
    if(selected === 1){
        setData({
            ...data,
            activityLevel: "sedentary"
        })
    }else if(selected === 2){
        setData({
            ...data,
            activityLevel: "lightlyActive"
        })
    }else if(selected === 3){
        setData({
            ...data,
            activityLevel: "moderatelyActive"
        })
    }else if(selected === 4){
        setData({
            ...data,
            activityLevel: "veryActive"
        })
    }else if(selected === 5){
        setData({
            ...data,
            activityLevel: "extremelyActive"
        })
    }
  }, [selected]);

  return (
    <View style={styles.container}>
      {
        console.log(selected)
      }
      <Text style={styles.desc}>What is your Routine?</Text>
      <RadioButton
        text="sedentary"
        setSelected={setSelected}
        selected={selected}
        value={1}
      />
      <RadioButton
        text="lightlyActive"
        setSelected={setSelected}
        selected={selected}
        value={2}
      />
      <RadioButton
        text="moderatelyActive"
        setSelected={setSelected}
        selected={selected}
        value={3}
      />
      <RadioButton
        text="veryActive"
        setSelected={setSelected}
        selected={selected}
        value={4}
      />
      <RadioButton
        text="extremelyActive"
        setSelected={setSelected}
        selected={selected}
        value={5}
      />
      <Text style={styles.text}>{suggestion}</Text>
      <View>
        <SubmitButton text="Create Account" onPress={onSignup} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(20),
  },
  desc: {
    textAlign: "center",
    color: color.black,
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: moderateScale(20),
    marginVertical: verticalScale(12),
  },
  text: {
    textAlign: "center",
    color: color.grey,
    fontSize: 16,
    fontWeight: "400",
    paddingHorizontal: moderateScale(15),
    marginVertical: verticalScale(12),
    marginBottom: moderateScale(25),
  },
});

export default GoalInfo;
