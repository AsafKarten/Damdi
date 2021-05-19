import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
function Login(Email, Pass) {
  alert("Succsessseddd aaaaaaa" + Email + Pass);
}
function LoginScreen() {
  const [Email, onCangeEmail] = React.useState("Email");
  const [Pass, onCangePass] = React.useState("Pass");
  return (
    
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onCangeEmail}
          value={Email}
        />
        <TextInput
          style={styles.input}
          onChangeText={onCangePass}
          value={Pass}
        />
        <Button

          title="Press me"
          onPress={() => Login(Email, Pass)}
        />
      </SafeAreaView>
   
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },

});
export default App;