const ogs = require('open-graph-scraper');

const getMetaData = async (req, res) => {
	const options = req.query;

	if (!validateUrl(options.url)) {
		res.status(400)
			.json({
				message: 'please provide a valid url'
			})
	}

	try {
		const {error, result} = await ogs(options);
		if (error) {
			res.status(400)
				.json({
					message: `we can't process the request`
				});
		}

		res.status(200)
			.json(result);
	} catch (e) {
		res.status(500)
			.json({
				message: 'something went wrong!'
			})
	}
}

const validateUrl = (url) => {
	const urlRegEx = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;

	return urlRegEx.test(url);
}

module.exports = {
	getMetaData
};