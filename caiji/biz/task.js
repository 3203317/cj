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
	var sql = 'SELECT * FROM c_task WHERE SCHEDULE_TIME>? AND STARTUP=? ORDER BY CREATE_TIME ASC LIMIT 1';
	/**
	 * STARTUP 0停止 1采集ing 2分析ing
	 *
	 * @params
	 * @return
	 */
	exports.getByStartup = function(startup, cb){
		startup = startup || 0;
		// TODO
		mysql.query(sql, [0, startup], function (err, docs){
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

				getScript('analysis', doc.id, function (err, script){
					if(err) return ep.emit('error', err);
					// TODO
					ep.emit('analysis', script);
				});

				getScript('resource', doc.id, function (err, script){
					if(err) return ep.emit('error', err);
					// TODO
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
		// TODO
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
				} // END

				(function(){
					var newFolder = path.join(conf.robot.storagePath, id);
					// TODO
					fs.exists(newFolder, function (exists){
						if(exists) return run();
						// TODO
						fs.mkdir(newFolder, 777, function (err){
							if(err) return cb(err);
							// TODO
							console.log('[%s] 创建目录 %s', util.format(), id);
							run();
						});
					}); // END
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
		// TODO
		exports.editInfo = function(newInfo, cb){
			frmVali(newInfo, function (err){
				if(err) return cb(err);
				// EDIT
				var postData = [
					newInfo.TASK_NAME,
					newInfo.SCHEDULE_TIME,
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

/**
 *
 * @params
 * @return
 */
(function (exports){
	var sql = 'UPDATE c_task set STARTUP=? WHERE STARTUP=?';
	// TODO
	exports.editByStartup = function(before, after, cb){
		mysql.query(sql, [after, before], function (err, status){
			if(err) return cb(err);
			cb(null, status);
		});
	};
})(exports);