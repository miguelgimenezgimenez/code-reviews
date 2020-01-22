/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import { Provider } from 'react-redux';
import store from './store/store';


import RootNavigator from './navigation/rootNavigation';


const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
