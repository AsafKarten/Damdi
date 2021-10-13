import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Registration from '../client_screens/Registration'
import Login from '../client_screens/Login.js'
import PersonalFormA from '../client_screens/PersonalFormA';
import PersonalFormB from '../client_screens/PersonalFormB';
import PersonalFormC from '../client_screens/PersonalFormC';
import Welcome from '../client_screens/Welcome.js';
import Home from '../client_screens/Home.js';
import Stations from '../client_screens/Stations.js';
import Profile from '../client_screens/Profile.js';
import Appointments from '../client_screens/Appointments.js';
import Friends from '../client_screens/Friends.js';
import BloodInfo from '../client_screens/BloodInfo.js';
import ScheduleAppointment from '../client_screens/ScheduleAppointment.js';
import MedicalForm from '../client_screens/MedicalForm.js';
import ValidationForm from '../client_screens/ValidationForm.js';
import DonatorsLogin from '../donator_screens/DonatorsLogin.js';
import DHome from '../donator_screens/DHome.js';
import UnitOne from '../donator_screens/UnitOne.js';
import UnitTwo from '../donator_screens/UnitTwo.js';
import UnitThree from '../donator_screens/UnitThree.js';
import DonorInfo from '../donator_screens/DonorInfo.js';
import PersonalInfo from '../donator_screens/PersonalInfo.js';
import MedicalInfo from '../donator_screens/MedicalInfo.js';

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
            title: 'פרטים אישים',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('PersonalForm')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="PersonalFormB" component={PersonalFormB}
          options={{
            title: 'פרטים אישים',
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
            title: 'פרטים אישים',
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
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('Welcome')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="Home" component={Home}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff',
            // headerRight: () => <Feather onPress={() => backPage('Home')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="Stations" component={Stations}
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
        <Stack.Screen name="Profile" component={Profile}
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
        <Stack.Screen name="Appointments" component={Appointments}
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
        <Stack.Screen name="Friends" component={Friends}
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
        <Stack.Screen name="BloodInfo" component={BloodInfo}
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

        <Stack.Screen name="ValidationForm" component={ValidationForm}
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
        <Stack.Screen name="ScheduleAppointment" component={ScheduleAppointment}
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
        <Stack.Screen name="MedicalForm" component={MedicalForm}
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
        <Stack.Screen name="DonatorsLogin" component={DonatorsLogin}
          options={{
            title: 'התחברות מתרים',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="DHome" component={DHome}
          options={{
            title: 'מסך בית מתרים',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="UnitOne" component={UnitOne}
          options={{
            title: 'עמדה 1 - קבלת תורמים',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="UnitTwo" component={UnitTwo}
          options={{
            title: 'עמדה 2 - בדיקה רפואית',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="UnitThree" component={UnitThree}
          options={{
            title: 'עמדה 3 - לקיחת תרומות',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="DonorInfo" component={DonorInfo}
          options={{
            title: 'פרטים אישיים תורם',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="MedicalInfo" component={MedicalInfo}
          options={{
            title: 'פרטים רפואים תורם',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo}
          options={{
            title: 'פרטים אישיים תורם',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  arrow: {
    margin: 10
  }
})

