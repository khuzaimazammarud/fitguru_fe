import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Init } from "../store/actions/auth";
import AuthStact from "./AuthStact";
import MainStack from "./MainStack";

//screens
import FoodView from "../screens/FoodDatabase/FoodView";
import Analytics from "../screens/Analytics";
import WaterTracking from "../screens/WaterTracking";
import AddPost from "../screens/Community/AddPost";
import SendEmail from "../screens/ForgotPassword/sendEmailScreen";
import OtpScreen from "../screens/ForgotPassword/OtpScreen";
import ChangePasswordScreen from "../screens/ForgotPassword/ChangePasswordScreen";
import SuccessScreen from "../screens/ForgotPassword/SuccessScreen";
import EditScreen from "../screens/EditScreen";
import FollowersScreen from "../screens/Community/FollowersScreen";

const Stack = createNativeStackNavigator();

function Routes() {
  const auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const init = () => {
    dispatch(Init());
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {auth.isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainStack} />
            <Stack.Screen name="FoodView" component={FoodView} />
            <Stack.Screen name="Analytics" component={Analytics} />
            <Stack.Screen name="WaterTracking" component={WaterTracking} />
            <Stack.Screen name="AddPost" component={AddPost} />
            <Stack.Screen name="SendEmail" component={SendEmail} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen
              name="changePasswordScreen"
              component={ChangePasswordScreen}
            />
            <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
            <Stack.Screen name="EditScreen" component={EditScreen} />
            <Stack.Screen name="follower" component={FollowersScreen} />
          </>
        ) : (
          AuthStact(Stack)
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
