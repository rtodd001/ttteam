import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {globalArray} from '../components/Global'

const ResultScreen = ({navigation}) => {
    console.log("reuslt")
    console.log(globalArray);
    return <View>
        <Text>{item[0]}</Text>
    </View>
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: "center",
        paddingVertical: 15,
        backgroundColor: 'rgb(153, 102, 255)'
    }
});

export default ResultScreen;