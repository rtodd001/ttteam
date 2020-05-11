import React from 'react';
import {Button, Text, View, StyleSheet, Image, Dimensions} from 'react-native';

const HomeScreen = ({navigation}) => {
    return <View>
        <Image style={{resizeMode: 'center', width:Dimensions.get('window').width, height:200}}source={require('../../assets/ttteamLogo.jpg')}/>

        {/* <Text style={styles.title}>TTTEAM KickStarter Projects Analytics</Text> */}

        <Button
            title="Search"
            onPress={() => navigation.navigate('Search')}
        />
        <Button
            title="Analysis"
            onPress={() => navigation.navigate('Analysis')}
        />
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

export default HomeScreen;