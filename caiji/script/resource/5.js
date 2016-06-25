/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
(function(){

	if(1 !== resource.DEPTH) return callback(null);

	var data = [];

	(function(){
		resource.html.match(/<a\s.*href=(\"([^<>"\']*)\").*>下一页<\/A>/ig);
		var uri = RegExp.$2;

		if(uri){
			data.push({
				DEPTH: 1,
				URI: 'http://www.poxiao.com'+ uri
			});
		}
	})();

	(function(){
		var $ = cheerio.load(resource.html, { decodeEntities: false });

		$('.content', '.yp-list-box').find('h3').each(function (i, elem){
			var that = $(this);
			var a = that.find('a');

			data.push({
				TITLE: a.text(),
				DEPTH: 2,
				URI: 'http://www.poxiao.com'+ a.attr('href')
			});
		}); // FOR
	})();

	callback(null, data);
})();