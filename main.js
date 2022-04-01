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

/*
const start= Date.now();

console.log('${start}-${randomIntFromInterval(100000,999999)}');

function randomIntFromInterval(min, max){
  return Math.floor(Math.random()*(max-min+1)+min)
}
*/