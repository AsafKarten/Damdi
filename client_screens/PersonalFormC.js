import React, { useEffect,useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Button, CheckBox, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Spiner from '../Componentes/Spiner';
import AsyncStorage from '@react-native-async-storage/async-storage';


const url = "http://proj13.ruppin-tech.co.il/"

//Personal_id:"204610620",First_name:"אסף",Last_name:"קרטן",Phone:"0549214258",Gender:"ז" ,Birthdate:"03.03.1993" ,Prev_first_name:"" ,Prev_last_name:"",City:"ranana", Address:"hertzel 101", Postal_code:"3355", Mail_box:"3", Telephone:"0549214258", Work_telephone:"",Blood_group_member:False, Personal_insurance:False, Confirm_examination:True, Agree_future_don:True, Birth_land:"ישראל", Aliya_year:"", Father_birth_land:"ישראל", Mother_birth_land:"ישראל"
//Blood_group_member:False, Personal_insurance:False, Confirm_examination:True, Agree_future_don:True, Birth_land:"ישראל", Aliya_year:"", Father_birth_land:"ישראל", Mother_birth_land:"ישראל"

export default function PersonalFormC({ navigation, route }) {

  const [User, setUser] = useState(null)
  const [loading, setLoading] = useState(false);
  const [Blood_group_member, onChangeBlood_group_member] = useState(route.params.route.Blood_group_member);
  const [Personal_insurance, onChangePersonal_insurance] = useState(route.params.route.Personal_insurance);
  const [Confirm_examination, onChangeConfirm_examination] = useState(route.params.route.Agree_future_don);
  const [Agree_future_don, onChangeAgree_future_don] = useState(route.params.route.Agree_future_don);
  const [Birth_land, onChangeBirth_land] = useState(route.params.route.Birth_land);
  const [Aliya_year, onChangeAliya_year] = useState(route.params.route.Aliya_year);
  const [Father_birth_land, onChangeFather_birth_land] = useState(route.params.route.Father_birth_land);
  const [Mother_birth_land, onChangeMother_birth_land] = useState(route.params.route.Mother_birth_land);


  useEffect(() => {
    (async () => {
      setUser(route.params.route)
    })()
  }, [])

  const PostPersonalFormC = async () => {
    if (Birth_land == '') {
      Alert.alert('אנא מלא/י את כל הפרטים בבקשה (אם לא עלית מארץ אחרת לא חובה למלא, אם ההורים לא עלו מארץ אחרת לא חובה למלא גם כן)')
      return
    }
    setLoading(true);
    User.Blood_group_member = Blood_group_member
    User.Personal_insurance = Personal_insurance
    User.Confirm_examination = Confirm_examination
    User.Agree_future_don = Agree_future_don
    User.Birth_land = Birth_land
    User.Aliya_year = Aliya_year
    User.Father_birth_land = Father_birth_land
    User.Mother_birth_land = Mother_birth_land
    await postDataToDB()
    navigation.navigate('Welcome', { route: User })
  }

  const postDataToDB = async () => {
    try {
      let result = await fetch(url + "api/info/new", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: User.Personal_id,
          First_name: User.First_name,
          Last_name: User.Last_name,
          Phone: User.Phone,
          Gender: User.Gender,
          Birthdate: User.Birthdate,
          Prev_first_name: User.Prev_first_name,
          Prev_last_name: User.Prev_last_name,
          City: User.City,
          Address: User.Address,
          Postal_code: User.Postal_code,
          Mail_box: User.Mail_box,
          Telephone: User.Telephone,
          Work_telephone: User.Work_telephone,
          Blood_group_member: User.Blood_group_member,
          Personal_insurance: User.Personal_insurance,
          Confirm_examination: User.Confirm_examination,
          Agree_future_don: User.Agree_future_don,
          Birth_land: User.Birth_land,
          Aliya_year: User.Aliya_year,
          Father_birth_land: User.Father_birth_land,
          Mother_birth_land: User.Mother_birth_land
        })
      })
      let respone = await result.json()
      console.log('====================================');
      console.log(respone);
      console.log('====================================');
    } catch (error) {
      console.log('error with the send data to server ')
    }

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
              <TouchableOpacity onPress={() => PostPersonalFormC()}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >סיום</Text>
                </View>
              </TouchableOpacity>
              <Spiner loading={loading} />
              <TouchableOpacity onPress={() => navigation.navigate('PersonalFormB')}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >חזרה</Text>
                </View>
              </TouchableOpacity>
            </View>
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
