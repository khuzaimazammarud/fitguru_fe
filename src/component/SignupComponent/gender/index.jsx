import { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { verticalScale, scale, moderateScale } from "react-native-size-matters";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//component
import SubmitButton from "../../ButtonSubmit";

//constants
import color from "../../../styles/color";

function Gender({ data, navigation }) {

    const [selected, setSelected] = useState(1);

    const handleRadio = () => {
        selected === 1 ? setSelected(2) : setSelected(1);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.desc}>Which one are you?</Text>
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={handleRadio}
                >
                    <View style={styles.radio}>
                        {selected === 1 ? <View style={styles.innerRadio}></View> : null}
                    </View>
                    <FontAwesome name='male' style={styles.icon} />
                    <Text style={styles.cardText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={handleRadio}
                >
                    <View style={styles.radio}>
                        {selected === 2 ? <View style={styles.innerRadio}></View> : null}
                    </View>
                    <FontAwesome name='female' style={styles.icon} />
                    <Text style={styles.cardText}>Female</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>For build a personalize plan we require your gender</Text>
            <View>
                <SubmitButton text='Next' />
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
        paddingHorizontal: moderateScale(40),
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
        paddingHorizontal: moderateScale(40),
        marginVertical: verticalScale(12),
        marginBottom: moderateScale(25)
    },
});

export default Gender;