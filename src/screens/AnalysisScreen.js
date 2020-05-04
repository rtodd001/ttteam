import React, { useState, Fragment  } from 'react'
import { Text, Alert, View, ScrollView, StyleSheet, Button, TextInput, Picker } from 'react-native'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { Feather } from '@expo/vector-icons';
import Input from '../components/Input'
import SearchBar from '../components/SearchBar'
import { globalArray } from '../components/Global'
import { searchItem, a_top10, a_state_cnt } from '../components/fetch'
import { PieChart, FullOption } from 'react-minimal-pie-chart'

const AnalysisScreen = ({navigation}) => {

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
    const [success, setSuccess] = useState('');
    const [fail, setFail] = useState('');
    let array = [];

    async function search() {
        const fetchResults = await searchItem(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        let array = fetchResults;
        console.log("im here in analysis")
        console.log(array)
        setResults(fetchResults);
    }

    async function top10() {
        const fetchResults = await a_top10(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setResults(fetchResults);
    }

    async function stateCount() {
        const fetchResults = await a_state_cnt(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setSuccess(fetchResults[0])
        setFail(fetchResults[1])
        array = fetchResults
        setResults(fetchResults);
        console.log("inside stateCount : ", success);

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Feather name="search" style={styles.title} />
                <Text style={styles.title}>Analysis</Text>
            </View>
            <View class='search-bar-container'>
                {/* <View style={styles.container}>
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
                </View> */}
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
{/* 
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
                </View> */}
{/* 
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
                </View> */}

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
                        title="UsdPledgedReal"
                        usdPledgedReal={usdPledgedReal}
                        onTermChange={setUsdPledgedReal}
                    // onTermSubmit={console.log("submit term")}
                    />
                    {/* <SearchBar
                        title="Backers"
                        backers={backers}
                        onTermChange={setBackers}
                    // onTermSubmit={console.log("submit term")}
                    /> */}
                </View>



                {/* <View style={styles.container}>
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
                </View> */}
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
                    console.log('typeof analysis', typeof(analysis_));
                  //  top10()
                    stateCount()
                    //search()
                }
            }/>

            <View>
                <br />
                {(results.length > 0) && <PieChart
                    animate
                    animationDuration={1000}
                    animationEasing="ease-out"
                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                    center={[
                    50,
                    50
                    ]}
                    data={[
                        { title: 'success', value: success, color: '#C13C37' },
                        { title: 'fail', value: fail, color: '#E38627' },
                    ]}
                />              
                }    
            </View>
            <View>
                {
                    results.length>0 &&  <Text style={{color:'#C13C37',  textAlign: 'center'}}>SUCCESS %</Text>           

                }
            </View>
            <View>
                {
                    results.length>0 &&  <Text style={{color:'#E38627',  textAlign: 'center'}}>FaIL %</Text>           

                }
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