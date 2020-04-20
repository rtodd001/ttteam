import React, {useState} from 'react'
import {Text, View, StyleSheet, Image, TextInput, Button, FlatList} from 'react-native'
import Input from '../components/Input'
import SearchBar from '../components/SearchBar'

const friends1 = [
    {name: 'Category', age: 'Backers'},
    {name: 'Poetry', age: '21'},
    {name: 'Narrative Film', age: '10'},
    {name: 'Narrative Film', age: '23'},
    {name: 'Narrative Film', age: '30'},
    {name: 'Music', age: '29'},
    {name: 'Film & Video', age: '35'},
    {name: 'Film & Video', age: '11'},
    {name: 'Music', age: '22'}

];

const SearchScreen = () => {

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
                var url = new URL('http://localhost:5000/search')
                var params = {'main_category':category, 'backers':backers, 'state':state} // or:
                // var params = {'main_category':'Food','state':'failed'}
                // var params = [['main_category', category],['state', 'failed']]      
                url.search = new URLSearchParams(params).toString();            
                fetch(url)
            }
        }
        />
        <FlatList 
            //horizontal puts the list to scroll left to right
            // horizontal={true}
            //hide scroll bar
            // showsHorizontalScrollIndicator={false}

            keyExtractor={(friends1) => friends1.name}
            data={friends1}
            // data={friends}
            renderItem={ ({item}) => {
                return <Text style={styles.textStyle}>{item.name} | {item.age}</Text>;
            }}
        />  
    </View>
}

const styles = StyleSheet.create({});

export default SearchScreen;