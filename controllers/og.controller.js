const ogs = require('open-graph-scraper');

const getMetaData = async (req, res) => {
	const options = req.query;

	try {
		const {error, result} = await ogs(options);
		if (error) {
			res.status(400)
				.json({
					message: `we can't process the request`
				});
		}

		const validResult = processResult(result);
		res.status(200)
			.json(validResult);
	} catch (e) {
		res.status(500)
			.json({
				message: 'something went wrong!'
			})
	}
}

const defaultCard = {
	ogTitle: 'Lorem Ipsum',
	ogImage: 'https://placehold.jp/500x261.png',
	ogUrl: 'https://example.com/',
	ogDescription: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled'
}

const processResult = (metadata) => {
	const ogTitle = metadata?.ogTitle || defaultCard.ogTitle;
	const ogImage = metadata?.ogImage?.url || defaultCard.ogImage;
	const ogUrl = metadata?.ogUrl || defaultCard.ogUrl;
	const ogSiteName = metadata?.ogSiteName || ogUrl.substring(8, ogUrl.length - 1);
	const ogDescription = metadata?.ogDescription || defaultCard.ogDescription;
	const twitterTitle = metadata?.twitterTitle || defaultCard.ogTitle;
	const twitterUrl = metadata?.twitterUrl || defaultCard.ogUrl;
	const twitterImage = metadata?.twitterImage?.url || defaultCard.ogImage;
	const favicon = metadata?.favicon || '';

	return {
		ogTitle,
		ogDescription,
		ogImage,
		ogUrl,
		ogSiteName,
		twitterTitle,
		twitterImage,
		twitterUrl,
		favicon
	}

}

module.exports = {
	getMetaData
};