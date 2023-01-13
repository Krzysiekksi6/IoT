import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

/**
 * Custom Components and Elements
 */

import DeviceGridTile from '../components/DeviceGridTIle';
import AddButton from '../components/AddButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const DevicesScreen = ({navigation, route}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const devices = useSelector(state => state.deviceItem.devicesArray);
  const DEVICES = [
    {
      color: '#368dff',
      command: 'ON',
      id: '0.2137cb4ec4a42',
      name: 'Lampa',
      place: 'Kuchnia',
    },
  ];
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  // const renderDeviceItem = itemData => {
  //   return (
  //     <DeviceGridTile
  //       name={itemData.item.name}
  //       place={itemData.item.place}
  //       color={itemData.item.color}
  //     />
  //   );
  // };

  const renderDevices = () => {
    console.log('WAZNE', DEVICES);
    {
      DEVICES.map((device, index) => {
        return (
          <View
            key={index}
            style={[styles.device, {backgroundColor: device.color}]}>
            <Text>{device.name}</Text>
            <Text>{device.place}</Text>
          </View>
        );
      });
    }
  };

  const getData = async () => {
    console.log('GETDATA');
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      jsonValue != null ? JSON.parse(jsonValue) : null;
      if (jsonValue !== null) {
        console.log('JSON value', jsonValue);
        console.log('Set Devices', devices);
      }
    } catch (e) {
      console.log('ERROR');
    }
    console.log('Array of device', devices);
  };

  useEffect(() => {
    // getData();
    onRefresh();
  }, []);
  return (
    <>
      {/* <FlatList
        style={{flex: 1}}
        data={devices}
        keyExtractor={item => item.id}
        renderItem={renderDeviceItem}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponentStyle={{flexWrap: 'wrap'}}
        ListFooterComponent={() => <AddButton nav={navigation} />}
      /> */}

      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.devices}>
            {devices.map((device, index) => {
              return (
                <View
                  key={index}
                  style={[styles.device, {backgroundColor: device.color}]}>
                  <Text>{device.name}</Text>
                  <Text>{device.place}</Text>
                </View>
              );
            })}
          <AddButton nav={navigation} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default DevicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  devices: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  device: {
    height: 150,
    margin: '5%',
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: 'hidden',
  },
});
