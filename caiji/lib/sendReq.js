/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var http = require('http');
var https = require('https');

var BufferHelper = require('bufferhelper');
var iconv = require('iconv-lite');

var sendReq = function(uri, charset, cb){
	charset = charset || 'utf-8';

	(function(){
		var request = getReq(uri);

		var req = request(uri, function (res){
			var bh = new BufferHelper();
			// var ct = res.headers['content-type'];

			res.setTimeout(1000 * 3, function(){
				console.error('[%s] 响应超时 %s', (new Date().getTime()), uri);
			});

			res.on('data', function (chunk){
				bh.concat(chunk);
			});

			res.on('end', function(){
				try{
					cb(null, iconv.decode(bh.toBuffer(), charset));	
				}catch(e){ cb(e); }
			});

			res.on('error', function (err){
				cb(err);
			});
		});

		req.setTimeout(1000 * 3, function(){
			console.error('[%s] 请求超时 %s', (new Date().getTime()), uri);
		});

		req.on('error', function (err){
			cb(err);
		});

		req.end();
	})();
};

/**
 * 返回HTML字符串
 *
 * @params
 * @return
 */
module.exports = sendReq;

/**
 * 获取http或https
 *
 * @params
 * @return
 */
function getReq(uri){
	return (0 === uri.indexOf('https:')) ? https.request : http.request;
}

// sendReq('http://www.xiaoluo.cc/v/index434.html', 'gbk', function (err, html){
// 	if(err) return console.error(err);
// 	console.log(html);
// });