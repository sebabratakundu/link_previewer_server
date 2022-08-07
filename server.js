require('dotenv').config();
const express = require('express');
const cors = require('cors');
const openGraph = require('./controllers/og.controller');
const app = express();
const PORT = process.env.PORT || 3300;
const corsOptions = {
	origin: process.env.LINK_PREVIEW_HOST
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
	const options = req.query;
	if (validateUrl(options.url)) {
		next();
		return;
	}

	res.status(400)
		.json({
			message: 'please provide a valid url'
		});
}, (req, res) => {
	openGraph.getMetaData(req, res);
})

const validateUrl = (url) => {
	const urlRegEx = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;

	return urlRegEx.test(url);
}

app.all('*', function (req, res) {
	res.status(405)
		.json({
			message: 'method not allowed'
		});
});

app.listen(PORT, () => {
	console.log(`'start listing to ${PORT}`)
})
