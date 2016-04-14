/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var later = require('later');

var conf = require('../settings');

var Catcher = require('./catcher');
var Tasker = require('./tasker');
var Scheduler = require('./scheduler');

var STATE_START   = 1;
var STATE_STOPED  = 2;

module.exports = function(opts){
	return new Component(opts);
};

var Component = function(opts){
	var self = this;
	opts = opts || {};
	self.opts = opts;
	// TODO
	later.date.localTime();
	// TODO
	self.state = STATE_STOPED;
};

module.exports = Component;
var pro = Component.prototype;
pro.name = '__robot__';

pro.start = function(cb){
	var self = this;
	// TODO
	if(STATE_START === self.state) return;
	self.state = STATE_START;

	// TODO
	if(!self.tasker) self.tasker = new Tasker(self.opts);
	self.time_1 = later.setInterval(function(){
		self.tasker.start();
	}, schedule_1);

	// TODO
	if(!self.catcher) self.catcher = new Catcher(self.opts);
	self.time_2 = later.setInterval(function(){
		self.catcher.start();
	}, schedule_2);

	// TODO
	if(!self.scheduler) self.scheduler = new Scheduler(self.opts);
	self.time_3 = later.setInterval(function(){
		self.scheduler.start();
	}, schedule_3);

	// TODO
	process.nextTick(cb);
};

pro.stop = function(force){
	var self = this;
	// TODO
	if(STATE_STOPED === self.state) return;
	self.state = STATE_STOPED;
	// TODO
	if(self.time_1) self.time_1.clear();
	if(self.time_2) self.time_2.clear();
	if(self.time_3) self.time_3.clear();
};

var schedule_1 = { schedules: [{ s: [15, 45] }] };

var schedule_2 = { schedules: [{ s: [20, 50] }] };

var schedule_3 = { schedules: [{ s: [0, 30] }] };