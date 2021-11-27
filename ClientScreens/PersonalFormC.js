import React, { useEffect, useState } from 'react';
import { View, Switch, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Spiner from '../Componentes/Spiner';
import { url } from '../Utils';


export default function PersonalFormC({ navigation, route }) {
  const [loading, setLoading] = useState(false);

  const [User, setUser] = useState(route.params.route)

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
    setBloodGroupMember(User.Blood_group_member)
    setPersonalInsurance(User.Personal_insurance)
    setConfirmExamination(User.Confirm_examination)
    setAgreeFutureDonation(User.Agree_future_don)
    setBirthLand(User.Birth_land)
    setAliyaYear(User.Aliya_year)
    setFatherBirthLand(User.Father_birth_land)
    setMotherBirthLand(User.Mother_birth_land)
  }, [])

  const postDataToDB = async (UserC) => {
    console.log(UserC);
    try {
      let result = await fetch(url + "api/info/new", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: UserC.Personal_id,
          First_name: UserC.First_name,
          Last_name: UserC.Last_name,
          Phone: UserC.Phone,
          Gender: UserC.Gender,
          Birthdate: UserC.Birthdate,
          Prev_first_name: UserC.Prev_first_name,
          Prev_last_name: UserC.Prev_last_name,
          City: UserC.City,
          Address: UserC.Address,
          Postal_code: UserC.Postal_code,
          Mail_box: UserC.Mail_box,
          Telephone: UserC.Telephone,
          Work_telephone: UserC.Work_telephone,
          Blood_group_member: UserC.Blood_group_member,
          Personal_insurance: UserC.Personal_insurance,
          Confirm_examination: UserC.Confirm_examination,
          Agree_future_don: UserC.Agree_future_don,
          Birth_land: UserC.Birth_land,
          Aliya_year: UserC.Aliya_year,
          Father_birth_land: UserC.Father_birth_land,
          Mother_birth_land: UserC.Mother_birth_land
        })
      })
      let respone = await result.json()
      console.log("FormC 72", respone);
    } catch (error) {
      console.log('error with the send data to server ')
    }
  }

  const PostPersonalFormC = async () => {
    if (Platform.OS !== 'web') {
      setLoading(true);
    }
    if (birthLand === "") {
      setLoading(false);
      Alert.alert('אנא מלא/י את כל הפרטים בבקשה (אם לא עלית מארץ אחרת לא חובה למלא, אם ההורים לא עלו מארץ אחרת לא חובה למלא גם כן)')
      return
    }
    User.Blood_group_member = bloodGroupMember
    User.Personal_insurance = personalInsurance
    User.Confirm_examination = confirmExamination
    User.Agree_future_don = agreeFutureDonation
    User.Birth_land = birthLand
    User.Aliya_year = aliyaYear
    User.Father_birth_land = fatherBirthLand
    User.Mother_birth_land = motherBirthLand
    var UserC = {Personal_id : route.params.route.Personal_id, First_name : route.params.route.First_name, Last_name: route.params.route.Last_name,Phone:route.params.route.Phone, Gender : route.params.route.Gender, Birthdate: route.params.route.Birthdate, Prev_first_name: route.params.route.Prev_first_name, Prev_last_name: route.params.route.Prev_last_name,
      City: route.params.route.City, Address: route.params.route.Address, Postal_code: route.params.route.Postal_code, Mail_box: route.params.route.Mail_box, Telephone: route.params.route.Telephone, Work_telephone: route.params.route.Work_telephone,
      Blood_group_member: bloodGroupMember, Personal_insurance: personalInsurance, Confirm_examination: confirmExamination, Agree_future_don: agreeFutureDonation, Birth_land: birthLand, Aliya_year: aliyaYear, Father_birth_land: fatherBirthLand, Mother_birth_land:motherBirthLand }
    await postDataToDB(UserC)
    setLoading(false)
    navigation.navigate('Welcome', { route: User })
  }



  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.HorizontalBox}>
              <Text>חבר ארגון תורמי דם?</Text>
              <Switch
                trackColor={{ false: "#", true: "#" }}
                thumbColor={confirmExamination ? "#" : "#"}
                onValueChange={toggleGroupMember}
                value={bloodGroupMember}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text>ביטוח אישי</Text>
              <Switch
                trackColor={{ false: "#", true: "#" }}
                thumbColor={confirmExamination ? "#" : "#"}
                onValueChange={togglePersonalInsurance}
                value={personalInsurance}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text>מסכים לשימוש בניסויים</Text>
              <Switch
                trackColor={{ false: "#", true: "#" }}
                thumbColor={confirmExamination ? "#" : "#"}
                onValueChange={toggleConfirmExamination}
                value={confirmExamination}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text>מסכים לקבלת הזמנות לתרום דם בעתיד</Text>
              <Switch
                trackColor={{ false: "#", true: "#" }}
                thumbColor={confirmExamination ? "#" : "#"}
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
              <TouchableOpacity onPress={() => {
                setLoading(false)
                PostPersonalFormC()
              }}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >סיום</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>
                navigation.navigate('PersonalFormB')
              }>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >חזרה</Text>
                </View>
              </TouchableOpacity>
              {loading && <Spiner loading={loading} />}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
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
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
});
