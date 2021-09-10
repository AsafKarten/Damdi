import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from './client_screens/Registration'
import Login from './client_screens/Login.js'
import PersonalFormScreen from './client_screens/PersonalForm';
import PersonalFormScreen2 from './client_screens/PersonalForm2';
import PersonalFormScreen3 from './client_screens/PersonalForm3';
import Welcome from './client_screens/Welcome.js';

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="PersonalForm" component={PersonalFormScreen} />
        <Stack.Screen name="PersonalForm2" component={PersonalFormScreen2} />
        <Stack.Screen name="PersonalForm3" component={PersonalFormScreen3} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
