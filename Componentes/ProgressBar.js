import * as React from 'react';
import ProgressBar from 'react-native-progress/Bar'
import { Text, View, StyleSheet } from 'react-native'

//To add counter to all donations on table of donations and webapi to update by the donator
const MyBar = () => (
    <View style={styles.container} >
        <ProgressBar color='red' progress={0.3} width={250} height={25} borderColor="navy" borderWidth={1.5} />
        <Text style={styles.textProgress}>1000/10000</Text>
        <Text style={styles.textProgress}>מנות דם שנתרמו</Text>
    </View>
);
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    textProgress: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'navy'
    }
})
export default MyBar;