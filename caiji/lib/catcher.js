/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var fs = require('fs');

var util = require('util');
var utils = require('speedt-utils');

var path = require('path');

var http = require('http');
var https = require('https');
var url = require('url');

var BufferHelper = require('bufferhelper');
var iconv = require('iconv-lite');

var conf = require('../settings');

var biz = {
	uri: require('../biz/uri')
};

var STORAGE_PATH = path.join(conf.robot.catcher.storage_path);

module.exports = function(opts){
	return new Component(opts);
};

var Component = function(opts){
	var self = this;
	opts = opts || {};
	self.opts = opts;
	// TODO
	self.state_running = false;
};

module.exports = Component;
var pro = Component.prototype;
pro.name = '__catcher__';

pro.start = function(){
	var self = this;
	if(self.state_running) return;
	self.state_running = true;
	// TODO
	start.call(self);
};

pro.stop = function(force){
	// TODO
};

function start(){
	var self = this;
	// TODO
	biz.uri.getByFinished(0, function (err, doc){
		if(err) throw err;
		if(!doc){
			self.state_running = false;
			return;
		}

		// TODO
		sendReq.call(self, doc.URI, doc.CHARSET, function (err, html){
			if(err){
				++doc.RETRY_COUNT;
				return biz.uri.editInfo(doc, function (err, status){
					if(err) throw err;
					console.log('[%s] 重试次数+1.', utils.format());
					start.call(self);
				});
			}

			(function(){
				var newFolder = STORAGE_PATH +'/'+ doc.TASK_ID;

				function editInfo(){
					doc.FINISHED = 1;
					biz.uri.editInfo(doc, function (err, status){
						if(err) throw err;
						console.log('[%s] 入库.', utils.format());
						// TODO
						start.call(self);
					});
				}

				function writeFile(){
					fs.writeFile(newFolder +'/'+ doc.id + conf.robot.catcher.file_suffix, html, function (err){
						if(err) throw err;
						console.log('[%s] 写入文件.', utils.format());
						editInfo();
					});
				}

				fs.exists(newFolder, function (exists){
					if(!exists){
						return fs.mkdir(newFolder, 777, function (err){
							if(err) throw err;
							// TODO
							writeFile();
						});
					}
					// TODO
					writeFile();
				});
			})();
		});
	});
}

/**
 * 返回HTML字符串
 *
 * @params
 * @return
 */
function sendReq(uri, charset, cb){
	charset = charset || 'utf-8';

	(function(){
		var request = getReq(uri);

		var req = request(uri, function (res){
			var bh = new BufferHelper();
			// var ct = res.headers['content-type'];

			res.setTimeout(conf.robot.catcher.response_timeout, function(){
				console.error('[%s] 响应超时处理.', utils.format());
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

		req.setTimeout(conf.robot.catcher.request_timeout, function(){
			console.error('[%s] 请求超时处理.', utils.format());
		});

		req.on('error', function (err){
			cb(err);
		});

		req.end();
	})();
}

/**
 * 获取http或https
 *
 * @params
 * @return
 */
function getReq(uri){
	return (0 === uri.indexOf('https:')) ? https.request : http.request;
}