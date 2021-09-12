import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import Registration from './client_screens/Registration'
import Login from './client_screens/Login.js'
import PersonalFormScreen from './client_screens/PersonalForm';
import PersonalFormScreen2 from './client_screens/PersonalForm2';
import PersonalFormScreen3 from './client_screens/PersonalForm3';
import Welcome from './client_screens/Welcome.js';
import Home from './client_screens/Home.js';
import Stations from './client_screens/Stations.js';
import Profile from './client_screens/Profile.js';
import Appointments from './client_screens/Appointments.js';
import Friends from './client_screens/Friends.js';
import BloodInfo from './client_screens/BloodInfo.js';
import DonatorsLogin from './donator_screens/DonatorsLogin.js';

const Stack = createStackNavigator();

export default function App({ navigation }) {

  //TODO: Fix the navigation issue 
  const backPage = (page) => {
    switch (page) {
      case 'Home':
        navigation.navigate('Home')
        break;
      case 'Login':
        //TODO: pop up a confirmation to exit
        //navigation.navigate('Home')
        break;
      case 'Registration':
        navigation.navigate('Login')
        break;
      case 'PersonalForm':
        navigation.navigate('Home')
        break;
      case 'PersonalForm2':
        navigation.navigate('PersonalForm')
        break;
      case 'PersonalForm3':
        navigation.navigate('PersonalForm2')
        break;
      case 'Welcome':
        //TODO: pop up a confirmation to exit
        //navigation.navigate('Home')
        break;
      case 'Stations':
        navigation.navigate('Home')
        break;
      case 'Profile':
        navigation.navigate('Home')
        break;
      case 'Appointments':
        navigation.navigate('Home')
        break;
      case 'Friends':
        navigation.navigate('Home')
        break;
      case 'BloodInfo':
        navigation.navigate('Home')
        break;
      default:
        break;
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}
          options={{
            title: 'התחברות',
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: '#fff',
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="Registration" component={Registration}
          options={{
            title: 'הרשמה',
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: '#fff',
            headerRight: () => <Feather onPress={() => backPage('Registration')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="PersonalForm" component={PersonalFormScreen}
          options={{
            title: 'טופס הרשמה חלק א',
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: '#fff',
            headerRight: () => <Feather onPress={() => backPage('PersonalForm')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="PersonalForm2" component={PersonalFormScreen2}
          options={{
            title: 'טופס הרשמה חלק ב',
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: '#fff',
            headerRight: () => <Feather onPress={() => backPage('PersonalForm2')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="PersonalForm3" component={PersonalFormScreen3}
          options={{
            title: 'טופס הרשמה חלק ג',
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: '#fff',
            headerRight: () => <Feather onPress={() => backPage('PersonalForm3')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="Welcome" component={Welcome}
          options={{
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: '#fff',
            headerRight: () => <Feather onPress={() => backPage('Welcome')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="Home" component={Home}
          options={{
            title: 'Damdi',
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: 'red',
            headerRight: () => <Feather onPress={() => backPage('Home')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="Stations" component={Stations}
          options={{
            title: 'תחנות התרמה',
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: '#fff',
            headerRight: () => <Feather onPress={() => backPage('Stations')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="Profile" component={Profile}
          options={{
            title: 'פרופיל אישי',
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: '#fff',
            headerRight: () => <Feather onPress={() => backPage('Profile')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="Appointments" component={Appointments}
          options={{
            title: 'התורים שלי',
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: '#fff',
            headerRight: () => <Feather onPress={() => backPage('Appointments')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="Friends" component={Friends}
          options={{
            title: 'החברים שלי',
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: '#fff',
            headerRight: () => <Feather onPress={() => backPage('Friends')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="BloodInfo" component={BloodInfo}
          options={{
            title: 'פרטי הדם שלי',
            headerStyle: {
              backgroundColor: '#4d5b70',
            },
            headerTintColor: '#fff',
            headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="DonatorsLogin" component={DonatorsLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  arrow: {
    margin: 10
  }
})
