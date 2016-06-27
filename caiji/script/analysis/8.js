/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
var cheerio = require('cheerio');
var Spooky = require('spooky');

var resource = {
	// URI: 'http://cn163.net/archives/3408/',
	URI: 'http://www.foreworld.net/',
	// URI: 'http://www.xiaoluo.cc/v/index434.html',
	DEPTH: 2,
	html: '<html><body></body></html>'
};

function callback(err, json){
	if(err) return console.log(err);
	console.log(json);
}

(function(){
	// 深度判断
	if(2 !== resource.DEPTH) return callback(null);

	function casperjs(uri, cb){
		var spooky = new Spooky({
			child: {
				transport: 'http'
			}, casper: {
				logLevel: 'debug',
				verbose: true,
				timeout: 1000 * 10,
				pageSettings: {
					// outputEncoding: 'gb2312',
					loadImages: false,
					loadPlugins: false
				}
			}
		}, function (err){
			if(err){
				var e = new Error('Failed to initialize SpookyJS');
				e.details = err;
				throw e;
			}

			// start
			spooky.start(uri);

			spooky.then(function(){

				// data
				var json = {};

				try{
					json.TITLE = this.getTitle();
					// json.INTRO = this.getHTML('p.inner_content');
					// json.OTHER = this.evaluate(function(){
					// 	return __utils__.findOne('#button').getAttribute('value');
					// });
					// json.IMG = this.evaluate(function(){
					// 	var img = __utils__.findOne('#film span.detail_pic1 img').getAttribute('src');

					// 	__utils__.echo('--------');
					// 	__utils__.echo(film);
					// 	__utils__.echo('--------');

					// 	return img;
					// });
				}catch(e){ console.error(e); }

				// emit
				this.emit('json', json);
			});

			spooky.run();
		});

		spooky.on('console', function (line){
			console.log(line);
		});

		spooky.on('error', function (err, stack){
			var e = new Error();
			e.code = 'CasperError';
			e.details = err;
			cb(e);
		});

		spooky.on('json', function (json){
			console.log('[%s] 获取数据 %s', (new Date().getTime()), json.TITLE);
			cb(null, json);
			this.exit();
		});

		spooky.on('timeout', function(){
			__utils__.echo('timeout');
		});

		spooky.on('resource.requested', function (requestData, request){
			if(0 < requestData.url.indexOf('foreworld.net')){
				request.abort();
			}

			if(0 < requestData.url.indexOf('soso.com')){
				request.abort();
			}

			if(0 < requestData.url.indexOf('xunlei.com')){
				request.abort();
			}

			if(0 < requestData.url.indexOf('xiaoluo.cc')){
				request.abort();
			}

			if(0 < requestData.url.indexOf('miwifi.com')){
				request.abort();
			}
		});
	}

	function analysis(resource, cb){

		casperjs(resource.URI, function (err, json){
			if(err) return cb(err);

			var $ = cheerio.load(resource.html, { decodeEntities: false });
			// 标题
			// json.TITLE = $('#film').find('.detail_pic1').find('>img').attr('alt');
			// 图片
			// json.IMG = $('#film').find('.detail_pic1').find('>img').attr('src');
			// json.RELEASE_DATE = true;

			cb(null, json);
		});
	}

	analysis(resource, function (err, json){
		if(err) return callback(err);
		callback(null, json);
	});
})();