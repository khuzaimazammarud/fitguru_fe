import { View, Text, StyleSheet } from 'react-native';
import { Signout } from "../../store/actions/auth";
import SubmitButton from '../../component/ButtonSubmit';
import { useDispatch } from "react-redux";

const Profile = () => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(Signout());
    };

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <SubmitButton text={'logout'} onPress={onLogout}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItem: 'center',
        backgroundColor: '#2c3e50'
    }
})

export default Profile;