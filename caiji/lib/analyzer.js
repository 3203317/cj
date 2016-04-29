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
	resource: require('../biz/resource'),
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
pro.name = '__analyzer__';

pro.start = function(){
	var self = this;
	if(self.state_running) return;
	self.state_running = true;
	console.log('[%s] analyzer running', utils.format());
	// TODO
	start.call(self, function (err){
		switch(err.code){
			case 'ECONNREFUSED':
			case 'ETIMEDOUT':
			case 'PROTOCOL_SEQUENCE_TIMEOUT':
			case 'PROTOCOL_CONNECTION_LOST':
			case 'CasperError':
				self.state_running = false;
				console.error('[%s] analyzer error: %s', utils.format(), err.code);
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
	resource.FINISHED = 2;
	biz.resource.editInfo(resource, function (err, status){
		if(err) return cb(err);
		start.call(self, cb);
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

function writeFile(resource, cb){
	var self = this;
	// TODO
	if(!resource.json) return retry.call(self, resource, cb);
	// TODO
	var filename = path.join(conf.robot.storagePath, resource.TASK_ID, resource.id +'.json');
	// TODO
	fs.writeFile(filename, JSON.stringify(resource.json), function (err){
		if(err) return cb(err);
		console.log('[%s] 创建 %s', utils.format(), resource.id +'.json');
		editResourceInfo.call(self, resource, cb);
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
		callback: function(err){
			if(err) return cb(err);
			// TODO
			writeFile.call(self, resource, cb);
		}
	});
	// 运行脚本
	var script = vm.createScript(resource.ANALYSIS_SCRIPT);
	script.runInContext(ctx);
}

function attachHtml(resource, cb){
	var self = this;
	// TODO
	var filename = path.join(conf.robot.storagePath, resource.TASK_ID, resource.id +'.html');
	// TODO
	fs.exists(filename, function (exists){
		if(!exists) return editResourceInfo.call(self, resource, cb);
		// TODO
		fs.readFile(filename, 'utf-8', function (err, html){
			if(err) return cb(err);
			// TODO
			if(!html) return editResourceInfo.call(self, resource, cb);
			// TODO
			resource.html = html;
			runScript.call(self, resource, cb);
		});
	});
}

function editTaskInfo(task, cb){
	var self = this;
	// TODO
	task.SCHEDULE_TIME--;
	task.STARTUP = 0;
	biz.task.editInfo(task, function (err, status){
		if(err) return cb(err);
		// TODO
		start.call(self);
	});
}

function getResource(task, cb){
	var self = this;
	// TODO
	biz.resource.getByFinished(1, task.id, function (err, doc){
		if(err) return cb(err);
		// TODO
		if(!doc) return editTaskInfo.call(self, task, cb);
		// TODO
		attachHtml.call(self, doc, cb);
	});
}

function sleep(){
	this.state_running = false;
	console.log('[%s] analyzer sleep', utils.format());
}

function start(cb){
	var self = this;
	// 采集中
	biz.task.getByStartup(2, function (err, doc){
		if(err) return cb(err);
		// 不存在则休眠
		if(!doc) return sleep.call(self);
		// 获取一条 resource
		getResource.call(self, doc, cb);
	});
}