import React, { useState, Fragment  } from 'react'
import { Dimensions, Text, Alert, View, ScrollView, StyleSheet, Button, TextInput, Picker, TouchableWithoutFeedback, Animated} from 'react-native'
import { Feather } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar'
import AwesomeButton from 'react-native-really-awesome-button';
import { a_top10, a_state_cnt, pledgeBacker, popCat, topCountries, topMainCategory } from '../components/fetch'
import { PieChart, FullOption } from 'react-minimal-pie-chart'
import { BarChart, LineChart, bezier } from 'react-native-chart-kit'

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
    const [array, setArray] = useState('');
    const [resPledge, setResPledge] = useState('');
    const [popCategory, setPopCategory] = useState('');
    const [topCo, setTopCo] = useState('');
    const [topMainCa, setTopMainCa] = useState('');

    async function top10() {
        const topResults = await a_top10(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        setArray(topResults)
        console.log(topResults);
    }

    async function stateCount() {
        const fetchResults = await a_state_cnt(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setSuccess(fetchResults[0])
        setFail(fetchResults[1])
        setResults(fetchResults);
        console.log("inside stateCount : ", success);
    }

    async function pledgeBackers() {
        const fetchResults = await pledgeBacker(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setResPledge(fetchResults);
    }

    async function popularCat() {
        const fetchResults = await popCat(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setPopCategory(fetchResults);
    }

    async function topCountry() {
        const fetchResults = await topCountries(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setTopCo(fetchResults);
    }

    async function topMainCat() {
        const fetchResults = await topMainCategory(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setTopMainCa(fetchResults);
    }

    return (
        <ScrollView
            alignItems = 'center'
        >
            <View style={styles.container}>
                <Feather name="search" style={styles.title} />
                <Text style={styles.title}>Analysis</Text>
            </View>
            <View class='search-bar-container'>
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
                        title="Country"
                        country={country}
                        onTermChange={setCountry}
                    // onTermSubmit={console.log("submit term")}
                    />
                    <SearchBar
                        title="State"
                        cyrrency={state}
                        onTermChange={setState}
                    // onTermSubmit={console.log("submit term")}
                    />
                </View>
            </View>

            <View style={{flex: 1, width: 500, height: 500, alignSelf: 'center', flexDirection: 'row', alignItems: 'flex-start'}}>
            <View style={{ flex: 1, width: 100, margin: 10, flexGrow: 1, }}>
            <View style={{flex: 1,height: 100,maxHeight: 100,margin: 10,flexGrow: 1,}} />
            <Button
                title="Top 5 Successful Categories"
                backgroundColor = '#1F618D'
                backgroundProgress = '#154360'
                onPress={() => {
                    setResults('');
                    setArray('');
                    setResPledge('');
                    setTopCo('');
                    setTopMainCa('');
                    popularCat();
                }
            }/>
            <View style={{flex: 1, height: 100, maxHeight: 100,margin: 10, }} />
            <Button
                title="Top 5 Pledged USD"
                backgroundColor = '#1F618D'
                backgroundProgress = '#154360'
                onPress={() => {
                    setResults('');
                    setResPledge('');
                    setPopCategory('');
                    setTopCo('');
                    setTopMainCa('');
                    top10();
                }
            }/>
            <View style={{flex: 1, height: 100,margin: 10,}} />
            <Button
                title="Success VS Fail"
                backgroundColor = '#1F618D'
                backgroundProgress = '#154360'
                onPress={() => {
                    setArray('');
                    setResPledge('');
                    setPopCategory('');
                    setTopCo('');
                    setTopMainCa('');
                    stateCount();
                }
            }/>
            </View>
            <View style={{flex: 1, width: 100, margin: 10, flexGrow: 1,}}>
            <View style={{flex: 1,height: 100,maxHeight: 100,margin: 10,}} />
            <Button
                title="Top 5 MainCategory"
                backgroundColor = '#1F618D'
                backgroundProgress = '#154360'
                onPress={() => {
                    setResults('');
                    setArray('');
                    setPopCategory('');
                    setResPledge('');
                    setTopCo('');
                    topMainCat()
                }
            }/>
            <View style={{flex: 1,height: 100,maxHeight: 100,margin: 10,}} />
            <Button
                title="Top 5 Coutries"
                backgroundColor = '#1F618D'
                backgroundProgress = '#154360'
                onPress={() => {
                    setResults('');
                    setArray('');
                    setPopCategory('');
                    setResPledge('');
                    setTopMainCa('');
                    topCountry();
                }
            }/>
            <View style={{flex: 1,height: 100,maxHeight: 100,margin: 10,}} />
            <Button
                title="Backers VS Pledged"s
                backgroundColor = '#1F618D'
                backgroundProgress = '#154360'
                onPress={() => {
                    setResults('');
                    setArray('');
                    setPopCategory('');
                    setTopCo('');
                    setTopMainCa('');
                    pledgeBackers()
                }
            }/>
            </View>
            </View>
            <View>
                <br />
                {(results.length > 0) && <PieChart
                    animate 
                    animationDuration={1000}
                    animationEasing="ease-out"
                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                    center={[50,50]}
                    data={[
                        { name: 'success', value: success, color: '#5680BF' },
                        { name: 'fail', value: fail, color: '#B8C0C9' },
                    ]}
                />              
                }    
            </View>
            <View>{results.length>0 &&  <Text style={{color:'#5680BF',  textAlign: 'center'}}>SUCCESS %</Text>}</View>
            <View>{results.length>0 &&  <Text style={{color:'#B8C0C9',  textAlign: 'center'}}>FAIL %</Text>}</View>
            {<View>
               {array.length > 0 && <BarChart
                    // style={graphStyle}
                    data={{
                        labels: array.map(col => col[2]),
                        datasets: [{
                            data: array.map(col => (col[13]/1000))
                        }]
                    }}
                    width={Dimensions.get('window').width} // from react-native
                    height={300}
                    style={{ paddingLeft: 20, backgroundColor:'#eff3ff' }}
                    yAxisLabel={'$'}
                    yAxisSuffix={'k'}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
                      }}
                />}
            </View>}

            <View>
                {resPledge.length>0 && <LineChart
                    data={{
                        labels: resPledge.map(item => item[1]),
                        datasets: [{
                            data: resPledge.map(item => item[0]/1000)
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
                {popCategory.length>0 && <LineChart
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
                {topCo.length>0 && <LineChart
                    data={{
                        labels: topCo.map(item => item[0]),
                        datasets: [{
                            data: topCo.map(item => item[1]/1000)
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
                {topMainCa.length>0 && <LineChart
                    data={{
                        labels: topMainCa.map(col => col[0]),
                        datasets: [{
                            data: topMainCa.map(col => col[1]/1000)
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
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: "#333",
      width: 100,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "#FFF"
    }
  });
  
// const styles = StyleSheet.create({
//     title: {
//         justifyContent: 'center',
//         fontSize: 40
//     },
//     container: {
//         flex: 2,
//         flexDirection: 'row',
//         justifyContent: 'center'
//     },
//     tableRow: {
//         fontSize: 11
//     },
//     container2: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//         header: { height: 50, backgroundColor: '#537791' },
//         text: { textAlign: 'center', fontWeight: '100' },
//         dataWrapper: { marginTop: -1 },
//         row: { height: 40, backgroundColor: '#E7E6E1' }
// });

export default AnalysisScreen;