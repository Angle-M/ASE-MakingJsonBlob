/*
ID, Folders and extensions need to be setup and make a function to create a folder if we want to make it automatic 

*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false
}))
app.use(express.json());
const fs = require('fs');
const port = 3000


const logger = {
	info: (content) => { console.log('\x1b[42m%s\x1b[0m', 'INFO', content) },
	error: (content) => { console.log('\x1b[41m%s\x1b[0m', 'ERROR', content) }
}


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

app.post('/api', (req, res) => {
	const body = req.body
	//Generate Unique Identifier based on date
	let originalUUID = Date.now().toString();
    const id = originalUUID.split('').sort(function(){return 0.5-Math.random()}).join('');
	// const id = uuid.v4()
	const path = `${folder}/${id}${extension}`

	if(!fs.existsSync(folder)) {
		fs.mkdirSync(folder)
	}
	
	fs.writeFile(path, JSON.stringify(body), 'utf8', () => {
		logger.info(`New file created: ${path}`)
	})

	res.send(`ID: ${id}`)
})

app.get('/api/:id', (req, res) => {
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
	res.send(json)
	logger.info(`File with ID ${id} found`)
})

app.put('/api/:id', (req, res) => {
	const id = req.params.id
	const path = `${folder}/${id}${extension}`

	// TODO: req.body is accepted as text or json?
	const body = req.body

	let json = {}
	try {
		json = JSON.parse(fs.readFileSync(path, 'utf8'))
	} catch {
		res.status(404).send('The requested file does not exist!')
		logger.error(`File with ID ${id} does not exist`)
		return
	}

	fs.writeFile(path, JSON.stringify(body), 'utf8', () => {
		logger.info(`New content updated: ${path}`)
	})

	res.send('New content updated successfully!')
})

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
	fs.writeFile(path, '{}', 'utf8', () => {
		logger.info(`Delete content: ${path}`)
	})

	res.send('Content deleted successfully!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})