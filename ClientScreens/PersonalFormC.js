import React, { useEffect, useState } from 'react';
import { View, Switch, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Spiner from '../Componentes/Spiner';

const url = "http://proj13.ruppin-tech.co.il/"

export default function PersonalFormC({ navigation, route }) {
  
  const [User, setUser] = useState(route.params.route)
  console.log(User);
  const [loading, setLoading] = useState(false);
  const [bloodGroupMember, setBloodGroupMember] = useState(false);
  const toggleGroupMember = () => setBloodGroupMember(previousState => !previousState);
  const [personalInsurance, setPersonalInsurance] = useState(false);
  const togglePersonalInsurance = () => setPersonalInsurance(previousState => !previousState);
  const [confirmExamination, setConfirmExamination] = useState(false);
  const toggleConfirmExamination = () => setConfirmExamination(previousState => !previousState);
  const [agreeFutureDonation, setAgreeFutureDonation] = useState(false);
  const toggleAgreeFutureDonation = () => setAgreeFutureDonation(previousState => !previousState);
  const [birthLand, setBirthLand] = useState();
  const [aliyaYear, setAliyaYear] = useState();
  const [fatherBirthLand, setFatherBirthLand] = useState();
  const [motherBirthLand, setMotherBirthLand] = useState();


  useEffect(() => {
    (async () => {
      setBloodGroupMember(User.Blood_group_member)
      setPersonalInsurance(User.Personal_insurance)
      setConfirmExamination(User.Confirm_examination)
      setAgreeFutureDonation(User.Agree_future_don)
      setBirthLand(User.Birth_land)
      setAliyaYear(User.Aliya_year)
      setFatherBirthLand(User.Father_birth_land)
      setMotherBirthLand(User.Mother_birth_land)
    })()
  }, [])

  const PostPersonalFormC = async () => {
    if (birthLand == '') {
      Alert.alert('אנא מלא/י את כל הפרטים בבקשה (אם לא עלית מארץ אחרת לא חובה למלא, אם ההורים לא עלו מארץ אחרת לא חובה למלא גם כן)')
      return
    }
    setLoading(true);
    User.Blood_group_member = bloodGroupMember
    User.Personal_insurance = personalInsurance
    User.Confirm_examination = confirmExamination
    User.Agree_future_don = agreeFutureDonation
    User.Birth_land = birthLand
    User.Aliya_year = aliyaYear
    User.Father_birth_land = fatherBirthLand
    User.Mother_birth_land = motherBirthLand
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
      console.log(respone);
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
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={bloodGroupMember ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleGroupMember}
                value={bloodGroupMember}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text>ביטוח אישי</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={personalInsurance ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={togglePersonalInsurance}
                value={personalInsurance}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text>מסכים לשימוש בניסויים</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={confirmExamination ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleConfirmExamination}
                value={confirmExamination}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text>מסכים לקבלת הזמנות לתרום דם בעתיד</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={agreeFutureDonation ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleAgreeFutureDonation}
                value={agreeFutureDonation}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>ארץ לידה</Text>
              <TextInput
                style={styles.input}
                onChangeText={setBirthLand}
                value={birthLand}
                placeholder="ארץ לידה"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>שנת עליה</Text>
              <TextInput
                style={styles.input}
                onChangeText={setAliyaYear}
                value={aliyaYear}
                placeholder="שנת עליה"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>ארץ לידת אב</Text>
              <TextInput
                style={styles.input}
                onChangeText={setFatherBirthLand}
                value={fatherBirthLand}
                placeholder="ארץ לידת אב"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>ארץ לידת אם</Text>
              <TextInput
                style={styles.input}
                onChangeText={setMotherBirthLand}
                value={motherBirthLand}
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
  switch: {
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
