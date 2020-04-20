import React from 'react'
import {Text, View, StyleSheet, Image } from 'react-native'
import term from './HomeScreen'
import HomeScreen, {searchWord} from './HomeScreen'

const ResultsScreen = ({navigation}) => {
    
    let temp = []
    temp = searchWord
    console.log("temp", temp)
    return (
        
    <View>
        <Image source={require('../../assets/placeHolder.png')}/>
        {console.log("result",searchWord)}
                <Text style = {styles.title}> {"" + searchWord[0]} </Text>
    </View>
)}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: "center",
        paddingVertical: 15,
        backgroundColor: 'rgb(153, 102, 255)'
    }
});

//sconst styles = StyleSheet.create({});

export default ResultsScreen;
