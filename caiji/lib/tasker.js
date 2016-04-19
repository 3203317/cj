/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

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

function editTaskInfo(doc, cb){
	var self = this;
	// 采集中
	doc.STARTUP = 1;
	biz.task.editInfo(doc, function (err, status){
		if(err) return cb(err);
		start.call(self, cb);
	});
}

function start(cb){
	var self = this;
	// 停止中
	biz.task.getByStartup(0, function (err, doc){
		if(err) return cb(err);

		if(!doc){
			self.state_running = false;
			return console.log('[%s] tasker sleep', utils.format());
		}

		function run(){
			var newInfo = {
				URI: doc.PORTAL_URI,
				CHARSET: doc.CHARSET,
				TASK_ID: doc.id,
				RUN_SCRIPT: doc.RUN_SCRIPT,
				DEPTH: 1
			};

			biz.resource.saveNew(newInfo, function (err, status){
				if(err) return cb(err);
				editTaskInfo.call(self, doc, cb);
			});
		}

		function remove(){
			biz.resource.removeByTaskId(doc.id, function (err, status){
				if(err) return cb(err);
				// TODO
				run();
			});
		}

		(function(){
			var id = doc.id;
			var newFolder = path.join(conf.robot.storagePath, id);

			// 执行windows命令
			exec('del /F /S /Q *.html', { cwd: newFolder }, function (err){
				if(err) return cb(err);
				console.log('[%s] 删除文件 *.html %s', utils.format(), id);
				// TODO
				remove();
			});
		})();
	});
}