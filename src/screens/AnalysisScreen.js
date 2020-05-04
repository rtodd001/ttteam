import React, { useState, useEffect } from 'react'
import { Text, Alert, View, ScrollView, StyleSheet, Button, TextInput, Picker } from 'react-native'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { Feather } from '@expo/vector-icons';
import Input from '../components/Input'
import SearchBar from '../components/SearchBar'
import { globalArray } from '../components/Global'
import { searchItem, insertItem, deleteItem, updateItem, importFile, storeFile, analysis } from '../components/fetch'

const AnalysisScreen = () => {

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
    const [results, setResults] = useState([]);
    const [text, setText] = useState('');


    async function search() {
        const fetchResults = await searchItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setResults(fetchResults);
    }

    async function analysis_() {
        const fetchResults = await analysis(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setResults(fetchResults);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Feather name="search" style={styles.title} />
                <Text style={styles.title}>Search Fields</Text>
            </View>
            <View class='search-bar-container'>
                <View style={styles.container}>
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
                </View>
                <View style={styles.container}>
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
                </View>

                <View style={styles.container}>
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
                </View>

                <View style={styles.container}>
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
                </View>

                <View style={styles.container}>
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
                </View>

                <View style={styles.container}>
                    <SearchBar
                        title="Country"
                        country={country}
                        onTermChange={setCountry}
                    // onTermSubmit={console.log("submit term")}
                    />
                    <SearchBar
                        title="Backers"
                        backers={backers}
                        onTermChange={setBackers}
                    // onTermSubmit={console.log("submit term")}
                    />
                </View>

                <View style={styles.container}>
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
                </View>
                {/*
                <View style={styles.container}>
                    <Picker
                        title="UsdGoalReal"
                        selectedValue={usdGoalReal}
                        onValueChange={setUsdGoalReal}
                    >
                    <Picker.Item label="test1" value='test1'/>
                    <Picker.Item label='test2' value='test2'/>
                    </Picker>
                </View>
                */}
            </View>

           <Button
                title="Analysis"
                onPress={() => {
                    analysis_()
                }
            }/>
  
            <View>
                <ScrollView horizontal={true} scrollEnabled={true}>
                {results.length > 0 && <table>
                    <tr>
                        <th>ID:</th>
                        <th>NAME:</th>
                        <th>CATEGORY:</th>
                        <th>MAIN_CATEGORY:</th>
                        <th>CURRENCY:</th>
                        <th>DEADLINE:</th>
                        <th>GOAL:</th>
                        <th>LAUNCHED:</th>
                        <th>PLEDGED:</th>
                        <th>STATE:</th>
                        <th>BACKERS:</th>
                        <th>COUNTRY:</th>
                        <th>USD PLEDGE:</th>
                        <th>USD PLEDGE REAL:</th>
                        <th>USD GOAL REAL:</th>
                    </tr>
                    {
                        results.map((item, index) => (
                            <tr key={index} >
                                <td>
                                    <TextInput value={item[0]} /*onChange={}*//>
                                </td>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                                <td>{item[3]}</td>
                                <td>{item[4]}</td>
                                <td>{item[5]}</td>
                                <td>{item[6]}</td>
                                <td>{item[7]}</td>
                                <td>{item[8]}</td>
                                <td>{item[9]}</td>
                                <td>{item[10]}</td>
                                <td>{item[11]}</td>
                                <td>{item[12]}</td>
                                <td>{item[13]}</td>
                                <td>{item[14]}</td>
                            </tr>
                        ))
                    }
                </table>}

                </ScrollView>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        justifyContent: 'center',
        fontSize: 40
    },
    container: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tableRow: {
        fontSize: 11
    },
    container2: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
        header: { height: 50, backgroundColor: '#537791' },
        text: { textAlign: 'center', fontWeight: '100' },
        dataWrapper: { marginTop: -1 },
        row: { height: 40, backgroundColor: '#E7E6E1' }
});

export default AnalysisScreen;