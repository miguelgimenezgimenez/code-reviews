import React, { useEffect } from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default function AuthLoading ({navigation}) {
  useEffect(() => {
    _bootstrapAsync();
  }, []);

  _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('userToken');
    const userToken = false;
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(userToken ? 'App' : 'Auth');
  }

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );

}