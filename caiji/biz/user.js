/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var util = require('speedt-utils'),
	uuid = require('node-uuid'),
	rest = util.service.rest,
	md5 = util.md5,
	mysql_util = util.mysql_util,
	mysql = util.mysql;

var EventProxy = require('eventproxy');

var exports = module.exports;

var biz = {};

(function (exports){
	var _sql = 'SELECT a.* FROM s_user a WHERE 1=1';

	/**
	 *
	 * @params
	 * @return
	 */
	exports.findByUser = function(pagination, user, cb){
		var sql = _sql;
		var postData = [];

		if(user){
			// TODO
			var USER_NAME = util.isEmpty(user.USER_NAME);
			if(USER_NAME){
				sql += ' AND a.USER_NAME like ?';
				postData.push(USER_NAME);
			}
		}

		sql += ' ORDER BY a.CREATE_TIME DESC';

		if(pagination){
			sql += ' LIMIT ?, ?';
			postData.push((pagination[1] - 1) * pagination[0]);
			postData.push(pagination[0]);
		}

		// TODO
		mysql.query(sql, postData, function (err, docs){
			if(err) return cb(err);
			cb(null, docs);
		});
	};

	/**
	 *
	 * @params
	 * @return
	 */
	exports.getById = function(id, cb){
		var sql = _sql +' AND a.id=?';
		mysql.query(sql, [id], function (err, docs){
			if(err) return cb(err);
			cb(null, mysql.checkOnly(docs) ? docs[0] : null);
		});
	};

	/**
	 *
	 * @params
	 * @return
	 */
	exports.findByName = function(user_name, cb){
		var sql = _sql +' AND a.USER_NAME=?';
		mysql.query(sql, [user_name], function (err, docs){
			if(err) return cb(err);
			cb(null, mysql.checkOnly(docs) ? docs[0] : null);
		});
	};

	/**
	 *
	 * @params
	 * @return
	 */
	exports.findByApiKey = function(apikey, cb){
		var sql = _sql +' AND a.APIKEY=?';
		mysql.query(sql, [apikey], function (err, docs){
			if(err) return cb(err);
			cb(null, mysql.checkOnly(docs) ? docs[0] : null);
		});
	};
})(exports);

/**
 * 用户登陆
 *
 * @params {Object} logInfo 用户登陆信息
 * @params {Function} cb 回调函数
 * @return
 */
exports.login = function(logInfo, cb){
	logInfo.USER_NAME = util.isEmpty(logInfo.USER_NAME);
	if(!logInfo.USER_NAME) return cb(null, ['用户名或密码输入错误']);

	this.findByName(logInfo.USER_NAME, function (err, doc){
		if(err) return cb(err);
		// TODO
		if(!doc) return cb(null, ['用户名或密码输入错误']);

		// TODO
		if(1 !== doc.STATUS) return cb(null, ['禁止登陆']);

		// TODO
		if(md5.hex(logInfo.USER_PASS) !== doc.USER_PASS)
			return cb(null, ['用户名或密码输入错误']);

		cb(null, null, doc);
	});
};

/**
 *
 * @params
 * @return
 */
exports.findBySecKey = function(SECKEY, cb){
	// TODO
	mysql_util.find(null, 's_user', [['SECKEY', '=', SECKEY]], null, null, function (err, docs){
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

	function genApiKey(cb){
		var that = this;
		var apiKey = rest.genApiKey();

		that.findByApiKey(apiKey, function (err, doc){
			if(err) return cb(err);
			// TODO
			if(doc) return genApiKey.call(that, cb);
			cb(null, apiKey);
		});
	}

	function genSecKey(cb){
		var that = this;
		var secKey = rest.genSecKey();

		that.findBySecKey(secKey, function (err, doc){
			if(err) return cb(err);
			// TODO
			if(doc) return genSecKey.call(that, cb);
			cb(null, secKey);
		});
	}

	/**
	 *
	 * @params
	 * @return
	 */
	(function (exports){
		var sql = 'INSERT INTO s_user (id, USER_NAME, USER_PASS, EMAIL, MOBILE, APIKEY, SECKEY, REAL_NAME, CREATE_TIME, STATUS) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		// TODO
		exports.saveNew = function(newInfo, cb){
			newInfo.USER_NAME = util.isEmpty(newInfo.USER_NAME);
			if(!newInfo.USER_NAME) return cb(null, ['手机号不能为空']);

			var that = this;

			formVali(newInfo, function (err){
				if(err) return cb(err);
				// TODO
				that.findByName(newInfo.USER_NAME, function (err, doc){
					if(err) return cb(err);
					// TODO
					if(doc) return cb(null, ['手机号已经存在']);

					// TODO
					var ep = EventProxy.create('apiKey', 'secKey', function (apiKey, secKey){
						// CREATE
						var postData = [
							util.replaceAll(uuid.v1(), '-', ''),
							newInfo.USER_NAME,
							md5.hex(newInfo.USER_PASS || '123456'),
							newInfo.EMAIL || '',
							newInfo.MOBILE,
							apiKey,
							secKey,
							newInfo.REAL_NAME || '',
							new Date(),
							newInfo.STATUS || 0
						];
						mysql.query(sql, postData, function (err, status){
							if(err) return cb(err);
							cb(null, null, status);
						});
					});

					ep.fail(function (err, msg){
						cb(err);
					});

					genApiKey.call(that, function (err, apiKey){
						if(err) return ep.emit('error', err);
						ep.emit('apiKey', apiKey);
					});

					genSecKey.call(that, function (err, secKey){
						if(err) return ep.emit('error', err);
						ep.emit('secKey', secKey);
					});
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
		var sql = 'UPDATE s_user set APIKEY=?, SECKEY=?, EMAIL=?, MOBILE=?, REAL_NAME=?, STATUS=? WHERE id=?';
		// TODO
		exports.editInfo = function(newInfo, cb){
			var that = this;

			formVali(newInfo, function (err){
				if(err) return cb(err);
				// EDIT
				var ep = EventProxy.create('apiKey', 'secKey', function (apiKey, secKey){
					// CREATE
					var postData = [
						apiKey,
						secKey,
						newInfo.EMAIL,
						newInfo.MOBILE,
						newInfo.REAL_NAME,
						newInfo.STATUS,
						newInfo.id
					];
					mysql.query(sql, postData, function (err, status){
						if(err) return cb(err);
						cb(null, null, status);
					});
				});

				ep.fail(function (err, msg){
					cb(err);
				});

				genApiKey.call(that, function (err, apiKey){
					if(err) return ep.emit('error', err);
					ep.emit('apiKey', apiKey);
				});

				genSecKey.call(that, function (err, secKey){
					if(err) return ep.emit('error', err);
					ep.emit('secKey', secKey);
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
	var sql = 'UPDATE s_user set USER_PASS=? WHERE id=?';
	// TODO
	exports.changePwd = function(newInfo, cb){
		newInfo.USER_PASS = util.isEmpty(newInfo.USER_PASS);
		if(!newInfo.USER_PASS) return cb(null, ['新密码不能为空']);

		// TODO
		this.getById(newInfo.id, function (err, doc){
			if(err) return cb(err);
			if(!doc) return cb(null, ['修改密码失败']);
			// TODO
			if(md5.hex(newInfo.OLD_PASS) !== doc.USER_PASS){
				return cb(null, ['原始密码错误']);
			}

			// CREATE
			var postData = [
				md5.hex(newInfo.USER_PASS || '123456'),
				newInfo.id
			];
			mysql.query(sql, postData, function (err, status){
				if(err) return cb(err);
				cb(null, null, status);
			});
		});
	};
})(exports);