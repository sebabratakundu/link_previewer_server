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

app.get('/', (req, res) => {
	openGraph.getMetaData(req, res);
})

app.all('*', function (req, res) {
	res.status(405)
		.json({
			message: 'method not allowed'
		});
});

app.listen(PORT, () => {
	console.log(`'start listing to ${PORT}`)
})
