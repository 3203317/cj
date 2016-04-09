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
				var newPath = path.join(process.cwd(), 'script', doc.TASK_ID +'.js');

				fs.exists(newPath, function (exists){
					if(!exists) return cb(null, doc);
					// TODO
					fs.readFile(newPath, 'utf-8', function (err, script){
						if(err) return cb(err);
						// TODO
						doc.RUN_SCRIPT = script;
						cb(null, doc);
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
exports.getById = function(id, cb){
	// TODO
	mysql_util.find(null, 'c_uri', [['id', '=', id]], null, null, function (err, docs){
		if(err) return cb(err);
		cb(null, mysql.checkOnly(docs) ? docs[0] : null);
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
		var sql = 'INSERT INTO c_uri (id, URI, CHARSET, TITLE, TASK_ID, RETRY_COUNT, CREATE_TIME, FINISHED) values (?, ?, ?, ?, ?, ?, ?, ?)';
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
					newInfo.TASK_ID,
					0,
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