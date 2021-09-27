import React, { useState, useEffect } from 'react';
import { Modal, TouchableHighlight, View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Spiner from '../Componentes/Spiner';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Personal_id:"204610620",First_name:"אסף",Last_name:"קרטן",Phone:"0549214258",Gender:"ז" ,Birthdate:"03.03.1993" ,Prev_first_name:"" ,Prev_last_name:""

export default function PersonalFormA({ navigation, route }) {
  const [User, setUser] = useState(route.params.route)
  const [loading, setLoading] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [confirmModal, setConfirm] = useState(false);

  const [First_name, onChangeFirst_name] = useState(route.params.route.First_name);
  const [Last_name, onChangeLast_name] = useState(route.params.route.Last_name);
  const [Phone, onChangePhone] = useState(route.params.route.Phone);
  const [Gender, onChangeGender] = useState(route.params.route.Gender);
  const [Birthdate, onChangeBirthdate] = useState(route.params.route.Birthdate);
  const [Prev_first_name, onChangePrev_first_name] = useState(route.params.route.Prev_first_name);
  const [Prev_last_name, onChangePrev_last_name] = useState(route.params.route.Prev_last_name);


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        setShouldShow(true)
        setTimeout(() => {
          setConfirm(true)
        }, 500);
      }
    })()
  }, [])

  const storeData = async (data) => {
    try {
      var loggedUser = JSON.stringify(data);
      await AsyncStorage.setItem('loggedUser', loggedUser)
    } catch (e) {
      console.error(e)
    }
  }

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Done clear storage');
    } catch (error) {
      console.log(error);
    }
  }

  const PostPersonalForm = async () => {
    const new_route = User
    new_route.First_name = First_name
    new_route.Last_name = Last_name
    new_route.Phone = Phone
    new_route.Gender = Gender
    new_route.Birthdate = Birthdate
    new_route.Prev_first_name = Prev_first_name
    new_route.Prev_last_name = Prev_last_name
    await clearAsyncStorage()
    await storeData(new_route)
    console.log('====================================');
    console.log('new route', new_route);
    console.log('====================================');
    navigation.navigate('PersonalFormB', { route: new_route })
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
              <TextInput
                style={styles.input}
                onChangeText={onChangeBirthdate}
                value={Birthdate}
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

            {shouldShow ? (
              <Modal
                animationType="fade"
                transparent={true}
                visible={confirmModal}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
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
    justifyContent: "space-around"
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
