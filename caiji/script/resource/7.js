/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
(function(){
	var data = [];
	var $ = cheerio.load(html, { decodeEntities: false });

	$('#indextopleft').find('li').each(function (i, elem){
		var that = $(this);
		var a = that.find('>a');

		// TODO
		data.push({
			TITLE: a.text(),
			DEPTH: 2,
			URI: 'http://www.poxiao.com'+ a.attr('href')
		});
	}); // END

	// TODO
	cb(null, data);
})(); // END