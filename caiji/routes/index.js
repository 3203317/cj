/*!
 * hnzswh-rvt-api
 * Copyright(c) 2015 hnzswh-rvt-api <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var util = require('speedt-utils'),
	express = util.express;

var manage = {
	user: require('../controllers/manage/user')
};

var api = {
	index: require('../controllers/api/index')
};

function proc_api(app){
	var index = api.index;

	// api
	app.post('/api/', express.valiPostData, index.signature_validate, index.index);
}

function proc_manage(app){
	var user = manage.user;

	// user
	app.get('/manage/user/login$', user.loginUI);
}

/**
 *
 * @param
 * @return
 */
module.exports = function(app){
	proc_manage(app);
	proc_api(app);
};