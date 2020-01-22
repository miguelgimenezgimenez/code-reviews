import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '../views/signIn';
import SignUp from '../views/signUp';
import ContactsAdd from '../views/contactsAdd';



const myDefaultStackOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'white',
    opacity: 1,
  },
  headerStatusBarHeight: 35,
  headerTintColor: 'black',
  headerBackTitle: ' ',
  gestureEnabled: false,
  /* transition config not working */
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,  // Set the animation duration time as 0 !!
    },
  })
}

const AuthNavigator = createStackNavigator(
  {
    'SignIn': SignIn,
    'SignUp': SignUp,
    'ContactsAdd': ContactsAdd

  },
  {
    initialRouteName: 'SignIn',
    defaultNavigationOptions: myDefaultStackOptions
  }
);



export default AuthNavigator;