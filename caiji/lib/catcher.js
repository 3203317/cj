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

var STATE_START   = 1;
var STATE_STOPED  = 2;

var STORAGE_PATH = path.join(conf.robot.catcher.storage_path);

module.exports = function(opts){
	return new Component(opts);
};

var Component = function(opts){
	var self = this;
	opts = opts || {};
	self.opts = opts;
};

module.exports = Component;
var pro = Component.prototype;
pro.name = '__catcher__';

pro.start = function(){
	this.state = STATE_START;
	start.call(this);
};

pro.stop = function(force){
	this.state = STATE_STOPED;
};

function start(){
	var self = this;
	if(STATE_STOPED === self.state) return;
	// TODO
	biz.uri.getByFinished(0, function (err, doc){
		if(err) return start.call(self);
		if(!doc) return start.call(self);

		// TODO
		sendReq.call(self, doc.URI, doc.CHARSET, function (err, html){
			if(err){
				++doc.RETRY_COUNT;
				return biz.uri.editInfo(doc, function (err, status){
					console.log('[%s] 重试次数+1.', utils.format());
					start.call(self);
				});
			}

			// TODO
			doc.FINISHED = 1;
			biz.uri.editInfo(doc, function (err, status){
				if(err) return start.call(self);
				console.log('[%s] 入库.', utils.format());
				// TODO
				fs.writeFile(STORAGE_PATH +'/'+ doc.id + conf.robot.catcher.file_suffix, html, function (err){
					if(err) return start.call(self);
					console.log('[%s] 写入文件.', utils.format());
					start.call(self);
				});
			});
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
				console.error('响应超时处理');
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
			console.error('请求超时处理');
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