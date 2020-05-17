import React from 'react';
import { Button, useState, Text, View, StyleSheet, Image, Dimensions } from 'react-native';

const HomeScreen = ({ navigation }) => {
    console.log(Dimensions.get('window').width);
    return <View style={styles.container}>

        <Image style={styles.logo}
            source={require('../../assets/ttteamLogo.jpg')}
        />

        <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
            <Button style={styles.button}
                title="Search"
                onPress={(e) => {
                    console.log(e);
                    e.preventDefault();
                  return  navigation.navigate('Search')
                }}
            />
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
            <Button style={styles.button}
                title="Analysis"
                onPress={() => navigation.navigate('Analysis')}
            />
        </View>


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