/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var fs = require('fs');
var path = require('path');

var vm = require('vm');

var util = require('util');
var utils = require('speedt-utils');

var http = require('http');
var https = require('https');

var BufferHelper = require('bufferhelper');
var iconv = require('iconv-lite');

var conf = require('../settings');

var sendReq = require('./sendReq');

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
	console.log('[%s] catcher running', utils.format());
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
			console.log('[%s] catcher sleep', utils.format());
			return;
		}

		// TODO
		sendReq(doc.URI, doc.CHARSET, function (err, html){
			if(err){
				++doc.RETRY_COUNT;
				return biz.uri.editInfo(doc, function (err, status){
					if(err) throw err;
					console.log('[%s] 重试+1 %s', utils.format(), doc.URI);
					start.call(self);
				});
			}

			// TODO
			if(!html) return editInfo.call(self, doc);

			fs.writeFile(path.join(conf.robot.storagePath, doc.TASK_ID, doc.id +'.html'), html, function (err){
				if(err) throw err;
				console.log('[%s] 创建 %s', utils.format(), doc.id +'.html');

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
					console.log('[%s] 添加新地址 %s', utils.format(), newInfo.URI);
					editInfo.call(self, doc);
				});
			});
		});
	});
}