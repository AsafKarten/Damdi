import React, { useState } from 'react';
import Spiner from '../Componentes/Spiner';
import { url } from '../Utils';
import { View, ScrollView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Switch, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

export default function MedicalForm({ navigation, route }) {
  const [User, onChangeUser] = useState(route.params.route);
  const [loading, setLoading] = useState(false);

  const [Q3_1, onChangeQ3_1] = useState(false)
  const togglenonChangeQ3_1 = () => onChangeQ3_1(previousState => !previousState);
  const [Q3_2, onChangeQ3_2] = useState(false)
  const togglenonChangeQ3_2 = () => onChangeQ3_2(previousState => !previousState);
  const [Q3_3, onChangeQ3_3] = useState(false)
  const togglenonChangeQ3_3 = () => onChangeQ3_3(previousState => !previousState);
  const [Q3_4, onChangeQ3_4] = useState(false)
  const togglenonChangeQ3_4 = () => onChangeQ3_4(previousState => !previousState);
  const [Q3_5, onChangeQ3_5] = useState(false)
  const togglenonChangeQ3_5 = () => onChangeQ3_5(previousState => !previousState);
  const [Q3_6, onChangeQ3_6] = useState(false)
  const togglenonChangeQ3_6 = () => onChangeQ3_6(previousState => !previousState);
  const [Q3_7, onChangeQ3_7] = useState(false)
  const togglenonChangeQ3_7 = () => onChangeQ3_7(previousState => !previousState);
  const [Q3_8, onChangeQ3_8] = useState(false)
  const togglenonChangeQ3_8 = () => onChangeQ3_8(previousState => !previousState);
  const [Q3_9, onChangeQ3_9] = useState(false)
  const togglenonChangeQ3_9 = () => onChangeQ3_9(previousState => !previousState);
  const [Q3_10, onChangeQ3_10] = useState(false)
  const togglenonChangeQ3_10 = () => onChangeQ3_10(previousState => !previousState);
  const [Q3_11, onChangeQ3_11] = useState(false)
  const togglenonChangeQ3_11 = () => onChangeQ3_11(previousState => !previousState);
  const [Q3_12, onChangeQ3_12] = useState(false)
  const togglenonChangeQ3_12 = () => onChangeQ3_12(previousState => !previousState);
  const [Q3_13, onChangeQ3_13] = useState(false)
  const togglenonChangeQ3_13 = () => onChangeQ3_13(previousState => !previousState);
  const [Q3_14, onChangeQ3_14] = useState(false)
  const togglenonChangeQ3_14 = () => onChangeQ3_14(previousState => !previousState);
  const [Q3_15, onChangeQ3_15] = useState(false)
  const togglenonChangeQ3_15 = () => onChangeQ3_15(previousState => !previousState);
  const [Q3_16, onChangeQ3_16] = useState(false)
  const togglenonChangeQ3_16 = () => onChangeQ3_16(previousState => !previousState);
  const [Q3_17, onChangeQ3_17] = useState(false)
  const togglenonChangeQ3_17 = () => onChangeQ3_17(previousState => !previousState);
  const [Q3_18, onChangeQ3_18] = useState(false)
  const togglenonChangeQ3_18 = () => onChangeQ3_18(previousState => !previousState);
  const [Q3_19, onChangeQ3_19] = useState(false)
  const togglenonChangeQ3_19 = () => onChangeQ3_19(previousState => !previousState);
  const [Q3_20, onChangeQ3_20] = useState(false)
  const togglenonChangeQ3_20 = () => onChangeQ3_20(previousState => !previousState);
  const [Q3_21, onChangeQ3_21] = useState(false)
  const togglenonChangeQ3_21 = () => onChangeQ3_21(previousState => !previousState);

  const [notes, onChangeNotes] = useState("")
  const [textInput, onChangeTextInput] = useState()

  const AddToNotes = (str) => {
    if (textInput == "" || textInput == null) {
      return
    }
    else {
      str = str + ":" + textInput
      notes.concat(str)
      onChangeTextInput("")
    }


  }
  const inserMedicalInfoDonation = async () => {
    try {
      if (Platform.OS !== 'web') {
        setLoading(true);
      }
      let today = new Date()
      let result = await fetch(url + "api/post/info/medical", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: route.params.route.Personal_id,
          Answer_date: today,
          Q3_1: Q3_1,
          Q3_2: Q3_2,
          Q3_3: Q3_3,
          Q3_4: Q3_4,
          Q3_5: Q3_5,
          Q3_7: Q3_7,
          Q3_8: Q3_8,
          Q3_9: Q3_9,
          Q3_10: Q3_10,
          Q3_11: Q3_11,
          Q3_12: Q3_12,
          Q3_13: Q3_13,
          Q3_14: Q3_14,
          Q3_15: Q3_15,
          Q3_16: Q3_16,
          Q3_17: Q3_17,
          Q3_18: Q3_18,
          Q3_19: Q3_19,
          Q3_20: Q3_20,
          Q3_21: Q3_21,
          Notes: notes
        })
      })
      let response = await result.json()
      console.log(response);
      setLoading(false);
      await navigation.navigate('ValidationForm', { route: User })
    } catch (error) {
      console.log('error with the send data to server ')
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={styles.inner}>
              <View style={styles.Qcontainer}>
                <Text  style={styles.textBox}>?????? ?????? ???????????? ?????????? ????,     ???????????? ???????????????? ???????????? ???????? ???? ?????? ?????????????? !</Text>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>?????? ????????/?? ?????? ???????? ????????</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_1}
                    value={Q3_1}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>???????????? ?????????? ????/?????????? ???? ??- 6 ?????????????? ????????????????</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_2}
                    value={Q3_2}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>?????????? ???????????? ?????????? ???????????? (???????? ?????????? ??????????, ??????????????, ???????? ??????????????????).??????/??</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_3}
                    value={Q3_3}
                  />
                </View>

                <TextInput
                  style={styles.input}
                  onChangeText={() => onChangeTextInput}
                  value={textInput}
                  placeholder="??????/??"
                />
                <TouchableOpacity onPress={() => AddToNotes("???????? 3.3")}>
                  <View style={styles.button_normal}>
                    <Text style={styles.button_text} >??????/??</Text>
                  </View>
                </TouchableOpacity>

              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>???????????? ?????????????? ?????????? ????????????.
                    ??????/??.
                  </Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_4}
                    value={Q3_4}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={() => onChangeTextInput}
                  value={textInput}
                  placeholder="??????/??"
                />
                <TouchableOpacity onPress={() => AddToNotes("???????? 3.4")}>
                  <View style={styles.button_normal}>
                    <Text style={styles.button_text} >??????/??</Text>
                  </View>
                </TouchableOpacity>

              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>?????????? ?????????? ???????????? ???????? ??- 7 ?????????? ????????????????</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_5}
                    value={Q3_5}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>???????????? ?????????? ?????? ???????? ??/???? ???????? ??- 12 ?????????????? ????????????????</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_6}
                    value={Q3_6}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>???????? ???????????? ???????? ?????????? ?????? ?????????? (????????) ??- 6 ?????????????? ????????????????</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_7}
                    value={Q3_7}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>?????????? ?????????? ?????? (????????).
                    ??????/?? ????????
                  </Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_8}
                    value={Q3_8}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={() => onChangeTextInput}
                  value={textInput}
                  placeholder="??????/??"
                />
                <TouchableOpacity onPress={() => AddToNotes("???????? 3.8")}>
                  <View style={styles.button_normal}>
                    <Text style={styles.button_text} >??????/??</Text>
                  </View>
                </TouchableOpacity>

              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>?????????? ??????????/?????????????????? ?????????????? ????????????????</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_9}
                    value={Q3_9}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>?????????? ?????????? ????????, ?????????? ???????????????????? ???? ??????????????, ?????????? ????????, ?????????? ????????, ???????? ????????, ?????????????? ???? ???????????? ???????? ???????? ???????????? ??- 6 ?????????????? ????????????????</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_10}
                    value={Q3_10}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>?????? ????????/?? ???????????? ????????????, ???????? ????????, ?????????? ????????, ??????.</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_11}
                    value={Q3_11}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>???????????? ??????"?? ??- 12 ?????????????? ???????????????? ?????? ?????????? ??????????.
                  </Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_12}
                    value={Q3_12}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={() => onChangeTextInput}
                  value={textInput}
                  placeholder="??????/??"
                />
                <TouchableOpacity onPress={() => AddToNotes("???????? 3.12")}>
                  <View style={styles.button_normal}>
                    <Text style={styles.button_text} >??????/??</Text>
                  </View>
                </TouchableOpacity>

              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>???????? ?????? 6 ???????????? ???????? ?????????? ?????????? ???? ?????????? ???????????? ??- 3 ?????????? ????????????????.</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_13}
                    value={Q3_13}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>?????????? ?????????? ???????????? ???????? ???????? ?????????? ??????????, ?????????? ???????? ??????'.</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_14}
                    value={Q3_14}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>?????? ???????? ??????????, ???????? ???? ???? ????????????????.</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_15}
                    value={Q3_15}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>?????????? ?????????? ??????????
                    ??????/??
                  </Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_16}
                    value={Q3_16}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={() => onChangeTextInput}
                  value={textInput}
                  placeholder="??????/??"
                />
                <TouchableOpacity onPress={() => AddToNotes("???????? 3.16")}>
                  <View style={styles.button_normal}>
                    <Text style={styles.button_text} >??????/??</Text>
                  </View>
                </TouchableOpacity>

              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>????/ ?????????? ???? ???????? ???????????????? ???????? (?????????? ???? ????????????)
                    ??????/??
                  </Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_17}
                    value={Q3_17}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={() => onChangeTextInput}
                  value={textInput}
                  placeholder="??????/??"
                />
                <TouchableOpacity onPress={() => AddToNotes("???????? 3.17")}>
                  <View style={styles.button_normal}>
                    <Text style={styles.button_text} >??????/??</Text>
                  </View>
                </TouchableOpacity>

              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>???????????? ???? ?????? ????"?? ???? ??- 2 ?????????????? ????????????????.</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_18}
                    value={Q3_18}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>???????????? ??????"?? ??- 28 ?????????? ????????????????
                    ??????/?? ?????????? ??????????
                  </Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_19}
                    value={Q3_19}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={() => onChangeTextInput}
                  value={textInput}
                  placeholder="??????/??"
                />
                <TouchableOpacity onPress={() => AddToNotes("???????? 3.19")}>
                  <View style={styles.button_normal}>
                    <Text style={styles.button_text} >??????/??</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>??????????: ?????? ???? ?????????????</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_20}
                    value={Q3_20}
                  />
                </View>
              </View>
              <View style={styles.Qcontainer}>
                <View style={styles.HorizontalBox}>
                  <Text style={styles.textBox}>??????????: ?????? ???????? ???????????? ?????? ???????????? ?????????????</Text>
                  <Switch
                    onValueChange={togglenonChangeQ3_21}
                    value={Q3_21}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={() => inserMedicalInfoDonation()}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >????????</Text>
                </View>
              </TouchableOpacity>
              {loading && <Spiner loading={loading} />}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    padding: 40,
    flex: 1,
    justifyContent: "space-between",
  },
  questuonBox: {

  },
  checkbox: {
    marginRight: 5,
    alignItems: "center",
  },
  Qcontainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  HorizontalBox: {
    alignSelf: 'center',
    width: 345,
    flexDirection: 'row-reverse',
    padding: 45,
    marginTop: 22,
    justifyContent: 'space-between',
  },
  textBox: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  HorizontalBoxButtons: {
    flexDirection: 'row',
  },
  input: {
    width: 300,
    height: 40,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  button_normal: {
    alignItems: 'center',
    width: 160,
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
  }
});