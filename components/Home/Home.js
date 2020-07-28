import * as React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import logo from '../../assets/images/psi.png';

export default function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text}>Home Screen </Text>
        <Button
          title="Add Event"
          onPress={() => navigation.navigate('AddEvent')}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
    },
  });