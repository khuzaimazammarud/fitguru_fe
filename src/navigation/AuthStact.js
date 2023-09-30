import Login from "../screens/Login";
import Signup from "../screens/Signup";

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
        </>
    )
};