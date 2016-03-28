/*!
 * hnzswh-rvt-api
 * Copyright(c) 2015 hnzswh-rvt-api <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var util = require('speedt-utils'),
	express = util.express;

var user = require('../controllers/user');

/**
 *
 * @param
 * @return
 */
module.exports = function(app){
	app.get('/user/login$', user.loginUI);
};