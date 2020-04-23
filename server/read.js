//import axios from 'axios';
//const create = require('./OLDcreateData')
const create = require('./createData')
const Promise = require('promise');
const parse = require('./parse')
const axios = require('axios')

const getCSV = async () => {
    var str = []
    var url = 'https://raw.githubusercontent.com/rtodd001/ttteam/rtodd/data/ks-projects-201801.csv'
    console.log("Getting")
    return new Promise(function(resolve, reject){
        axios.get(url).then(res => res)
        .then(
            (result)=>{
                //let str = []
                //str.push(result.data)
                let lst = parse.parseCSV([result.data])
                //console.log("get:",result.data)
                //let ret = create.createData(lst)

                resolve(lst)
            },
            (error) => {
                console.log("Error")
            }
        )
        
    })

    /* let res = await axios.get(url).then((res) =>{
        console.log("Received")
        str.push(res.data)
        let lst = parse.parseCSV(str)
        let data = create.createData(lst)
        //let data = create.OLDcreateData(lst)
        //str.push(res.data)
        //console.log(data)
        return data;
    },(error)=>{
        console.log("Error")
        return []
    }); */
};
exports.getCSV = getCSV;