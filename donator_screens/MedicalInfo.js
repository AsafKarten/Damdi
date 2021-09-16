import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import BG from '../assets/DAMDI_White_BG.jpg'


const url = "http://proj13.ruppin-tech.co.il/"
export default function MedicalInfo({ navigation, route }) {
    const [Donator, onChangeDonator] = useState(route.params.route.Donator)
    const [donor, onChangeDonor] = useState(route.params.route.Donor);
    const[MedicalForm, onChangeMedicalForm] = useState({
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
    "Q3_9": false,})
    const Route = {Donator:Donator, Donor:donor}

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
             console.log(donor);
             console.log(Donator);
            }
        })()
    }, [])

    return (
        <SafeAreaView>
    <View style={styles.container}>
        <Text>{donor.First_name + " " + donor.Last_name}</Text>
        <Text>{donor.Personal_id}</Text>
        <Text>{MedicalForm.Q3_1?(" כן"):" לא"} בריא וחש בטוב</Text>
        <Text>{MedicalForm.Q3_2?(" כן"):" לא"} קיבלתי עירוי דם/מרכבי דם ב- 6 החודשים האחרונים</Text>
        <Text>{MedicalForm.Q3_3?(" כן"):" "+" לא "}נטלתי תרופות בחודש האחרון (כולל משככי כאבים, אספירין, ברזל וויטמינים).</Text>
        <Text>{MedicalForm.Q3_4?(" כן"):" לא"} קיבלתי חיסונים בחודש האחרון</Text>
        <Text>{MedicalForm.Q3_5?(" כן"):" לא"} עברתי טיפול שיניים נרחב ב- 7 הימים האחרונים</Text>
    
    </View>
        <TouchableOpacity onPress={() => navigation.navigate('UnitOne', { route: Donator })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >אישור תורם</Text>
          </View>
        </TouchableOpacity>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button_normal: {
        alignItems: 'center',
        width: 90,
        height: 90,
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
})