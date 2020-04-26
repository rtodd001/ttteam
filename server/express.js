const express = require('express')
const Promise = require('promise')
const bodyParser = require('body-parser')
const create = require('./createData')
const parse = require('./parse')
const read = require('./read')
const search = require('./searchData')
const cors = require('cors')
const app = express()
const port = 5000

//app.get('/', (req, res) => res.send('Hello World!'))
console.log("Reading")
let promise = read.getCSV()
let data = []
let mappedData = new Map()
promise.then(function(result){
    data = result
    mappedData = create.createData(result)
    //console.log("completed", data)
})
//console.log("Out")

app.use(cors())
app.get('/search', (req, res) => {
    //there are commas in the names of products used so we cannot use split()
    //this regex replaces split() and will extract all the cells that we need into
    //an array of strings
    //console.log("In the get")
    //let lst = parse.parseCSV(strsplit)
    //let data = create.createData(lst)
    let keys = []
    let values = []
    for (const key in req.query){
        keys.push(key)
        values.push(req.query[key])
        //console.log(key, req.query[key])
    }

    let found = search.searchCSV(keys, values,mappedData,data)
    //console.log(found)
    res.status(200).json({"item":[{"data": found}]})
    //let found = search.searchCSV(keys, values, data)
    console.log("Sending Back")
    /* promise.then(function(result){
        let mappedData = create.createData(result)
        let found = search.searchCSV(keys, values,mappedData,result)
        //console.log(found)
        res.status(200).json({"item":[{"data": "found"}]})
    }, function(err){
        res.status(404).json({"item":[{"data": "empty"}]})
    }); */
    
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
