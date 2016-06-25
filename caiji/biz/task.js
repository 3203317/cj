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

(function (exports){
	var sql = 'SELECT * FROM c_task WHERE SCHEDULE_TIME>? AND STARTUP=? ORDER BY CREATE_TIME ASC LIMIT 1';
	/**
	 * startup 0停止 1采集ing 2分析ing
	 *
	 * @param startup 启动状态
	 * @return
	 */
	exports.getByStartup = function(startup, cb){
		mysql.query(sql, [0, startup || 0], function (err, docs){
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
	function frmVali(newInfo, cb){
		cb(null);
	}

	/**
	 *
	 * @params
	 * @return
	 */
	(function (exports){
		var sql = 'INSERT INTO c_task (id, TASK_NAME, CREATE_TIME, STARTUP) values (?, ?, ?, ?)';

		exports.saveNew = function(newInfo, cb){
			frmVali(newInfo, function (err){
				if(err) return cb(err);

				var id = util.replaceAll(uuid.v1(), '-', '');

				function run(){
					// CREATE
					var postData = [
						id,
						newInfo.TASK_NAME,
						new Date(),
						0
					];
					mysql.query(sql, postData, function (err, status){
						if(err) return cb(err);
						cb(null, status);
					});
				}

				(function(){
					var newFolder = path.join(conf.robot.storagePath, id);

					fs.exists(newFolder, function (exists){
						if(exists) return run();

						fs.mkdir(newFolder, 777, function (err){
							if(err) return cb(err);

							console.log('[%s] 创建目录 %s', util.format(), id);
							run();
						});
					});
				})();
			});
		};
	})(exports);

	/**
	 *
	 * @params
	 * @return
	 */
	(function (exports){
		var sql = 'UPDATE c_task set TASK_NAME=?, SCHEDULE_TIME=?, STARTUP=? WHERE id=?';

		exports.editInfo = function(newInfo, cb){
			frmVali(newInfo, function (err){
				if(err) return cb(err);

				// data
				var postData = [
					newInfo.TASK_NAME,
					newInfo.SCHEDULE_TIME,
					newInfo.STARTUP,
					newInfo.id
				];

				// sql
				mysql.query(sql, postData, function (err, status){
					if(err) return cb(err);
					cb(null, status);
				});
			});
		};
	})(exports);
})(exports);