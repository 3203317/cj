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
				console.log('[%s] analyzer error: %s', utils.format(), err.code);
				break;
			default:
				throw err;
		}
	});
};

function setHtml(doc, cb){
	var newPath = path.join(conf.robot.storagePath, doc.TASK_ID, doc.id +'.html');
	// TODO
	fs.exists(newPath, function (exists){
		if(!exists) return cb(null);
		// TODO
		fs.readFile(newPath, 'utf-8', function (err, html){
			if(err) return cb(err);
			// TODO
			doc.html = html;
			cb(null);
		});
	});
}

function attachData(doc, cb){
	var self = this;
	// TODO

	setHtml(doc, function (err){
		if(err) return cb(err);
		// TODO
		cb(null);
	});
}

function editTaskInfo(doc, cb){
	var self = this;
	// TODO
	biz.task.editByStartup(true, 2, 0, function (err, status){
		if(err) return cb(err);
		// TODO
		self.state_running = false;
		console.log('[%s] analyzer sleep', utils.format());
	});
}

function editResourceInfo(doc, cb){
	var self = this;
	// TODO
	doc.FINISHED = 2;
	biz.resource.editInfo(doc, function (err, status){
		if(err) return cb(err);
		start.call(self, cb);
	});
}

pro.stop = function(force){
	// TODO
};

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
	biz.resource.getByFinished(1, function (err, doc){
		if(err) return cb(err);
		// TODO
		if(!doc) return editTaskInfo.call(self, cb);

		// 附加 HTML 资源
		attachData.call(self, doc, function (err){
			if(err) return cb(err);

			(function(){
				var ctx = vm.createContext({
					cheerio: cheerio,
					console: console,
					utils: utils,
					Spooky: Spooky,
					doc: doc,
					callback: function(err){
						if(err) return cb(err);
						// TODO
						console.log(doc.json);
						editResourceInfo.call(self, doc, cb);
					}
				});

				// 运行脚本
				var script = vm.createScript(doc.ANALYSIS_SCRIPT);
				script.runInContext(ctx);
			})();
		});
	});
}