import React, { useEffect } from 'react';

import {
  Alert,
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

// REDUX
import { connect } from 'react-redux';
import { setAuthState } from '../store/actions/actions';

import Contacts from 'react-native-contacts';


ContactsAdd = ({ navigation, userAuthInfo, setAuthState }) => {

  const handleOkContacts = () => {
      // async to send contacts!
    Contacts.getAllWithoutPhotos((err, contacts) => {
      if (err) {
        console.log('error getting contacts:', err);
        Alert.alert('Error', 'we couldn\'t upload your contacts, try later.');
      } else {
        console.log(contacts);
        console.log(userAuthInfo);
        
        if (contacts) {
          Alert.alert('roomi', 'Now login with your email and password');
          navigation.navigate('SignIn');
        }
      }
    })
  };



  return (
    <SafeAreaView style={styles.parentContainer}>
        <Text style={styles.title}>Just one more step!</Text>
        <Text style={styles.subtitle}>Add your contacts so we can find your friends!</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleOkContacts()}>
          <Text style={styles.buttonText}> OK</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}


const width = '70%';

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    marginTop: 170,
    alignItems: 'center',
    marginHorizontal: 25,
  },
  title: {
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 30
  },
  subtitle: {
    fontWeight: '300',
    paddingLeft: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#c0ff4a',
    marginTop: 20,
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    width,
    height: 40,
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#333333',
    fontWeight: '700',
    height: 28,
    fontSize: 24
  }
})

const mapStateToProps = (state) => ({
  userAuthInfo: state.userAuthInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthState: (info) => dispatch(setAuthState(info)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsAdd);



