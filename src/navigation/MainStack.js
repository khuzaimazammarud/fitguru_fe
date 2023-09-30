import Home from "../screens/Home";
import Profile from "../screens/Profile";

export default function(Stack) {
    return(
        <>
            <Stack.Screen
             name="Home" 
             component={Home}

            />
            <Stack.Screen
             name="Profile" 
             component={Profile}

            />
        </>
    )
};