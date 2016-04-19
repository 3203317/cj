/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var cheerio = require('cheerio');

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
	task: require('../biz/task'),
	resource: require('../biz/resource')
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
	start.call(self, function (err){
		switch(err.code){
			case 'ECONNREFUSED':
			case 'ETIMEDOUT':
			case 'PROTOCOL_SEQUENCE_TIMEOUT':
			case 'PROTOCOL_CONNECTION_LOST':
				self.state_running = false;
				console.log('[%s] mysql timeout: %s', utils.format(), err.code);
				break;
			default:
				throw err;
		}
	});
};

pro.stop = function(force){
	// TODO
};

function editTaskInfo(cb){
	var self = this;
	// TODO
	biz.task.editByStartup(1, 2, function (err, status){
		if(err) return cb(err);
	});
}

function editResourceInfo(doc, cb){
	var self = this;
	// TODO
	doc.FINISHED = 1;
	biz.resource.editInfo(doc, function (err, status){
		if(err) return cb(err);
		start.call(self, cb);
	});
}

function retry(doc, cb){
	var self = this;
	// TODO
	doc.RETRY_COUNT++;
	biz.resource.editInfo(doc, function (err, status){
		if(err) return cb(err);
		console.log('[%s] 重试+1 %s', utils.format(), doc.URI);
		start.call(self, cb);
	});
}

function start(cb){
	var self = this;
	// TODO
	biz.resource.getByFinished(0, function (err, doc){
		if(err) return cb(err);

		// TODO
		if(!doc){
			self.state_running = false;
			console.log('[%s] catcher sleep', utils.format());
			return editTaskInfo.call(self, cb);
		}

		// TODO
		sendReq(doc.URI, doc.CHARSET, function (err, html){
			if(err) return retry.call(self, doc, cb);

			// TODO
			if(!html) return editResourceInfo.call(self, doc, cb);

			// TODO
			fs.writeFile(path.join(conf.robot.storagePath, doc.TASK_ID, doc.id +'.html'), html, function (err){
				if(err) return cb(err);
				console.log('[%s] 创建 %s', utils.format(), doc.id +'.html');

				if(!doc.RUN_SCRIPT) return editResourceInfo.call(self, doc, cb);

				// 运行脚本
				var script = vm.createScript(doc.RESOURCE_SCRIPT);
				// TODO
				var sandbox = {
					cheerio: cheerio,
					console: console,
					RUN_SCRIPT: doc.RUN_SCRIPT,
					html: html
				};
				script.runInNewContext(sandbox);
				// TODO
				if(!sandbox.result || 0 === sandbox.result.length) return editResourceInfo.call(self, doc, cb);

				(function(){
					for(var i in sandbox.result){
						var resource = sandbox.result[i];
						resource.CHARSET = doc.CHARSET;
						resource.TASK_ID = doc.TASK_ID;
					}

					biz.resource.batchSaveNew(sandbox.result, function (err){
						if(err) return cb(err);
						editResourceInfo.call(self, doc, cb);
					})
				})();
			});
		});
	});
}