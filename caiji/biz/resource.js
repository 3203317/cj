/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var fs = require('fs');

var util = require('speedt-utils'),
	uuid = require('node-uuid'),
	md5 = util.md5,
	mysql_util = util.mysql_util,
	mysql = util.mysql;

var EventProxy = require('eventproxy');

var path = require('path');
var conf = require('../settings');

var exports = module.exports;

(function (exports){
	var sql = 'SELECT b.TASK_NAME, a.*'+
				' FROM (SELECT * FROM c_resource WHERE FINISHED=? AND TASK_ID=?) a LEFT JOIN c_task b ON (a.TASK_ID=b.id)'+
				' WHERE b.id IS NOT NULL AND a.RETRY_COUNT<b.RETRY_COUNT ORDER BY a.RETRY_COUNT ASC, a.CREATE_TIME ASC LIMIT 1';
	/**
	 *
	 * @param finished 0停止 1捕获 2分析
	 * @param task_id 任务id
	 * @return
	 */
	exports.getByFinished = function(finished, task_id, cb){
		mysql.query(sql, [finished, task_id], function (err, docs){
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
	mysql_util.find(null, 'c_resource', [['id', '=', id]], null, null, function (err, docs){
		if(err) return cb(err);
		cb(null, mysql.checkOnly(docs) ? docs[0] : null);
	});
};

/**
 *
 * @params
 * @return
 */
exports.getByTaskId = function(task_id, cb){
	mysql_util.find(null, 'c_resource', [['task_id', '=', task_id]], null, null, function (err, docs){
		if(err) return cb(err);
		cb(null, docs);
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
		var sql = 'INSERT INTO c_resource (id, PID, URI, SORT, CHARSET, TITLE, RETRY_COUNT, CREATE_TIME, FINISHED, TASK_ID, DEPTH) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

		function saveNew(conn, newInfo, cb){

			// data
			var postData = [
				util.replaceAll(uuid.v1(), '-', ''),
				newInfo.PID,
				newInfo.URI,
				newInfo.SORT,
				newInfo.CHARSET,
				newInfo.TITLE,
				0,
				new Date(),
				0,
				newInfo.TASK_ID,
				newInfo.DEPTH
			];

			// sql
			conn.query(sql, postData, function (err, status){
				if(err) return cb(err);
				cb(null, status);
			});
		};

		exports.saveNew = function(newInfo, cb){
			saveNew(mysql, newInfo, cb);
		};

		exports.batchSaveNew = function(newInfos, cb){
			var self = this;

			if(!newInfos || 0 === newInfos.length) return cb(null);

			// 池
			mysql.getPool(function (err, conn){
				if(err) return cb(err);

				// 事务
				conn.beginTransaction(function (err){
					if(err) return cb(err);

					// 闭包
					(function(){
						var i = 0;

						function getNewInfo(){
							return newInfos[i++];
						}

						function run(){
							var newInfo = getNewInfo();

							if(!newInfo){
								return conn.commit(function (err){
									if(err){
										return conn.rollback(function(){
											cb(err);
										});
									}

									cb(null);
								});
							}

							saveNew(conn, newInfo, function (err, status){
								if(err){
									return conn.rollback(function(){
										cb(err);
									});
								}

								run();
							});
						}

						run();
					})();
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
		var sql = 'UPDATE c_resource set URI=?, CHARSET=?, TITLE=?, RETRY_COUNT=?, FINISHED=? WHERE id=?';

		exports.editInfo = function(newInfo, cb){
			frmVali(newInfo, function (err){
				if(err) return cb(err);

				// data
				var postData = [
					newInfo.URI,
					newInfo.CHARSET,
					newInfo.TITLE,
					newInfo.RETRY_COUNT,
					newInfo.FINISHED,
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

/**
 *
 * @params
 * @return
 */
(function (exports){
	var sql = 'DELETE FROM c_resource WHERE TASK_ID=?';

	// 删除资源 by 任务id
	exports.removeByTaskId = function(task_id, cb){
		mysql.query(sql, [task_id], function (err, status){
			if(err) return cb(err);
			cb(null, status);
		});
	};
})(exports);

/**
 *
 * @params
 * @return
 */
(function (exports){
	var sql = 'UPDATE c_resource set RETRY_COUNT=1+RETRY_COUNT WHERE id=?';

	exports.editRetryCount = function(id, cb){
		mysql.query(sql, [id], function (err, status){
			if(err) return cb(err);
			cb(null, status);
		});
	};
})(exports);