import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';


import Registration from '../ClientScreens/Registration'
import Login from '../ClientScreens/Login.js'
import PersonalFormA from '../ClientScreens/PersonalFormA';
import PersonalFormB from '../ClientScreens/PersonalFormB';
import PersonalFormC from '../ClientScreens/PersonalFormC';
import Welcome from '../ClientScreens/Welcome.js';
import Home from '../ClientScreens/Home.js';
import Stations from '../ClientScreens/Stations.js';
import Profile from '../ClientScreens/Profile.js';
import Appointments from '../ClientScreens/Appointments.js';
import Friends from '../ClientScreens/Friends.js';
import BloodInfo from '../ClientScreens/BloodInfo.js';
import ScheduleAppointment from '../ClientScreens/ScheduleAppointment.js';
import MedicalForm from '../ClientScreens/MedicalForm.js';
import ValidationForm from '../ClientScreens/ValidationForm.js';
import PrivacyAndSecurity from '../ClientScreens/PrivacyAndSecurity.js'

const Stack = createStackNavigator();

export default function StackNavigation() {




  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" component={Login}
          options={{
            title: 'התחברות',
            headerStyle: {
              backgroundColor: '#7d91b0',
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
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('Registration')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="PersonalFormA" component={PersonalFormA}
          options={{
            title: 'פרטים אישיים - חלק א',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff',
            // headerRight: () => <Feather onPress={() => backPage('PersonalForm')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        <Stack.Screen name="PersonalFormB" component={PersonalFormB}
          options={{
            title: 'פרטים אישיים - חלק ב',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('PersonalForm2')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="PersonalFormC" component={PersonalFormC}
          options={{
            title: 'פרטים אישיים - חלק ג',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('PersonalForm3')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="Welcome" component={Welcome}
          options={{
            title: 'ברוך הבא',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff',
            // headerRight: () => <Feather onPress={() => backPage('Welcome')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            // //   <Spiner />
            // //   return <Feather onPress={() => logoutUser()} name="log-out" size={32} color="grey" style={styles.arrow} />
            // // }
          }} />
        < Stack.Screen name="Home" component={Home}
          options={{
            title: 'מסך הבית',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff',
            // headerRight: () => <Feather onPress={() => backPage('Home')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />
        < Stack.Screen name="Stations" component={Stations}
          options={{
            title: 'תחנות התרמה',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('Stations')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        < Stack.Screen name="Profile" component={Profile}
          options={{
            title: 'פרופיל אישי',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('Profile')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        < Stack.Screen name="PrivacyAndSecurity" component={PrivacyAndSecurity}
          options={{
            title: 'פרטיות ואבטחה',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('Appointments')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        < Stack.Screen name="Appointments" component={Appointments}
          options={{
            title: 'התורים שלי',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('Appointments')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        < Stack.Screen name="Friends" component={Friends}
          options={{
            title: 'החברים שלי',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('Friends')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        < Stack.Screen name="BloodInfo" component={BloodInfo}
          options={{
            title: 'פרטי הדם שלי',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />

        < Stack.Screen name="ValidationForm" component={ValidationForm}
          options={{
            title: 'טופס אימות',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        < Stack.Screen name="ScheduleAppointment" component={ScheduleAppointment}
          options={{
            title: 'רשימת תורים',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        < Stack.Screen name="MedicalForm" component={MedicalForm}
          options={{
            title: 'טופס רפואי',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
      </Stack.Navigator >
    </NavigationContainer >
  );
}


const styles = StyleSheet.create({
  arrow: {
    margin: 10
  }
})

