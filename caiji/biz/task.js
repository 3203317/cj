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

var EventProxy = require('eventproxy');

var exports = module.exports;

(function (exports){
	var sql = 'SELECT * FROM c_task WHERE STARTUP=? ORDER BY CREATE_TIME ASC LIMIT 1';
	/**
	 *
	 * @params
	 * @return
	 */
	exports.getByStartup = function(startup, cb){
		startup = startup || 0;
		// TODO
		mysql.query(sql, [startup], function (err, docs){
			if(err) return cb(err);
			cb(null, mysql.checkOnly(docs) ? docs[0] : null);
		});
	};
})(exports);

/**
 *
 * @params
 * @return
 */
exports.getById = function(id, cb){
	// TODO
	mysql_util.find(null, 'c_task', [['id', '=', id]], null, null, function (err, docs){
		if(err) return cb(err);
		cb(null, mysql.checkOnly(docs) ? docs[0] : null);
	});
};

/**
 * 表单
 *
 * @params
 * @return
 */
(function (exports){
	function formVali(newInfo, cb){
		cb(null);
	}

	/**
	 *
	 * @params
	 * @return
	 */
	(function (exports){
		var sql = 'INSERT INTO c_task (id, TASK_NAME, CREATE_TIME, STARTUP) values (?, ?, ?, ?)';
		// TODO
		exports.saveNew = function(newInfo, cb){
			formVali(newInfo, function (err){
				if(err) return cb(err);				
				// CREATE
				var postData = [
					util.replaceAll(uuid.v1(), '-', ''),
					newInfo.TASK_NAME,
					new Date(),
					0
				];
				mysql.query(sql, postData, function (err, status){
					if(err) return cb(err);
					cb(null, status);
				});
			});
		};
	})(exports);

	/**
	 *
	 * @params
	 * @return
	 */
	(function (exports){
		var sql = 'UPDATE c_task set TASK_NAME=?, STARTUP=? WHERE id=?';
		// TODO
		exports.editInfo = function(newInfo, cb){
			formVali(newInfo, function (err){
				if(err) return cb(err);
				// EDIT
				var postData = [
					newInfo.TASK_NAME,
					newInfo.STARTUP,
					newInfo.id
				];
				mysql.query(sql, postData, function (err, status){
					if(err) return cb(err);
					cb(null, status);
				});
			});
		};
	})(exports);
})(exports);