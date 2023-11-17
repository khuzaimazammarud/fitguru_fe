import {useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../../../styles/color';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters'

import imagePath from '../../../constants/imagePath';
import Icon, { Icons } from "../../../component/Icons";

const Post = () => {

    const [like, setLike] = useState(0);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.userInfo}>
                    <Image
                        source={imagePath.userProfile}
                        style={styles.userImage}
                    />
                    <View style={styles.userInfoText}>
                        <Text style={styles.text}>Khuzema</Text>
                        <Text style={styles.textLite}>4min ago</Text>
                    </View>
                </View>
                <Text style={styles.postText}>
                    Hello guys I have issue regaring my fitness I would like if you all give me great around of applause
                </Text>
                <Image
                    source={imagePath.userPost}
                    style={styles.userPost}
                />
                <View style = {styles.interactionWrapper}>
                    <TouchableOpacity style = {styles.interaction} onPress={() => like === 0 ? setLike(1): setLike(0)}>
                        <Icon type={Icons.MaterialCommunityIcons} name={like === 1 ? 'heart': 'heart-outline'} color={like === 0 ? color.black:color.maincolor} size={30}/>
                        <Text style={[styles.interactionText, like === 1 ? styles.interactionTextLiked : null]}>{like === 1 ? '14 Likes': 'Like'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.interaction}>
                        <Icon type={Icons.MaterialCommunityIcons} name='comment-outline' color={color.black} size={30}/>
                        <Text style={styles.interactionText}>Comment</Text>
                    </TouchableOpacity>
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
        // maxHeight: verticalScale(800),
        // overflow: 'hidden',
    },
    userInfo: {
        flexDirection: 'row',
    },
    userImage: {
        width: scale(50),
        height: scale(50),
        borderRadius: moderateScale(25)
    },
    userInfoText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: moderateScale(10)
    },
    text: {
        fontSize: moderateScale(15),
        fontWeight: 'bold'
    },
    textLite: {
        fontSize: moderateScale(12),
        color: color.grey
    },
    postText: {
        marginVertical: verticalScale(10),
        padding: moderateScale(5),
        fontSize: moderateScale(15)
    },
    userPost: {
        width: '100%',
        height: undefined,
        aspectRatio: 1, 
    },
    interactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: moderateScale(15)
    },
    interaction: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: moderateScale(5),
        padding: moderateScale(5)
    },
    interactionText: {
        fontSize: moderateScale(13),
        fontWeight: 'bold',
        marginTop: moderateScale(5),
        marginLeft: scale(3)
    },
    interactionTextLiked: {
        color: color.maincolor
    }
})

export default Post;