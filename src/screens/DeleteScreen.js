import React, {useState} from 'react'
import { Text, View, StyleSheet, Button, Animated, TouchableOpacity } from 'react-native'
import SearchBar from '../components/SearchBar'
import { deleteItem } from '../components/fetch'
import { ScrollView } from 'react-native-gesture-handler'

const DeleteScreen = () => {
    const [ID, setID] = useState('');

    return <ScrollView>
        <Text>Enter Delete Fields</Text>
        <SearchBar
            title="ID"
            ID={ID}
            onTermChange={setID}
            // onTermSubmit={console.log("submit term")}
        />
        <Button
            title="Submit"
            onPress={() => {
                deleteItem(ID);
            }
        }
        />
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
      alignItems: "center",
      justifyContent: "center"
    },
    item: {},
    btn: {
      backgroundColor: "#480032",
      width: 100,
      height: 40,
      padding: 3,
      justifyContent: "center",
      borderRadius: 6
    },
    text: {
      fontSize: 20,
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center"
    },
    item1: {
      backgroundColor: "red",
      padding: 20,
      width: 100,
      margin: 10
    },
  
    textBtn: {
      color: "#f4f4f4",
      fontWeight: "bold",
      textAlign: "center"
    }
  });
export default DeleteScreen;