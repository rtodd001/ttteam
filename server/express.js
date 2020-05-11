const express = require('express')
const KickStarter = require('./KickStarter').KickStarter
const cors = require('cors')
const app = express()
const port = 5000

console.log("Reading")
let KS = new KickStarter()
console.log("Loaded")
//console.log("Class", KS.mapData)

const isPreflight = (req) => {
    return (
      req.method === 'OPTIONS' &&
      req.headers['origin'] &&
      req.headers['access-control-request-method']
    )
  }

app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
  })

app.get('/search', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }

    let found = KS.searchCSV(keys, items)
    res.status(200).json({"item":[{"data": found}]})
});

app.post('/insert', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let inserted = KS.insertCSV(keys, items)
    res.status(200).json({"item":[{"data": inserted}]})
});

app.put('/update', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let newValue = KS.updateCSV(keys,items)
    res.status(200).json({"item":[{"data": newValue}]})
    //let newValue = update.updateCSV(keys,values,mappedData,data)
});

app.delete('/delete', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let deletedValue = KS.deleteCSV(keys, items)
    res.status(200).json({"item":[{"data": "Deleted!"}]})
});

app.put('/backup', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    KS.backupCSV(keys,items)
    res.status(200).json({"item":[{"data": "Backed up"}]})
});

app.get('/import', (req,res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    KS.importCSV(keys, items)
    res.status(200).json({"item":[{"data": "Imported"}]})
});

app.get('/analysis/top5', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    //console.log(req.query)
    //console.log(keys, items)
    let top = KS.analysisCSV(keys,items)
    res.status(200).json({"item":[{"data": top}]})
});

app.get('/analysis/stateCount', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let count = KS.stateCountCSV(keys,items)
    res.status(200).json({"item":[{"data": count}]})
});

app.get('/analysis/pledgeBack', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let PB = KS.pledgeBackerCSV(keys,items)
    res.status(200).json({"item":[{"data": PB}]})
});

app.get('/analysis/popCat', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let catCount = KS.popCatCSV(keys,items)
    res.status(200).json({"item":[{"data": catCount}]})
});

app.get('/analysis/topCountries', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let countries = KS.richCountriesCSV(keys,items)
    res.status(200).json({"item":[{"data": countries}]})
});

app.get('/analysis/topMainCategory', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let mainCat = KS.topMainCatergoryCSV(keys,items)
    res.status(200).json({"item":[{"data": mainCat}]})
});

app.get('/result', (req, res) => {

    res.status(200).json({"item":[{"data": "I got the searchData"}]})
    console.log('I said to change')
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
