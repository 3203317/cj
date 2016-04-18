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
				self.state_running = false;
				console.log('[%s] mysql timeout: %s', utils.format(), err.code);
				break;
			default:
				throw err;
		}
	});
};

function editTaskInfo(cb){
	var self = this;
	// TODO
	biz.task.editByStartup(2, 0, function (err, status){
		if(err) return cb(err);
	});
}

pro.stop = function(force){
	// TODO
};

function start(cb){
	var self = this;
	// 采集完成
	biz.task.getByStartup(2, function (err, doc){
		if(err) return cb(err);

		if(!doc){
			self.state_running = false;
			console.log('[%s] analyzer sleep', utils.format());
			return editTaskInfo.call(self, cb);
		}

		// TODO
		biz.resource.getByTaskId(doc.id, function (err, docs){
			if(err) return cb(err);
			// TODO
		});
	});
}