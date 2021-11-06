import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './MainScreen.js';

import AdminHome from '../AdminScreens/AdminHome.js';
import AdminLogin from '../AdminScreens/AdminLogin.js';
import AddUser from '../AdminScreens/AddUser.js';
import UpdateUser from '../AdminScreens/UpdateUser.js';
import RemoveUser from '../AdminScreens/RemoveUser.js';
import SearchUser from '../AdminScreens/SearchUser.js';

import DonatorsLogin from '../DonatorScreens/DonatorsLogin.js';
import DHome from '../DonatorScreens/DHome.js';
import UnitOne from '../DonatorScreens/UnitOne.js';
import UnitTwo from '../DonatorScreens/UnitTwo.js';
import UnitThree from '../DonatorScreens/UnitThree.js';
import DonorInfo from '../DonatorScreens/DonorInfo.js';
import PersonalInfo from '../DonatorScreens/PersonalInfo.js';
import MedicalInfo from '../DonatorScreens/MedicalInfo.js';

const Stack = createStackNavigator();

export default function StackNavigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">

        <Stack.Screen name="MainScreen" component={MainScreen}
          options={{
            title: 'ממשק ניהול Damdi',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />

        <Stack.Screen name="AdminLogin" component={AdminLogin}
          options={{
            title: 'התחברות מנהל',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />
        <Stack.Screen name="AdminHome" component={AdminHome}
          options={{
            title: 'מסך בית מנהל',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff',
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            headerLeft: () => {
              return null;
            },
          }} />

        <Stack.Screen name="AddUser" component={AddUser}
          options={{
            title: 'הוספת משתמש חדש',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />

        <Stack.Screen name="UpdateUser" component={UpdateUser}
          options={{
            title: 'עדכון משתמש קיים',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />

        <Stack.Screen name="RemoveUser" component={RemoveUser}
          options={{
            title: 'הסרת משתמש קיים',
            headerStyle: {
              backgroundColor: '#7d91b0',
            },
            headerTintColor: '#fff'
            // headerRight: () => <Feather onPress={() => backPage('BloodInfo')} name="arrow-right-circle" size={32} color="grey" style={styles.arrow} />,
            // headerLeft: () => {
            //   return null;
            // },
          }} />

        <Stack.Screen name="SearchUser" component={SearchUser}
          options={{
            title: 'חיפוש משתמש קיים',
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

