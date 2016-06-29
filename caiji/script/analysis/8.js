/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
var cheerio = require('cheerio');
var Spooky = require('spooky');

var sendReq = require('../../lib/sendReq');

var resource = {
	// URI: 'https://www.taobao.com',
	// URI: 'http://cn163.net/archives/3408/',
	// URI: 'http://www.foreworld.net/',
	// URI: 'http://www.poxiao.com/movie/41317.html',
	URI: 'http://www.xiaoluo.cc/v/index434.html',
	DEPTH: 2,
	CHARSET: 'gbk',
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
				timeout: 1000 * 60,
				pageSettings: {
					// outputEncoding: 'gb2312',
					loadImages: false,
					loadPlugins: false
				}
			// }, child: {
			// 	command: 'casper',
			// 	ssl-protocol: 'tlsv1',
			// 	ignore-ssl-errors: true
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

		var s = [
			'baidustat1c.com',
			'cnzz.com',
			'duoshuo.com',
			'e708.net',
			'e701.net',
			'foreworld.net',
			'soso.com',
			'xunlei.com',
			'xiaoluo.cc',
			'miwifi.com'
		];

		spooky.on('resource.requested', function (requestData, request){

			for(var i in s){
				if(0 < requestData.url.indexOf(s[i])){
					request.abort();
				}
			}
		});
	}

	function analysis(resource, cb){

		var j = {};

		var $ = cheerio.load(resource.html, { decodeEntities: false });

		// 标题
		j.TITLE = $('#main .pic img').attr('alt');
		// 图片
		j.IMG = $('#main .view .pic img').attr('src');
		// 动作片
		j.MATERIAL_ID_NAME = $('#main .view .info ul li').eq(1).find('a').text();

		// 演员
		j.演员 = $('#main .view .info ul li').eq(2).find('a');

		if(true) return cb(null, j);

		casperjs(resource.URI, function (err, json){
			if(err) return cb(err);
			cb(null, j);
		});
	}

	// analysis(resource, function (err, json){
	// 	if(err) return callback(err);
	// 	callback(null, json);
	// });

	sendReq(resource.URI, resource.CHARSET, function (err, html){
		if(err) return callback(err);

		// html 写入文件
		resource.html = html;

		analysis(resource, function (err, json){
			if(err) return callback(err);
			callback(null, json);
		});
	});
})();