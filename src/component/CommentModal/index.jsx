import { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, Modal, Button } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters'

import color from '../../styles/color';
import Icon, { Icons } from '../Icons';
import imagePath from '../../constants/imagePath';

const transparent = 'rgba(0,0,0,0)';

const commentsData = [
    {
        id: '1',
        username: 'Khuzaima',
        comment: 'Very good bugs we done. keep it...',
        likes: 120,
        replies: [],
    },
    {
        id: '2',
        username: 'Maaz',
        comment: 'Good work by you in this 😊',
        likes: 43,
        replies: [],
    },
    {
        id: '3',
        username: 'Mustafa',
        comment: 'best ever work from this 😂',
        likes: 8,
        replies: [
            {
                id: '3-1',
                username: 'Hashir',
                comment: 'thanks @Mustafa 🙌',
                likes: 22,
            },
        ],
    },
    {
        id: '4',
        username: 'Ali asgher',
        comment: 'love this video and your all work & the relevant 😍',
        likes: 76,
        replies: [],
    },
    {
        id: '5',
        username: 'Ibrahim',
        comment: 'where you are going to work on your next work with me 😂😂',
        likes: 198,
        replies: [],
    },
    {
        id: '6',
        username: 'hassan',
        comment: "what's going on this pic 😅",
        likes: 100,
        replies: [],
    },
];


const CommentModal = ({ open, setOpen }) => {

    const [commentText, setCommentText] = useState('');

    const handleSendComment = () => {
        if (commentText.trim()) {
            // Handle sending the comment (e.g., update the state or backend)
            console.log('Comment sent:', commentText);
            // Clear the input field
            setCommentText('');
        }
    };

    const renderComment = ({ item }) => (
        <View style={styles.commentContainer}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.comment}>{item.comment}</Text>
            <View style={styles.interactions}>
                <Text style={styles.likes}>{item.likes} Likes</Text>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.reply}>Reply</Text>
                </TouchableOpacity>
            </View>
            {item.replies.map((reply) => (
                <View key={reply.id} style={styles.replyContainer}>
                    <Text style={styles.username}>{reply.username}</Text>
                    <Text style={styles.comment}>{reply.comment}</Text>
                </View>
            ))}
        </View>
    );
    return (
        <Modal visible={open} animationType='slide' transparent={true}>
            <View
                style={styles.container}>
                <View
                    style={styles.modalContainer}
                >
                    <TouchableOpacity
                        onPress={() => setOpen(false)}
                        style={{ marginVertical: moderateScale(5), alignItems: 'center' }}
                    >
                        <Icon type={Icons.FontAwesome} name={'arrow-down'} size={25} color={color.dark} />
                    </TouchableOpacity>
                    <View style={styles.screenContainer}>
                        <FlatList
                            data={commentsData}
                            renderItem={renderComment}
                            keyExtractor={(item) => item.id}
                            style={styles.commentsList}
                        />
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={commentText}
                                onChangeText={setCommentText}
                                placeholder="Add a comment as Sumit"
                                placeholderTextColor="#888"
                                style={styles.input}
                            />
                            <Button title="Send" onPress={handleSendComment} color="#FF4500" />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: transparent,
    },
    modalContainer: {
        backgroundColor: color.white,
        height: '100%',
        width: '100%',
        // padding: moderateScale(15),
    },
    text: {
        marginLeft: moderateScale(15),
        fontSize: moderateScale(15),
        color: color.white,
        marginVertical: verticalScale(10)
    },
    screenContainer: {
        flex: 1,
        backgroundColor: color.white, // Assuming dark mode from the image
    },
    commentsList: {
        flex: 1,
      },
      commentContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.lightGrey,
      },
      username: {
        color: color.darkOrange,
        fontWeight: 'bold',
      },
      comment: {
        color: color.darkGrey,
      },
      interactions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
      },
      likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      likes: {
        color: color.orange,
        marginLeft: 4,
      },
      reply: {
        color: color.darkOrange,
      },
      inputContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: color.lightGrey,
        padding: 8,
      },
      input: {
        flex: 1,
        color: color.darkGrey,
        backgroundColor: color.lightGrey,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginRight: 8,
      },
});

export default CommentModal;