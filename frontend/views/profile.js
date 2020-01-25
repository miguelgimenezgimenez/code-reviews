import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  Text,
  Image,
  Button,
} from 'react-native';

// REDUX
import { connect } from 'react-redux';
import { setAuthState } from '../store/actions/actions';
// END REDUX

Profile = ({ navigation, userAuthInfo, setAuthState }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 20, flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <Image
          style={styles.profileImage}
          resizeMode='center'
          source={{ uri: userAuthInfo.profile_pic }}
        />
        <View style={{ flexWrap: 'wrap' }}>
          <Text style={styles.username}>{userAuthInfo.firstName} </Text>
          <Text style={styles.username}>{userAuthInfo.lastName}</Text>
        </View>
      </View>

      {console.log(userAuthInfo)}
      <Text style={styles.title}>Email</Text>
      <Text style={styles.value}>{userAuthInfo.email}</Text>
      <Text style={styles.title}>Phone Number</Text>
      <Text style={styles.value}>{userAuthInfo.phone_number}</Text>
      <Text style={{fontSize: 28}}></Text>
      <View style={{alignSelf: 'center'}}>
        <Button 
          title='Sign Out'
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
    marginRight: 20 
  },
  username: {
    fontSize: 24, 
    fontWeight: '600', 
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    marginBottom: 5
  },
});

Profile.navigationOptions = props => ({
  title: 'your profile',
  headerTitleStyle: {
    fontSize: 28,
  },
  headerStyle: {
    shadowColor: 'grey',
    borderBottomWidth: 0.1
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
)(Profile);