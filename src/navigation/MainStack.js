import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { scale, moderateScale, verticalScale } from "react-native-size-matters";
import * as Animatable from 'react-native-animatable'

//screens
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Post from "../screens/Community/Post";

//componant
import Icon, { Icons } from "../component/Icons";

//constant
import color from "../styles/color";
import { useRef } from "react";
import { useEffect } from "react";


const TabArr = [
    { route: 'Like', label: 'Like', type: Icons.MaterialCommunityIcons, activeIcon: 'account-group', inActiveIcon: 'account-group-outline', component: Post },
    { route: 'Home', label: 'Home', type: Icons.Ionicons, activeIcon: 'grid', inActiveIcon: 'grid-outline', component: Home },
    { route: 'Search', label: 'Search', type: Icons.MaterialCommunityIcons, activeIcon: 'timeline-plus', inActiveIcon: 'timeline-plus-outline', component: Home },
    { route: 'Account', label: 'Account', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: Profile },
]

const Tab = createBottomTabNavigator();

const TabButton = (props) => {

    const { item, onPress, accessibilityState } = props;
    const focusced = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if(focusced) {
            viewRef.current.animate({0: {scale: 0.5, rotate: '0deg'}, 1: {scale: 1.5, rotate: '360deg'}});
        } else {
            viewRef.current.animate({0: {scale: 1.5, rotate: '360deg'}, 1: {scale: 1, rotate: '0deg'}});
        }
    },[focusced])

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={1}
        >
            <Animatable.View
            ref={viewRef}
            style={styles.container}
            duration={1000}
            >
                <Icon type={item.type} name={focusced ? item.activeIcon : item.inActiveIcon} color={focusced ? color.maincolor : color.mainLite} />
            </Animatable.View>
        </TouchableOpacity>
    )
}

export default function () {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: verticalScale(40),
                    position: 'absolute',
                    bottom: moderateScale(16),
                    left: moderateScale(16),
                    right: moderateScale(16),
                    borderRadius: 16
                }
            }}
        >
            {
                TabArr.map((item, idx) => {
                    return (
                        <Tab.Screen name={item.route} component={item.component}
                            options={{
                                tabBarShowLabel: false,
                                tabBarButton: (props) => <TabButton {...props} item={item} />
                            }}

                        />
                    )
                })
            }
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})