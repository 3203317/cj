/*!
 * hnzswh-rvt-api
 * Copyright(c) 2015 hnzswh-rvt-api <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var util = require('speedt-utils');
var EventProxy = require('eventproxy');

var conf = require('../../settings');

var EventProxy = require('eventproxy');

var biz = {
	movie: require('../../biz/movie')
};

/**
 *
 * @params
 * @return
 */
exports.indexUI = function(req, res, next){
	res.redirect('/new/');
};

/**
 *
 * @params
 * @return
 */
exports.newUI = function(req, res, next){

	var ep = EventProxy.create('movies', function (movies){
		res.render('portal/1.0.1/index', {
			conf: conf,
			description: '',
			keywords: ',html5,nodejs',
			data: {
				movies: movies
			}
		});
	});

	ep.fail(function (err, msg){
		cb(err);
	});

	biz.movie.findNew('dianying', function (err, docs){
		if(err) return ep.emit('error', err);

		var movies = { docs: docs, types: [] };

		for(var i in docs){
			if(-1 === movies.types.indexOf((docs[i]).TYPE_NAME)){
				movies.types.push((docs[i]).TYPE_NAME);
			}
		}

		ep.emit('movies', movies);
	});
};