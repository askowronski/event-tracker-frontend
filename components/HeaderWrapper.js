import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Header} from 'react-native-elements';

export default function HeaderWrapper() {
  return (
    <Header style={styles.container}
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'Abstract Event Tracker', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
    />          
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute'
  },
});
