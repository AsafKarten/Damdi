import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert, Dimensions, Modal, Pressable } from 'react-native';
import Spiner from '../Componentes/Spiner.js';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';


const url = "http://proj13.ruppin-tech.co.il/"
var bcrypt = require('bcryptjs');

export default function AddUser({ navigation }) {
  const winW = Dimensions.get('window').width;
  const winH = Dimensions.get('window').height;

  const defaultImg = "http://proj13.ruppin-tech.co.il/Assets/DamdiPI4.png"
  const [loading, setLoading] = useState(false);

  const [typeUser, setTypeUser] = useState("לקוח")
  const [personalId, setPersonalId] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [typeEmployee, setTypeEmployee] = useState(null)
  const [email, setEmail] = useState(null)
  const [pass, setPassword] = useState(null)
  const [cPassword, setCPassword] = useState(null)

  //Bool properties
  const [emailInput, setEmailTextInput] = useState(false)
  const [nameInput, setNameTextInput] = useState(false)
  const [typeEmpInput, setTypeEmpInputTextInput] = useState(false)
  const [modalInfoVisible, setModalInfoVisible] = useState(false);

  useEffect(() => {
    handleOnChange(typeUser);
  }, [])


  useEffect(() => {
    navigation.addListener('focus', async () => {
      handleOnChange(typeUser);
    })
  }, [navigation])

  const handleOnChange = (typeUser) => {
    if (typeUser === "לקוח") {
      setEmailTextInput(true)
      setNameTextInput(false)
      return
    } else {
      setNameTextInput(true)
      setTypeEmpInputTextInput(true)
      setEmailTextInput(false)
    }
  };

  const validationInput = () => {
    var emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var pasRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (personalId === null || personalId === "" || pass === null || pass === "" || cPassword === null || cPassword === "") {
      Alert.alert("אנא מלא/י את כל השדות");
      return
    }
    if (typeUser === 'לקוח') {
      if (email === null || email === "") {
        Alert.alert("אנא מלא/י את כל השדות");
        return
      }
      if (!(emailregex.test(email))) {
        Alert.alert("אופס", "האימייל שהוכנס לא חוקי אנא נסה בפורמט הבא: name@example.com")
        setEmail("")
        return
      }
    }
    if (typeUser === 'עובד') {
      if (firstName == null || firstName == "" || lastName == null || lastName == "") {
        Alert.alert("אנא מלא/י את כל השדות");
        return
      }
    }
    if (!(pasRegex.test(pass))) {
      Alert.alert("סיסמא לא חוקית", "הסיסמה צריכה להכיל לפחות: 8 תווים , אות גדולה , אות קטנה ,תו , ומספר")
      setPassword("")
      setCPassword("")
      return
    }
    if (pass !== cPassword) {
      Alert.alert("שגיאת סיסמא", "הסיסמאות אינם תואמות, אנא הזן שנית!");
      setPassword("")
      setCPassword("")
      return
    }
    else {
      if (Platform.OS !== 'web') {
        setLoading(true);
      }
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
      console.log("new data", new_data);
      if (new_data == 'User created successfully') {
        setModalInfoVisible(true)
        setPersonalId("")
        setEmail("")
        setPassword("")
        setCPassword("")
        setLoading(false);
        return;
      }
      else {
        Alert.alert("שגיאה", "בדוק את פרטיך ,המשתמש קיים כבר במערכת")
        setModalInfoVisible(false)
        setLoading(false);
        setEmail("")
      }
    }
    catch (error) {
      Alert.alert("שגיאת הרשמה", "מצטערים ההרשמה נכשלה אנא נסו מאוחר יותר")
    }
  }

  const SignUpEmployee = async () => {
    try {
      let salt = bcrypt.genSaltSync(10);
      let saltedHash = bcrypt.hashSync(pass, salt);
      let result_register = await fetch(url + "api/donators/post", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id_worker: personalId,
          First_name: firstName,
          Last_name: lastName,
          Salted_hash: saltedHash,
        })
      })
      let new_data = await result_register.json()
      console.log(new_data)
      if (new_data == 'donator user created successfully.') {
        setModalInfoVisible(true)
        setPersonalId("")
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setCPassword("")
        setTypeEmployee("")
        setLoading(false);
      }
      else {
        Alert.alert("שגיאה", "בדוק את פרטיך ,המשתמש קיים כבר במערכת")
        setModalInfoVisible(false)
        setLoading(false);
      }
    }
    catch (error) {
      Alert.alert("שגיאת הרשמה", "מצטערים ההרשמה נכשלה אנא נסו מאוחר יותר")
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_screen}>
        <View style={styles.horizontalBox}>
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
      </View>
      <View style={styles.horizontalBox}>
        <Text style={styles.lableText}> תעודת זהות </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPersonalId(text)}
          value={personalId}
          placeholder="ת.ז."
          keyboardType='numeric'
        />
      </View>
      {nameInput && <View style={styles.horizontalBox}>
        <Text style={styles.lableText}> שם פרטי </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          placeholder="שם פרטי"
        />
      </View>}
      {nameInput && <View style={styles.horizontalBox}>
        <Text style={styles.lableText}>שם משפחה</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          placeholder="שם משפחה"
        />
      </View>}
      {typeEmpInput && <View style={styles.horizontalBox}>
        <Text style={styles.lableText}>תפקיד העובד</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTypeEmployee(text)}
          value={typeEmployee}
          placeholder="שם משפחה"
        />
      </View>}
      {emailInput && (<View style={styles.horizontalBox}>
        <Text style={styles.lableText}>אימייל</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="אימייל"
        />
      </View>
      )}
      <View style={styles.horizontalBox}>
        <Text style={styles.lableText}>סיסמא</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={pass}
          secureTextEntry={true}
          placeholder="סיסמא"
        />
      </View>
      <View style={styles.horizontalBox}>
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
      {modalInfoVisible && (
        <View>
          <Modal
            animationType={'none'}
            transparent={true}
            visible={modalInfoVisible}
            onRequestClose={() => { console.log('Modal has been closed.'); }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>משתמש נוצר בהצלחה !</Text>
              <View style={styles.modal_buttons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalInfoVisible(!modalInfoVisible)}>
                  <Text style={styles.textStyle}>סגור</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </SafeAreaView >
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top_screen: {
    flexDirection: 'row'
  },
  horizontalBox: {
    width: 315,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 15,
  },
  input: {
    height: 35,
    width: 200,
    margin: 10,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
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
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  register_btn: {
    alignItems: 'center'
  },
  //Modal
  modalView: {
    margin: 20,
    backgroundColor: '#757c94',
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modal_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  button: {
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  modalText: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  }
});