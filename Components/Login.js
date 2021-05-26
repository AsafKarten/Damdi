import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';


const uri = "http://ruppinmobile.tempdomain.co.il/site15/"

const LoginScreen = ({ navigation }) => {
  const [PersonalId, onChangeId] = React.useState()
  const [Pass, onChangePass] = React.useState();

  const Login = (id, Pass) => {
    if (id == null || id == "" || Pass == null || Pass == "") {
      alert("id and password can not be empty!")
      return
    }
    else {
      fetch(uri + "api/user/info", {
        method: 'POST',
        headers: {
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
            console.log(result.First_name);
            if (!(result.First_name == "" || result.Last_name == "")) {
              navigation.navigate("Welcome", { userid: result.First_name })
              
            } else {
              navigation.navigate("PersonalForm")
            }
          },
          (error) => {
            console.log(error);
          });
    }
  }

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
        onChangeText={onChangePass}
        value={Pass}
        placeholder="Password"
      />
      <Button
        title="Login"
        onPress={() => Login(PersonalId, Pass)}

      />
      <br />
      <Button
        title="SignUp"
        onPress={() => navigation.navigate('Registration')}
      />
    </SafeAreaView>

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
export default LoginScreen;