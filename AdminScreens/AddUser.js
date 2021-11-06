import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert, Dimensions, Modal } from 'react-native';
import Spiner from '../Componentes/Spiner.js';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';


const url = "http://proj13.ruppin-tech.co.il/"
var bcrypt = require('bcryptjs');

export default function AddUser({ navigation }) {
  const winW = Dimensions.get('window').width;
  const winH = Dimensions.get('window').height;

  const defaultImg = "http://proj13.ruppin-tech.co.il/Assets/DamdiPI4.png"
  const [loading, setLoading] = useState(false);

  const [typeUser, setTypeUser] = useState(null)
  const [personalId, setPersonalId] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [pass, setPassword] = useState(null)
  const [cPassword, setCPassword] = useState(null)

  const [emailShouldShow, setEmailShouldShow] = useState(false)

  useEffect(() => {
    navigation.addListener('focus', async () => {
      handleOnChange(typeUser);
    })
  }, [navigation])

  const handleOnChange = (typeUser) => {
    console.log(typeUser);
    if (typeUser == "לקוח") {
      setEmailShouldShow(true)
      return
    }
    setEmailShouldShow(false)
  };

  // //Render the screen when we return to him 
  // componentDidMount = () => {
  //   this._unsubscribeFocus = this.props.navigation.addListener('focus', (payload) => {
  //     console.log('will focus', payload);
  //     this.setState({ none: 'will focus ' + new Date().getSeconds() });
  //   });
  // }
  // componentWillUnmount = () => {
  //   this._unsubscribeFocus();
  // }

  const validationInput = () => {
    var emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var pasRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (personalId == null || personalId == "" || email == null || email == "" || pass == null || pass == "" || cPassword == null || cPassword == "") {
      Alert.alert("אנא מלא/י את כל השדות");
      console.log('====================================');
      console.log("Error, Empty fields");
      console.log('====================================');
      return
    }
    if (!(emailregex.test(email))) {
      Alert.alert("אופס", "האימייל שהוכנס לא חוקי אנא נסה בפורמט הבא: name@example.com")
      setEmail("")
      return
    }
    if (!(pasRegex.test(pass))) {
      Alert.alert("סיסמא לא חוקית", "הסיסמה צריכה להכיל לפחות: 8 תווים , אות גדולה , אות קטנה ,תו , ומספר")
      setPassword("")
      return
    }
    if (pass !== cPassword) {
      Alert.alert("שגיאת סיסמא", "הסיסמאות אינם תואמות, אנא הזן שנית!");
      setPassword("")
      setCPassword("")
      return
    }
    else {
      if (typeUser === "לקוח") {
        SignUpClient();
      }
      else {
        SignUpEmployee();
      }
    }
  }


  const SignUpClient = async () => {
    try {
      let salt = bcrypt.genSaltSync(10);
      let saltedHash = bcrypt.hashSync(pass, salt);
      let result_register = await fetch(url + "api/add/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: personalId,
          Email: email,
          Salted_hash: saltedHash,
          Profile_img: defaultImg
        })
      })
      let new_data = await result_register.json()
      console.log(new_data)
      let result_user = await fetch(url + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: PersonalId,
          Email: Email
        })
      });
      let user = await result_user.json();
      await storeData(user)
      navigation.navigate("PersonalFormA", { route: user, modalStatus: "info" })
      onChangeId("")
      onChangeEmail("")
      onChangePass("")
      onChangeCPass("")
    }
    catch (error) {
      Alert.alert("שגיאת הרשמה", "מצטערים ההרשמה נכשלה אנא נסו מאוחר יותר")
    }
  }

  const SignUpEmployee = async () => {
    try {
      let salt = bcrypt.genSaltSync(10);
      let saltedHash = bcrypt.hashSync(Pass, salt);
      let result_register = await fetch(url + "api/add/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: PersonalId,
          Email: Email,
          Salted_hash: saltedHash,
          Profile_img: defaultImg
        })
      })
      let new_data = await result_register.json()
      console.log(new_data)
      let result_user = await fetch(url + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: PersonalId,
          Email: Email
        })
      });
      let user = await result_user.json();
      await storeData(user)
      navigation.navigate("PersonalFormA", { route: user, modalStatus: "info" })
      onChangeId("")
      onChangeEmail("")
      onChangePass("")
      onChangeCPass("")
    }
    catch (error) {
      Alert.alert("שגיאת הרשמה", "מצטערים ההרשמה נכשלה אנא נסו מאוחר יותר")
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.HorizontalBox}>
        <Text>בחר סוג משתמש להוספה: </Text>
        <RadioButtonGroup
          containerStyle={{ margin: 15, flexDirection: 'row' }}
          selected={typeUser}
          onSelected={(value) => { setTypeUser(value), handleOnChange(value) }}
          radioBackground="blue">
          <RadioButtonItem value="עובד" label="עובד" />
          <RadioButtonItem value="לקוח" label="לקוח" />
        </RadioButtonGroup>
      </View>
      <View style={styles.HorizontalBox}>
        <Text style={styles.lableText}> תעודת זהות </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPersonalId(text)}
          value={personalId}
          placeholder="ת.ז."
          keyboardType='numeric'
        />
      </View>
      <View style={styles.HorizontalBox}>
        <Text style={styles.lableText}> שם פרטי </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          placeholder="שם פרטי"
        />
      </View>
      <View style={styles.HorizontalBox}>
        <Text style={styles.lableText}>שם משפחה</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          placeholder="שם משפחה"
        />
      </View>

      {emailShouldShow && (<View style={styles.HorizontalBox}>
        <Text style={styles.lableText}>אימייל</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="אימייל"
        />
      </View>
      )}
      <View style={styles.HorizontalBox}>
        <Text style={styles.lableText}>סיסמא</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={pass}
          secureTextEntry={true}
          placeholder="סיסמא"
        />
      </View>
      <View style={styles.HorizontalBox}>
        <Text style={styles.lableText}>אימות סיסמא</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCPassword(text)}
          value={cPassword}
          secureTextEntry={true}
          placeholder="אימות סיסמא"
        />
      </View>

      <View style={styles.register_btn}>
        <TouchableOpacity onPress={() => validationInput()}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >הוסף משתמש</Text>
          </View>
        </TouchableOpacity>
      </View>
      {loading && <Spiner loading={loading} />}
    </SafeAreaView >
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HorizontalBox: {
    width: 280,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 15,
  },
  input: {
    width: 120,
    height: 40,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  lableText: {
    marginTop: 17,
    fontSize: 16,
    fontWeight: 'bold'
  },
  button_normal: {
    alignItems: 'center',
    width: 110,
    margin: 25,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold'
  },
  register_btn: {
    alignItems: 'center'
  },
});