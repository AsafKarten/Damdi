import React, { useState, useEffect } from 'react';
import { Alert, Modal, View, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Spiner from '../Componentes/Spiner';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";



const url = "http://proj13.ruppin-tech.co.il/"

export default function PersonalFormA({ navigation, route }) {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalInfo, setModalInfo] = useState(false);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);

  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);

  const [User, setUser] = useState(route.params.route)
  const [First_name, onChangeFirst_name] = useState();
  const [Last_name, onChangeLast_name] = useState();
  const [Phone, onChangePhone] = useState();
  const [Birthdate, onChangeBirthdate] = useState("");

  const [Gender, onChangeGender] = useState();
  const [Prev_first_name, onChangePrev_first_name] = useState();
  const [Prev_last_name, onChangePrev_last_name] = useState();

  useEffect(() => {
    getUserInfo();
  }, [])


  const getUserInfo = async () => {
    try {
      if (Platform.OS !== 'web') {
        if (route.params.modalStatus === 'info') {
          setModalInfo(true);
          setModalInfoVisible(true);
        }
        else if (route.params.modalStatus === 'update') {
          setModalUpdate(true)
          setTimeout(() => {
            setModalUpdateVisible(true)
          }, 500);
        }
        else {
          console.log("no modals shows");
          setModalInfo(false);
          setModalInfoVisible(false);
          setModalUpdate(false);
          setModalUpdateVisible(false);
        }
      }
      console.log("Personal id", route.params.route.Personal_id);
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
      onChangeFirst_name(full_user.First_name)
      onChangeLast_name(full_user.Last_name)
      onChangePhone(full_user.Phone)
      onChangeGender(full_user.Gender)
      onChangeBirthdate(full_user.Birthdate.split(' ')[0])
      onChangePrev_first_name(full_user.Prev_first_name)
      onChangePrev_last_name(full_user.Prev_last_name)
      if (
        full_user.First_name === null ||
        full_user.Last_name === null ||
        full_user.Phone === null ||
        full_user.Gender === null ||
        full_user.Birthdate === null ||
        full_user.City === null ||
        full_user.Address === null ||
        full_user.Postal_code === null ||
        full_user.Mail_box === null ||
        full_user.Telephone === null ||
        full_user.Confirm_examination === null ||
        full_user.Birth_land === null ||
        full_user.Father_birth_land === null ||
        full_user.Mother_birth_land === null) {
        console.log("User is empty");
        return
      }
    } catch (error) {
      console.error('error with retrun full user');
    }
  }

  const PostPersonalForm = async () => {
    if (First_name === "" || Last_name === "" || Phone === "" || Gender === "" || Birthdate === "" || Prev_first_name === "" || Prev_last_name === "") {
      Alert.alert('אנא מלא/י את כל הפרטים בבקשה')
      return
    }
    setLoading(true);
    User.First_name = First_name;
    User.Last_name = Last_name;
    User.Phone = Phone;
    User.Gender = Gender;
    User.Birthdate = Birthdate;
    User.Prev_first_name = Prev_first_name;
    User.Prev_last_name = Prev_last_name;
    console.log(User);
    navigation.navigate('PersonalFormB', { route: User })
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS !== 'web');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    onChangeBirthdate(fDate)
    setShow(false);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
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
                onChangeText={(text) => { onChangeFirst_name(text) }}
                value={First_name}
                placeholder="שם פרטי"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>שם משפחה</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeLast_name}
                value={Last_name}
                placeholder="שם משפחה"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>מס פלאפון</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePhone}
                value={Phone}
                placeholder="מס פלאפון"
                keyboardType='numeric'
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>מין</Text>
              <RadioButtonGroup
                containerStyle={{ margin: 15, flexDirection: 'row' }}
                selected={Gender}
                onSelected={(value) => onChangeGender(value)}
                radioBackground="blue">
                <RadioButtonItem value="נקבה" label="נקבה" />
                <RadioButtonItem value="זכר" label="זכר" />
              </RadioButtonGroup>
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>תאריך לידה</Text>
              <TextInput onFocus={onFocus}
                style={styles.input}
                value={Birthdate}
                placeholder="תאריך לידה"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>שם פרטי קודם</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePrev_first_name}
                value={Prev_first_name}
                placeholder="שם פרטי קודם"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>שם משפחה קודם</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePrev_last_name}
                value={Prev_last_name}
                placeholder="שם משפחה קודם"
              />
            </View>
            <View style={styles.container_btn}>
              <TouchableOpacity onPress={() => PostPersonalForm()}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >הבא</Text>
                </View>
              </TouchableOpacity>
            </View>
            {loading && <Spiner loading={loading} />}
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
                  visible={modalUpdateVisible}
                  onRequestClose={() => {
                    console.log('Modal has been closed.');
                  }}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>האם תרצה/י לעדכן פרטים אישיים לחץ על "כן", אחרת לחצ/י על "לא" </Text>
                    <View style={styles.modal_buttons}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalUpdateVisible(!modalUpdateVisible)}>
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
                  visible={modalInfoVisible}
                  onRequestClose={() => { console.log('Modal has been closed.'); }}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>אנא מלאו את הפרטים האישיים פעם אחת כדי שנוכל לתת לכם אפשרות לתרום דם !</Text>
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    padding: 8,
    flex: 1,
    justifyContent: "space-between"
  },
  input: {
    width: 120,
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
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
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
    fontSize:16,
    fontWeight: 'bold'
  },
  container_btn: {
    alignItems: 'center'
  },
  //upload image Modal
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
