/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var EventProxy = require('eventproxy');

var exec = require('child_process').exec;

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
pro.name = '__tasker__';

pro.start = function(){
	var self = this;
	if(self.state_running) return;
	self.state_running = true;
	console.log('[%s] tasker running', utils.format());
	// TODO
	start.call(self, function (err){
		switch(err.code){
			case 'ECONNREFUSED':
			case 'ETIMEDOUT':
			case 'PROTOCOL_SEQUENCE_TIMEOUT':
			case 'PROTOCOL_CONNECTION_LOST':
				self.state_running = false;
				console.error('[%s] tasker timeout: %s', utils.format(), err.code);
				break;
			default:
				throw err;
		}
	});
};

pro.stop = function(force){
	// TODO
};

function editTaskInfo(task, cb){
	var self = this;
	// 采集中
	task.STARTUP = 1;
	biz.task.editInfo(task, function (err, status){
		if(err) return cb(err);
		// TODO
		start.call(self, cb);
	});
}

function createNewResource(task, cb){
	var self = this;
	// TODO
	var newInfo = {
		URI: task.PORTAL_URI,
		CHARSET: task.CHARSET,
		TASK_ID: task.id,
		DEPTH: 1
	};

	// TODO
	biz.resource.saveNew(newInfo, function (err, status){
		if(err) return cb(err);
		// TODO
		editTaskInfo.call(self, task, cb);
	});
}

function removeResourceByTaskId(task, cb){
	var self = this;
	// TODO
	biz.resource.removeByTaskId(task.id, function (err, status){
		if(err) return cb(err);
		// TODO
		createNewResource.call(self, task, cb);
	});
}

function deleteFiles(task, cb){
	var self = this;
	// TODO
	var ep = EventProxy.create('html', 'json', function(){
		removeResourceByTaskId.call(self, task, cb);
	});

	ep.fail(function (err){
		cb(err);
	});

	var id = task.id;
	var newFolder = path.join(conf.robot.storagePath, id);

	// 执行windows命令
	exec('del /F /S /Q *.html', { cwd: newFolder }, function (err){
		if(err) return ep.emit('error', err);
		console.log('[%s] 删除文件 *.html %s', utils.format(), id);
		ep.emit('html');
	});

	// 执行windows命令
	exec('del /F /S /Q *.json', { cwd: newFolder }, function (err){
		if(err) return ep.emit('error', err);
		console.log('[%s] 删除文件 *.json %s', utils.format(), id);
		ep.emit('json');
	});
}

function sleep(){
	this.state_running = false;
	console.log('[%s] tasker sleep', utils.format());
}

function start(cb){
	var self = this;
	// 停止中
	biz.task.getByStartup(0, function (err, doc){
		if(err) return cb(err);
		// 不存在则休眠
		if(!doc) return sleep.call(self);
		// 删除文件夹下的所有 html 文件
		deleteFiles.call(self, doc, cb);
	});
}