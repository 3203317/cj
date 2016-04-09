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
	uri: require('../biz/uri'),
	task: require('../biz/task')
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
pro.name = '__tasker__';

pro.start = function(){
	var self = this;
	if(self.state_running) return;
	self.state_running = true;
	console.log('[%s] tasker running', utils.format());
	// TODO
	start.call(self);
};

pro.stop = function(force){
	// TODO
};

function start(){
	var self = this;
	// TODO
	biz.task.getByStartup(1, function (err, doc){
		if(err) throw err;
		if(!doc){
			self.state_running = false;
			console.log('[%s] tasker sleep', utils.format());
			return;
		}

		// TODO
		switch(doc.CATCH_MODE){
			case 1:
			case 2:
				start.call(self);
				break;
			case 3:
				single.call(self, doc);
				break;
			case 4:
				more.call(self, doc);
				break;
			default:
				start.call(self);
				break;
		}
	});
}

function updateTaskInfo(doc){
	var self = this;
	doc.STARTUP = 0;
	biz.task.editInfo(doc, function (err, status){
		if(err) throw err;
		// TODO
		start.call(self);
	});
}

function single(doc){
	var self = this;
	// TODO
	updateTaskInfo.call(self, doc);
}

function more(doc){
	var self = this;
	// TODO
	if(!doc.RUN_SCRIPT) return updateTaskInfo.call(self, doc);

	// TODO
	sendReq.call(self, doc.PORTAL_URI, doc.CHARSET, function (err, html){
		if(err) return updateTaskInfo.call(self, doc);

		// TODO
		if(!html) return updateTaskInfo.call(self, doc);

		// 运行脚本
		var script = vm.createScript(doc.RUN_SCRIPT);
		// TODO
		var sandbox = { html: html };
		script.runInNewContext(sandbox);
		// TODO
		if(!sandbox.result) return updateTaskInfo.call(self, doc);

		// 写入新URI
		var newInfo = {
			URI: sandbox.result,
			CHARSET: doc.CHARSET,
			TASK_ID: doc.id
		};

		// TODO
		biz.uri.saveNew(newInfo, function (err, status){
			if(err) throw err;
			// TODO
			console.log('[%s] 创建下一个地址', utils.format());
			updateTaskInfo.call(self, doc);
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