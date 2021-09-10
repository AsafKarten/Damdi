import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, Button, TouchableOpacity } from 'react-native';

const uri = "http://ruppinmobile.tempdomain.co.il/site15/"
var bcrypt = require('bcryptjs');
const LoginScreen = ({ navigation }) => {

  const [PersonalId, onChangeId] = React.useState()
  const [Email, onChangeEmail] = React.useState();
  const [Pass, onChangePass] = React.useState();

  const Login = async (id, email, Pass) => {
    if (id == "" || email == "" || Pass == "") {
      alert("אנא מלא\י את כל פרטים !")
      return
    }
    else {
      let result = await fetch(uri + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: id,
          Email: email,
        })
      })
      let data = await result.JSON
      console.log(data);
      var correct = bcrypt.compareSync(Pass, data.Salted_hash)
      if (!correct) {
        Alert.alert("Wrong details,check your details");
        return;
      }
      console.log(data);
      navigation.navigate("Welcome")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeId}
        value={PersonalId}
        placeholder="תעודת זהות"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={Email}
        placeholder="אימייל"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePass}
        value={Pass}
        secureTextEntry={true}
        placeholder="סיסמה"
      />
      <TouchableOpacity onPress={() => Login(PersonalId, Email, Pass)}>
        <View style={styles.button_normal}>
          <Text >התחברות</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RegistrationNewUser')}>
        <View style={styles.button_normal}>
          <Text >הרשמה</Text>
        </View>
      </TouchableOpacity>
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
    width: 160,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  button_normal: {

    alignItems: 'center',
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#633689"
  },
});
export default LoginScreen;