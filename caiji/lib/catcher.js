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
	// TODO
	resource.FINISHED = 1;
	biz.resource.editInfo(resource, function (err, status){
		if(err) return cb(err);
		start.call(self, cb);
	});
}

function runScript(resource, cb){
	var self = this;
	// TODO
	var ctx = vm.createContext({
		cheerio: cheerio,
		console: console,
		utils: utils,
		Spooky: Spooky,
		doc: resource,
		callback: function(err, data){
			if(err) return cb(err);

			// TODO
			if(!data) return editResourceInfo.call(self, resource, cb);

			for(var i in data){
				var elem = data[i];
				elem.CHARSET = resource.CHARSET;
				elem.TASK_ID = resource.TASK_ID;
			} // FOR

			biz.resource.batchSaveNew(data, function (err){
				if(err) return cb(err);
				editResourceInfo.call(self, resource, cb);
			}); // END
		}
	});
	// 运行脚本
	var script = vm.createScript(resource.RESOURCE_SCRIPT);
	script.runInContext(ctx);
}

function writeFile(resource, cb){
	var self = this;
	// TODO
	var filename = path.join(conf.robot.storagePath, resource.TASK_ID, resource.id +'.html');
	// TODO
	fs.writeFile(filename, resource.html, function (err){
		if(err) return cb(err);
		console.log('[%s] 创建 %s', utils.format(), resource.id +'.html');
		runScript.call(self, resource, cb);
	});
}

function retry(resource, cb){
	var self = this;
	// TODO
	resource.RETRY_COUNT++;
	biz.resource.editInfo(resource, function (err, status){
		if(err) return cb(err);
		console.log('[%s] 重试+1 %s', utils.format(), resource.URI);
		start.call(self, cb);
	});
}

function editTaskInfo(task, cb){
	var self = this;
	// TODO
	task.STARTUP = 2;
	biz.task.editInfo(task, function (err, status){
		if(err) return cb(err);
		// TODO
		start.call(self);
	});
}

function getResource(task, cb){
	var self = this;
	// TODO
	biz.resource.getByFinished(0, task.id, function (err, doc){
		if(err) return cb(err);
		// TODO
		if(!doc) return editTaskInfo.call(self, task, cb);
		// TODO
		sendReq(doc.URI, doc.CHARSET, function (err, html){
			if(err || !html) return retry.call(self, doc, cb);

			// TODO
			doc.html = html;
			writeFile.call(self, doc, cb);
		});
	});
}

function sleep(){
	this.state_running = false;
	console.log('[%s] catcher sleep', utils.format());
}

function start(cb){
	var self = this;
	// 采集中
	biz.task.getByStartup(1, function (err, doc){
		if(err) return cb(err);
		// 不存在则休眠
		if(!doc) return sleep.call(self);
		// 获取一条 resource
		getResource.call(self, doc, cb);
	});
}