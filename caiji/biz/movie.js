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

var movie_material = require('./movie_material');

var exports = module.exports;

/**
 * 获取最近更新的电影
 *
 * @param
 * @return
 */
(function (exports){
	var sql = 'SELECT * FROM d_movie WHERE TYPE_ID=? ORDER BY UPDATE_TIME DESC LIMIT 10';

	exports.findNew = function(type_id, cb){
		mysql.query(sql, [type_id], function (err, docs){
			if(err) return cb(err);

			movie_material.procData(function (err, obj){
				if(err) return cb(err);

				for(var i in docs){
					var doc = docs[i];
					doc.MATERIAL_ID_TEXT = obj[doc.MATERIAL_ID.split(',')[0]].TYPE_NAME;
				}

				cb(null, docs);
			});
		});
	};
})(exports);

/**
 * 电视剧
 *
 * @param
 * @return
 */
(function (exports){
	var sql = 'SELECT * FROM d_movie WHERE TYPE_ID="dianshiju" AND ZONE_ID=? ORDER BY UPDATE_TIME DESC LIMIT 10';

	exports.findNewTv = function(zone_id, cb){
		mysql.query(sql, [zone_id], function (err, docs){
			if(err) return cb(err);

			movie_material.procData(function (err, obj){
				if(err) return cb(err);

				for(var i in docs){
					var doc = docs[i];
					doc.MATERIAL_ID_TEXT = obj[doc.MATERIAL_ID.split(',')[0]].TYPE_NAME;
				}

				cb(null, docs);
			});
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