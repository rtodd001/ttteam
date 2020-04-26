//import axios from 'axios';
//const create = require('./OLDcreateData')
const create = require('./createData')
const fs = require('fs')
const Promise = require('promise')
const parse = require('./parse')
const axios = require('axios')

const getCSV = () => {
    var str = []
    //var url = 'https://raw.githubusercontent.com/rtodd001/ttteam/rtodd/data/ks-projects-201801.csv'
    //console.log("Getting")
    return new Promise(function(resolve, reject){
        var path = '../data/ks-projects-201801.csv'
    //var path = './../data/SmallCommaTest.csv'
        let content = fs.readFileSync(path, 'utf8')
        let lst = parse.parseCSV(content)
        resolve(lst)
    })
    
};
exports.getCSV = getCSV;