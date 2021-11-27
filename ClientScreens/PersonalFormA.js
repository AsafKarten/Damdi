import React, { useState, useEffect } from 'react';
import { Alert, Modal, View, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Spiner from '../Componentes/Spiner';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';

const url = "http://proj13.ruppin-tech.co.il/"

export default function PersonalFormA({ navigation, route }) {
  console.log("route PersonalFormA", route);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalInfo, setModalInfo] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const [User, setUser] = useState()
  const [firstName, setFirstName] = useState(route.params.route.First_name);
  const [lastName, setLastName] = useState(route.params.route.Last_name);
  const [phone, setPhone] = useState(route.params.route.Phone);
  const [birthdate, setBirthdate] = useState(route.params.route.Birthdate);
  const [gender, setGender] = useState(route.params.route.Gender);
  const [prevFirstName, setPrevFirstName] = useState(route.params.route.Prev_first_name);
  const [prevLastName, setPrevLastName] = useState(route.params.route.Prev_last_name);


  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkStatusModal();
      getUserInfo()
      setLoading(false)
    });

    return unsubscribe;
  }, [navigation]);


  const checkStatusModal = () => {
    if (Platform.OS !== 'web') {
      if (route.params.modalStatus === 'info') {
        setModalInfo(true);
        setModalInfoVisible(true);
      }
      else if (route.params.modalStatus === 'update') {
        setModalUpdate(true)
        setTimeout(() => {
          setModalUpdate(true)
        }, 500);
      }
      else {
        console.log("no modals shows");
        setModalInfo(false);
        setModalUpdate(false);
      }
    }
  }

  const getUserInfo = async () => {
    try {
      let result = await fetch(url + "api/user/info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: route.params.route.Personal_id
        })
      });
      let full_user = await result.json();
      console.log("full user : ", full_user);
      setUser(full_user);
      setFirstName(full_user.First_name)
      setLastName(full_user.Last_name)
      setPhone(full_user.Phone)
      setGender(full_user.Gender)
      setBirthdate(full_user.Birthdate.split(' ')[0])
      setPrevFirstName(full_user.Prev_first_name)
      setPrevLastName(full_user.Prev_last_name)
    } catch (error) {
      console.error('error with retrun full user');
    }
  }

  const PostPersonalForm = async () => {
    if (firstName === "" || lastName === "" || phone === "" || gender === "" || birthdate === "" || prevFirstName === "" || prevLastName === "") {
      Alert.alert('אנא מלא/י את כל הפרטים בבקשה')
      return
    }
    setLoading(true);
    User.First_name = firstName;
    User.Last_name = lastName;
    User.Phone = phone;
    User.Gender = gender;
    User.Birthdate = birthdate;
    User.Prev_first_name = prevFirstName;
    User.Prev_last_name = prevLastName;
    var UserA = { Personal_id: route.params.route.Personal_id, First_name: firstName, Last_name: lastName, Phone: phone, Gender: gender, Birthdate: birthdate, Prev_first_name: prevFirstName, Prev_last_name: prevLastName }
    console.log("PersonalFormA ", UserA);
    setLoading(false);
    navigation.navigate('PersonalFormB', { route: UserA })
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS !== 'web');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setBirthdate(fDate)
    setShow(false);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    setShow(false);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onFocus = () => {
    showDatepicker()
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>כחלק מתהליך התרומה,{"\n"}יש להזין את פרטיך האישים העדכניים על מנת לתרום דם בצורה בטוחה ומאובטחת.</Text>
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}> שם פרטי </Text>
              <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                value={firstName}
                placeholder="שם פרטי"
                maxLength={15}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>שם משפחה</Text>
              <TextInput
                style={styles.input}
                onChangeText={setLastName}
                value={lastName}
                placeholder="שם משפחה"
                maxLength={15}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>מס פלאפון</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                placeholder="מס פלאפון"
                keyboardType='numeric'
                maxLength={10}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>מין</Text>
              <RadioButtonGroup
                containerStyle={{ margin: 15, flexDirection: 'row' }}
                selected={gender}
                onSelected={setGender}
                radioBackground="blue">
                <RadioButtonItem value="נקבה" label="נקבה" />
                <RadioButtonItem value="זכר" label="זכר" />
              </RadioButtonGroup>
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>תאריך לידה</Text>
              <TextInput onFocus={onFocus}
                style={styles.input}
                value={birthdate}
                placeholder="תאריך לידה"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>שם פרטי קודם</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPrevFirstName}
                value={prevFirstName}
                placeholder="שם פרטי קודם"
                maxLength={15}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>שם משפחה קודם</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPrevLastName}
                value={prevLastName}
                placeholder="שם משפחה קודם"
                maxLength={15}
              />
            </View>
            <View style={styles.container_btn}>
              <TouchableOpacity onPress={() => PostPersonalForm()}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >הבא</Text>
                </View>
              </TouchableOpacity>
              {loading && <Spiner loading={loading} />}
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display='default'
                onChange={onChange}
              />
            )}
            {modalUpdate && (
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalUpdate}
                  onRequestClose={() => {
                    console.log('Modal has been closed.');
                  }}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>האם תרצה/י לעדכן פרטים אישיים לחץ על "כן", אחרת לחצ/י על "לא" </Text>
                    <View style={styles.modal_buttons}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => { setModalUpdate(!modalUpdate) }}>
                        <Text style={styles.textStyle}>כן</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setLoading(false)
                          navigation.navigate("Welcome", { route: User });
                        }}>
                        <Text style={styles.textStyle}>לא</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
            )}
            {modalInfo && (
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalInfo}
                  onRequestClose={() => { console.log('Modal has been closed.'); }}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>אנא מלאו את הפרטים האישיים פעם אחת כדי שנוכל לתת לכם אפשרות לתרום דם !</Text>
                    <View style={styles.modal_buttons}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalInfo(!modalInfo)}>
                        <Text style={styles.textStyle}>סגור</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: "space-between"
  },
  input: {
    width: 150,
    height: 40,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  button_normal: {
    alignItems: 'center',
    width: 110,
    margin: 25,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.7,

  },
  button_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  HorizontalBox: {
    width: 280,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 15,
  },
  lableText: {
    marginTop: 17,
    fontSize: 16,
    fontWeight: 'bold'
  },
  container_btn: {
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
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    width: 120,
    backgroundColor: "#2196F3",
    opacity: 0.8,

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
