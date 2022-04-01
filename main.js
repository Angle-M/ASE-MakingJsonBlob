const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000


app.get('/api/jsonBlob/<blobID>', (req, res) =>{
  console.log(req.params);
  app.use(bodyParser.json());
  res.send('Got a GET request')
})

app.post('/api/jsonBlob', (req, res) =>{
  app.write();
  res.send('Got a POST request')
})

app.put('/api/jsonBlob/<blobID>', (req, res) =>{
  app.write();
  res.send('Got a PUT request')
})

app.delete('/api/jsonBlob/<blobID>', (req, res) =>{
  app.write();
  res.send('Got a DELETE request')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function newFunction() {
  parse; application / x - www - form - urlencoded
}
/*
parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
parse application/json
app.use(bodyParser.json())
app.use(function (req, res) {
res.setHeader('Content-Type', 'application/json')
console.log(req.body.test);
res.write(req.body.test+'\n');
res.end(JSON.stringify(req.body, null, 2))
})
*/
/*
const start= Date.now();

console.log('${start}-${randomIntFromInterval(100000,999999)}');

function randomIntFromInterval(min, max){
  return Math.floor(Math.random()*(max-min+1)+min)
}
*/

/*
1. Setup HTTP verb 

2. Create and retrieve unique IDs (Req. Params)

3. Read request body  with Body Parser

4. Write and Read Files
*/