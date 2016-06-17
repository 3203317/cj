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
(function (exports){
	var sql = 'SELECT * FROM d_movie_material WHERE id=?';

	exports.getById = function(id, cb){
		mysql.query(sql, [id], function (err, docs){
			if(err) return cb(err);
			cb(null, mysql.checkOnly(docs) ? docs[0] : null);
		});
	};
})(exports);

/**
 *
 * @param
 * @return
 */
(function (exports){
	var sql = 'SELECT * FROM d_movie_material ORDER BY SORT';

	exports.findAll = function(cb){
		mysql.query(sql, null, function (err, docs){
			if(err) return cb(err);
			cb(null, docs);
		});
	};
})(exports);

/**
 * 处理数据
 *
 * @param
 * @return
 */
exports.procData = function(cb){
	this.findAll(function (err, docs){
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
