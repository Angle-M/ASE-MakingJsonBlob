const express = require('express')
const app = express()
const port = 3000

app.get('/api/', (req, res) =>{
  res.send('Root')
})

app.get('/api/', (req, res) =>{
  res.send('About')
})

app.get('/api/', (req, res) =>{
  res.send('Contact us')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
