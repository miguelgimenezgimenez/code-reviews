import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

export default function Favorites () {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 28}}>Your favorites! TBA!</Text>
    </View>
  );
};

Favorites.navigationOptions = props => ({
  title: 'favorites',
  headerTitleStyle: {
    fontSize: 28,
  },
  headerStyle: {
    shadowColor: 'grey',
    borderBottomWidth: 0.1
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
})