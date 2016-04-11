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

function getScript(run_script, cb){
	var newPath = path.join(process.cwd(), 'script', run_script);
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
				' FROM (SELECT * FROM c_uri WHERE FINISHED=?) a LEFT JOIN c_task b ON (a.TASK_ID=b.id)'+
				' WHERE b.id IS NOT NULL AND a.RETRY_COUNT<b.RETRY_COUNT ORDER BY a.RETRY_COUNT ASC, a.CREATE_TIME ASC LIMIT 1';
	/**
	 *
	 * @params
	 * @return
	 */
	exports.getByFinished = function(finished, cb){
		finished = finished || 0;
		// TODO
		mysql.query(sql, [finished], function (err, docs){
			if(err) return cb(err);
			// TODO
			if(!mysql.checkOnly(docs)) return cb(null);

			(function(){
				var doc = docs[0];
				// TODO
				getScript(doc.RUN_SCRIPT, function (err, script){
					if(err) return cb(err);
					// TODO
					doc.SCRIPT = script;
					cb(null, doc);
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
	mysql_util.find(null, 'c_uri', [['id', '=', id]], null, null, function (err, docs){
		if(err) return cb(err);
		// TODO
		if(!mysql.checkOnly(docs)) return cb(null);

		(function(){
			var doc = docs[0];
			// TODO
			getScript(doc.RUN_SCRIPT, function (err, script){
				if(err) return cb(err);
				// TODO
				doc.SCRIPT = script;
				cb(null, doc);
			});
		})();
	});
};

/**
 *
 * @params
 * @return
 */
exports.findByTaskId = function(task_id, cb){
	// TODO
	mysql_util.find(null, 'c_uri', [['task_id', '=', task_id]], null, null, function (err, docs){
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
	function formVali(newInfo, cb){
		cb(null);
	}

	/**
	 *
	 * @params
	 * @return
	 */
	(function (exports){
		var sql = 'INSERT INTO c_uri (id, URI, CHARSET, TITLE, RETRY_COUNT, CREATE_TIME, FINISHED, TASK_ID, RUN_SCRIPT, DEPTH) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		// TODO
		exports.saveNew = function(newInfo, cb){
			formVali(newInfo, function (err){
				if(err) return cb(err);				
				// CREATE
				var postData = [
					util.replaceAll(uuid.v1(), '-', ''),
					newInfo.URI,
					newInfo.CHARSET,
					newInfo.TITLE,
					0,
					new Date(),
					0,
					newInfo.TASK_ID,
					newInfo.RUN_SCRIPT,
					newInfo.DEPTH
				];
				mysql.query(sql, postData, function (err, status){
					if(err) return cb(err);
					cb(null, status);
				});
			});
		};

		exports.batchSaveNew = function(newInfos, cb){
			var self = this;

			if(!newInfos) return cb(null);
			if(0 === newInfos.length) return cb(null);

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

							self.saveNew(newInfo, function (err, status){
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
		var sql = 'UPDATE c_uri set URI=?, CHARSET=?, TITLE=?, TASK_ID=?, RETRY_COUNT=?, FINISHED=? WHERE id=?';
		// TODO
		exports.editInfo = function(newInfo, cb){
			formVali(newInfo, function (err){
				if(err) return cb(err);
				// EDIT
				var postData = [
					newInfo.URI,
					newInfo.CHARSET,
					newInfo.TITLE,
					newInfo.TASK_ID,
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