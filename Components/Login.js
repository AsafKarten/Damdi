import React from 'react';
import { View, SafeAreaView, StyleSheet,Text, TextInput, Button, TouchableOpacity } from 'react-native';

const uri = "http://ruppinmobile.tempdomain.co.il/site15/"
const LoginScreen = ({ navigation }) => {

  const [PersonalId, onChangeId] = React.useState()
  const [Pass, onChangePass] = React.useState();

  const Login = (id, Pass) => {
    if (id == null || id == "" || Pass == null || Pass == "") {
      alert("אנא מלא\י את כל פרטים !")
      return
    }
    else {
      fetch(uri + "api/user", {
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

            if (result.Email === undefined & result.Personal_id === undefined) {
              alert("הירשם בבקשה, משתמש אינו קיים")
              return;
            }
            else if (!(result.First_name == null || result.Last_name == null)) {
              navigation.navigate("ברוך הבא", { userid: result.First_name })
            } else {

              navigation.navigate("PersonalForm", result.Personal_id)
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
        placeholder="תעודת זהות"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePass}
        value={Pass}
        secureTextEntry={true}
        placeholder="סיסמה"
      />
      <TouchableOpacity onPress={() => Login(PersonalId, Pass)}>
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