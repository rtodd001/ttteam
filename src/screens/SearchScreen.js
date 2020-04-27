import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, TextInput, Button, FlatList} from 'react-native'
import Input from '../components/Input'
import SearchBar from '../components/SearchBar'
import {globalArray} from '../components/Global'
import {searchItem} from '../components/fetch'


const friends1 = [
    {name: 'Category', age: 'Backers'},
];

const searchData = {
    'ID' : '',
    'name' : '',
    'category' : '',
    'main_category': '',
    'currency' : '',
    'deadline' : '',
    'goal' : '',
    'launched' : '',
    'pledged' : '',
    'state' : '',
    'backers' : '',
    'country' : '',
    'used pledged' : '',
    'usd_pledged_real' : '',
    'usd_goal_real' : ''
};


const SearchScreen = () => {

    const [state, setState] = useState('');
    const [category, setCategory] = useState('');
    const [backers, setBackers] = useState('');
    let [click, setClick] = useState(false);

    let arr =[];
    useEffect(() => {
        // Update the document title using the browser API
        searchItem(category, backers, state);
        return () => {
            console.log("cleam up");
            setClick(!click);
        }
    }, [click]);


    
    // Display items
    return (
        <View>
            <Text>Enter Input Fields</Text>
            <SearchBar
                title="State"
                state={state}
                onTermChange={setState}
            />
            <SearchBar
                title="Category"
                category={category}
                onTermChange={setCategory}
            />
            <SearchBar
                title="Backers"
                backers={backers}
                onTermChange={setBackers}
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