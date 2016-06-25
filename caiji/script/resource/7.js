/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
(function(){
	// 深度判断
	if(1 !== resource.DEPTH) return callback(null);

	var data = [];

	(function(){
		var $ = cheerio.load(resource.html, { decodeEntities: false });

		$('#indextopleft').find('li').each(function (i, elem){
			var that = $(this);
			var a = that.find('>a');

			// 组装数据
			data.push({
				PID: resource.id,
				TITLE: a.text(),
				DEPTH: 1 + resource.DEPTH,
				SORT: 1 + i,
				URI: 'http://www.poxiao.com'+ a.attr('href')
			});
		});
	})();

	// 回调
	callback(null, data);
})();