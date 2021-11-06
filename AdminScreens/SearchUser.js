import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SearchUser() {
  return (
    <View style={styles.container}>
      <Text>מסך חיפוש עובד\תורם</Text>
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