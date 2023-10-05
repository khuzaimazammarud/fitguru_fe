import Login from "../screens/Login";
import Signup from "../screens/Signup";
import ForgotPassword from "../screens/ForgotPassword";
import OtpScreen from "../screens/ForgotPassword/OtpScreen";

export default function (Stack) {
    return (
        <>
            <Stack.Screen
                name="Login"
                component={Login}

            />
            <Stack.Screen
                name="Signup"
                component={Signup}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
            />
            <Stack.Screen
                name="OtpScreen"
                component={OtpScreen}
            />
        </>
    )
};