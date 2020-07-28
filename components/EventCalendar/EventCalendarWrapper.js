import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import EventCalendar from './EventCalendar';

export default function EventCalendarWrapper({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Event Calendar</Text>

        <EventCalendar />
        <Button
          title="Go Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
    },
  });