const express = require('express')
const bodyParser = require('body-parser')
const create = require('./createData')
const parse = require('./parse')
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
    let lst = parse.parseCSV(strsplit)
    let data = create.createData(lst)
    if(req.params.key === 'ID'){
        let ret = []
        ret.push("hello")
        console.log(ret)
    }
    else{
        res.status(200).json({"item":[{"data": data}]})
        console.log(data)
    }
    
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
