import React, { useEffect, useState } from 'react';
import { View, Switch, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Spiner from '../Componentes/Spiner';
import { url } from '../Utils';


export default function PersonalFormC({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [showCountriesList, setShowCountriesList] = useState();

  const [User, setUser] = useState(route.params.route)

  const [bloodGroupMember, setBloodGroupMember] = useState(false);
  const toggleGroupMember = () => setBloodGroupMember(previousState => !previousState);
  const [personalInsurance, setPersonalInsurance] = useState(false);
  const togglePersonalInsurance = () => setPersonalInsurance(previousState => !previousState);
  const [confirmExamination, setConfirmExamination] = useState(false);
  const toggleConfirmExamination = () => setConfirmExamination(previousState => !previousState);
  const [agreeFutureDonation, setAgreeFutureDonation] = useState(false);
  const toggleAgreeFutureDonation = () => setAgreeFutureDonation(previousState => !previousState);


  const [countries, setCountries] = useState([])
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
  }, [navigation])


  const serachCountry = async (q) => {
    let url = `https://data.gov.il/api/3/action/datastore_search?resource_id=c84082e9-7d45-4853-9a95-e7eaad7f66d5&q=${q}`
    let res = await fetch(url);
    let data = await res.json();
    setCountries(data.result.records)
  }

  const onFocusCountries = () => {
    setShowCountriesList(true);
    setCountries([])
  }

  useEffect(() => {
    serachCountry(birthLand)
  }, [birthLand])


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
      Alert.alert('?????? ??????/?? ???? ???? ???????????? ?????????? (???? ???? ???????? ???????? ???????? ???? ???????? ????????, ???? ???????????? ???? ?????? ???????? ???????? ???? ???????? ???????? ???? ????)')
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
    var UserC = {
      Personal_id: route.params.route.Personal_id, First_name: route.params.route.First_name, Last_name: route.params.route.Last_name, Phone: route.params.route.Phone, Gender: route.params.route.Gender, Birthdate: route.params.route.Birthdate, Prev_first_name: route.params.route.Prev_first_name, Prev_last_name: route.params.route.Prev_last_name,
      City: route.params.route.City, Address: route.params.route.Address, Postal_code: route.params.route.Postal_code, Mail_box: route.params.route.Mail_box, Telephone: route.params.route.Telephone, Work_telephone: route.params.route.Work_telephone,
      Blood_group_member: bloodGroupMember, Personal_insurance: personalInsurance, Confirm_examination: confirmExamination, Agree_future_don: agreeFutureDonation, Birth_land: birthLand, Aliya_year: aliyaYear, Father_birth_land: fatherBirthLand, Mother_birth_land: motherBirthLand
    }
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
              <Text style={styles.lableText}>?????? ?????????? ?????????? ?????</Text>
              <Switch
                trackColor={{ false: "#", true: "#" }}
                thumbColor={confirmExamination ? "#" : "#"}
                onValueChange={toggleGroupMember}
                value={bloodGroupMember}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>?????????? ????????</Text>
              <Switch
                trackColor={{ false: "#", true: "#" }}
                thumbColor={confirmExamination ? "#" : "#"}
                onValueChange={togglePersonalInsurance}
                value={personalInsurance}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>?????????? ???????????? ????????????????</Text>
              <Switch
                trackColor={{ false: "#", true: "#" }}
                thumbColor={confirmExamination ? "#" : "#"}
                onValueChange={toggleConfirmExamination}
                value={confirmExamination}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>?????????? ?????????? ???????????? ?????????? ???? ??????????</Text>
              <Switch
                trackColor={{ false: "#", true: "#" }}
                thumbColor={confirmExamination ? "#" : "#"}
                onValueChange={toggleAgreeFutureDonation}
                value={agreeFutureDonation}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>?????? ????????</Text>
              <TextInput
                onFocus={onFocusCountries}
                style={styles.input}
                onChangeText={setBirthLand}
                value={birthLand}
                placeholder="?????? ????????"
              />
            </View>
            <View style={styles.container_state_list}>
              {countries.length > 0 ? countries.map(item =>
                <TouchableOpacity onPress={() => {
                  setBirthLand(item["????_??????"])
                  setShowCountriesList(false)
                }} >
                  {showCountriesList &&
                    <View style={styles.button_state_list}>
                      <Text style={styles.text_state_list}>{item["????_??????"]}</Text>
                    </View>}
                </TouchableOpacity>)
                : null}
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>?????? ????????</Text>
              <TextInput
                style={styles.input}
                onChangeText={setAliyaYear}
                value={aliyaYear}
                placeholder="?????? ????????"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>?????? ???????? ????</Text>
              <TextInput
                style={styles.input}
                onChangeText={setFatherBirthLand}
                value={fatherBirthLand}
                placeholder="?????? ???????? ????"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>?????? ???????? ????</Text>
              <TextInput
                style={styles.input}
                onChangeText={setMotherBirthLand}
                value={motherBirthLand}
                placeholder="?????? ???????? ????"
              />
            </View>
            <View style={styles.HorizontalBoxButtons}>
              <TouchableOpacity onPress={() => {
                setLoading(false)
                PostPersonalFormC()
              }}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >????????</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>
                navigation.navigate('PersonalFormB')
              }>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >????????</Text>
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
    height: 35,
    width: 160,
    margin: 10,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  switch: {
    alignSelf: "center",
    marginRight: 8,
  },
  HorizontalBox: {
    width: 315,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 15,
  },
  HorizontalBoxButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50, 
  },
  lableText: {
    marginTop: 14,
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
  container_state_list: {
    marginRight: 120,
  },
  button_state_list: {
    borderWidth: 2
  },
  text_state_list: {
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
  }
});
