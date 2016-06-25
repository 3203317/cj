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

	// state
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

	// start
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

	// data
	resource.FINISHED = 2;

	// sql
	biz.resource.editInfo(resource, function (err, status){
		if(err) return cb(err);
		start.call(self, cb);
	});
}

function writeInFile(resource, cb){
	var self = this;

	var filename = path.join(conf.robot.storagePath, resource.TASK_ID, resource.id +'.json');

	// fs
	fs.writeFile(filename, JSON.stringify(resource.json), function (err){
		if(err) return cb(err);
		console.log('[%s] 创建 %s', utils.format(), resource.id +'.json');
		editResourceInfo.call(self, resource, cb);
	});
}

function retry(resource, cb){
	var self = this;

	// data
	resource.RETRY_COUNT++;

	// sql
	biz.resource.editInfo(resource, function (err, status){
		if(err) return cb(err);
		console.log('[%s] 重试次数+1 %s', utils.format(), resource.URI);
		start.call(self, cb);
	});
}

function runScript(resource, cb){
	var self = this;

	getScript('analysis', resource.TASK_ID, function (err, script){
		if(err) return cb(err);

		// 沙箱
		var ctx = vm.createContext({
			cheerio: cheerio,
			console: console,
			utils: utils,
			Spooky: Spooky,
			resource: resource,
			callback: function(err, json){
				// retry
				if(err) return retry.call(self, resource, cb);

				// 退出本次
				if(!json) return editResourceInfo.call(self, resource, cb);

				resource.json = json;
				writeInFile.call(self, resource, cb);
			}
		});

		// 运行脚本
		vm.createScript(script).runInContext(ctx);
	});
}

function attachHtml(resource, cb){
	var self = this;

	var filename = path.join(conf.robot.storagePath, resource.TASK_ID, resource.id +'.html');

	fs.exists(filename, function (exists){
		if(!exists) return editResourceInfo.call(self, resource, cb);

		fs.readFile(filename, 'utf-8', function (err, html){
			if(err) return cb(err);
			// 判断 html 是否存在
			if(!html) return editResourceInfo.call(self, resource, cb);

			// run
			resource.html = html;
			runScript.call(self, resource, cb);
		});
	});
}

function editTaskInfo(task, cb){
	var self = this;

	// data
	task.SCHEDULE_TIME--;
	task.STARTUP = 0;

	// sql
	biz.task.editInfo(task, function (err, status){
		if(err) return cb(err);
		start.call(self);
	});
}

function getResource(task, cb){
	var self = this;

	// sql
	biz.resource.getByFinished(1, task.id, function (err, doc){
		if(err) return cb(err);
		if(!doc) return editTaskInfo.call(self, task, cb);

		// attachHtml
		attachHtml.call(self, doc, cb);
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
	console.log('[%s] analyzer sleep', utils.format());
}

function start(cb){
	var self = this;

	biz.task.getByStartup(2, function (err, doc){
		if(err) return cb(err);
		if(!doc) return sleep.call(self);
		getResource.call(self, doc, cb);
	});
}