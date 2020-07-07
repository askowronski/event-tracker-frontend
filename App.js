import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Calendar} from 'react-native-calendars'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! fuck</Text>
      <Calendar
          // Collection of dates that have to be marked. Default = {}
          markedDates={{
            '2020-07-08': {selected: true, marked: true, selectedColor: 'blue'},
            '2020-07-09': {marked: true},
            '2020-07-10': {marked: true, dotColor: 'red', activeOpacity: 0},
            '2020-07-06': {disabled: true, disableTouchEvent: true}
          }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
