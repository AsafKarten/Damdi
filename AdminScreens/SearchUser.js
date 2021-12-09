import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { url } from '../Utils'

export default function SearchUser() {
  const [typeUser, setTypeUser] = useState("לקוחות");
  const [searchText, setSearchText] = useState('');
  const [donors, setDonors] = useState([]);
  const [donators, setDonators] = useState([]);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', false);
    GetAllDonosrs();
    GetAllDonators();
  }, [])


  const GetAllDonosrs = () => {
    try {
      let result = await fetch(url + "api/all/donors", {
        method: 'GET'
      });
      let data = [...await result.json()];
      console.log(data);
      if (data.length === 0) {
        Alert.alert("אין משתמשים באפליקציה")
        return;
      }
      else {
        setDonors(data)
        console.log(data);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const GetAllDonators = () => {
    try {
      let result = await fetch(url + "api/all/donators", {
        method: 'GET'
      });
      let data = [...await result.json()];
      console.log(data);
      if (data.length === 0) {
        Alert.alert("אין משתמשים באפליקציה")
        return;
      }
      else {
        setDonators(data)
        console.log(data);
      }
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.top_screen}>
              <View style={styles.horizontalBox}>
                <Text>בחר סוג משתמש לחיפוש: </Text>
                <RadioButtonGroup
                  containerStyle={{ margin: 15, flexDirection: 'row' }}
                  selected={typeUser}
                  onSelected={(value) => { setTypeUser(value), handleOnChange(value) }}
                  radioBackground="blue">
                  <RadioButtonItem value="עובדים" label="עובדים" />
                  <RadioButtonItem value="לקוחות" label="לקוחות" />
                </RadioButtonGroup>
              </View>
            </View>
            <View style={styles.searchView}>
              <View style={styles.inputView}>
                <TextInput
                  defaultValue={searchText}
                  style={styles.input}
                  placeholder='חפש'
                  textContentType='name'
                  onChangeText={(text) => {
                    setSearchText(text);
                    if (text === '') {
                      setDonators([])
                      setDonors([]);
                    }
                  }}
                  returnKeyType='search'
                />
                {searchText.length === 0 ? (
                  <TouchableOpacity>
                    <Icon name='search' size={24} color='#333' />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchText('');
                    }}
                  >
                    <Icon name='cancel' size={24} color='#333' />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {typeUser === 'לקוחות' ?
              <View>{
                donors.length > 0 ? (
                  <ScrollView>
                    {donors.map((donor) => (
                      <TouchableOpacity
                        style={styles.userCard}
                        onPress={() => {
                          Alert.alert(
                            `${donor.First_name} ${donor.Last_name}`,
                            `You can call me at ${donor.Phone}`
                          );
                        }}>
                        <Image
                          style={styles.userImage}
                          source={{ uri: user.picture?.large }}
                        />
                        <View style={styles.userCardRight}>
                          <Text
                            style={{ fontSize: 18, fontWeight: '500' }}
                          >{`${donor.First_name} ${donor.Last_name}`}</Text>
                          <Text>{`${donor.Phone}`}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                    <View style={{ height: 50 }}></View>
                  </ScrollView>
                ) : searchText.length > 0 ? (
                  <View style={styles.messageBox}>
                    <Text style={styles.messageBoxText}>לא נמצאו לקוחות במערכת</Text>
                  </View>
                ) : (
                  <View style={styles.messageBox}>
                    <Text style={styles.messageBoxText}>חפש לקוחות</Text>
                  </View>
                )
              }
              </View>
              :
              <View> {
                donators.length > 0 ? (
                  <ScrollView>
                    {donators.map((donator) => (
                      <TouchableOpacity
                        style={styles.userCard}
                        onPress={() => {
                          Alert.alert(
                            `${donator.First_name} ${donator.Last_name}`,
                          );
                        }}
                      >
                        {/* <Image
                          style={styles.userImage}
                          source={{ uri: user.picture?.large }}
                        /> */}
                        <View style={styles.userCardRight}>
                          <Text
                            style={{ fontSize: 18, fontWeight: '500' }}>{`${donator.First_name} ${donator.Last_name}`}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                    <View style={{ height: 50 }}></View>
                  </ScrollView>
                ) : searchText.length > 0 ? (
                  <View style={styles.messageBox}>
                    <Text style={styles.messageBoxText}>לא נמצאו עובדים במערכת</Text>
                  </View>
                ) : (
                  <View style={styles.messageBox}>
                    <Text style={styles.messageBoxText}>חפש עובדים</Text>
                  </View>
                )
              }
              </View>
            }
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top_screen: {
    flexDirection: 'row'
  },
  horizontalBox: {
    width: 315,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 15,
  },
  searchView: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputView: {
    flex: 1,
    height: 40,
    backgroundColor: '#dfe4ea',
    paddingHorizontal: 10,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 18,
  },
  userCard: {
    backgroundColor: '#fafafa',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userCardRight: {
    paddingHorizontal: 10,
  },
  messageBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBoxText: {
    fontSize: 20,
    fontWeight: '500',
  },
});