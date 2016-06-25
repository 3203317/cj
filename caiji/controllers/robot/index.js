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

	exports.index = function(req, res, next){
		var result = { success: false };

		result.task_id = req.params.task_id;
		res.send(result);
	};
})(exports);