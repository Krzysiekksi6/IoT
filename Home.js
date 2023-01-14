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
            return (
              <FontAwesome name={iconName} size={size} color={'#0082FC'} />
            );
          } else if (route.name === 'Devices') {
            iconName = focused ? 'profile' : 'profile';
            return <AntDesign name={iconName} size={size} color={'#d81b60'} />;
          }
        },
      })}>
      <Tab.Screen
        name="Devices"
        component={DevicesScreen}
        options={{
          headerStyle: {
            backgroundColor: '#9c27b0',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen name="Connection" component={ConnectionScreen}
      options={{
        headerStyle: {
          backgroundColor: '#0082FC',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }} />
    </Tab.Navigator>
  );
};

export default Home;
