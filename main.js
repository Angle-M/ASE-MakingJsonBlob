const express = require('express')
const app = express()
const port = 3000

app.get('/api/jsonBlob/<blobID>', (req, res) =>{
  console.log(req.params);
  
  res.send('Root')
})

app.post('/api/jsonBlob', (req, res) =>{
  res.send('About')
})

app.put('/api/jsonBlob/<blobID>', (req, res) =>{
  res.send('About')
})

app.delete('/api/jsonBlob/<blobID>', (req, res) =>{
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

/*
1. Setup HTTP verbs

2. Create and retrieve unique IDs (Req. Params)

3. Read request body  with Body Parser

4. Write and Read Files
*/