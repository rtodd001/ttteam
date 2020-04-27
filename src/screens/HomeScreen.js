import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
    return <View>
        <Text style={styles.title}>KickStarter Projects Analytics</Text>

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