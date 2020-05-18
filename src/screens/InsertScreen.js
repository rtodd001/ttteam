import React, { useState } from 'react'
import { Text, Alert, View, ScrollView, StyleSheet, Image, TextInput, Button, FlatList } from 'react-native'
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

    const showAlert = () => {
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
    async function import_() {
        const fetchResults = await importFile(text)
    }

    async function store_() {
        const fetchResults = await storeFile(text)
    }

    function fieldsEntered(){
        if(ID.length < 1 && name.length < 1){
            return true;
        }
        else
            return false;
    }
    return (

        <View style={styles.container}>
            <ScrollView>

                <View style={styles.header}>
                    <Text style={styles.headerText}>Enter Input Fields</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button
                            color="#1B2669"
                            title="Import"
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
                            // disabled
                            onPress={() => {
                                store_()
                                alert('Stored the File');
                            }}
                        />
                    </View>
                </View>
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
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button
                            title="INSERT"
                            color='green'
                            disabled={fieldsEntered()}
                            onPress={() => {
                                if (ID != '' && name != '' && category != '' && mainCategory != '' && state != '', backers != '', country != '', usdPledgedReal != '') {
                                    insert()
                                }
                                else alert('PLEASE SUBMIT ALL BOXES');
                            }
                            }
                        />
                    </View>
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button
                            title="UPDATE"
                            color="orange"
                            disabled={ID.length < 1}
                            onPress={() => {
                                if (ID != '' && name != '' && category != '' && mainCategory != '' && state != '', backers != '', country != '', usdPledgedReal != '') {
                                    update()
                                }
                                else alert('PLEASE SUBMIT ALL BOXES');
                            }
                            }
                        />
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10,
    },
    header: {
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

export default InsertScreen;