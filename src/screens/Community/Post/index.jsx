import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../../../styles/color';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters'

const Post = () => {
    return (
        <SafeAreaView style= {styles.container}>
            <View style={styles.card}>
                <View style = {styles.userInfo}>
                    <Image src=''></Image>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItem: 'center',
        padding: moderateScale(15),
    },
    card: {
        backgroundColor: color.white,
        borderRadius: moderateScale(10),
        padding: moderateScale(10),
    },
    userInfo: {
        flexDirection: 'row',
    }
})

export default Post;