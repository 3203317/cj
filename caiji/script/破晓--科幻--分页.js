/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
result = [];

(function(){
	html.match(/<a\s.*href=(\"([^<>"\']*)\").*>下一页<\/A>/ig);
	var uri = RegExp.$2;

	if(uri){
		result.push({
			DEPTH: 1,
			URI: 'http://www.poxiao.com'+ uri,
			RUN_SCRIPT: RUN_SCRIPT
		});
	}
})();

RUN_SCRIPT = null;
html = null;