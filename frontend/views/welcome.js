import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image, 
  TouchableOpacity,
  ImageBackground,
  StatusBar
} from 'react-native';


function Welcome ({ navigation }) {


  return (
    <ImageBackground source={require('../assets/barcelona_sky.jpg')} style={{height: '100%'}}>
      <StatusBar hidden={true} />
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <Image 
            style={{width: 220, height: 60, resizeMode: 'contain'}}
            source={require('../assets/roomi_empty_centered.png')}
          />
          <Text style={styles.normalText}>Welcome to roomi, the best way to find room mates.</Text>
          <Text style={styles.normalText}>You can only see listings that your friends or their friends have posted.</Text>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => navigation.navigate('Auth')}
          >
            <Text style={styles.textSubmit}>continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  container: {
    backgroundColor: 'white',
    height: 340,
    width: 320,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  normalText: {
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'justify',
    paddingHorizontal: 18,
    paddingTop: 10
  },
  submit: {
    backgroundColor: '#c0ff4a',
    marginTop: 25,
    padding: 12,
    width: '60%',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center'
  },
  textSubmit: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#333333',
    fontWeight: '600',
    height: 30,
    fontSize: 24
  }
})

export default Welcome;


