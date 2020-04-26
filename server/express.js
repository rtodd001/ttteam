const express = require('express')
const create = require('./createData')
const read = require('./read')
const search = require('./searchData')
const cors = require('cors')
const app = express()
const port = 5000

console.log("Reading")
let promise = read.getCSV()
let data = []
let mappedData = new Map()
//console.log(mappedData)
promise.then(function(result){
    data = result
    mappedData = create.createData(result)
    //console.log("completed", data)
})
//console.log("Out")

app.use(cors())
app.get('/search', (req, res) => {
    let keys = []
    let values = []
    for (const key in req.query){
        keys.push(key)
        values.push(req.query[key])
    }

    promise.then(function(result){
        let found = search.searchCSV(keys, values,mappedData,result)
        res.status(200).json({"item":[{"data": found}]})
    }, function(err){
        res.status(404).json({"item":[{"data": "empty"}]})
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
