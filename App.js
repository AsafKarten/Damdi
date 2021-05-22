import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const uri = "http://localhost:62586/"
function Login(id, Pass) {

  fetch(uri + "api/user", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      Personal_id: id,
      Pass: Pass
    })
  })
    .then(res => {
      console.log('res=', res);
      return res.json()
    })
    .then(
      (result) => {

        console.log(result);
        console.log(result.Personal_id);
        console.log(result.Email);
      },
      (error) => {
        console.log(error);
      });

}


function LoginScreen() {
  const [PersonalId, onChangeId] = React.useState()
  const [Pass, onCangePass] = React.useState();

  return (

    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeId}
        value={PersonalId}
        placeholder="I.D"
      />
      <TextInput
        style={styles.input}
        onChangeText={onCangePass}
        value={Pass}
        placeholder="Password"
      />
      <Button
        title="Login"
        onPress={() => Login(PersonalId, Pass)}

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
    borderRadius: 8,
    textAlign: 'center',
  },
});
export default App;
