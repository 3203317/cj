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
				self.state_running = false;
				console.log('[%s] mysql timeout: %s', utils.format(), err.code);
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

function attachData(docs, cb){
	var self = this;
	// TODO

	var i = 0;

	function getNewInfo(){
		return docs[i++];
	}

	function run(){
		var doc = getNewInfo();
		if(!doc) return cb(null);

		// TODO
		setHtml(doc, function (err){
			if(err) return cb(err);
			// TODO
			run();
		});
	} // END
	run();
}

function editTaskInfo(doc, cb){
	var self = this;
	// TODO
	doc.SCHEDULE_TIME--;
	doc.STARTUP = 0;
	biz.task.editInfo(doc, function (err, status){
		if(err) return cb(err);
		// TODO
		start.call(self);
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
			return;
		} // END

		// 判断分析脚本是否存在
		if(!doc.ANALYSIS_SCRIPT) return editTaskInfo.call(self, doc, cb);

		// 根据任务 ID 获取所有的URI资源
		biz.resource.getByTaskId(doc.id, function (err, docs){
			if(err) return cb(err);

			// TODO
			if(!docs || 0 === docs.length) return editTaskInfo.call(self, doc, cb);

			// 附加 HTML 资源
			attachData.call(self, docs, function (err){
				if(err) return cb(err);

				(function(){
					var ctx = vm.createContext({
						cheerio: cheerio,
						console: console,
						Spooky: Spooky,
						docs: docs,
						callback: function(err, data){
							if(err) return cb(err);

							// 写入json
							fs.writeFile(path.join(conf.robot.storagePath, doc.id, 'data.json'), JSON.stringify(data), function (err){
								if(err) return cb(err);
								console.log('[%s] 创建 %s', utils.format(), 'data.json');
								// TODO
								editTaskInfo.call(self, doc, cb);
							});
						}
					});

					// 运行脚本
					var script = vm.createScript(doc.ANALYSIS_SCRIPT);

					script.runInContext(ctx);
				})();
			});
		});
	});
}