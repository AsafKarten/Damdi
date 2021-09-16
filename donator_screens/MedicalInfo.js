import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import BG from '../assets/DAMDI_White_BG.jpg'


const url = "http://proj13.ruppin-tech.co.il/"
export default function MedicalInfo({ navigation, route }) {
    const [Donator, onChangeDonator] = useState(route.params.route.Donator)
    const [donor, onChangeDonor] = useState(route.params.route.User);
    const Route = {Donator:Donator, Donor:donor}

    return (
        <SafeAreaView>
               <TouchableOpacity onPress={() => navigation.navigate('PersonalInfo', { route: Route })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >פרטים אישים</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MedicalInfo', { route: Route })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >פרטים רפואים</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UnitOne', { route: Donator })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >אישור תורם</Text>
          </View>
        </TouchableOpacity>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
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