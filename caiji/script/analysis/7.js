/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
(function(){
	var data = [];

	function analysis(doc){
		var $ = cheerio.load(doc.html, { decodeEntities: false });

		// 标题
		var title = $('#film').find('.detail_pic1').find('>img').attr('alt');

		// 图片
		var img = $('#film').find('.detail_pic1').find('>img').attr('src');

		var newInfo = {
			RELEASE_DATE: true,
			IMG: img,
			TITLE: title
		};

		return newInfo;
	}

	(function(){
		for(var i in docs){
			var doc = docs[i];

			// TODO
			if((2 === doc.DEPTH) && !!doc.html){
				// 分析数据
				var newInfo = analysis(doc);
				data.push(newInfo);
			} // IF
		} // FOR
	})();

	// TODO
	cb(null, data);
})();