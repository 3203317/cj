/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
(function(){
	// TODO
	if(1 !== doc.DEPTH) return callback(null);

	// TODO
	var data = [];
	var $ = cheerio.load(doc.html, { decodeEntities: false });

	$('#indextopleft').find('li').each(function (i, elem){
		var that = $(this);
		var a = that.find('>a');

		// TODO
		data.push({
			TITLE: a.text(),
			DEPTH: 2,
			URI: 'http://www.poxiao.com'+ a.attr('href')
		});
	}); // FOR

	// TODO
	callback(null, data);
})(); // END