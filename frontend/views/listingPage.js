import React from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';


export default function ListingPage ({navigation}) {
  const item = navigation.state.params.item
  
  const win = Dimensions.get('window');
  const height = '100%';
  const img_path = '../assets/IMG_6514.png';

  return(
    <View style={{}}>
      <ScrollView style={{height}}>
        {/*Gallery of images*/}
        <Image
            style={{
              flex: 1,
              width: win.width,
              height: win.width*(3/4)
            }}
            resizeMode='contain'
            source={{uri: item.img_id}}
          />
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Image 
              style={{
                height: 80,
                width: 80,
                borderRadius: 80,
                margin: 10,
                marginHorizontal: 4
              }}
              resizeMode='center'
              source={{uri: item.profile_url}}
            />
            {item.connection === 2 ? 
              <Image
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 80,
                  margin: 10,
                  marginHorizontal: 4,
                }}
                resizeMode='center'
                source={{uri: item.second_profile_url}}
              />
            :
              <Text></Text>
            }
          </View>

          <Text style={styles.defaultText}>
            {item.host} {item.connection === 2 ? 
              <Text style={styles.defaultText}> (who is a friend of: {item.second_host})</Text>
              : <Text></Text>
            } is renting this apartment!
          </Text>

          <Text style={{fontWeight: '600', fontSize: 26, marginBottom: 10}}>
            Details
          </Text>
          <Text style={styles.defaultText}>{item.price} / Month</Text>

          
          <Text style={styles.defaultText}>Address: {item.address}</Text>
          <Text style={styles.defaultText}>{item.date_from} - {item.date_until}</Text>
          <Text style={styles.defaultText}>{item.roommates} Roommates</Text>
          <Text style={styles.defaultText}>{item.shared_room ? 'Shared Room' : 'Private Room'}</Text>
          <Text style={styles.defaultText}>{item.description}</Text>
          <Text style={{fontWeight: '600', fontSize: 24, marginBottom: 10}}>
            Contact {item.host}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={()=> alert('call')}>
              <Icon
                name='phone'
                size={32}
                color='black'
                style={{width: 32, height: 32}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> alert('message')}>
              <Icon
                name='message1'
                size={32}
                color='black'
                style={{width: 32, height: 32}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

ListingPage.navigationOptions = props => ({
  title: 'roomi',
  headerTitleStyle: {
    fontSize: 32,
  },
});

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  defaultText: {
    fontSize: 22,
    marginBottom: 7,
    fontFamily: 'System'
  }
})