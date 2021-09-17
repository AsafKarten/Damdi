import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import BG from '../assets/DAMDI_White_BG.jpg'


const url = "http://proj13.ruppin-tech.co.il/"
export default function PersonalInfo({ navigation, route }) {
    const [Donator, onChangeDonator] = useState(route.params.route.Donator)
    const [donor, onChangeDonor] = useState(route.params.route.Donor);
    const Route = { Donator: Donator, Donor: donor }

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
                <Text>{donor.Birthdate}</Text>
                <Text>{donor.Personal_id}</Text>
                <Text>{donor.Gender}</Text>
                <Text>{donor.Birth_land}</Text>
                <Text>{donor.Father_birth_landGender}</Text>
                <Text>{donor.Mother_birth_land}</Text>

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