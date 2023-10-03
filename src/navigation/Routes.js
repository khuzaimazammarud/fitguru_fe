import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStact from './AuthStact';
import MainStack from './MainStack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Init } from '../store/actions/auth';

const Stack = createNativeStackNavigator();

function Routes() {

  const auth = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const init = () => {
    dispatch(Init());
  }

  useEffect(() => {
    init();
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {
          auth.isAuthenticated ? 
          <Stack.Screen name = 'Main' component={MainStack} />:
          AuthStact(Stack)
        } 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;