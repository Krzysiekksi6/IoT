/**
 * Sample React Native IoT App
 * https://github.com/Krzysiekksi6
 *
 *
 *
 */

import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/**
 * Custom Components and Elements
 */

import DevicesScreen from './screens/DevicesScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import ModalScreen from './screens/ModalScreen';

/**
 * Third Party Libraries
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Home = ({route}) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Connection') {
            iconName = focused ? 'bluetooth' : 'bluetooth';
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === 'Devices') {
            iconName = focused ? 'profile' : 'profile';
            return <AntDesign name={iconName} size={size} color={color} />;
          }
        },

        tabBarActiveTintColor: '#9BBB2D',
        tabBarInactiveTintColor: '#808080',
      })}>
      <Tab.Screen name="Devices" component={DevicesScreen} />
      <Tab.Screen name="Connection" component={ConnectionScreen} />
    </Tab.Navigator>
  );
};

export default Home;
