import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
    return <View>
        <Text style={styles.title}>Welcome!</Text>

        <Button
            title="Search"
            onPress={() => navigation.navigate('Results')}
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