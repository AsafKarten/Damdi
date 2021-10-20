import React, { useState, useEffect } from 'react';
import { Alert, DateTime, Modal, TouchableHighlight, View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Spiner from '../Componentes/Spiner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const url = "http://proj13.ruppin-tech.co.il/"

export default function PersonalFormA({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [confirmModal, setConfirm] = useState(false);

  const [User, setUser] = useState(null)
  const [First_name, onChangeFirst_name] = useState();
  const [Last_name, onChangeLast_name] = useState();
  const [Phone, onChangePhone] = useState();
  const [Gender, onChangeGender] = useState();
  const [Birthdate, onChangeBirthdate] = useState();
  const [Prev_first_name, onChangePrev_first_name] = useState();
  const [Prev_last_name, onChangePrev_last_name] = useState();


  useEffect(() => {
    (async () => {
      await getUserInfo();
      if (Platform.OS !== 'web') {
        setShouldShow(true)
        setTimeout(() => {
          setConfirm(true)
        }, 500);
      }
    })()
  }, [])

  // const storeData = async (data) => {
  //   try {
  //     var loggedUser = JSON.stringify(data);
  //     await AsyncStorage.setItem('loggedUser', loggedUser)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('Done clear storage A');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const getUserInfo = async () => {
    try {
      let result = await fetch(url + "api/user/info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: route.params.route.Personal_id,
        })
      });
      let full_user = await result.json();
      if (full_user !== undefined || full_user !== null) {
        setUser(full_user);
        onChangeFirst_name(full_user.First_name)
        onChangeLast_name(full_user.Last_name)
        onChangePhone(full_user.Phone)
        onChangeGender(full_user.Gender)
        onChangeBirthdate(full_user.Birthdate)
        onChangePrev_first_name(full_user.Prev_first_name)
        onChangePrev_last_name(full_user.Prev_last_name)
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
    navigation.navigate('PersonalFormB', { route: User })
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS !== 'web');
    setDate(currentDate);
    onChangeBirthdate(currentDate)
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDay();
    setText(fDate)
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
              <Text style={styles.lableText}> שם פרטי </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeFirst_name}
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
              <TextInput
                style={styles.input}
                onChangeText={onChangeGender}
                value={Gender}
                placeholder="מין"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>תאריך לידה</Text>
              <TextInput onFocus={onFocus}
                style={styles.input}
                value={text}
                placeholder="תאריך לידה"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>שם קודם: פרטי</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePrev_first_name}
                value={Prev_first_name}
                placeholder="שם קודם: פרטי"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>שם קודם: משפחה</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePrev_last_name}
                value={Prev_last_name}
                placeholder="שם קודם: משפחה"
              />
            </View>
            <TouchableOpacity onPress={() => PostPersonalForm()}>
              <View style={styles.button_normal}>
                <Text style={styles.button_text} >הבא</Text>
              </View>
            </TouchableOpacity>
            <Spiner loading={loading} />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="calendar"
                onChange={onChange}
              />
            )}
            {shouldShow ? (
              <Modal
                animationType="fade"
                transparent={true}
                visible={confirmModal}
                onRequestClose={() => {
                  console.log('Modal has been closed.');
                }}>
                <View style={styles.modal}>
                  <Text style={styles.modal_text}>האם תרצה/י לעדכן פרטיים אישיים לחץ על "כן", אחרת לחצ/י על "לא" </Text>
                  <View style={styles.modal_buttons}>
                    <TouchableHighlight
                      style={{ backgroundColor: '#4d5b70' }}
                      onPress={() => {
                        navigation.navigate("Welcome", { route: User });
                        setLoading(true);
                      }}>
                      <Text style={styles.modal_text}>לא</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={{ backgroundColor: '#4d5b70' }}
                      onPress={() => {
                        setShouldShow(false);
                      }}>
                      <Text style={styles.modal_text}>כן</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            ) : null}
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
    padding: 40,
    flex: 1,
    justifyContent: "center"
  },
  input: {
    width: 120,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  button_normal: {
    alignItems: 'center',
    width: 150,
    margin: 25,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    color: 'white'
  },
  HorizontalBox: {
    width: 280,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 12,
  },
  lableText: {
    marginTop: 17,
    fontWeight: 'bold'
  },
  modal: {
    width: 350,
    backgroundColor: '#757c94',
    alignSelf: 'center',
  },
  modal_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 15,
  },
  modal_text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
    padding: 2,
    opacity: 1,
    shadowColor: 'black',
    shadowRadius: 5,
  }
});
