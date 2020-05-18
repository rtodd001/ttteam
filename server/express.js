const express = require('express')
const KickStarter = require('./KickStarter').KickStarter
const cors = require('cors')
const app = express()
const port = 5000
const {performance} = require('perf_hooks');

console.log("Reading")
const t0 = performance.now()
let KS = new KickStarter()
const t1 = performance.now()
console.log(`Data creation ${t1 - t0} milliseconds.`)
//set to true if there is an instance in the 'cache'
let cacheReady = [0,0,0,0,0,0]
let cache = [0,0,0,0,0,0]
let parameters = [0,0,0,0,0,0]
//console.log("Class", KS.mapData)

function equal(array1, array2) {
    if (!Array.isArray(array1) && !Array.isArray(array2)) {
        return array1 === array2;
    }

    if (array1.length !== array2.length) {
        return false;
    }

    for (var i = 0, len = array1.length; i < len; i++) {
        if (!equal(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}

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
    const t0 = performance.now()
    let found = KS.searchCSV(keys, items)
    const t1 = performance.now()
    console.log(`stateCount took ${t1 - t0} milliseconds.`)
    res.status(200).json({"item":[{"data": found}]})
});

app.post('/insert', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    for(let i = 0; i < cacheReady.length; i++){
        cacheReady[i] = false
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
    for(let i = 0; i < cacheReady.length; i++){
        cacheReady[i] = false
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
    for(let i = 0; i < cacheReady.length; i++){
        cacheReady[i] = false
    }
    //console.log("In express:", keys, items)
    let deletedValue = KS.deleteCSV(keys, items)
    //console.log("Deleted items", deletedValue)
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

//#0
app.get('/analysis/top5', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let top = []
    let number = 0
    const t0 = performance.now()
    if(parameters[number].length > 0){
        //console.log(parameters[number])
        if(equal(parameters[number][0], keys) && equal(parameters[number][1], items) && cacheReady){
            //console.log("cache hit")
            top = cache[number]
        }
        else{
            //console.log("cache[number] miss")
            parameters[number] = []
            parameters[number].push(keys)
            parameters[number].push(items)
            top = KS.top5CSV(keys,items)
            cache[number] = top
            cacheReady[number] = true
        }
    }
    else{
        //console.log("compulsory miss")
        parameters[number] = []
        parameters[number].push(keys)
        parameters[number].push(items)
        top = KS.top5CSV(keys,items)
        cache[number] = top
        cacheReady[number] = true
    }
    const t1 = performance.now()
    console.log(`Top5 took ${t1 - t0} milliseconds.`)
    res.status(200).json({"item":[{"data": top}]})
});

//#1
app.get('/analysis/stateCount', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let count = []
    let number = 1
    const t0 = performance.now()
    if(parameters[number].length > 0){
        //console.log(parameters[number])
        if(equal(parameters[number][0], keys) && equal(parameters[number][1], items) && cacheReady[number]){
            //console.log("cache hit")
            count = cache[number]
        }
        else{
            //console.log("cache[number] miss")
            parameters[number] = []
            parameters[number].push(keys)
            parameters[number].push(items)
            count = KS.stateCountCSV(keys,items)
            cache[number] = count
            cacheReady[number] = true
        }
    }
    else{
        //console.log("compulsory miss")
        parameters[number] = []
        parameters[number].push(keys)
        parameters[number].push(items)
        count = KS.stateCountCSV(keys,items)
        cache[number] = count
        cacheReady[number] = true
    }
    const t1 = performance.now()
    console.log(`stateCount took ${t1 - t0} milliseconds.`)
    res.status(200).json({"item":[{"data": count}]})
});

//#2
app.get('/analysis/pledgeBack', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let PB = []
    let number = 2
    const t0 = performance.now()
    if(parameters[number].length > 0){
        //console.log(parameters[number])
        if(equal(parameters[number][0], keys) && equal(parameters[number][1], items) && cacheReady){
            //console.log("cache hit")
            PB = cache[number]
        }
        else{
            //console.log("cache[number] miss")
            parameters[number] = []
            parameters[number].push(keys)
            parameters[number].push(items)
            PB = KS.pledgeBackerCSV(keys,items)
            cache[number] = PB
            cacheReady[number] = true
        }
    }
    else{
        //console.log("compulsory miss")
        parameters[number] = []
        parameters[number].push(keys)
        parameters[number].push(items)
        PB = KS.pledgeBackerCSV(keys,items)
        cache[number] = PB
        cacheReady[number] = true
    }
    const t1 = performance.now()
    console.log(`pledgeBack took ${t1 - t0} milliseconds.`)
    res.status(200).json({"item":[{"data": PB}]})
});

//#3
app.get('/analysis/popCat', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let catCount = []
    let number = 3
    const t0 = performance.now()
    if(parameters[number].length > 0){
        //console.log(parameters[number])
        if(equal(parameters[number][0], keys) && equal(parameters[number][1], items) && cacheReady){
            //console.log("cache hit")
            catCount = cache[number]
        }
        else{
            //console.log("cache[number] miss")
            parameters[number] = []
            parameters[number].push(keys)
            parameters[number].push(items)
            catCount = KS.popCatCSV(keys,items)
            cache[number] = catCount
            cacheReady[number] = true
        }
    }
    else{
        //console.log("compulsory miss")
        parameters[number] = []
        parameters[number].push(keys)
        parameters[number].push(items)
        catCount = KS.popCatCSV(keys,items)
        cache[number] = catCount
        cacheReady[number] = true
    }
    const t1 = performance.now()
    console.log(`popCat took ${t1 - t0} milliseconds.`)
    res.status(200).json({"item":[{"data": catCount}]})
});

//#4
app.get('/analysis/topCountries', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let countries = []
    let number = 4
    const t0 = performance.now()
    if(parameters[number].length > 0){
        //console.log(parameters[number])
        if(equal(parameters[number][0], keys) && equal(parameters[number][1], items) && cacheReady[number]){
            //console.log("cache hit")
            countries = cache[number]
        }
        else{
            //console.log("cache[number] miss")
            parameters[number] = []
            parameters[number].push(keys)
            parameters[number].push(items)
            countries = KS.richCountriesCSV(keys,items)
            cache[number] = countries
            cacheReady[number] = true
        }
    }
    else{
        //console.log("compulsory miss")
        parameters[number] = []
        parameters[number].push(keys)
        parameters[number].push(items)
        countries = KS.richCountriesCSV(keys,items)
        cache[number] = countries
        cacheReady[number] = true
    }
    const t1 = performance.now()
    console.log(`topCountries took ${t1 - t0} milliseconds.`)
    res.status(200).json({"item":[{"data": countries}]})
});

//#5
app.get('/analysis/topMainCategory', (req, res) => {
    let keys = []
    let items = []
    for (const key in req.query){
        keys.push(key)
        items.push(req.query[key])
    }
    let mainCat = []
    let number = 5
    const t0 = performance.now()
    if(parameters[number].length > 0){
        //console.log(parameters[number])
        if(equal(parameters[number][0], keys) && equal(parameters[number][1], items) && cacheReady[number]){
            //console.log("cache hit")
            mainCat = cache[number]
        }
        else{
            //console.log("cache[number] miss")
            parameters[number] = []
            parameters[number].push(keys)
            parameters[number].push(items)
            mainCat = KS.topMainCatergoryCSV(keys,items)
            cache[number] = mainCat
            cacheReady[number] = true
        }
    }
    else{
        //console.log("compulsory miss")
        parameters[number] = []
        parameters[number].push(keys)
        parameters[number].push(items)
        mainCat = KS.topMainCatergoryCSV(keys,items)
        cache[number] = mainCat
        cacheReady[number] = true
    }
    const t1 = performance.now()
    console.log(`topMainCategory took ${t1 - t0} milliseconds.`)
    res.status(200).json({"item":[{"data": mainCat}]})
});

app.get('/result', (req, res) => {

    res.status(200).json({"item":[{"data": "I got the searchData"}]})
    console.log('I said to change')
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
