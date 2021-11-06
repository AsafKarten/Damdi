import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function UpdateUser() {
  return (
    <View style={styles.container}>
      <Text>מסך עדכון עובד קיים</Text>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});