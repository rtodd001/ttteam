const express = require('express')
const app = express()
const port = 5000

//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => res.status(200).json({items:[{data: 'Connection!'}]}));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
