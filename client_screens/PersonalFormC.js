import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Button, CheckBox, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Spiner from '../Componentes/Spiner';
import AsyncStorage from '@react-native-async-storage/async-storage';


const url = "http://proj13.ruppin-tech.co.il/"

//Personal_id:"204610620",First_name:"אסף",Last_name:"קרטן",Phone:"0549214258",Gender:"ז" ,Birthdate:"03.03.1993" ,Prev_first_name:"" ,Prev_last_name:"",City:"ranana", Address:"hertzel 101", Postal_code:"3355", Mail_box:"3", Telephone:"0549214258", Work_telephone:"",Blood_group_member:False, Personal_insurance:False, Confirm_examination:True, Agree_future_don:True, Birth_land:"ישראל", Aliya_year:"", Father_birth_land:"ישראל", Mother_birth_land:"ישראל"
//Blood_group_member:False, Personal_insurance:False, Confirm_examination:True, Agree_future_don:True, Birth_land:"ישראל", Aliya_year:"", Father_birth_land:"ישראל", Mother_birth_land:"ישראל"

export default function PersonalFormC({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [Blood_group_member, onChangeBlood_group_member] = useState(route.params.route.Blood_group_member);
  const [Personal_insurance, onChangePersonal_insurance] = useState(route.params.route.Personal_insurance);
  const [Confirm_examination, onChangeConfirm_examination] = useState(route.params.route.Agree_future_don);
  const [Agree_future_don, onChangeAgree_future_don] = useState(route.params.route.Agree_future_don);
  const [Birth_land, onChangeBirth_land] = useState(route.params.route.Birth_land);
  const [Aliya_year, onChangeAliya_year] = useState(route.params.route.Aliya_year);
  const [Father_birth_land, onChangeFather_birth_land] = useState(route.params.route.Father_birth_land);
  const [Mother_birth_land, onChangeMother_birth_land] = useState(route.params.route.Mother_birth_land);

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

  const PostPersonalForm3 = async () => {
    setLoading(true);
    const new_route = route.params.route
    new_route.Blood_group_member = Blood_group_member
    new_route.Personal_insurance = Personal_insurance
    new_route.Confirm_examination = Confirm_examination
    new_route.Agree_future_don = Agree_future_don
    new_route.Birth_land = Birth_land
    new_route.Aliya_year = Aliya_year
    new_route.Father_birth_land = Father_birth_land
    new_route.Mother_birth_land = Mother_birth_land
    await clearAsyncStorage()
    await storeData(new_route)
    setLoading(false);
    navigation.navigate('Welcome', { route: new_route })
  }

  return (

    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.HorizontalBox}>
              <Text>חבר ארגון תורמי דם?</Text>
              <CheckBox
                value={Blood_group_member}
                onValueChange={onChangeBlood_group_member}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text>ביטוח אישי</Text>
              <CheckBox
                value={Personal_insurance}
                onValueChange={onChangePersonal_insurance}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text>מסכים לשימוש בניסויים</Text>
              <CheckBox
                value={Confirm_examination}
                onValueChange={onChangeConfirm_examination}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text>מסכים לקבלת הזמנות לתרום דם בעתיד</Text>
              <CheckBox
                value={Agree_future_don}
                onValueChange={onChangeAgree_future_don}
                style={styles.checkbox}
              />
            </View>

            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>ארץ לידה</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeBirth_land}
                value={Birth_land}
                placeholder="ארץ לידה"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>שנת עליה</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeAliya_year}
                value={Aliya_year}
                placeholder="שנת עליה"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>ארץ לידת אב</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeFather_birth_land}
                value={Father_birth_land}
                placeholder="ארץ לידת אב"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>ארץ לידת אם</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeMother_birth_land}
                value={Mother_birth_land}
                placeholder="ארץ לידת אם"
              />
            </View>
            <View style={styles.HorizontalBoxButtons}>
              <TouchableOpacity onPress={() => PostPersonalForm3(
                Blood_group_member,
                Personal_insurance,
                Confirm_examination,
                Agree_future_don,
                Birth_land,
                Aliya_year,
                Father_birth_land,
                Mother_birth_land
              )}>

                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >סיום</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('PersonalFormB')}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >חזרה</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Spiner loading={loading} />
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
  checkbox: {
    alignSelf: "center",
    marginRight: 8,
  },
  HorizontalBox: {
    width: 280,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 12,
  },
  HorizontalBoxButtons: {
    flexDirection: 'row',
  },
  lableText: {
    marginTop: 17,
    fontWeight: 'bold'
  },
  button_normal: {

    alignItems: 'center',
    width: 80,
    margin: 15,
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
});
