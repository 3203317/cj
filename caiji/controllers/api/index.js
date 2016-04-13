/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var utils = require('speedt-utils');
var rest = utils.service.rest;
var EventProxy = require('eventproxy');
var path = require('path');
var fs = require('fs');
var cwd = process.cwd();

var conf = require('../../settings');

var biz = {
	user: require('../../biz/user')
};

var exports = module.exports;

/**
 * 签名验证
 *
 * @param
 * @return
 */
(function (exports){

	exports.signature_validate = function(req, res, next){
		var result = { success: false };
		var body = req.body;
		
		// TODO
		body.command = utils.isEmpty(body.command);
		if(!body.command) return res.send(result);
	
		// TODO
		if('login' === body.command) return next();
	
		body.ts = utils.isEmpty(body.ts);
		if(!body.ts) return res.send(result);
	
		body.apikey = utils.isEmpty(body.apikey);
		if(!body.apikey) return res.send(result);
	
		body.signature = utils.isEmpty(body.signature);
		if(!body.signature) return res.send(result);
	
		// TODO
		biz.user.findByApiKey(body.apikey, function (err, doc){
			if(err) return next(err);
			// TODO
			if(!doc) return res.send(result);
			
			// TODO
			if(1 !== doc.STATUS){
				result.msg = ['禁止访问'];
				return res.send(result);
			}

			if(body.data) delete body.data;
			// TODO
			if(!rest.validate(body, doc.SECKEY)){
				result.msg = ['验证失败'];
				return res.send(result);
			}
			// TODO
			req.flash('user', doc);
			next();
		});
	};
})(exports);

/**
 * api
 *
 * @param
 * @return
 */
(function (exports){
	function login(req, res, next){
		var result = { success: false };
		var data = req._data;
		
		// TODO
		biz.user.login(data, function (err, msg, doc){
			if(err) return next(err);
			// TODO
			if(msg){
				result.msg = msg;
				return res.send(result);
			}

			result.data = {
				APIKEY: doc.APIKEY,
				SECKEY: doc.SECKEY,
				TS: (new Date()).getTime()
			};
			result.success = true;
			res.send(result);
		});
	}

	function getData(req, res, next){
		var result = { success: false };
		var data = req._data;
		// TODO
	}

	exports.index = function(req, res, next){
	// TODO
		switch(req.body.command){
			case 'login': login(req, res, next); break;
			case 'getData': getData(req, res, next); break;
			default: res.send({ success: false }); break;
		}
	};
})(exports);