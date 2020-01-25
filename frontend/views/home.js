import React, { useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

// redux
import { connect } from 'react-redux'; 
import { updateListingsState } from '../store/actions/actions';

// components
import ListingCard from '../components/listingCard';

// api service
import { fetchListings } from '../utils/apiClientService';




const API_URL = 'https://roomi-end.herokuapp.com';


Home = ({ navigation, listings, updateListingsState }) => {

  getListings = async () => {
    
    if(listings.length) return // avoid duplication on reload app
    fetchListings()
      .then(res => {
        setTimeout(() => updateListingsState(res.data), 1200);
        // updateListingsState(res.data);
      })
      .catch(e => {
        console.log('error in getting listings:', e);
      });
  }

  useEffect(() => {
    getListings();
  }, []);


  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {listings.length ? 
        <FlatList
          data={listings}
          renderItem={({item}) => (
            <ListingCard 
              navigation={navigation}
              item={item}
            />)}
          keyExtractor={item => String(item._id)}
        />
      :
        <View style={{flex: 1, alignContents: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size='large' color='grey' />
        </View>
      }
    </View>
  );
}


Home.navigationOptions = props => ({
  title: 'roomi',
  headerTitleStyle: {
    fontSize: 32,
  },
  headerRight: () => (
    <TouchableOpacity 
      onPress={()=> props.navigation.navigate('AddListing')}
      style={{width: '100%', height: '100%'}}
    >
      <Icon
        name='plus'
        size={30}
        color={'black'}
        style={{width: 32, height: 38, paddingTop: 8, marginRight: 10}}
      />
    </TouchableOpacity>
  ),
});


const mapStateToProps = (state) => ({
  listings: state.listings,
});

const mapDispatchToProps = (dispatch) => ({
  updateListingsState: (listings) => dispatch(updateListingsState(listings)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
