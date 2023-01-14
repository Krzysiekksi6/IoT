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
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {addDevice} from '../store/devices';

const ModalScreen = ({navigation}) => {
  const [tilesColor, setValue] = React.useState(null);
  const [deviceName, onChangeName] = React.useState(null);
  const [devicePlace, onChangePlace] = React.useState(null);
  const [deviceCommand, onChangeCommand] = React.useState(null);

  const dispatch = useDispatch();

  const generateUniqueId = () => {
    return Math.random().toString(16);
  };
  const saveData = async () => {
    const unqId = generateUniqueId();
    item = {
      id: unqId,
      name: deviceName,
      place: devicePlace,
      command: deviceCommand,
      color: tilesColor,
    };
    // Async Storage

    dispatch(
      addDevice({
        id: unqId,
        name: deviceName,
        place: devicePlace,
        command: deviceCommand,
        color: tilesColor,
      }),
    );
    navigation.navigate('Home', {
      screen: 'Devices',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Add some device!</Text>
      </View>
      <View style={styles.footer}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#666666"
          style={styles.textInput}
          onChangeText={onChangeName}
        />
        <TextInput
          placeholder="Place"
          placeholderTextColor="#666666"
          style={styles.textInput}
          onChangeText={onChangePlace}
        />
        <TextInput
          placeholder="Command"
          placeholderTextColor="#666666"
          style={styles.textInput}
          onChangeText={onChangeCommand}
        />

        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={tilesColor}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginTop: 20,
            }}>
            <View style={styles.col}>
              <View
                style={{
                  backgroundColor: '#f5a442',
                  borderRadius: 8,
                  margin: 10,
                }}>
                <RadioButton value="#f5a442" style={styles.radio} />
              </View>
              <View
                style={{
                  backgroundColor: '#002d6e',
                  borderRadius: 8,
                  margin: 10,
                }}>
                <RadioButton value="#002d6e" />
              </View>
            </View>
            <View style={styles.col}>
              <View
                style={{
                  backgroundColor: '#368dff',
                  borderRadius: 8,
                  margin: 10,
                }}>
                <RadioButton value="#368dff" />
              </View>
              <View
                style={{
                  backgroundColor: '#41d95d',
                  borderRadius: 8,
                  margin: 10,
                }}>
                <RadioButton value="#41d95d" />
              </View>
            </View>
            <View style={styles.col}>
              <View
                style={{
                  backgroundColor: '#ffd700',
                  borderRadius: 8,
                  margin: 10,
                }}>
                <RadioButton value="#ffd700" />
              </View>
              <View
                style={{
                  backgroundColor: '#ff6347',
                  borderRadius: 8,
                  margin: 10,
                }}>
                <RadioButton value="#ff6347" />
              </View>
            </View>
          </View>
        </RadioButton.Group>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={saveData}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F32A8',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  footer: {
    flex: 6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  textInput: {
    marginLeft: 10,
    paddingLeft: 10,
    borderWidth: 3,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#9BBB2D',
  },

  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    borderRadius: 10,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#9BBB2D',
  },
  col: {
    flex: 1,
    margin: 10,
  },
});
