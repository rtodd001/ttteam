import React, {useState} from 'react'
import {Text, View, StyleSheet, Image, TextInput, Button, FlatList} from 'react-native'
import Input from '../components/Input'
import SearchBar from '../components/SearchBar'
import { insertItem } from '../components/fetch'

const InsertScreen = () => {

const [state, setState] = useState('');
const [category, setCategory] = useState('');
const [backers, setBackers] = useState('');

    return <View>
        <Text>Enter Input Fields</Text>
        <SearchBar
            title="State"
            state={state}
            onTermChange={setState}
            // onTermSubmit={console.log("submit term")}
        />
        <SearchBar
            title="Category"
            category={category}
            onTermChange={setCategory}
            // onTermSubmit={console.log("submit term")}
        />
        <SearchBar
            title="Backers"
            backers={backers}
            onTermChange={setBackers}
            // onTermSubmit={console.log("submit term")}
        />

        <Button
            title="Submit"
            onPress={() => {
                const searchData = {
                    'ID' : null,
                    'name' : null,
                    'category' : null,
                    'main_category': category,
                    'currency' : null,
                    'deadline' : null,
                    'goal' : null,
                    'launched' : null,
                    'pledged' : null,
                    'state' : state,
                    'backers' : backers,
                    'country' : null,
                    'used pledged' : null,
                    'usd_pledged_real' : null,
                    'usd_goal_real' : null
                };
                // console.log(searchData.ID, searchData.name, searchData.main_category, searchData.backers)
                // var url = new URL('http://192.168.1.8:5000/search')
                insertItem(category, backers, state);
            }
        }
        />

    </View>
}

const styles = StyleSheet.create({});

export default InsertScreen;