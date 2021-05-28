import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';


const url = "http://ruppinmobile.tempdomain.co.il/site15/"


const PersonalFormScreen2 = ({ navigation , route }) => {

    const [City, onChangeCity] = React.useState();
    const [Address, onChangeAddress] = React.useState();
    const [Postal_code, onChangePostal_code] = React.useState();
    const [Mail_box, onChangeMail_box] = React.useState();
    const [Telephone, onChangeTelephone] = React.useState();

    

    // const PostPersonalForm2 = (
      
    //      City,Address,
    //      Postal_code,
    //      Mail_box,
    //      Telephone
        
    //      ) => {
    //     if (Pass != CPass) {
    //         alert("Password dos not match confirm password!");
    //         return
    //     }
    //     else if (id == null || id == "" || Email == null || Email == "" || Pass == null || Pass == "" || CPass == null || CPass == "") {
    //         alert("Please fill all the fildes");
    //         return
    //     }
    //     else {
    //         fetch(url + "api/user/post", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json; charset=UTF-8',
    //                 'Accept': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 Personal_id: id,
    //                 Email: Email,
    //                 Pass: Pass
    //             })
    //         })
    //             .then(res => {
    //                 console.log('res=', res);
    //                 return res.json()
    //             })
    //             .then(
    //                 (result) => {
    //                     console.log(result);
    //                     console.log(result.Personal_id);
    //                     console.log(result.Email);
    //                     navigation.navigate("Login");
    //                 },
    //                 (error) => {
    //                     console.log(error);
    //                 });
    //     }
    // }

    return (

        <SafeAreaView style={styles.container}>
           
            <TextInput
                style={styles.input}
                onChangeText={onChangeCity}
                value={City}
                placeholder="City"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeAddress}
                value={Address}
                placeholder="Address"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePostal_code}
                value={Postal_code}
                placeholder="Postal code"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeMail_box}
                value={Mail_box}
                placeholder="Mail box"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeTelephone}
                value={Telephone}
                placeholder="Telephone"
            />
          
          <Button  title="next" onPress={()=> navigation.navigate('PersonalForm3')}/>
          <Button  title="return" onPress={()=> navigation.navigate('PersonalForm')}/>
           
            {/* <Button
                title="SignUp"
                onPress={() => PostPersonalForm2(
                    
                    City,Address,
                    Postal_code,
                    Mail_box,
                    Telephone
                   
                    )}
            /> */}
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
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
    },
});
export default PersonalFormScreen2;