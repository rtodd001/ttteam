import React, { useState, useEffect, Fragment } from 'react'
import { Text, Alert, View, ScrollView, StyleSheet, Button, TextInput, Dimensions, CheckBox } from 'react-native'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { PieChart, FullOption } from 'react-minimal-pie-chart'
import { Feather } from '@expo/vector-icons';
import Input from '../components/Input'
import SearchBar from '../components/SearchBar'
import { globalArray } from '../components/Global'
import { searchItem, insertItem, deleteItem, updateItem, importFile, storeFile, a_top10 } from '../components/fetch'
import PickerList from '../components/PickerList';
import AlertCustom from '../components/Alert';


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
    const [results, setResults] = useState([]);
    const [text, setText] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [checkBoxSet, setCheckBoxSet] = useState(new Set())
    const [projectName, setProjectName] = useState('')


    async function search() {
        // const fetchResults = await searchItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        const fetchResults = await searchItem(ID, name, category, mainCategory, state, backers, country, usdGoalReal)
        // console.log(fetchResults);
        setResults(fetchResults);
    }

    // async function insert() {
    //     const fetchResults = await insertItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
    // }

    // async function update() {
    //     const fetchResults = await updateItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
    // }

    async function delete_() {
        const fetchResults = await deleteItem(Array.from(checkBoxSet))
    }

    async function import_() {
        const fetchResults = await importFile(name)
    }

    async function store_() {
        const fetchResults = await storeFile(name)
    }

    async function analysis_() {
        const fetchResults = await analysis(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setResults(fetchResults);
    }
    function sortBy(key) {
        const sortEnum = {
            ID: 0, //this is a number must consider type
            NAME: 1,
            CATEGORY: 2,
            MAIN_CATEGORY: 3,
            STATE: 4,
            BACKERS: 5,
            COUNTRY: 6,
            USD_GOAL_REAL: 7,
        }
        // const sortEnum = {
        //     ID: 0, //this is a number must consider type
        //     NAME: 1,
        //     CATEGORY: 2,
        //     MAIN_CATEGORY: 3,
        //     CURRENCY: 4,
        //     DEADLINE: 5,
        //     GOAL: 6,
        //     LAUNCHED: 7,
        //     PLEDGED: 8,
        //     STATE: 9,
        //     BACKERS: 10,
        //     COUNTRY: 11,
        //     USD_PLEDGE: 12,
        //     USD_PLEDGE_REAL: 13,
        //     USD_GOAL_REAL: 14
        // }
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
    console.log(Dimensions.get('window').width);

    const subCategoryList = ['Apparel', 'Apps', 'Art', 'Comics', 'Documentary', 'Fashion', 'Fiction',
        'Film & Video', 'Games', 'Product Design', 'Rock', 'Video Games'];
    const countryList = ['AU', 'CA', 'DE', 'FR', 'GB', 'MX', 'US'];
    const stateList = ['failed', 'successful', 'canceled'];

    function toggleCheckBox(id) {
        console.log(checkBoxSet);
        const clonedSet = new Set(checkBoxSet);
        if (clonedSet.has(id)) {
            clonedSet.delete(id);
        } else {
            clonedSet.add(id);
        }
        setCheckBoxSet(clonedSet);
    }

    return (
        <View style={styles.container1}>

            <ScrollView>

                <View style={styles.header1}>
                    {/* <Feather style={{flex: 1, fontSize: 40, alignSelf: 'right'}}name="search"/> */}
                    <Text style={styles.headerText}>Search</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button
                            color="#1B2669"
                            title="Import"
                            disabled={name.length < 1}
                            onPress={() => {
                                console.log(text)
                                import_()
                                alert('Imported the File');
                            }}
                        />
                    </View>

                    <View style={{ flex: 1, padding: 5 }}>
                        <Button
                            color="#1B2669"
                            title="Store"
                            disabled={name.length < 1}
                            // disabled
                            onPress={() => {
                                store_()
                                alert('Stored the File');
                            }}
                        />
                    </View>
                    {/* <View style={{ flex: 1, padding: 5 }}>
                        <Button
                            color='orange'
                            title="Update"
                            onPress={() => {
                                update_()
                                alert('Updated the File');
                            }}
                        />
                    </View> */}
                </View>

                <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>

                    <View style={styles.searchField}>
                        <TextInput style={{ fontSize: 18, backgroundColor: '#deddd9' }}
                            placeholder='Enter File Name to Store/Import'
                            value={name}
                            onChangeText={setName}
                        // onTermSubmit={console.log("submit term")}
                        />
                    </View>

                    <View style={styles.searchField}>
                        <PickerList
                            title="Category"
                            activeLabel={category}
                            listLabels={subCategoryList}
                            onChange={setCategory}
                        />
                    </View>

                    <View style={styles.searchField}>
                        <PickerList
                            title="Country"
                            activeLabel={country}
                            listLabels={countryList}
                            onChange={setCountry}
                        />
                    </View>

                    <View style={styles.searchField}>
                        <PickerList
                            title="State"
                            activeLabel={state}
                            listLabels={stateList}
                            onChange={setState}
                        />
                    </View>

                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button style={styles.buttons}
                            title="Search"
                            onPress={() => {
                                search()
                                console.log('Button clicked!');
                            }}
                        />
                    </View>
                    {/* <View style={{ flex: 1, padding: 5 }}>
                        <Button style={styles.buttons}
                            title="Insert"
                            disabled={name.length < 1}
                            color='green'
                            onPress={() => {
                                insert()
                                alert('INSERT SUMITTED');
                            }}
                        />
                    </View> */}
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button style={styles.buttons}
                            title="Delete"
                            color='red'
                            disabled={checkBoxSet.size < 1}
                            onPress={() => { delete_(), alert("DELETE"), search(), checkBoxSet.clear() }}
                        />
                    </View>

                </View>


                <View>

                    <ScrollView horizontal={true} scrollEnabled={true}>

                        {results.length > 0 && <table>
                            <tbody>
                                <tr>
                                    <th>
                                        <Button
                                            title='☑'

                                            disabled
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
                                            title='USD GOAL REAL:'
                                            onPress={() => {
                                                console.log("pushed!")
                                                sortBy('USD_GOAL_REAL')
                                            }
                                            }
                                        />
                                    </th>
                                    {/* <th>
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
                                    </th> */}
                                </tr>
                                {
                                    results.map((item, index) => (
                                        <tr key={index} >
                                            <td>
                                                <CheckBox
                                                    value={checkBoxSet.has(item[0])}
                                                    onValueChange={() => toggleCheckBox(item[0])}
                                                />
                                            </td>
                                            <td>{item[1]}</td>
                                            <td>{item[2]}</td>
                                            <td>{item[3]}</td>
                                            <td>{item[4]}</td>
                                            <td>{item[5]}</td>
                                            <td>{item[6]}</td>
                                            <td>{item[7]}</td>
                                            {/* <td>{item[8]}</td>
                                            <td>{item[9]}</td>
                                            <td>{item[10]}</td>
                                            <td>{item[11]}</td>
                                            <td>{item[12]}</td>
                                            <td>{item[13]}</td>
                                            <td>{item[14]}</td> */}
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>}

                    </ScrollView>

                </View>

            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({

    container1: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10,
    },
    header1: {
        flex: 1,
        flexDirection: 'row'
    },
    headerText: {
        textAlign: 'center',
        fontSize: 40,
        flex: 1,
    },
    searchField: {
        flex: 1,
        height: 30,
        padding: 2,
    },
    buttons: {
        flex: 1,
        height: 30,
    },
});

export default SearchScreen;