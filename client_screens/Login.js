import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const uri = "http://ruppinmobile.tempdomain.co.il/site15/"
var bcrypt = require('bcryptjs');
export default function Login({ navigation }) {
  const [PersonalId, onChangeId] = useState()
  const [Email, onChangeEmail] = useState();
  const [Pass, onChangePass] = useState();
  const [Asaf, onChangeAsaf] = useState({Personal_id:"204610620",First_name:"אסף",Last_name:"קרטן",Phone:"0549214258",Gender:"ז" ,Birthdate:"03.03.1993" ,Prev_first_name:"" ,Prev_last_name:"",City:"ranana", Address:"hertzel 101", Postal_code:"3355", Mail_box:"3", Telephone:"0549214258", Work_telephone:"",Blood_group_member:false, Personal_insurance:false, Confirm_examination:true, Agree_future_don:true, Birth_land:"ישראל", Aliya_year:"", Father_birth_land:"ישראל", Mother_birth_land:"ישראל"});


  const LoginNew = async () => {
    try {
        // if (PersonalId == null || PersonalId == "" || Email == null || Email == ""|| Pass == null || Pass == "") {
        //     Alert.alert("אנא מלא\י את כל פרטים !")
        //     return
        // }
        // else {
           
            let result = await fetch(uri + "api/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Personal_id: PersonalId,
                    Email: Email
                })
            });
            let data = await result.json();
            console.log(data);
            var correct = bcrypt.compareSync(Pass, data.Solted_hash)
            if (!correct) {
                Alert.alert("הפרטים שגוים או שהסיסמה אינה נכונה!");
                return;
            }
            else {
              let user_result = await fetch(uri + "api/user/info", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Personal_id: PersonalId,
                })
            });
            let user = await user_result.json();
            console.log(user);
                navigation.navigate( "PersonalForm" , { route : user } );
            }
        // }

    } catch (error) {
        console.log(error);
    }
}

    const Login = async () => {
    if (id == "" || email == "" || Pass == "") {
      alert("אנא מלא\י את כל פרטים !")
      return
    }
    else {
      let result = await fetch(uri + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: PersonalId,
          Email: Email,
        })
      })
      let data = await result.JSON
      console.log(data);
      var correct = bcrypt.compareSync(Pass, data.Salted_hash)
      if (!correct) {
        Alert.alert("Wrong details,check your details");
        return;
      }
      console.log(data);
      navigation.navigate("Welcome")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={()=>onChangeId}
        value={PersonalId}
        placeholder="תעודת זהות"
      />
      <TextInput
        style={styles.input}
        onChangeText={()=>onChangeEmail}
        value={Email}
        placeholder="אימייל"
      />
      <TextInput
        style={styles.input}
        onChangeText={()=>onChangePass}
        value={Pass}
        secureTextEntry={true}
        placeholder="סיסמה"
      />
      <TouchableOpacity onPress={() => LoginNew()}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text}>התחברות</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >הרשמה</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('PersonalForm',{route:Asaf})}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >הכפתור של אסף</Text>
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
    height: 40,
    width: 160,
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
});
