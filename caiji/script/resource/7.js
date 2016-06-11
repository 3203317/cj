/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
(function(){
	// 深度判断
	if(1 !== doc.DEPTH) return callback(null);

	var data = [];
	var $ = cheerio.load(doc.html, { decodeEntities: false });

	$('#indextopleft').find('li').each(function (i, elem){
		var that = $(this);
		var a = that.find('>a');

		// 组装数据
		data.push({
			PID: doc.id,
			TITLE: a.text(),
			DEPTH: 1 + doc.DEPTH,
			SORT: 1 + i,
			URI: 'http://www.poxiao.com'+ a.attr('href')
		});
	});

	// 回调
	callback(null, data);
})();