import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

import AppNavigator from './appNavigation';
import AuthNavigator from './authNavigation';

import AuthLoadingScreen from '../views/authLoading';

import Welcome from '../views/welcome';

// const AuthStack = createStackNavigator(AuthNavigator);
/*const AuthStack = createStackNavigator({ SignIn: SignInScreen });
*/
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: AuthNavigator,
      Welcome: Welcome
    },
    {
      initialRouteName: 'Welcome',
    }
  )
);