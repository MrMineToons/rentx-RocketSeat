import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();

import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/FirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SecondStep';
import { Confirmation } from '../screens/Confirmation';



export function AuthRoutes(){
  return(
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen
        name="Splash"
        component={Splash}
      />

      <Screen
        name="SignIn"
        component={SignIn}
      />

      <Screen
        name="SignUpFirstStep"
        component={SignUpFirstStep}
      />

      <Screen
        name="SignUpSecondStep"
        component={SignUpSecondStep}
      />

      <Screen
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>
  );
}
