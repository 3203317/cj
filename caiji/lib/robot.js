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

/**
 *
 * @params
 * @return
 */
exports.start = function(cb){
	var url = 'https://www.taobao.com';
	sendReq.call(this, url, 'utf-8', function (err, html){
		console.log(arguments);
	});
	cb();
};

/**
 * 返回HTML字符串
 *
 * @params
 * @return
 */
function sendReq(url, charset, cb){
	var self = this;

	var req = getReq(url);

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
		console.log('catch url:', url);
	});

	req.end();
}

/**
 * 获取http或https
 *
 * @params
 * @return
 */
function getReq(url){
	return (0 === url.indexOf('https:')) ? https.request(url) : http.request(url);
}