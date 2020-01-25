import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';



export default function ListingCard ({navigation, _id, item}) {
  
  const img_path = '../assets/IMG_6514.png';

  return (
    <TouchableOpacity 
      onPress={()=> navigation.navigate('ListingPage', {item})}
      style={{activeOpacity:0}}
      >

      <View style={styles.listingCard}>
        <View style={styles.image}>
          <Image
            style={{
              height,
              width
            }}
            resizeMode='center'
            source={{uri: item.img_id}}
          />
        </View>
        <View style={styles.box}>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, paddingTop: 2}}>
            <Text style={[styles.defaultText],{fontSize: 40, paddingRight: 20, fontWeight: '600', color: '#434343'}}>{item.price}</Text>
            {/*<Text style={styles.defaultText}>{item.roommates} RM</Text>*/}
            <Image 
              style={{
                height: 40,
                width: 40,
                borderRadius: 40,
                marginTop: 4,
                marginHorizontal: 4
              }}
              resizeMode='center'
              source={{uri: item.profile_url}}
            />
            {item.connection === 2 ? 
              <Image
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  marginTop: 4,
                  marginHorizontal: 4,
                }}
                resizeMode='center'
                source={{uri: item.second_profile_url}}
              />
            :
              <Text></Text>
            }
            {/*<Text style={styles.defaultText}>Hosted by: {item.host}</Text>*/}
          </View>
          <View>
            <View style={{flexDirection: 'column', flexWrap: 'wrap', paddingHorizontal: 10}}>
              
              <View style={{flexDirection: 'row', paddingBottom: 6}}>
                <Icon 
                  name='user'
                  size={22} 
                  color={'black'}
                  style={{ paddingTop: 2, width: 24, height: 24, textAlignVertical: 'center'}}
                />
                <Text style={styles.defaultText}>By {item.host} {item.connection === 2 ? `friend of ${item.second_host}` : ''}</Text>  
              </View>

              <View style={{flexDirection: 'row', paddingBottom: 6}}>
                <Icon 
                  name='enviromento'
                  size={22} 
                  color={'black'}
                  style={{ paddingTop: 2, width: 24, height: 24, textAlignVertical: 'center'}}
                />
                <Text style={styles.defaultText}>{item.address}, {item.city}, {item.country}</Text>  
              </View>

              <View style={{flexDirection: 'row'}}>
                <Icon 
                  name='calendar'
                  size={22} 
                  color={'black'}
                  style={{ paddingTop: 2, width: 24, height: 26, textAlignVertical: 'center'}}
                />
                <Text style={styles.defaultText}>{item.date_from}</Text>
                <Text style={styles.defaultText}>{item.date_until ? `- ${item.date_until}` : ''}</Text>
                {/*<Button title={`call: ${item.host}`} onPress={()=> alert('Calling host')} />*/}
              </View>
            </View>
          </View>

        </View>
      </View>
    </TouchableOpacity>
  );
};

const height = '100%';
const width = '100%';

const styles = StyleSheet.create({
  listingCard: {
    flex: 1,
    
    backgroundColor: 'white',
    /*overflow: 'hidden',*/
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 10,
    height: 330,
    borderColor: '#e8e9eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    borderRadius: 20,
  },
  image: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    overflow: 'hidden',
    flex: 4.5,
    height,
    width,

  },
  box: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    flex: 3.5,
    width,
    backgroundColor: 'white',

  },
  price: {
    fontSize: 16,
  },
  defaultText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'System',
    paddingTop: 4
  }

});

