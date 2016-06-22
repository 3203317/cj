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

var portal = {
	index: require('../controllers/portal/index')
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

function proc_portal(app){
	var index = portal.index;


	app.get('/archive/:id.html$', index.articleUI);

	app.get('/new/', index.newUI);
	app.get('/movie/:movie_material_id/:action/', index.vali_action, index.materialUI);
	app.get('/movie/:movie_material_id/', index.materialUI);

	app.get('/', index.indexUI);
}

/**
 *
 * @param
 * @return
 */
module.exports = function(app){
	proc_manage(app);
	proc_api(app);
	proc_portal(app);
};