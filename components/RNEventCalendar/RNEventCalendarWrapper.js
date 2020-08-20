import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RNEventCalendar from './RNEventCalendar';

export default function RNEventCalendarWrapper({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <RNEventCalendar />
      </View>
    );
  }

  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
    },
  });