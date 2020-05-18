import React, {useState} from 'react'
import {Text, Alert, View, ScrollView, StyleSheet, Image, TextInput, Button, FlatList} from 'react-native'
import Input from '../components/Input'
import SearchBar from '../components/SearchBar'
import { insertItem, updateItem } from '../components/fetch'

const InsertScreen = () => {
    const [ID, setID] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [mainCategory, setMainCategory] = useState('');
    const [state, setState] = useState('');
    const [backers, setBackers] = useState('');
    const [country, setCountry] = useState('');
    const [usdPledgedReal, setUsdPledgedReal] = useState('');
    const [usdGoalReal, setUsdGoalReal] = useState('');

    const showAlert = () =>{
        Alert.alert(
           'You need to...'
        )
     }
    async function insert() {
        const fetchResults = await insertItem(ID, name, category, mainCategory, state, backers, country, usdPledgedReal)
    }
    async function update() {
        const fetchResults = await updateItem(ID, name, category, mainCategory, state, backers, country, usdPledgedReal)
    }
    return <ScrollView>
        <Text>Enter Input Fields</Text>
        <SearchBar
            title="ID"
            ID={ID}
            onTermChange={setID}
            // onTermSubmit={console.log("submit term")}
        />
        <SearchBar
            title="Name"
            name={name}
            onTermChange={setName}
            // onTermSubmit={console.log("submit term")}
        />
        <SearchBar
            title="Category"
            category={category}
            onTermChange={setCategory}
            // onTermSubmit={console.log("submit term")}
        />
        <SearchBar
            title="MainCategory"
            mainCategory={mainCategory}
            onTermChange={setMainCategory}
            // onTermSubmit={console.log("submit term")}
        />
        <SearchBar
            title="State"
            state={state}
            onTermChange={setState}
            // onTermSubmit={console.log("submit term")}
        />        
        <SearchBar
            title="Backers"
            backers={backers}
            onTermChange={setBackers}
            // onTermSubmit={console.log("submit term")}
        />        
        <SearchBar
            title="Country"
            country={country}
            onTermChange={setCountry}
            // onTermSubmit={console.log("submit term")}
        />        
        <SearchBar
            title="UsdPledgedReal"
            usdPledgedReal={usdPledgedReal}
            onTermChange={setUsdPledgedReal}
            // onTermSubmit={console.log("submit term")}
        />
        <SearchBar
            title="UsdGoalReal"
            usdGoalReal={usdGoalReal}
            onTermChange={setUsdGoalReal}
            // onTermSubmit={console.log("submit term")}
        /> 
        <Button
            title="INSERT"
            onPress={() => {
                if (ID!='' && name!='' && category!='' && mainCategory!='' && state!='', backers!='', country!='', usdPledgedReal!='') {
                    insert()
                }
                else alert('PLEASE SUBMIT ALL BOXES');
            }
        }
        />
        <Button
            title="UPDATE"
            onPress={() => {
                if (ID!='' && name!='' && category!='' && mainCategory!='' && state!='', backers!='', country!='', usdPledgedReal!='') {
                    update()
                }
                else alert('PLEASE SUBMIT ALL BOXES');
            }
        }
        />

    </ScrollView>
}

const styles = StyleSheet.create({});

export default InsertScreen;