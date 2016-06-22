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

var conf = require('../settings');

var exports = module.exports;

/**
 *
 * @param
 * @return
 */
exports.findByZone = function(zone, cb){
	var params = [];
	var sql = 'SELECT * FROM d_movie_zone WHERE 1=1';

	if(zone){
		if(zone.IS_SHOW){
			params.push(zone.IS_SHOW);
			sql += ' AND IS_SHOW=?';
		}
	}

	sql += ' ORDER BY SORT';

	mysql.query(sql, params, function (err, docs){
		if(err) return cb(err);
		cb(null, docs);
	});
};