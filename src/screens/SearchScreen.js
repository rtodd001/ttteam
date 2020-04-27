import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, TextInput, Button, FlatList} from 'react-native'
import Input from '../components/Input'
import SearchBar from '../components/SearchBar'
import { globalArray } from '../components/Global'
import { searchItem } from '../components/fetch'

const friends1 = [
    {name: 'Category', age: 'Backers'},
];

const SearchScreen = () => {
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
    let [click, setClick] = useState(false);

    let arr =[];
    useEffect(() => {
        // Update the document title using the browser API
        searchItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal);
        return () => {
            console.log("clean up");
            setClick(!click);
        }
    }, [click]);

    // Display items
    return (
        <View>
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
                    setClick(true);
                    console.log('Button clicked!');
                }
            }/>
            <Text>{globalArray[0]}</Text>
        </View>
    );
}


const styles = StyleSheet.create({});

export default SearchScreen;