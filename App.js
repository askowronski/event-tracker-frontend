// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './components/Home/Home'
import AddEventScreen from './components/Event/AddEvent/AddEvent';
import CalendarScreen from './components/EventCalendar/EventCalendarWrapper';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const headerColor = '#1d697c';

const NavigationDrawerStructure = (props)=> {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={()=> toggleDrawer()}>
                {/*Donute Button Image */}
                <Image
                    source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png'}}
                    style={{ width: 25, height: 25, marginLeft: 5 }}
                />
            </TouchableOpacity>
        </View>
    );
}

function HomeScreenStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'Home', //Set Header Title
                    headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: headerColor, //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function AddEventScreenStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="AddEventScreen"
            screenOptions={{
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerStyle: {
                    backgroundColor: headerColor, //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                }
            }}>
            <Stack.Screen
                name="AddEventScreen"
                component={AddEventScreen}
                options={{
                    title: 'Add Event', //Set Header Title

                }}/>
        </Stack.Navigator>
    );
}

function CalendarScreenStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="CalendarScreen"
            screenOptions={{
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerStyle: {
                    backgroundColor: headerColor, //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                }
            }}>
            <Stack.Screen
                name="CalendarScreen"
                component={CalendarScreen}
                options={{
                    title: 'Event Calendar', //Set Header Title
                }}/>
        </Stack.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: headerColor,
                    itemStyle: { marginVertical: 5 },
                }}>
                <Drawer.Screen
                    name="HomeScreen"
                    options={{ drawerLabel: 'Home' }}
                    component={HomeScreenStack} />
                <Drawer.Screen
                    name="AddEventScreen"
                    options={{ drawerLabel: 'Add An Event' }}
                    component={AddEventScreenStack} />
                <Drawer.Screen
                    name="CalendarScreen"
                    options={{ drawerLabel: 'Event Calendar' }}
                    component={CalendarScreenStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default App;