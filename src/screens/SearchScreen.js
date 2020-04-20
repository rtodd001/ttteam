import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, TextInput } from 'react-native'
import Input from '../components/Input'

const SearchScreen = () => {

    return <View>
        <Text>ID: </Text>
        <Input
            defaultText = "Enter Project ID"
        />
        <Text>Parameter: </Text>
        <Input
            defaultText = "Enter Parameters"
        />
    </View>
}

const styles = StyleSheet.create({});

export default SearchScreen;