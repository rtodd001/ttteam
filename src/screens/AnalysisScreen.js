import React, { useState, Fragment  } from 'react'
import { Dimensions, Text, Alert, View, ScrollView, StyleSheet, Button, TextInput, Picker, TouchableWithoutFeedback, Animated} from 'react-native'
import { Feather } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar'
import AwesomeButton from 'react-native-really-awesome-button';
import { a_top10, a_state_cnt } from '../components/fetch'
import { PieChart, FullOption } from 'react-minimal-pie-chart'
import { BarChart } from 'react-native-chart-kit'

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

    async function top10() {
        const fetchResults = await a_top10(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        setArray(fetchResults)
        console.log(fetchResults);
    }

    async function stateCount() {
        const fetchResults = await a_state_cnt(ID, name, category, mainCategory, currency, deadline, goal, launched, pledged, state, backers, country, usdPledged, usdPledgedReal, usdGoalReal)
        console.log(fetchResults);
        setSuccess(fetchResults[0])
        setFail(fetchResults[1])
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
                        title="Currency"
                        cyrrency={currency}
                        onTermChange={setCurrency}
                    // onTermSubmit={console.log("submit term")}
                    />
                </View>
            </View>

           <Button
                title="Analysis"
                onPress={() => {
                    top10()
                    stateCount()
                    //search()
                }
            }/>

            <AwesomeButton
                progress
                backgroundColor = '#1F618D'
                backgroundProgress = '#154360'
                width = {300}
                onPress={(next) => {
                    /** Do Something **/
                    next();
                }}
            >
                Top 5 Pledged Real
            </AwesomeButton>

            <View>
                <br />
                {(results.length > 0) && <PieChart
                    animate 
                    animationDuration={1000}
                    animationEasing="ease-out"
                    barRadius={200}
                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                    center={[
                    50,
                    50
                    ]}
                    data={[
                        { title: 'success', value: success, color: '#5680BF' },
                        { title: 'fail', value: fail, color: '#B8C0C9' },
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
                        labels: array.map(col => col[0]),
                        datasets: [{
                            data: array.map(col => (col[13]/1000))
                        }]
                    }}
                    width={Dimensions.get('window').width} // from react-native
                    height={600}
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