const express = require('express')
const read = require('./read')
const cors = require('cors')
const app = express()
const port = 5000

//app.get('/', (req, res) => res.send('Hello World!'))
var strsplit = read.getCSV()

app.use(cors())
app.get('/', (req, res) => {
    //there are commas in the names of products used so we cannot use split()
    //this regex replaces split() and will extract all the cells that we need into
    //an array of strings
    let re =/(\"+(?=.*\").*\")|(^\"\?|\/|\.|\;|\·|\-|\:|\w|\s$)+/g
    var lst = strsplit[0].toString().match(re)
    res.status(200).json({"item":[{"data": lst}]})
    console.log(lst)
});

app.get('/result', (req, res) => {

    res.status(200).json({"item":[{"data": "I got the searchData"}]})
    console.log('I said to change')
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
