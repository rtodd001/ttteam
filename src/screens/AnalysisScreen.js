import React, { useState, Fragment } from 'react'
import { Dimensions, Text, Alert, View, ScrollView, StyleSheet, Button, TextInput, Picker, TouchableWithoutFeedback, Animated } from 'react-native'
import { Feather } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar'
import AwesomeButton from 'react-native-really-awesome-button';
import { a_top5, a_state_cnt, pledgeBacker, popCat, topCountries, topMainCategory } from '../components/fetch'
//import { PieChart, FullOption } from 'react-minimal-pie-chart'
import { PieChart, BarChart, LineChart, bezier } from 'react-native-chart-kit'
import PickerList from '../components/PickerList';


const AnalysisScreen = ({ navigation }) => {

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
    const [array, setArray] = useState('');
    const [resPledge, setResPledge] = useState('');
    const [popCategory, setPopCategory] = useState('');
    const [topCo, setTopCo] = useState('');
    const [topMainCa, setTopMainCa] = useState('');

    async function top5() {
        const topResults = await a_top5(ID, name, category, mainCategory, state, backers, country, usdPledged, usdPledgedReal)
        setArray(topResults)
        console.log(topResults);
    }

    async function stateCount() {
        const fetchResults = await a_state_cnt(ID, name, category, mainCategory, state, backers, country, usdPledged, usdPledgedReal)
        console.log(fetchResults);
        setSuccess(fetchResults[0])
        setFail(fetchResults[1])
        setResults(fetchResults);
        console.log("inside stateCount : ", success);
    }

    async function pledgeBackers() {
        const fetchResults = await pledgeBacker(ID, name, category, mainCategory, state, backers, country, usdPledged, usdPledgedReal)
        console.log(fetchResults);
        setResPledge(fetchResults);
    }

    async function popularCat() {
        const fetchResults = await popCat(ID, name, category, mainCategory, state, backers, country, usdPledged, usdPledgedReal)
        console.log(fetchResults);
        setPopCategory(fetchResults);
    }

    async function topCountry() {
        const fetchResults = await topCountries(ID, name, category, mainCategory, state, backers, country, usdPledged, usdPledgedReal)
        console.log(fetchResults);
        setTopCo(fetchResults);
    }

    async function topMainCat() {
        const fetchResults = await topMainCategory(ID, name, category, mainCategory, state, backers, country, usdPledged, usdPledgedReal)
        console.log(fetchResults);
        setTopMainCa(fetchResults);
    }
    
    const subCategoryList = ['Apparel', 'Apps', 'Art', 'Comics', 'Documentary', 'Fashion', 'Fiction',
        'Film & Video', 'Games', 'Product Design', 'Rock', 'Video Games'];
    const countryList = ['AU', 'CA', 'DE', 'FR', 'GB', 'MX', 'US'];
    const stateList = ['failed', 'successful', 'canceled'];

    return (
        <View style={styles.container1}>
            <ScrollView
            // alignItems = 'center'
            >
                <View style={styles.header1}>
                    <Text style={styles.headerText}>Analysis</Text>
                </View>

                <View class='search-bar-container' style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
                    <View style={styles.searchField}>
                    <PickerList
                            title="Category"
                            activeLabel={category}
                            listLabels={subCategoryList}
                            onChange={setCategory}
                        />
                    </View>
                    {/* <View style={styles.searchField}>
                        <SearchBar
                            title="MainCategory"
                            mainCategory={mainCategory}
                            onTermChange={setMainCategory}
                        // onTermSubmit={console.log("submit term")}
                        />
                    </View> */}

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

                {/* <View style={{ flex: 1, width: 500, height: 500, alignSelf: 'center', flexDirection: 'row', alignItems: 'flex-start' }}> */}
                {/* <View style={{ flex: 1, width: 100, margin: 10, flexGrow: 1, }}>
                        <View style={{ flex: 1, height: 100, maxHeight: 100, margin: 10, flexGrow: 1, }} /> */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button style={styles.buttons}
                            title="Top 5 Successful Categories"
                            backgroundColor='#1F618D'
                            backgroundProgress='#154360'
                            onPress={() => {
                                setResults('');
                                setArray('');
                                setResPledge('');
                                setTopCo('');
                                setTopMainCa('');
                                popularCat();
                            }
                            } />
                    </View>
                    {/* <View style={{ flex: 1, height: 100, maxHeight: 100, margin: 10, }} /> */}
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button style={styles.buttons}
                            title="Top 5 Pledged USD"
                            backgroundColor='#1F618D'
                            backgroundProgress='#154360'
                            onPress={() => {
                                setResults('');
                                setResPledge('');
                                setPopCategory('');
                                setTopCo('');
                                setTopMainCa('');
                                top5();
                            }
                            } />
                    </View>
                    {/* <View style={{ flex: 1, height: 100, margin: 10, }} /> */}
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button style={styles.buttons}
                            title="Success VS Fail"
                            backgroundColor='#1F618D'
                            backgroundProgress='#154360'
                            onPress={() => {
                                setArray('');
                                setResPledge('');
                                setPopCategory('');
                                setTopCo('');
                                setTopMainCa('');
                                stateCount();
                            }
                            } />
                    </View>
                    </View>
                    {/* </View> */}
                    {/* <View style={{ flex: 1, width: 100, margin: 10, flexGrow: 1, }}>
                        <View style={{ flex: 1, height: 100, maxHeight: 100, margin: 10, }} /> */}
                    <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button style={styles.buttons}
                            title="Top 5 MainCategory"
                            backgroundColor='#1F618D'
                            backgroundProgress='#154360'
                            onPress={() => {
                                setResults('');
                                setArray('');
                                setPopCategory('');
                                setResPledge('');
                                setTopCo('');
                                topMainCat()
                            }
                            } />
                    </View>
                    {/* <View style={{ flex: 1, height: 100, maxHeight: 100, margin: 10, }} /> */}
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button style={styles.buttons}
                            title="Top 5 Coutries"
                            backgroundColor='#1F618D'
                            backgroundProgress='#154360'
                            onPress={() => {
                                setResults('');
                                setArray('');
                                setPopCategory('');
                                setResPledge('');
                                setTopMainCa('');
                                topCountry();
                            }
                            } />
                    </View>
                    {/* <View style={{ flex: 1, height: 100, maxHeight: 100, margin: 10, }} /> */}
                    <View style={{ flex: 1, padding: 5 }}>
                        <Button style={styles.buttons}
                            title="Backers VS Pledged" s
                            backgroundColor='#1F618D'
                            backgroundProgress='#154360'
                            onPress={() => {
                                setResults('');
                                setArray('');
                                setPopCategory('');
                                setTopCo('');
                                setTopMainCa('');
                                pledgeBackers()
                            }
                            } />
                    </View>
                </View>
                {/* </View> */}
                {/* </View> */}
                <View>
                    <br />
                    {(results.length > 0) && <PieChart
                        data={[
                            {
                                name: 'success', population: success, color: '#5680BF',
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15
                            },
                            {
                                name: 'fail', population: fail, color: '#B8C0C9',
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 15
                            },
                        ]}
                        width={Dimensions.get('window').width}
                        height={200}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="5"
                        absolute
                    />
                    }
                </View>

                <View>
                    {
                        array.length > 0 && <BarChart
                            data={{
                                labels: array.map(col => col[2]),
                                datasets: [{
                                    data: array.map(col => (col[7] / 1000))
                                }]
                            }}
                            width={Dimensions.get('window').width} // from react-native
                            height={300}
                            style={{ paddingLeft: 10, backgroundColor: '#eff3ff' }}
                            yAxisLabel={'$'}
                            yAxisSuffix={'k'}
                            chartConfig={{
                                backgroundColor: '#1cc910',
                                backgroundGradientFrom: '#eff3ff',
                                backgroundGradientTo: '#efefef',
                                color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
                            }}
                        />
                    }
                </View>

                <View>
                    {resPledge.length > 0 && <LineChart
                        data={{
                            labels: resPledge.map(item => item[1]),
                            datasets: [{
                                data: resPledge.map(item => item[0] / 1000)
                            }]
                        }}
                        width={Dimensions.get('window').width}
                        height={500}
                        yAxisSuffix={'k'}
                        yAxisLabel={'$'}
                        xAxisLabel={' backers'}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                    />}
                </View>

                <View>
                    {popCategory.length > 0 && <LineChart
                        data={{
                            labels: popCategory.map(col => col[0]),
                            datasets: [{
                                data: popCategory.map(col => col[1])
                            }]
                        }}
                        width={Dimensions.get('window').width}
                        height={300}
                        yAxisLabel={'#'}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        bezier
                    />}
                </View>

                <View>
                    {topCo.length > 0 && <LineChart
                        data={{
                            labels: topCo.map(item => item[0]),
                            datasets: [{
                                data: topCo.map(item => item[1] / 1000)
                            }]
                        }}
                        width={Dimensions.get('window').width}
                        height={400}
                        yAxisSuffix={'k'}
                        yAxisLabel={'$'}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                    />}
                </View>

                <View>
                    {topMainCa.length > 0 && <LineChart
                        data={{
                            labels: topMainCa.map(col => col[0]),
                            datasets: [{
                                data: topMainCa.map(col => col[1] / 1000)
                            }]
                        }}
                        width={Dimensions.get('window').width}
                        height={300}
                        yAxisSuffix={'k'}
                        yAxisLabel={'$'}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        bezier
                    />}
                </View>
            </ScrollView>
        </View>
    );
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     button: {
//       backgroundColor: "#333",
//       width: 100,
//       height: 50,
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     text: {
//       color: "#FFF"
//     }
//   });

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


export default AnalysisScreen;