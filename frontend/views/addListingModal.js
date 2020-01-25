import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import AddListingCard from '../components/addListingCard';

import { addListingToServer } from '../utils/apiClientService';

import Icon from 'react-native-vector-icons/AntDesign';

import ImagePicker from 'react-native-image-crop-picker';

export default function AddListing ({navigation}) {
  
  const defaultFormInput = {
    country: '',
    city: '',
    address: '',
    numberRoommates: '',
    monthlyRent: '',
    dateBegin: '',
    dateEnd: '',
    description: '',
    gender: '',
    sharedRoom: false,
  }
  const [ formInput, setFormInput ] = useState(defaultFormInput);

  const handleAdd = () => {
    // verify inputs
    addListingToServer(formInput)
      .then(res => {
        console.log(res);
        if (res === 'OK');
        alert('listing added');
        // should update listings (mine)
        navigation.goBack();
      })
      .catch(e => {
        console.log('error in adding listing', e);
      })
  }

  return (
    <KeyboardAvoidingView 
      style={{flex: 1}} 
      behavior=''
      contentContainerStyle={{}}
    >
     <ScrollView style={{flex: 1}}>
      <TouchableWithoutFeedback 
        onPress={Keyboard.dismiss}
      >
        <View style={styles.parentContainer}>  
          <View style={styles.container}>
 
          <Text style={styles.title}>add your own listing</Text>

            {/* USE PICKER HERE OR GOOGLE MAPS API MAKES THINGS EASIER */}
            <TextInput style={styles.input} placeholder='country'
            autoCompleteType='off' autoCapitalize='sentences'
            onChangeText={(country) => setFormInput({ ...formInput, country: country
            })} value={formInput.country} />

            <TextInput style={styles.input} placeholder='city'
            autoCompleteType='off' autoCapitalize='sentences'
            onChangeText={(city) => setFormInput({ ...formInput, city: city
            })} value={formInput.city} />

            <TextInput style={styles.input} placeholder='street and number'
            autoCompleteType='street-address' autoCapitalize='sentences'
            onChangeText={(address) => setFormInput({ ...formInput, address: address
            })} value={formInput.address} />

            <TextInput style={styles.input} placeholder='number of roommates'
            autoCompleteType='off' keyboardType='number-pad'
            onChangeText={(numberRoommates) => setFormInput({ ...formInput, numberRoommates: numberRoommates})}
            value={String(formInput.numberRoommates)} />

            <TextInput style={styles.input} placeholder='monthly rent'
            autoCompleteType='off' keyboardType='number-pad'
            onChangeText={(monthlyRent) => setFormInput({ ...formInput, monthlyRent: monthlyRent})} 
            value={String(formInput.monthlyRent)} />

            {/*<DatePickerIOS
              date={formInput.dateBegin}
              onDateChange={(newDate) => setFormInput({...formInput, dateBegin: newDate})}
            />*/}

            <TextInput style={styles.input} placeholder='date begin'
            autoCompleteType='off' autoCapitalize='sentences' multiline={true}
            onChangeText={(dateBegin) => setFormInput({ ...formInput, dateBegin: dateBegin
            })} value={formInput.dateBegin} />

            <TextInput style={styles.input} placeholder='date end (optional)'
            autoCompleteType='off' autoCapitalize='sentences' multiline={true}
            onChangeText={(dateEnd) => setFormInput({ ...formInput, dateEnd: dateEnd
            })} value={formInput.dateEnd} />

            <TextInput style={styles.input} placeholder='small description'
            autoCompleteType='off' autoCapitalize='sentences' multiline={true}
            onChangeText={(description) => setFormInput({ ...formInput, description: description
            })} value={formInput.description} />

            <Text style={{fontWeight: '500', paddingLeft: 10, fontSize: 22, marginTop: 10}}>add an image</Text>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                onPress={() => {
                  ImagePicker.openPicker({
                    width: 400,
                    heigth: 400,
                    cropping: true
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
                    height: 300,
                    width: 300,
                    cropping: true
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

          </View>
          <View style={styles.buttonContainer}>
            <Button
              title='Cancel'
              style={styles.buttonCancel}
              onPress={() => navigation.goBack()}
            />
            <Button
              title='Add'
              style={styles.buttonAdd}
              onPress={() => {
                handleAdd();
              }}
            />
          </View>
        </View>  
      </TouchableWithoutFeedback>
     </ScrollView>
    </KeyboardAvoidingView>
  )
}

const height = '100%';
const width = '100%';

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    marginTop: 100,
    backgroundColor: 'white',
    height: 540,
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
    fontWeight: '500',
    paddingLeft: 10,
    fontSize: 30
  },
  input: {
    backgroundColor: '#ededed',
    paddingLeft: 17,
    marginVertical: 5,
    textAlignVertical: 'center',
    borderRadius: 20,
    height: 37,
    fontSize: 18
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
  },
  buttonCancel: {
    backgroundColor: 'lightgrey',
  },
  buttonAdd: {
    backgroundColor: 'grey',
  }
})