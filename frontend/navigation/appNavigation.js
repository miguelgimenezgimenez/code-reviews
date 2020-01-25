import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/AntDesign';

import Home from '../views/home';
import Favorites from '../views/favorites';
import Profile from '../views/profile';


// HomeStack
import ListingPage from '../views/listingPage';
import AddListing from '../views/addListingModal';


const myDefaultStackOptions = {
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent',
  },
  cardStyle: {
    backgroundColor: 'white',
    opacity: 1,
  },
  headerStatusBarHeight: 35,
  headerTintColor: 'black',
  headerBackTitle: ' ',
  /*
  // In case I want to use a logo
  headerTitleStyle: {
    marginTop: 0,
    justifyContent: 'center',
  }*/
  /*
  headerTitle: () => (<LogoTitle />),
  */
}

// In case I want to use a logo
/*function LogoTitle () {
  return (
    <View>
      <Text 
        style={{fontSize: 32, fontWeight: '500', textAlign: 'left', }}
       >
         roomi
      </Text>
    </View>
  )
}*/

const homeStack = createStackNavigator({
    Home: Home,
    ListingPage: ListingPage,
  },
  {   
    initialRouteName: 'Home',
    defaultNavigationOptions: myDefaultStackOptions
  }
);

const rootHomeStack = createStackNavigator(
  {
    Main: {
      screen: homeStack,
    },
    AddListing: {
      screen: AddListing
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: myDefaultStackOptions,
  }
);

const favoritesStack = createStackNavigator({
    Favorites: Favorites,
  },
  {
    initialRouteName: 'Favorites',
    defaultNavigationOptions: myDefaultStackOptions
  }
);

const profileStack = createStackNavigator({
    Profile: Profile,
  },
  {
    initialRouteName: 'Profile',
    defaultNavigationOptions: myDefaultStackOptions
  }
);



const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: rootHomeStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor, activeTintColor }) => (
        <Icon 
          name='home'
          size={35} 
          color={tintColor}
          style={{ width: 35, height: 35, textAlignVertical: 'bottom'}} />
      ),
    }
  },
  Favorites: {
    screen: favoritesStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor, activeTintColor }) => (
        <Icon 
          name='hearto'
          size={35} 
          color={tintColor}
          style={{ width: 35, height: 35, textAlignVertical: 'bottom'}} />
      ),
    }
  },
  Profile: {
    screen: profileStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor, activeTintColor }) => (
        <Icon 
          name='user'
          size={35} 
          color={tintColor}
          style={{ width: 35, height: 35, textAlignVertical: 'bottom'}} />
      ),
    }
  }
},
{
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: 'black',
    showLabel: false,
    showIcon: true,
    labelStyle: {
      fontSize: 20,
    },
    cardStyle: {

      backgroundColor: 'white',
    },
  }
});

export default AppNavigator;
