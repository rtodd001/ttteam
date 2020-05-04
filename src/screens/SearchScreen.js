import React, { useState, useEffect } from 'react'
import { Text, Alert, View, ScrollView, StyleSheet, Button, TextInput, Picker } from 'react-native'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { Feather } from '@expo/vector-icons';
import Input from '../components/Input'
import SearchBar from '../components/SearchBar'
import { globalArray } from '../components/Global'
import { searchItem, insertItem, deleteItem, updateItem, importFile, storeFile, analysis } from '../components/fetch'

const SearchScreen = () => {
    const [sortOrder, setSortOrder] = useState('');

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

    async function insert() {
        const fetchResults = await insertItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
    }

    async function update() {
        const fetchResults = await updateItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
    }

    async function delete_() {
        const fetchResults = await deleteItem(ID)
    }

    async function import_() {
        const fetchResults = await importFile(text)
    }

    async function store_() {
        const fetchResults = await storeFile(text)
    }

<<<<<<< HEAD
    async function analysis_() {
        const fetchResults = await analysis(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setResults(fetchResults);
    }
=======
    function sortBy(key) {
        const sortEnum = {
            ID: 0, //this is a number must consider type
            NAME: 1,
            CATEGORY: 2,
            MAIN_CATEGORY: 3,
            CURRENCY: 4,
            DEADLINE: 5,
            GOAL: 6,
            LAUNCHED: 7,
            PLEDGED: 8,
            STATE: 9,
            BACKERS: 10,
            COUNTRY: 11,
            USD_PLEDGE: 12,
            USD_PLEDGE_REAL: 13,
            USD_GOAL_REAL: 14
        }
        if (sortOrder === '' || sortOrder === 'desc') {
            setSortOrder('asc');
            setResults([...results.sort((a, b) => {
                if (a[sortEnum[key]] > b[sortEnum[key]]) {
                    return 1;
                } else if (a[sortEnum[key]] < b[sortEnum[key]]) {
                    return -1
                }
                else {
                    return 0
                }
            })])
        } else {
            setSortOrder('desc');
            setResults([...results.sort((a, b) => {
                if (a[sortEnum[key]] < b[sortEnum[key]]) {
                    return 1;
                } else if (a[sortEnum[key]] > b[sortEnum[key]]) {
                    return -1
                }
                else {
                    return 0
                }
            })])
        }
    }
    // console.log('67', results);
>>>>>>> origin/GUI

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
                title="Search"
                onPress={() => {
                    search()
                    console.log('Button clicked!');
                }
                } />
            {/* <Button
                title="Insert"
                onPress={() => {
                    insert()
                    alert('INSERT SUMITTED');
                }
            }
            />
            <Button
                title="Update"
                onPress={() => {
                    update()
                }
            }
            />
           <Button
                title="Analysis"
                onPress={() => {
                    analysis_()
                }
            }/>
            <Text>Enter Delete Fields</Text>
            <SearchBar
                title="ID"
                ID={ID}
                onTermChange={setID}
                // onTermSubmit={console.log("submit term")}
            />
            <Button
                title="Delete"
                onPress={() => {
                    delete_()
                }
            }
        /> */}
            {/* <TextInput
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
                    import_()
                    alert('Imported the File');
                }}
            />
            <Button
                color="#1B2669"
                title="Store"
                onPress={() => {
                    store_()
                    alert('Stored the File');
                }}
            /> */}

            <View>
                <ScrollView horizontal={true} scrollEnabled={true}>
                    {results.length > 0 && <table>
                        <tbody>
                            <tr>
                                <th>
                                <Button
                                        title='ID:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('ID')
                                        }
                                        }
                                    />
                                </th>

                                <th>
                                    <Button
                                        title='NAME:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('NAME')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='CATEGORY:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('CATEGORY')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='MAIN_CATEGORY:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('MAIN_CATEGORY')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='CURRENCY:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('CURRENCY')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='DEADLINE:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('DEADLINE')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='GOAL:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('GOAL')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='LAUNCHED:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('LAUNCHED')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='PLEDGED:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('PLEDGED')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='STATE:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('STATE')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='BACKERS:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('BACKERS')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='COUNTRY:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('COUNTRY')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='USD PLEDGE:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('USD_PLEDGE')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='USD PLEDGE REAL:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('USD_PLEDGE_REAL')
                                        }
                                        }
                                    />
                                </th>
                                <th>
                                    <Button
                                        title='USD GOAL REAL:'
                                        onPress={() => {
                                            console.log("pushed!")
                                            sortBy('USD_GOAL_REAL')
                                        }
                                        }
                                    />
                                </th>
                            </tr>
                            {console.log('283', results)}
                            {
                                results.map((item, index) => {
                                    console.log(item[3]);
                                    return (
                                        <tr key={index} >
                                            <td>
                                                <TextInput value={item[0]} /*onChange={}*/ />
                                            </td>
                                            <td><TextInput value={item[1]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[2]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[3]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[4]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[5]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[6]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[7]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[8]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[9]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[10]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[11]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[12]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[13]} /*onChange={}*/ /></td>
                                            <td><TextInput value={item[14]} /*onChange={}*/ /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
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
    container2: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    header: {
        height: 50,
        backgroundColor: '#537791'
    },
    text: {
        textAlign: 'center',
        fontWeight: '100'
    },

    dataWrapper: {
        marginTop: -1
    },

    row: {
        height: 40,
        backgroundColor: '#E7E6E1'
    }
});

export default SearchScreen;