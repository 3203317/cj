/*!
 * hnzswh-rvt-api
 * Copyright(c) 2015 hnzswh-rvt-api <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var util = require('speedt-utils');
var EventProxy = require('eventproxy');

var conf = require('../../settings');

/**
 *
 * @params
 * @return
 */
exports.indexUI = function(req, res, next){
	res.render('portal/1.0.1/index', {
		conf: conf,
		description: '',
		keywords: ',html5,nodejs'
	});
};