/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var util = require('speedt-utils'),
	uuid = require('node-uuid'),
	md5 = util.md5,
	mysql_util = util.mysql_util,
	mysql = util.mysql;

var path = require('path');
var fs = require('fs');

var EventProxy = require('eventproxy');

var conf = require('../settings');

var exports = module.exports;

/**
 *
 * @param
 * @return
 */
exports.findByZone = function(material, cb){
	var params = [];
	var sql = 'SELECT * FROM d_movie_material WHERE 1=1';

	if(material){
		if(material.id){
			params.push(material.id);
			sql += ' AND id=?';
		}
	}

	sql += ' ORDER BY SORT';

	mysql.query(sql, params, function (err, docs){
		if(err) return cb(err);
		cb(null, docs);
	});
};

/**
 * 处理数据
 *
 * @param
 * @return { 'a': object, 'b': object }
 */
exports.procData = function(cb){
	this.findByZone(null, function (err, docs){
		if(err) return cb(err);

		var obj = {};

		(function(){
			for(var i in docs){
				var doc = docs[i];
				obj[doc.id] = doc;
			}
		})();

		cb(null, obj);
	});
};
