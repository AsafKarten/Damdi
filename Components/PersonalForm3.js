import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';


const url = "http://ruppinmobile.tempdomain.co.il/site15/"


const PersonalFormScreen3 = ({ navigation , route }) => {
  
    const [Work_telephone, onChangeWork_telephone] = React.useState();
    const [Blood_group_member, onChangeBlood_group_member] = React.useState();
    const [Personal_insurance, onChangePersonal_insurance] = React.useState();
    const [Confirm_examination, onChangeConfirm_examination] = React.useState();
    const [Agree_future_don, onChangeAgree_future_don] = React.useState();
    const [Birth_land, onChangeBirth_land] = React.useState();
    const [Aliya_year, onChangeAliya_year] = React.useState();
    const [Father_birth_land, onChangeFather_birth_land] = React.useState();
    const [Mother_birth_land, onChangeMother_birth_land] = React.useState();
    

    // const PostPersonalForm3 = (
    
    //      Work_telephone,
    //      Blood_group_member,
    //      Personal_insurance,
    //      Confirm_examination,
    //      Agree_future_don,
    //      Birth_land,Aliya_year,
    //      Father_birth_land,
    //      Mother_birth_land,
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
                onChangeText={onChangeWork_telephone}
                value={Work_telephone}
                placeholder="Work telephone"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeBlood_group_member}
                value={Blood_group_member}
                placeholder="Blood group member"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePersonal_insurance}
                value={Personal_insurance}
                placeholder="Personal insurance"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeConfirm_examination}
                value={Confirm_examination}
                placeholder="Confirm examination"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeAgree_future_don}
                value={Agree_future_don}
                placeholder="Agree future don"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeBirth_land}
                value={Birth_land}
                placeholder="Birth land"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeAliya_year}
                value={Aliya_year}
                placeholder="Aliya year"
            />
             <TextInput
                style={styles.input}
                onChangeText={onChangeFather_birth_land}
                value={Father_birth_land}
                placeholder="Father birth land"
            />
             <TextInput
                style={styles.input}
                onChangeText={onChangeMother_birth_land}
                value={Mother_birth_land}
                placeholder="Mother_birth_land"
            />
           
           <Button  title="next" onPress={()=> navigation.navigate('PersonalForm3')}/>
          <Button  title="return" onPress={()=> navigation.navigate('PersonalForm2')}/>
            {/* <Button
                title="SignUp"
                onPress={() => PostPersonalForm(
                  
                    Work_telephone,
                    Blood_group_member,
                    Personal_insurance,
                    Confirm_examination,
                    Agree_future_don,
                    Birth_land,Aliya_year,
                    Father_birth_land,
                    Mother_birth_land,
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
export default PersonalFormScreen3;