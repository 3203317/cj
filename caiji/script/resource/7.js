/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
result = [];

(function(){
	var $ = cheerio.load(html, { decodeEntities: false });

	$('#indextopleft').find('li').each(function (i, elem){
		var that = $(this);
		var a = that.find('>a');

		// TODO
		result.push({
			TITLE: a.text(),
			DEPTH: 2,
			URI: 'http://www.poxiao.com'+ a.attr('href')
		});
	}); // END
})(); // END

html = null;