import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Init } from '../store/actions/auth';
import AuthStact from './AuthStact';
import MainStack from './MainStack';

//screens
import FoodView from '../screens/FoodDatabase/FoodView';
import UserProfile from '../screens/UserProfile';
import Analytics from '../screens/Analytics';

const Stack = createNativeStackNavigator();

function Routes() {

  const auth = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const init = () => {
    dispatch(Init());
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          auth.isAuthenticated ? (
            <>
            <Stack.Screen name='Main' component={MainStack} />
            <Stack.Screen name='FoodView' component={FoodView} />
            <Stack.Screen name='Account' component={UserProfile} />
            <Stack.Screen name='Analytics' component={Analytics} />
            </>
          ):(
        AuthStact(Stack))
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;