import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AddEventForm from './AddEventForm/AddEventForm';

export default function AddEvent({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>

        <AddEventForm />
        <Button
          title="Go Home"
          onPress={() => navigation.navigate('HomeScreen')}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
    },
  });