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
 * 查询
 *
 * @param movie 对象
 * @param page 分页
 * @return
 */
exports.findByMovie = function(movie, page, orderby, cb){
	var params = [];
	var sql = 'SELECT * FROM d_movie WHERE 1=1';

	if(movie){
		if(movie.id){
			params.push(movie.id);
			sql += ' AND id=?';
		}

		if(movie.TYPE_ID){
			params.push(movie.TYPE_ID);
			sql += ' AND TYPE_ID=?';
		}

		if(movie.ZONE_ID){
			params.push(movie.ZONE_ID);
			sql += ' AND ZONE_ID=?';
		}

		if(movie.MATERIAL_ID){
			params.push('%,'+ movie.MATERIAL_ID +',%');
			sql += ' AND CONCAT(",", MATERIAL_ID, ",") like ?';
		}
	}

	// 排序
	(function(){
		if(orderby){
			sql += ' ORDER BY ';
			sql += orderby.join(',');
		}
	})();

	// 分页
	(function(){
		params.push((page[0] - 1) * page[1]);
		// 每页显示 10 条
		params.push(page[1]);

		sql += ' LIMIT ?, ?';
	})();

	mysql.query(sql, params, function (err, docs){
		if(err) return cb(err);

		// 附加电影类型
		movie_material.procData(function (err, obj){
			if(err) return cb(err);

			for(var i in docs){
				var doc = docs[i];
				if(!doc.MATERIAL_ID) break;
				doc.MATERIAL_ID_TEXT = obj[doc.MATERIAL_ID.split(',')[0]].TYPE_NAME;
			}

			cb(null, docs);
		});
	});
};

/**
 * 查询数量
 *
 * @param movie 对象
 * @param page 分页
 * @return
 */
exports.findByMovieCount = function(movie, cb){
	var params = [];
	var sql = 'SELECT COUNT(1) AS COUNT FROM d_movie WHERE 1=1';

	if(movie){
		if(movie.id){
			params.push(movie.id);
			sql += ' AND id=?';
		}

		if(movie.TYPE_ID){
			params.push(movie.TYPE_ID);
			sql += ' AND TYPE_ID=?';
		}

		if(movie.ZONE_ID){
			params.push(movie.ZONE_ID);
			sql += ' AND ZONE_ID=?';
		}

		if(movie.MATERIAL_ID){
			params.push('%,'+ movie.MATERIAL_ID +',%');
			sql += ' AND CONCAT(",", MATERIAL_ID, ",") like ?';
		}
	}

	mysql.query(sql, params, function (err, docs){
		if(err) return cb(err);
		cb(null, docs[0].COUNT);
	});
};

/**
 *
 * @params
 * @return
 */
exports.getById = function(id, cb){
	mysql_util.find(null, 'd_movie', [['id', '=', id]], null, null, function (err, docs){
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
		var sql = 'INSERT INTO d_movie (id, TASK_NAME, CREATE_TIME, STARTUP) values (?, ?, ?, ?)';
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
		var sql = 'UPDATE d_movie set TASK_NAME=?, SCHEDULE_TIME=?, STARTUP=? WHERE id=?';
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