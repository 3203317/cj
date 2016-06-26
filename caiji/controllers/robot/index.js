/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var utils = require('speedt-utils');
var EventProxy = require('eventproxy');
var path = require('path');
var fs = require('fs');
var cwd = process.cwd();

var conf = require('../../settings');

var exports = module.exports;

/**
 *
 * @param
 * @return
 */
(function (exports){

	function readJson(task_id, files, cb){
		var j = [];

		var i = 0;

		function getFile(){
			var file = files[i++];
			if(!file) return null;
			return ('.json' === utils.getFileSuffix(file)) ? file : getFile();
		}

		function run(){
			var file = getFile();

			if(!file) return cb(null, j);

			fs.readFile(path.join(conf.robot.storagePath, task_id, file), 'utf-8', function (err, json){
				if(err) return cb(err);
				j.push(JSON.parse(json));
				run();
			});
		}

		run();
	}

	exports.index = function(req, res, next){
		var result = { success: false };

		fs.readdir(path.join(conf.robot.storagePath, req.params.task_id), function (err, files){
			if(err) return res.send(result);

			readJson(req.params.task_id, files, function (err, json){
				if(err) return next(err);
				result.data = json;
				result.success = !0;
				res.send(result);
			});
		});
	};
})(exports);