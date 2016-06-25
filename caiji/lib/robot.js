/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var later = require('later');

var conf = require('../settings');

var Tasker = require('./tasker');
var Catcher = require('./catcher');
var Analyzer = require('./analyzer');

var STATE_START   = 1;
var STATE_STOPED  = 2;

module.exports = function(opts){
	return new Component(opts);
};

var Component = function(opts){
	var self = this;
	opts = opts || {};
	self.opts = opts;
	// 本地时间
	later.date.localTime();
	// 初始化状态为停止
	self.state = STATE_STOPED;
};

module.exports = Component;
var pro = Component.prototype;
pro.name = '__robot__';

pro.start = function(cb){
	var self = this;
	if(STATE_START === self.state) return;
	self.state = STATE_START;

	// tasker
	if(!self.tasker) self.tasker = new Tasker(self.opts);
	self.time_1 = later.setInterval(function(){
		self.tasker.start();
	}, schedule_1);

	// catcher
	if(!self.catcher) self.catcher = new Catcher(self.opts);
	self.time_2 = later.setInterval(function(){
		self.catcher.start();
	}, schedule_2);

	// analyzer
	if(!self.analyzer) self.analyzer = new Analyzer(self.opts);
	self.time_3 = later.setInterval(function(){
		self.analyzer.start();
	}, schedule_3);

	process.nextTick(cb);
};

pro.stop = function(force){
	var self = this;

	if(STATE_STOPED === self.state) return;
	self.state = STATE_STOPED;

	// clear
	if(self.time_1) self.time_1.clear();
	if(self.time_2) self.time_2.clear();
	if(self.time_3) self.time_3.clear();
};

var schedule_1 = { schedules: [{ s: [0, 10 ,15, 25, 35, 45, 55] }] };
var schedule_2 = { schedules: [{ s: [5] }] };
var schedule_3 = { schedules: [{ s: [15, 25, 35, 45, 55] }] };