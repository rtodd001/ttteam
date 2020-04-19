const express = require('express')
const read = require('./read')
const cors = require('cors')
const app = express()
const port = 5000

//app.get('/', (req, res) => res.send('Hello World!'))
var temp = read.getCSV()
app.use(cors())
app.get('/', (req, res) => {
    res.status(200).json({"item":[{"data": temp}]})
    console.log(temp)
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
