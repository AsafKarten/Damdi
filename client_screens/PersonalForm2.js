import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native';


const url = "http://proj13.ruppin-tech.co.il/"

//Personal_id:"204610620",First_name:"אסף",Last_name:"קרטן",Phone:"0549214258",Gender:"ז" ,Birthdate:"03.03.1993" ,Prev_first_name:"" ,Prev_last_name:"",City:"ranana", Address:"hertzel 101", Postal_code:"3355", Mail_box:"3", Telephone:"0549214258", Work_telephone:"",
//City:"ranana", Address:"hertzel 101", Postal_code:"3355", Mail_box:"3", Telephone:"0549214258", Work_telephone:"",

const PersonalFormScreen2 = ({ navigation, route }) => {

    const [City, onChangeCity] = useState(route.params.route.City);
    const [Address, onChangeAddress] = useState(route.params.route.Address);
    const [Postal_code, onChangePostal_code] = useState(route.params.route.Postal_code);
    const [Mail_box, onChangeMail_box] = useState(route.params.route.Mail_box);
    const [Telephone, onChangeTelephone] = useState(route.params.route.Telephone);
    const [Work_telephone, onChangeWork_telephone] = useState(route.params.route.Work_telephone);



    const PostPersonalForm2 = () => {
        const new_route = route.params.route
        new_route.City = City
        new_route.Address = Address
        new_route.Postal_code = Postal_code
        new_route.Mail_box = Mail_box
        new_route.Telephone = Telephone
        new_route.Work_telephone = Work_telephone
        navigation.navigate('PersonalForm3', {route: new_route})
    }


    return (

        <SafeAreaView style={styles.container}>

<View style={styles.HorizontalBox}>
                <Text style={styles.lableText}>עיר</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeCity}
                value={City}
                placeholder="עיר"
            />
            </View>
            <View style={styles.HorizontalBox}>
                <Text style={styles.lableText}>רחוב</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeAddress}
                value={Address}
                placeholder="רחוב"
            />
            </View>
            <View style={styles.HorizontalBox}>
                <Text style={styles.lableText}>מיקוד</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePostal_code}
                value={Postal_code}
                placeholder="מיקוד"
            />
            </View>
            <View style={styles.HorizontalBox}>
                <Text style={styles.lableText}>תיבת דואר</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeMail_box}
                value={Mail_box}
                placeholder="תיבת דואר"
            />
</View>
<View style={styles.HorizontalBox}>
                <Text style={styles.lableText}>מס טלפון</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTelephone}
                value={Telephone}
                placeholder="מס טלפון"
            />
            </View>
            <View style={styles.HorizontalBox}>
                <Text style={styles.lableText}>מס טלפון בעבודה</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeWork_telephone}
                value={Work_telephone}
                placeholder="מס טלפון בעבודה"
            />
            </View>
<View style={styles.HorizontalBoxButtons}>
<TouchableOpacity onPress={() => PostPersonalForm2()}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >הבא</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PersonalForm')} >
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >חזרה</Text>
        </View>
      </TouchableOpacity>
      </View>
          

        </SafeAreaView>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width:120,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
    },
    button_normal: {

        alignItems: 'center',
        width:80,
        margin: 15,
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#757c94",
        opacity:0.8,
        shadowColor:'black',
        shadowRadius:5,
    
      
        
      },
      button_text: {
        color:'white'
      },
      HorizontalBox: {
        width:280,
        justifyContent:'space-between',
        flexDirection: 'row-reverse',
    },
    HorizontalBoxButtons: {
        flexDirection: 'row',
    },
    lableText: {
        marginTop: 17,
        fontWeight: 'bold'
    },
});
export default PersonalFormScreen2;