/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var fs = require('fs');

var util = require('util');
var utils = require('speedt-utils');
var EventProxy = require('eventproxy');

var http = require('http');
var https = require('https');
var url = require('url');

var BufferHelper = require('bufferhelper');
var iconv = require('iconv-lite');

var conf = require('../settings');

var biz = {
	uri: require('../biz/uri')
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
pro.name = '__catcher__';

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
	biz.uri.getByFinished(0, function (err, doc){
		if(err) return start.call(self);
		if(!doc) return start.call(self);

		// TODO
		sendReq.call(self, doc.URI, doc.CHARSET, function (err, html){
			if(err) return start.call(self);

			// TODO
			var ep = EventProxy.create('editInfo', 'writeFile', function (editInfo, writeFile){
				start.call(self);
			});

			ep.fail(function (err){
				start.call(self);
			});

			fs.writeFile(conf.robot.catcher.storage_path + doc.id + conf.robot.catcher.file_suffix, html, function (err){
				if(err) return ep.emit('error', err);
				ep.emit('writeFile');
			});

			// TODO
			doc.FINISHED = 1;
			biz.uri.editInfo(doc, function (err, status){
				if(err) return ep.emit('error', err);
				ep.emit('editInfo');
			});
		});
	});
}

/**
 * 返回HTML字符串
 *
 * @params
 * @return
 */
function sendReq(uri, charset, cb){
	charset = charset || 'utf-8';

	var req = getReq(uri);

	req.on('response', function (res){
		var bh = new BufferHelper();
		// var ct = res.headers['content-type'];

		res.on('data', function (chunk){
			bh.concat(chunk);
		});

		res.on('end', function(){
			cb(null, iconv.decode(bh.toBuffer(), charset));
		});
	}).on('error', function (err){
		cb(err);
	}).on('finish', function(){
		// TODO
	});

	req.end();
}

/**
 * 获取http或https
 *
 * @params
 * @return
 */
function getReq(uri){
	return (0 === uri.indexOf('https:')) ? https.request(uri) : http.request(uri);
}