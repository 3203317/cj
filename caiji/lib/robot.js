/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var fs = require('fs');
var velocity = require('velocityjs');
var util = require('speedt-utils')
var cwd = process.cwd();

var http = require('http');
var https = require('https');
var url = require('url');

var BufferHelper = require('bufferhelper');
var iconv = require('iconv-lite');

var conf = require('../settings');

var biz = {
	uri: require('../biz/uri')
};

/**
 *
 * @params
 * @return
 */
exports.start = function(cb){
	start.call(this);
	cb();
};

function start(){
	var self = this;
	// TODO
	biz.uri.getByStatus(0, function (err, doc){
		if(err) return start.call(self);
		if(!doc) return start.call(self);

		// TODO
		sendReq.call(self, doc.URI, doc.CHARSET, function (err, html){
			if(err) return start.call(self);
			// TODO
			doc.HTML = html;
			doc.STATUS = 1;

			biz.uri.editInfo(doc, function (err, msg, status){
				if(err) return start.call(self);
				// TODO
				start.call(self);
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
	var self = this;

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