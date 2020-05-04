import React from 'react';
import {Button, Text, View, StyleSheet, Image} from 'react-native';

const HomeScreen = ({navigation}) => {
    return <View>
<<<<<<< HEAD
        <Image style={{resizeMode: 'center', height:250}}source={require('../../assets/ttteamLogo.jpg')}/>
=======
        <Image style={{resizeMode: 'center', width:50, height:250}}source={require('../../assets/ttteamLogo.jpg')}/>
>>>>>>> 8ef0f5bce86fd75c75b841f5dad807cd078910fb

        {/* <Text style={styles.title}>TTTEAM KickStarter Projects Analytics</Text> */}

        <Button
            title="Search"
            onPress={() => navigation.navigate('Search')}
        />
        <Button
            title="Update"
            onPress={() => navigation.navigate('Update')}
        />
        <Button
            title="Insert"
            onPress={() => navigation.navigate('Insert')}
        />
        <Button
            title="Delete"
            onPress={() => navigation.navigate('Delete')}
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