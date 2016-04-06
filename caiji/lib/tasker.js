/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var util = require('util');
var utils = require('speedt-utils');

var biz = {
	uri: require('../biz/uri'),
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
	// TODO
	start.call(self);
};

pro.stop = function(force){
	// TODO
};

function start(){
	var self = this;
	// TODO
	biz.task.getByStartup(1, function (err, doc){
		if(err) throw err;
		if(!doc){
			self.state_running = false;
			return;
		}

		// TODO
		switch(doc.CATCH_MODE){
			case 1:
			case 2:
				start.call(self);
				break;
			case 3:
				!doc.BATCH_SCRIPT ? single.call(self, doc) : batch.call(self, doc);
				break;
			default:
				start.call(self);
				break;
		}
	});
}

function updateTaskInfo(doc){
	var self = this;
	doc.STARTUP = 0;
	biz.task.editInfo(doc, function (err, status){
		if(err) throw err;
		// TODO
		start.call(self);
	});
}

function single(doc){
	var self = this;
	// TODO
	biz.uri.findByTaskId(doc.id, function (err, docs){
		if(err) throw err;
		// TODO
		if(docs && 1 === docs.length) return updateTaskInfo.call(self, doc);

		// TODO
		var newInfo = {
			CHARSET: doc.CHARSET,
			URI: doc.PORTAL_URI,
			TASK_ID: doc.id
		};

		biz.uri.saveNew(newInfo, function (err, status){
			if(err) throw err;
			// TODO
			updateTaskInfo.call(self, doc);
		});
	});
}

function batch(doc){
	var self = this;
	start.call(self);
}