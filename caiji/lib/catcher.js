/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var vm = require('vm');

var util = require('util');
var utils = require('speedt-utils');

var http = require('http');
var https = require('https');

var BufferHelper = require('bufferhelper');
var iconv = require('iconv-lite');

var conf = require('../settings');

var biz = {
	uri: require('../biz/uri')
};

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

function editInfo(doc){
	var self = this;
	// TODO
	doc.FINISHED = 1;
	biz.uri.editInfo(doc, function (err, status){
		if(err) throw err;
		// TODO
		console.log('[%s] 入库', utils.format());
		start.call(self);
	});
}

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
					console.log('[%s] 重试次数+1', utils.format());
					start.call(self);
				});
			}

			// TODO
			if(!html) return editInfo.call(self, doc);

			// 运行脚本
			var script = vm.createScript(doc.RUN_SCRIPT);
			// TODO
			var sandbox = { html: html };
			script.runInNewContext(sandbox);
			// TODO
			if(!sandbox.result) return editInfo.call(self, doc);

			// 写入新URI
			var newInfo = {
				URI: sandbox.result,
				CHARSET: doc.CHARSET,
				TASK_ID: doc.TASK_ID
			};

			// TODO
			biz.uri.saveNew(newInfo, function (err, status){
				if(err) throw err;
				// TODO
				console.log('[%s] 创建下一个地址', utils.format());
				editInfo.call(self, doc);
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

			res.setTimeout(conf.robot.timeout.response, function(){
				console.error('[%s] 响应超时处理', utils.format());
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

		req.setTimeout(conf.robot.timeout.request, function(){
			console.error('[%s] 请求超时处理', utils.format());
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