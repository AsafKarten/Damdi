import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';


export default function MedicalInfo({ navigation, route }) {
  const [Donator, onChangeDonator] = useState(route.params.route.Donator)
  const [donor, onChangeDonor] = useState(route.params.route.Donor);


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


  return (
    <SafeAreaView>
      <View style={styles.infoBox}>
        <Text style={styles.textStyle}>{donor.First_name + " " + donor.Last_name}</Text>
        <Text style={styles.textStyle}>{donor.Personal_id}</Text>
        <Text style={styles.textStyle}>{MedicalForm.Q3_1 ? (" כן") : " לא"} בריא וחש בטוב</Text>
        <Text style={styles.textStyle}>{MedicalForm.Q3_2 ? (" כן") : " לא"} קיבלתי עירוי דם/מרכבי דם ב- 6 החודשים האחרונים</Text>
        <Text style={styles.textStyle}>{MedicalForm.Q3_3 ? (" כן") : " " + " לא "}נטלתי תרופות בחודש האחרון (כולל משככי כאבים, אספירין, ברזל וויטמינים).</Text>
        <Text style={styles.textStyle}>{MedicalForm.Q3_4 ? (" כן") : " לא"} קיבלתי חיסונים בחודש האחרון</Text>
        <Text style={styles.textStyle}>{MedicalForm.Q3_5 ? (" כן") : " לא"} עברתי טיפול שיניים נרחב ב- 7 הימים האחרונים</Text>
      </View>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  infoBox: {
    height: 350,
    padding: 20,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'right',
  }
})