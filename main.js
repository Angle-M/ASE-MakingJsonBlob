/*
ID, Folders and extensions need to be setup and make a function to create a folder if we want to make it automatic 

*/

//Starts server and sets up express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false
}))
app.use(express.json());
const fs = require('fs');
//Sets needed variables for the file
const folder = "./data";
const extension = ".json"
const port = 3000

//Sets up logger for error handling
const logger = {
	info: (content) => { console.log('\x1b[42m%s\x1b[0m', 'INFO', content) },
	error: (content) => { console.log('\x1b[41m%s\x1b[0m', 'ERROR', content) }
}

//More Setup and encoding for express
app.use(express.json({
	verify: (req, res, buf, encoding) => {
		try {
			JSON.parse(buf)
		} catch (error) {
			res.status(406).send('Cannot parse the given body.')
			logger.error(`Cannot parse the given body: ${buf}`)
		}
	}
}));

app.use(bodyParser.json())

//Event handler for POST request
app.post('/api', (req, res) => {
	const body = req.body
	//Generate Unique Identifier based on date
	let originalUUID = Date.now().toString();
    const id = originalUUID + Math.floor(Math.random() * (99999 - 10000) + 10000);;
	const path = `${folder}/${id}${extension}`
	//Checks if directory exists
	if(!fs.existsSync(folder)) {
		fs.mkdirSync(folder)
	}
	//Writes JSON information into new file
	fs.writeFile(path, JSON.stringify(body), 'utf8', () => {
		logger.info(`New file created: ${path}`)
		//Adds location field to header for requestor
		res.set('Location', `http://localhost:3000/api/${id}`)
		res.json(body)
	})	
})

//Event handler for GET request
app.get('/api/:id', (req, res) => {
	const id = req.params.id
	const path = `${folder}/${id}${extension}`
	let json = {}
	//Error handling to make sure file exists already
	try {
		json = JSON.parse(fs.readFileSync(path, 'utf8'))
	} catch {
		res.status(404).send('The requested file does not exist!')
		logger.error(`File with ID ${id} does not exist`)
		return
	}
	res.json(json)
	logger.info(`File with ID ${id} found`)
})

//Event handler for PUT Request
app.put('/api/:id', (req, res) => {
	const id = req.params.id
	const path = `${folder}/${id}${extension}`

	//Checks if file exists before overwriting it
	if(!fs.existsSync(path)){
		res.status(404).send();
		logger.error(`File with ID ${id} does not exist`);
	}else {
		//Overwrite the file with new information
		fs.writeFileSync(path, JSON.stringify(req.body));
		logger.info(`New content updated: ${path}`)
		res.json(req.body);
	}
})

//Event handler for DELETE request
app.delete('/api/:id', (req, res) => {
	const id = req.params.id
	const path = `${folder}/${id}${extension}`

	let json = {}
	try {
		json = JSON.parse(fs.readFileSync(path, 'utf8'))
	} catch {
		res.status(404).send('The requested file does not exist!')
		logger.error(`File with ID ${id} does not exist`)
		return
	}
	// TODO: reset content means make the existing json file an empty JSON object 
	// or delete it directly from the folder
	 
	fs.unlink( `./data/${id}.json`, (err) => {
		if(err) {
			throw err;
		}
	})
	console.log('Successfully Deleted /api/'+`${id}`);
	res.send('Content deleted successfully!')
})

//Event handler when server is started up
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})