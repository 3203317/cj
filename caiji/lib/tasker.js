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

var STATE_START   = 1;
var STATE_STOPED  = 2;

module.exports = function(opts){
	return new Component(opts);
};

var Component = function(opts){
	var self = this;
	opts = opts || {};
	self.opts = opts;
};

module.exports = Component;
var pro = Component.prototype;
pro.name = '__tasker__';

pro.start = function(){
	this.state = STATE_START;
	start.call(this);
};

pro.stop = function(force){
	this.state = STATE_STOPED;
};

function start(){
	var self = this;
	if(STATE_STOPED === self.state) return;
	// TODO
	biz.task.getByStartup(1, function (err, doc){
		if(err) return start.call(self);
		if(!doc) return start.call(self);

		// TODO
		switch(doc.CATCH_MODE){
			case 1:
			case 2:
				start.call(self);
				break;
			case 3:
				single.call(self, doc);
				break;
			case 4:
				batch.call(self, doc);
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
		if(err) return start.call(self);
		// TODO
		start.call(self);
	});
}

function single(doc){
	var self = this;
	// TODO
	biz.uri.findByTaskId(doc.id, function (err, docs){
		if(err) return start.call(self);
		// TODO
		if(docs && 1 === docs.length) return updateTaskInfo.call(self, doc);

		// TODO
		var newInfo = {
			URI: doc.PORTAL_URI,
			TASK_ID: doc.id
		};

		biz.uri.saveNew(newInfo, function (err, status){
			if(err) return start.call(self);
			// TODO
			updateTaskInfo.call(self, doc);
		});
	});
}

function batch(doc){
	var self = this;
	start.call(self);
}