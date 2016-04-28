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

function getScript(folder, id, cb){
	var newPath = path.join(process.cwd(), 'script', folder, id +'.js');
	// TODO
	fs.exists(newPath, function (exists){
		if(!exists) return cb(null);
		// TODO
		fs.readFile(newPath, 'utf-8', function (err, script){
			if(err) return cb(err);
			// TODO
			cb(null, script);
		});
	});
}

(function (exports){
	var sql = 'SELECT b.TASK_NAME, a.*'+
				' FROM (SELECT * FROM c_resource WHERE FINISHED=? AND TASK_ID=?) a LEFT JOIN c_task b ON (a.TASK_ID=b.id)'+
				' WHERE b.id IS NOT NULL AND a.RETRY_COUNT<b.RETRY_COUNT ORDER BY a.RETRY_COUNT ASC, a.CREATE_TIME ASC LIMIT 1';
	/**
	 *
	 * @params
	 * @return
	 */
	exports.getByFinished = function(finished, task_id, cb){
		// TODO
		mysql.query(sql, [finished, task_id], function (err, docs){
			if(err) return cb(err);
			// TODO
			if(!mysql.checkOnly(docs)) return cb(null);

			(function(){
				var doc = docs[0];

				// TODO
				var ep = EventProxy.create('analysis', 'resource', function (analysis, resource){
					// TODO
					doc.ANALYSIS_SCRIPT = analysis;
					doc.RESOURCE_SCRIPT = resource;
					cb(null, doc);
				});

				ep.fail(function (err){
					cb(err);
				});

				getScript('analysis', doc.TASK_ID, function (err, script){
					if(err) return ep.emit('error', err);
					ep.emit('analysis', script);
				});

				getScript('resource', doc.TASK_ID, function (err, script){
					if(err) return ep.emit('error', err);
					ep.emit('resource', script);
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
exports.getById = function(id, cb){
	// TODO
	mysql_util.find(null, 'c_resource', [['id', '=', id]], null, null, function (err, docs){
		if(err) return cb(err);
		// TODO
		cb(null, mysql.checkOnly(docs) ? docs[0] : null);
	});
};

/**
 *
 * @params
 * @return
 */
exports.getByTaskId = function(task_id, cb){
	// TODO
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
		var sql = 'INSERT INTO c_resource (id, URI, CHARSET, TITLE, RETRY_COUNT, CREATE_TIME, FINISHED, TASK_ID, DEPTH) values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
		// TODO
		function saveNew(conn, newInfo, cb){
			var postData = [
				util.replaceAll(uuid.v1(), '-', ''),
				newInfo.URI,
				newInfo.CHARSET,
				newInfo.TITLE,
				0,
				new Date(),
				0,
				newInfo.TASK_ID,
				newInfo.DEPTH
			];
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

			// TODO
			mysql.getPool(function (err, conn){
				if(err) return cb(err);
				// TODO
				conn.beginTransaction(function (err){
					if(err) return cb(err);
					// TODO
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
									} // END
									cb(null);
								});
							}

							saveNew(conn, newInfo, function (err, status){
								if(err){
									return conn.rollback(function(){
										cb(err);
									});
								} // END
								run();
							});
						} // END
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
		// TODO
		exports.editInfo = function(newInfo, cb){
			frmVali(newInfo, function (err){
				if(err) return cb(err);
				// EDIT
				var postData = [
					newInfo.URI,
					newInfo.CHARSET,
					newInfo.TITLE,
					newInfo.RETRY_COUNT,
					newInfo.FINISHED,
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

/**
 *
 * @params
 * @return
 */
(function (exports){
	var sql = 'DELETE FROM c_resource WHERE TASK_ID=?';
	// TODO
	exports.removeByTaskId = function(task_id, cb){
		mysql.query(sql, [task_id], function (err, status){
			if(err) return cb(err);
			cb(null, status);
		});
	};
})(exports);