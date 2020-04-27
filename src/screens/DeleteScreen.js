import React, {useState} from 'react'
import { Text, View, ScrollView, TextInput, StyleSheet, Button, Animated, TouchableOpacity } from 'react-native'
import SearchBar from '../components/SearchBar'
import { deleteItem, importFile, storeFile } from '../components/fetch'

const DeleteScreen = () => {
    const [ID, setID] = useState('');
    const [text, setText] = useState('');

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
        }/>
        <TextInput
            style={{height: 40}}
            placeholder="File Name"
            onChangeText={text => setText(text)}
            defaultValue={text}
        />
        <Button
            color="#1B2669"
            title="Import"
            onPress={() => {
                console.log(text)
                importFile(text);
                alert('Imported the File');
            }}
        />
        <Button
            color="#1B2669"
            title="Store"
            onPress={() => {
                storeFile(text);
                alert('Stored the File');
            }}
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