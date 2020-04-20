import React, {useState, Component} from 'react';
import {Button, Text, View, StyleSheet,} from 'react-native';
import SearchBar from './SearchBar';

let searchW = [];

const HomeScreen = ({navigation}) => {
    const [term, setTerm] = useState('');

    return <View>
        <Text style={styles.title}>Welcome!</Text>
        <SearchBar
            term={term}
            onTermChange={setTerm}
            onTermSubmit={console.log("submite term")}
        />
        <Button
            title="Search"
            onPress={() => {
                navigation.navigate('Results');
                const searchData = {
                    'ID' : null,
                    'name' : null,
                    'category' : null,
                    'main_category': term,
                    'currency' : null,
                    'deadline' : null,
                    'goal' : null,
                    'launched' : null,
                    'pledged' : null,
                    'state' : null,
                    'backers' : null,
                    'country' : null,
                    'used pledged' : null,
                    'usd_pledged_real' : null,
                    'usd_goal_real' : null
                };

                var url = new URL('http://192.168.1.8:5000/search')
                var params = {'main_category':term, 'state':'failed'} // or:
                //var params = [['main_category', term],['state', 'failed']]      
                url.search = new URLSearchParams(params).toString();            
                fetch(url)
            }
        }
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
export {searchW as searchWord}  ;
export default HomeScreen;