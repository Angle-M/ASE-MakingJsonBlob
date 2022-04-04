const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000

//retrieve a JSON document from a file
//Needs to be formatted
app.get('/api/jsonBlob/<blobID>', (req, res) =>{
  var fs = require('fs');

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}
  
//create a new JSON document and save it into a file having a unique id, return the id
app.post('/api/jsonBlob', (req, res) =>{
  var iterator = 0; // this is going to be your identifier

function addIdentifier(target){
  target.id = iterator;
  iterator++;
}

function loop(obj){

  for(var i in obj){

    var c = obj[i];        

    if(typeof c === 'object'){

      if(c.length === undefined){

        //c is not an array
        addIdentifier(c);

      }

      loop(c);

    }

  }

}

loop(json); // json is your input object
  app.write();
  res.send('Got a POST request')
})


//update the content of a JSON document with new content and store it into the same file
//Needs to be configured  
app.put('/api/jsonBlob/<blobID>', (req, res) =>{
  const fs = require('fs');
const fileName = './file.json';
const file = require(fileName);
    
file.key = "new value";
    
fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
  res.send('Got a PUT request')
});


//reset the content of the JSON document
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