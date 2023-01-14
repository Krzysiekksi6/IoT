import React, {useEffect, useState, useRef} from 'react';

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
  AppState,
} from 'react-native';

/**
 * Custom Components and Elements
 */

import DeviceGridTile from '../components/DeviceGridTIle';
import AddButton from '../components/AddButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {updateArray} from '../store/devices';
import { out } from 'react-native/Libraries/Animated/Easing';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const DevicesScreen = ({navigation, route}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const [storageItem, setStorageItem] = React.useState([]);
  const devices = useSelector(state => state.deviceItem.devicesArray);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  

  const DEVICES = [{
    id: 'asd',
    name: "asd",
    place: 'asd',
    command: 'asd',
    color: 'red'
  },

  {
    id: 'asd',
    name: "asd",
    place: 'asd',
    command: 'asd',
    color: 'red'
  },

];

  const saveData = async () => {
    try {
      console.log("ConCAT SAVE", storageItem.concat(devices));
      const jsonValue = JSON.stringify(storageItem.concat(devices));
      console.log("SAVING", jsonValue);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async () => {
    console.log('GETDATA');
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const output = JSON.parse(jsonValue);
      if(output !== null) {
        console.log("OUTPUT", output);
        console.log("...OUTPUT", ...output);
        storageItem.push(...output)
      }
    } catch (e) {
      console.log('ERROR');
    } finally {
      
      console.log("ASYNC STORAGE GET", storageItem);
      console.log("devices", devices);
    }
  };

  AppState.addEventListener('change', nextAppState => {
    if (appState.current === 'background') {
      console.log('Savuje');
      saveData();
    }
  });

  useEffect(() => {
    onRefresh();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('Appp has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
      // if (appState.current === 'background') {
      //   console.log('sejving');
      //   saveData();
      // }
      if (appState.current === 'active') {
        console.log('geting');
        getData();
      }
    });

    return () => {
      subscription?.remove();
    };
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
            {
            
            storageItem.concat(devices).map((device, index) => {
              return (
                <View
                  key={index}
                  style={[styles.device, {backgroundColor: device.color}]}>
                  <Text style={styles.title}>{device.name}</Text>
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
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
