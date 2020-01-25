import React, { useState } from 'react';

import {
  Alert,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import * as Yup from 'yup';

// REDUX
import { connect } from 'react-redux';
import { setAuthState } from '../store/actions/actions';
// END REDUX

import { createUser, postPhoto } from '../utils/apiClientService';

SignUp = ({ navigation, userAuthInfo, setAuthState }) => {
 
  const defaultLogin = {
    firstName: '',
    lastName: '',
    phone_number: '',
    email: '', 
    password: '',
    repeatPassword: '',
    image: null,
    profile_pic: null
  };

  const [ login, setLogin ] = useState(defaultLogin);

  const singUpValidationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name required'),
    lastName: Yup.string()
      .required('Last name required'),
    phone_number: Yup.number()
      .required('Phone number is required'),
    email: Yup.string('Invalid Email') 
      .email('Invalid email')             
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password should be at least 8 characters long')
      .required('Required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match!')
  })

  const handleCreateUser = async loginInfo => {
    if (login.image) {
      postPhoto(login.image, login).then(res => {
        const imageUrl = res.data;
        loginInfo.profile_pic = imageUrl;
        createUserLogin(loginInfo);
      }).catch(e => console.log('error uploading image: ', e));
    } else {
      createUserLogin(loginInfo);
    } 
  };

  const createUserLogin = async loginInfo => {
    createUser(loginInfo)
      .then(res => {
        if (res.status === 201) {
          // pass id to authinfo
          setAuthState(res.data);
          Alert.alert('Account created', 'One last step!');
          navigation.navigate('ContactsAdd');
          setLogin(defaultLogin);
        }
      })
      .catch(e => {
        console.log('error in creating user in Sign Up: ', e);
        Alert.alert('Error', 'There was an error creating your account, try again later!');
      });
  };

  const handleImage = image => {
    setLogin({...login, image: image});
  };

  return (
    <KeyboardAvoidingView
      behaviour='height'
      style={{ flex:1, alignItems: 'center'}}
      keyboardVerticalOffset={800}
    >
      <SafeAreaView style={{ flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.parentContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Sign Up</Text>
                <TextInput
                  style={styles.input}
                  placeholder='first name'
                  autoCompleteType='off'
                  autoCapitalize='words'
                  onChangeText={(text) => setLogin({ ...login, firstName: text })}
                  value={login.firstName}
                />
                <TextInput
                  style={styles.input}
                  placeholder='last name'
                  autoCompleteType='off'
                  autoCapitalize='words'
                  onChangeText={(text) => setLogin({ ...login, lastName: text })}
                  value={login.lastName}
                />
                <TextInput
                  style={styles.input}
                  placeholder='phone number'
                  autoCompleteType='off'
                  autoCapitalize='none'
                  onChangeText={(text) => setLogin({ ...login, phone_number: text })}
                  value={login.phone_number}
                />
                <TextInput
                  style={styles.input}
                  placeholder='email'
                  autoCompleteType='email'
                  autoCapitalize='none'
                  onChangeText={(text) => setLogin({ ...login, email: text })}
                  value={login.email}
                />
                <TextInput
                  style={styles.input}
                  placeholder='password'
                  autoCompleteType='password'
                  autoCapitalize='none'
                  secureTextEntry={true}
                  onChangeText={(text) => setLogin({ ...login, password: text })}
                  value={login.password}
                />
                <TextInput
                  style={styles.input}
                  placeholder=' repeat password'
                  autoCompleteType='password'
                  autoCapitalize='none'
                  secureTextEntry={true}
                  onChangeText={(text) => setLogin({ ...login, repeatPassword: text })}
                  value={login.repeatPassword}
                />

                <Text style={styles.subtitle}>Add a profile pic!</Text>
                
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                  <TouchableOpacity
                    onPress={() => {
                      ImagePicker.openPicker({
                        cropping: true,
                        width: 500,
                        height: 500,
                        forceJpg: true
                      })
                      .then(image => handleImage(image))
                      .catch(e => console.log('error in gallery upload', e));
                    }}
                  >
                    <Icon 
                      name='picture'
                      size={38} 
                      color={'black'}
                      style={{ paddingTop: 10, width: 38, height: 45, textAlignVertical: 'center'}}
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => {
                      ImagePicker.openCamera({
                        useFrontCamera: true,
                        width: 500,
                        height: 500,
                        cropping: true,
                        forceJpg: true
                      }).then(image => handleImage(image))
                      .catch(e => console.log('error cam', e));
                    }}
                  >
                    <Icon 
                      name='camerao'
                      size={38} 
                      color={'black'}
                      style={{ paddingTop: 10, width: 38, height: 45, textAlignVertical: 'center'}}
                    />
                  </TouchableOpacity>
                </View>
                

                <TouchableOpacity 
                  style={styles.submit}
                  onPress={async () => {
                    singUpValidationSchema.validate(login).then(value => { 
                        handleCreateUser(value);
                    }).catch(err => {
                      Alert.alert('Error', String(err.errors));
                    });
                  }} 
                >
                  <View>
                    <Text style={styles.textSubmit}>SUBMIT</Text>
                  </View>
                </TouchableOpacity>
            </View>
            <View style={{marginVertical: 10}}>
              <Button 
                title='Sign In instead!'
                onPress={()=> navigation.navigate('SignIn')}
              />
            </View> 
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    height: 565,
    width: 340,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  title: {
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 30,
    marginBottom: 10
  },
  subtitle: {
    fontWeight: '500',
    paddingLeft: 10,
    fontSize: 22,
    marginTop: 10
  },
  input: {
    backgroundColor: '#ededed',
    paddingLeft: 17,
    marginVertical: 5,
    borderRadius: 20,
    height: 45,
    fontSize: 18
  },
  submit: {
    backgroundColor: '#c0ff4a',
    marginTop: 20,
    padding: 12,
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center'
  },
  textSubmit: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#333333',
    fontWeight: '700',
    height: 25,
    fontSize: 24
  }
});



const mapStateToProps = (state) => ({
  userAuthInfo: state.userAuthInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthState: (info) => dispatch(setAuthState(info)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

