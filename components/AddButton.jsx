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
} from 'react-native';

const AddButton = (props) => {
  const nav = props.nav
  const showModal = () => {
    nav.navigate('New Device')
  }
  
  return (
    <View style={styles.gridItem}>
      <Pressable 
      android_ripple={{color: '#ccc'}} style={styles.button}
      onPress={showModal}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>+</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  gridItem: {
    margin: '5%',
    height: 150,
    width: '40%',
    backgroundColor: '#f5a442',
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 62,
  },
});