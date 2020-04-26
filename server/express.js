const express = require('express')
const KickStarter = require('./KickStarter').KickStarter
const cors = require('cors')
const app = express()
const port = 5000

console.log("Reading")
let KS = new KickStarter()
//console.log("Class", KS.mapData)

app.use(cors())
app.get('/search', (req, res) => {
    let keys = []
    let values = []
    for (const key in req.query){
        keys.push(key)
        values.push(req.query[key])
    }

    let found = KS.searchCSV(keys, values)
    res.status(200).json({"item":[{"data": found}]})
});

app.post('/insert', (req, res) => {
    let keys = []
    let values = []
    for (const key in req.query){
        keys.push(key)
        values.push(req.query[key])
    }
});

app.put('/update', (req, res) => {
    let keys = []
    let values = []
    for (const key in req.query){
        keys.push(key)
        values.push(req.query[key])
    }
    let newValue = KS.updateCSV(keys,values)
    res.status(200).json({"item":[{"data": newValue}]})


    //let newValue = update.updateCSV(keys,values,mappedData,data)
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
