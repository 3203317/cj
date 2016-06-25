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

var util = require('util');
var utils = require('speedt-utils');

var conf = require('../settings');

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
pro.name = '__tasker__';

pro.start = function(){
	var self = this;
	if(self.state_running) return;

	self.state_running = true;
	console.log('[%s] tasker running', utils.format());

	// start
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

function createNewResourcePortal(task, cb){
	var self = this;

	// data
	var newInfo = {
		URI: task.PORTAL_URI,
		CHARSET: task.CHARSET,
		TASK_ID: task.id,
		SORT: 1,
		PID: 0,
		DEPTH: 1
	};

	// sql
	biz.resource.saveNew(newInfo, function (err, status){
		if(err) return cb(err);
		// start
		start.call(self, cb);
	});
}

function editTaskInfo(task, cb){
	var self = this;

	// data
	task.STARTUP = 1;

	// sql
	biz.task.editInfo(task, function (err, status){
		if(err) return cb(err);
		// 新增入口资源
		createNewResourcePortal.call(self, task, cb);
	});
}

/**
 * 删除文件和数据
 *
 * @param
 * @return
 */
function deleteFilesAndDB(task, cb){
	var self = this;

	// 异步
	var ep = EventProxy.create('html', 'json', 'db', function(){
		editTaskInfo.call(self, task, cb);
	});

	ep.fail(function (err){
		cb(err);
	});

	(function(){
		var newFolder = path.join(conf.robot.storagePath, task.id);

		// 执行windows命令
		exec('del /F /S /Q *.html', { cwd: newFolder }, function (err){
			if(err) return ep.emit('error', err);
			console.log('[%s] 删除文件 *.html %s', utils.format(), task.id);
			ep.emit('html');
		});

		// 执行windows命令
		exec('del /F /S /Q *.json', { cwd: newFolder }, function (err){
			if(err) return ep.emit('error', err);
			console.log('[%s] 删除文件 *.json %s', utils.format(), task.id);
			ep.emit('json');
		});
	})();

	biz.resource.removeByTaskId(task.id, function (err, status){
		if(err) return ep.emit('error', err);
		ep.emit('db');
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
	console.log('[%s] tasker sleep', utils.format());
}

function start(cb){
	var self = this;

	biz.task.getByStartup(0, function (err, doc){
		if(err) return cb(err);
		if(!doc) return sleep.call(self);
		deleteFilesAndDB.call(self, doc, cb);
	});
}