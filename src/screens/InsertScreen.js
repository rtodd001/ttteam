import React, {useState} from 'react'
import {Text, Alert, View, ScrollView, StyleSheet, Image, TextInput, Button, FlatList} from 'react-native'
import SearchBar from '../components/SearchBar'
import { insertItem, importFile, storeFile } from '../components/fetch'

const InsertScreen = () => {
    const [ID, setID] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [mainCategory, setMainCategory] = useState('');
    const [currency, setCurrency] = useState('');
    const [deadline, setDeadline] = useState('');
    const [goal, setGoal] = useState('');
    const [launched, setLaunched] = useState('');
    const [pledged, setPledged] = useState('');
    const [state, setState] = useState('');
    const [backers, setBackers] = useState('');
    const [country, setCountry] = useState('');
    const [usdPledged, setUsdPledged] = useState('');
    const [usdPledgedReal, setUsdPledgedReal] = useState('');
    const [usdGoalReal, setUsdGoalReal] = useState('');

    const [text, setText] = useState('');

    const showAlert = () =>{
        Alert.alert(
           'You need to...'
        )
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
            title="Currency"
            currency={currency}
            onTermChange={setCurrency}
            // onTermSubmit={console.log("submit term")}
        />
        <SearchBar
            title="Deadline"
            deadline={deadline}
            onTermChange={setDeadline}
            // onTermSubmit={console.log("submit term")}
        />
        <SearchBar
            title="Goal"
            goal={goal}
            onTermChange={setGoal}
            // onTermSubmit={console.log("submit term")}
        />
        <SearchBar
            title="Launched"
            launched={launched}
            onTermChange={setLaunched}
            // onTermSubmit={console.log("submit term")}
        />        
        <SearchBar
            title="Pledged"
            pledged={pledged}
            onTermChange={setPledged}
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
            title="UsdPledged"
            usdPledged={usdPledged}
            onTermChange={setUsdPledged}
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
            title="Submit"
            onPress={() => {
                insertItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal);
                showAlert;
                alert('INSERT SUMITTED');
            }}
        />
        <TextInput
            style={{height: 40}}
            placeholder="File Name"
            onChangeText={text => setText(text)}
            defaultValue={text}
        />
        <Button
            color="#1B2669"
            title="Import"
            marginBottom = "20"
            onPress={() => {
                console.log(text)
                importFile(text);
                alert('Imported the File');
            }}
        />
        <Button
            title="Store"
            color="#1B2669"
            marginBottom = "20"

            onPress={() => {
                storeFile(text);
                alert('Stored the File');
            }}
        />
    </ScrollView>
}

const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 10,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 40,
        flexDirection: 'row',
        marginBottom: 10
      },
    buttonStyle: {
        color:"red"
      }
});

export default InsertScreen;