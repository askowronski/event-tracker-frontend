import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/Home/Home'
import AddEvent from './components/Event/AddEvent/AddEvent';
import EventCalendarWrapper from './components/EventCalendar/EventCalendarWrapper';



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EventCalendar">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddEvent" component={AddEvent} />
        <Stack.Screen name="EventCalendar" component={EventCalendarWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;

