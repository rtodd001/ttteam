import React from 'react';
import {Button, Text, View, StyleSheet, Image, Dimensions} from 'react-native';

const HomeScreen = ({navigation}) => {
    return <View>
        <Image style={{resizeMode: 'center', width:Dimensions.get('window').width, height:200}}source={require('../../assets/ttteamLogo.jpg')}/>


    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10,
    },
    logo: {
        flex: 1,
        resizeMode: 'center',
        maxHeight: 200,
    },
    button: {
        flex: 1,
        height: 30,
        maxWidth: 150
    }
});

export default HomeScreen;