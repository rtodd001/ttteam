//import axios from 'axios';
const axios = require('axios')

const getCSV = () => {
    var str = [];
    var url = 'https://raw.githubusercontent.com/rtodd001/ttteam/rtodd/data/CommaTest.csv'
    axios.get(url).then(res => {
        str.push(res.data);
    })
    return str;
};
exports.getCSV = getCSV;