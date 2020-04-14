const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

//app.get('/', (req, res) => res.send('Hello World!'))
app.use(cors())
app.get('/', (req, res) => {
    res.status(200).json({"item":[{"data": "Connection!"}]})
    console.log(`Request received`)
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
