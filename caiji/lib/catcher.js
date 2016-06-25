/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var cheerio = require('cheerio');
var Spooky = require('spooky');

var fs = require('fs');
var path = require('path');

var vm = require('vm');

var util = require('util');
var utils = require('speedt-utils');

var conf = require('../settings');

var sendReq = require('./sendReq');
var getScript = require('./getScript');

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

	// state
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

	// start
	start.call(self, function (err){
		switch(err.code){
			case 'ECONNREFUSED':
			case 'ETIMEDOUT':
			case 'PROTOCOL_SEQUENCE_TIMEOUT':
			case 'PROTOCOL_CONNECTION_LOST':
			case 'CasperError':
				self.state_running = false;
				console.error('[%s] catcher timeout: %s', utils.format(), err.code);
				break;
			default:
				throw err;
		}
	});
};

pro.stop = function(force){
	// TODO
};

function editResourceInfo(resource, cb){
	var self = this;

	// data
	resource.FINISHED = 1;

	// sql
	biz.resource.editInfo(resource, function (err, status){
		if(err) return cb(err);
		start.call(self, cb);
	});
}

function runScript(resource, cb){
	var self = this;

	getScript('resource', resource.TASK_ID, function (err, script){
		if(err) return cb(err);

		// 沙箱
		var ctx = vm.createContext({
			cheerio: cheerio,
			console: console,
			utils: utils,
			Spooky: Spooky,
			resource: resource,
			callback: function(err, data){
				if(err) return cb(err);
				if(!data) return editResourceInfo.call(self, resource, cb);

				// data 填充
				for(var i in data){
					var elem = data[i];
					elem.CHARSET = resource.CHARSET;
					elem.TASK_ID = resource.TASK_ID;
				}

				// 批量入库
				biz.resource.batchSaveNew(data, function (err){
					if(err) return cb(err);
					editResourceInfo.call(self, resource, cb);
				});
			}
		});

		// 运行脚本
		vm.createScript(script).runInContext(ctx);
	});
}

function writeInFile(resource, cb){
	var self = this;

	// 待创建的文件名
	var filename = path.join(conf.robot.storagePath, resource.TASK_ID, resource.id +'.html');

	// 写入文件
	fs.writeFile(filename, resource.html, function (err){
		if(err) return cb(err);
		console.log('[%s] 创建 %s', utils.format(), resource.id +'.html');

		// run
		runScript.call(self, resource, cb);
	});
}

function retry(resource, cb){
	var self = this;

	// 编辑此条资源的重试次数
	biz.resource.editRetryCount(resource.id, function (err, status){
		if(err) return cb(err);
		console.log('[%s] 重试+1 %s', utils.format(), resource.URI);
		start.call(self, cb);
	});
}

/**
 * 进入分析阶段
 *
 * @param
 * @return
 */
function editTaskInfo(task, cb){
	var self = this;

	// data
	task.STARTUP = 2;

	// sql
	biz.task.editInfo(task, function (err, status){
		if(err) return cb(err);
		start.call(self);
	});
}

function getResource(task, cb){
	var self = this;

	// sql
	biz.resource.getByFinished(0, task.id, function (err, doc){
		if(err) return cb(err);
		if(!doc) return editTaskInfo.call(self, task, cb);

		// 发送请求获取远程路径的 html 代码
		sendReq(doc.URI, doc.CHARSET, function (err, html){
			// 重试
			if(err || !html) return retry.call(self, doc, cb);

			// html 写入文件
			doc.html = html;
			writeInFile.call(self, doc, cb);
		});
	});
}

/**
 * 休眠
 *
 * @param
 * @return
 */
function sleep(){
	this.state_running = false;
	console.log('[%s] catcher sleep', utils.format());
}

function start(cb){
	var self = this;

	biz.task.getByStartup(1, function (err, doc){
		if(err) return cb(err);
		if(!doc) return sleep.call(self);
		getResource.call(self, doc, cb);
	});
}