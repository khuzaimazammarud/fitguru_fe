import React from 'react';
import { StyleSheet, TouchableOpacity, Modal, Text, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters'
import color from '../../styles/color';
import Icon, { Icons } from '../Icons';

const transparent = 'rgba(0,0,0,0)';

const SettingModal = ({ open, setOpen }) => {
    return (
        <Modal visible={open} animationType='slide' transparent={true}>
            <View
                style={styles.container}>
                <View
                    style={styles.modalContainer}
                >
                    <TouchableOpacity
                        onPress={() => setOpen(false)}
                        style={{ marginBottom: moderateScale(5) }}
                    >
                        <Icon type={Icons.FontAwesome} name={'close'} size={25} color={color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon type={Icons.FontAwesome} name={'gear'} size={25} color={color.white} />
                            <Text style={styles.text}>Privacy and Setting</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon type={Icons.FontAwesome} name={'pencil'} size={25} color={color.white} />
                            <Text style={styles.text}>Edit Details</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon type={Icons.FontAwesome} name={'lock'} size={25} color={color.white} />
                            <Text style={styles.text}>Update password</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon type={Icons.FontAwesome} name={'image'} size={25} color={color.white} />
                            <Text style={styles.text}>Edit profile image</Text>
                        </View>
                    </TouchableOpacity>
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
        backgroundColor: color.dark,
        height: '50%',
        width: '100%',
        padding: moderateScale(15),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    text: {
        marginLeft: moderateScale(15),
        fontSize: moderateScale(15),
        color: color.white,
        marginVertical: verticalScale(10)
    }
});

export default SettingModal;