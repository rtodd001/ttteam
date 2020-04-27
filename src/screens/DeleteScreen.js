import React, {useState} from 'react'
import {Text, View, StyleSheet, Image, TextInput, Button, FlatList} from 'react-native'
import Input from '../components/Input'
import SearchBar from '../components/SearchBar'
import { deleteItem } from '../components/fetch'

const DeleteScreen = () => {
    const [ID, setID] = useState('');

    return <View>
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
    </View>
}

const styles = StyleSheet.create({});

export default DeleteScreen;