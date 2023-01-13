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

const DeviceGridTile = props => {
  const bgcColor = props.color;
  return (
    <View style={[styles.gridItem, {backgroundColor: bgcColor}]}>
      <Pressable android_ripple={{color: '#ccc'}} style={styles.button}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{props.name}</Text>
          <Text>{props.place}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default DeviceGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
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
    fontWeight: 'bold',
    fontSize: 18,
  },
});
