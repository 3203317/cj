/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var util = require('util');
var utils = require('speedt-utils');

var conf = require('../settings');

var Catcher = require('./catcher');

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

	self.catcher = new Catcher(self.opts);
	self.catcher.start();

	// TODO
	process.nextTick(cb);
};

pro.stop = function(force){
	var self = this;
	// TODO
	if(STATE_STOPED === self.state) return;
	self.state = STATE_STOPED;
	if(self.catcher) self.catcher.stop();
};