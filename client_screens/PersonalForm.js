import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native';


const url = "http://ruppinmobile.tempdomain.co.il/site15/"

//Personal_id:"204610620",First_name:"אסף",Last_name:"קרטן",Phone:"0549214258",Gender:"ז" ,Birthdate:"03.03.1993" ,Prev_first_name:"" ,Prev_last_name:""

export default function PersonalFormScreen({ navigation, route }) {
    const Personal_id = route.params.route.Personal_id
    const [First_name, onChangeFirst_name] = useState(route.params.route.First_name);
    const [Last_name, onChangeLast_name] = useState(route.params.route.Last_name);
    const [Phone, onChangePhone] = useState(route.params.route.Phone);
    const [Gender, onChangeGender] = useState(route.params.route.Gender);
    const [Birthdate, onChangeBirthdate] = useState(route.params.route.Birthdate);
    const [Prev_first_name, onChangePrev_first_name] = useState(route.params.route.Prev_first_name);
    const [Prev_last_name, onChangePrev_last_name] = useState(route.params.route.Prev_last_name);

    const PostPersonalForm = () => {
        const new_route = route.params.route
        new_route.First_name = First_name
        new_route.Last_name = Last_name
        new_route.Phone = Phone
        new_route.Gender = Gender
        new_route.Birthdate = Birthdate
        new_route.Prev_first_name = Prev_first_name
        new_route.Prev_last_name = Prev_last_name


        console.log()
        navigation.navigate('PersonalForm2', { route: new_route })
    }




    return (

        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeFirst_name}
                value={First_name}
                placeholder="שם פרטי"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeLast_name}
                value={Last_name}
                placeholder="שם משפחה"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePhone}
                value={Phone}
                placeholder="מס פלאפון"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeGender}
                value={Gender}
                placeholder="מין"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeBirthdate}
                value={Birthdate}
                placeholder="תאריך לידה"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePrev_first_name}
                value={Prev_first_name}
                placeholder="שם קודם: פרטי"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePrev_last_name}
                value={Prev_last_name}
                placeholder="שם קודם: משפחה"
            />
            <TouchableOpacity onPress={() => PostPersonalForm()}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >הבא</Text>
        </View>
      </TouchableOpacity>

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
        width:160,
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
        marginTop:12,
    },
    lableText: {
        marginTop: 17,
        fontWeight: 'bold'
    },
});

