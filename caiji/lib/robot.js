/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var util = require('util');
var utils = require('speedt-utils');

var later = require('later');

var conf = require('../settings');

var Catcher = require('./catcher');
var Tasker = require('./tasker');

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
	self.time2 = later.setInterval(function(){
		self.tasker.start();
	}, getSched2());

	// TODO
	if(!self.catcher) self.catcher = new Catcher(self.opts);
	self.time1 = later.setInterval(function(){
		self.catcher.start();
	}, getSched1());

	// TODO
	process.nextTick(cb);
};

pro.stop = function(force){
	var self = this;
	// TODO
	if(STATE_STOPED === self.state) return;
	self.state = STATE_STOPED;
	if(self.time1) self.time1.clear();
	// TODO
	if(self.time2) self.time2.clear();
};

function getSched1(){
	return { schedules: [{ s: [5] }] };
}

function getSched2(){
	return later.parse.text('every 1 min');
}