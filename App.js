/**
 * Sample React Native IoT App
 * https://github.com/Krzysiekksi6
 *
 *
 *
 */

import React, {useEffect, useState} from 'react';

/**
 * Custom Components and Elements
 */

import DevicesScreen from './screens/DevicesScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import ModalScreen from './screens/ModalScreen';
import Home from './Home';

/**
 * Third Party Libraries
 */

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import {store} from './store/store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const RootStack = createStackNavigator();

  
  
  return (
    <Provider store={store}>
    <NavigationContainer>
      <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen 
        name="Home" 
        component={Home}
        options={{headerShown: false}}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="New Device" component={ModalScreen} options={{headerShown: false}}/>
      </RootStack.Group>
    </RootStack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};


export default App;
