import React, { useState, useEffect } from 'react';
import { View, Alert, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';


export default function MedicalInfo({ navigation, route }) {
  const [Donator, onChangeDonator] = useState(route.params.route.Donator)
  const [donor, onChangeDonor] = useState(route.params.route.Donor);
  const [showText, setShowText] = useState(false);
  const [textInput, onChangeTextInput] = useState()

  const [MedicalForm, onChangeMedicalForm] = useState({
    "Q3_1": true,
    "Q3_10": false,
    "Q3_11": false,
    "Q3_12": false,
    "Q3_13": false,
    "Q3_14": false,
    "Q3_15": false,
    "Q3_16": false,
    "Q3_17": false,
    "Q3_18": false,
    "Q3_19": false,
    "Q3_2": false,
    "Q3_20": false,
    "Q3_21": false,
    "Q3_3": false,
    "Q3_4": false,
    "Q3_5": false,
    "Q3_7": false,
    "Q3_8": false,
    "Q3_9": false,
  })
  const Route = { Donator: Donator, Donor: donor }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        console.log(donor);
        console.log(Donator);
      }
    })()
  }, [])

  //TODO: Save notes to DB to MedicalInfoDonator
  const saveNotes = async () => {
    try {
      setShowText(false)
      Alert.alert("ההערות נשמרו בהצלחה")
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.infoBox}>
              <Text style={styles.textStyle}>{donor.First_name + " " + donor.Last_name}</Text>
              <Text style={styles.textStyle}>{donor.Personal_id}</Text>
              <Text style={styles.textStyle}>{MedicalForm.Q3_1 ? (" כן") : " לא"} בריא וחש בטוב</Text>
              <Text style={styles.textStyle}>{MedicalForm.Q3_2 ? (" כן") : " לא"} קיבלתי עירוי דם/מרכבי דם ב- 6 החודשים האחרונים</Text>
              <Text style={styles.textStyle}>{MedicalForm.Q3_3 ? (" כן") : " " + " לא "}נטלתי תרופות בחודש האחרון (כולל משככי כאבים, אספירין, ברזל וויטמינים).</Text>
              <Text style={styles.textStyle}>{MedicalForm.Q3_4 ? (" כן") : " לא"} קיבלתי חיסונים בחודש האחרון</Text>
              <Text style={styles.textStyle}>{MedicalForm.Q3_5 ? (" כן") : " לא"} עברתי טיפול שיניים נרחב ב- 7 הימים האחרונים</Text>
            </View>
            <View style={styles.notes_container}>
              <TouchableOpacity onPress={() => setShowText(true)}>
                <View style={styles.button_normal}>
                  <FontAwesome5 name="notes-medical" size={26} color="white" />
                  <Text style={styles.button_text} >הוסף הערות</Text>
                </View>
              </TouchableOpacity>
            </View>
            {showText &&
              <View style={styles.notes_container}>
                <TextInput
                  style={styles.input}
                  onChangeText={() => onChangeTextInput}
                  value={textInput}
                  placeholder="פרט/י"
                />
                <TouchableOpacity onPress={() => saveNotes()}>
                  <View style={styles.button_save_note}>
                    <AntDesign name="addfile" size={26} color="white" />
                    <Text style={styles.button_text} >שמור הערות</Text>
                  </View>
                </TouchableOpacity>
              </View>}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  inner: {
    justifyContent: "center",
  },
  infoBox: {
    height: 350,
    padding: 20,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'right',
  },
  button_normal: {
    alignItems: 'center',
    width: 150,
    height: 60,
    margin: 15,
    marginTop: 5,
    marginLeft: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  button_save_note: {
    alignItems: 'center',
    width: 120,
    height: 60,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
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
  notes_container: {
    alignItems: 'center',
  }
})