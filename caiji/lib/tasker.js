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

		function run(){
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
		}

		(function(){
			var newFolder = path.join(conf.robot.storagePath, doc.id);
			// TODO
			fs.exists(newFolder, function (exists){
				if(exists) return run();
				// TODO
				fs.mkdir(newFolder, 777, function (err){
					if(err) throw err;
					// TODO
					console.log('[%s] 创建目录 %s', utils.format(), doc.id);
					run();
				});
			});
		})();
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
	sendReq(doc.PORTAL_URI, doc.CHARSET, function (err, html){
		if(err) return updateTaskInfo.call(self, doc);
		// TODO
		if(!html) return updateTaskInfo.call(self, doc);

		// 创建第一页HTML
		fs.writeFile(path.join(conf.robot.storagePath, doc.id, doc.id +'.html'), html, function (err){
			if(err) throw err;
			console.log('[%s] 创建 %s', utils.format(), doc.id +'.html');

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
				console.log('[%s] 添加新地址 %s', utils.format(), newInfo.URI);
				updateTaskInfo.call(self, doc);
			});
		});
	});
}