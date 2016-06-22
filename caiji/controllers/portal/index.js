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
	movie_zone: require('../../biz/movie_zone'),
	movie_material: require('../../biz/movie_material'),
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
exports.articleUI = function(req, res, next){

	biz.movie.getById(req.params.id, function (err, doc){
		if(err) return next(err);

		if(!doc) return res.redirect('/');

		var ep = EventProxy.create('zone', 'movie_material', function (zone, movie_material){
			res.render('portal/1.0.1/article', {
				conf: conf,
				description: '',
				keywords: ',html5,nodejs',
				nav: 'movie',
				data: {
					movie_material: movie_material,
					zone: zone
				}
			});
		});

		ep.fail(function (err, msg){
			cb(err);
		});

		(function(){
			ep.emit('zone', [{
				'neidi': '内地',
				'gangtai': '港台',
				'oumei': '欧美',
				'rihan': '日韩'
			}]);
		})();

		biz.movie_material.findAll(function (err, docs){
			if(err) return ep.emit('error', err);
			ep.emit('movie_material', docs);
		});
	});
};

/**
 *
 * @params
 * @return
 */
exports.materialUI = function(req, res, next){

	biz.movie_material.getById(req.params.name, function (err, doc){
		if(err) return next(err);

		if(!doc) return res.redirect('/');

		var ep = EventProxy.create('zone', 'movie_material', function (zone, movie_material){
			res.render('portal/1.0.1/material', {
				conf: conf,
				description: '',
				keywords: ',html5,nodejs',
				nav: 'movie',
				params: {
					name: doc.TYPE_NAME
				},
				data: {
					movie_material: movie_material,
					zone: zone
				}
			});
		});

		ep.fail(function (err, msg){
			cb(err);
		});

		(function(){
			ep.emit('zone', [{
				'neidi': '内地',
				'gangtai': '港台',
				'oumei': '欧美',
				'rihan': '日韩'
			}]);
		})();

		biz.movie_material.findAll(function (err, docs){
			if(err) return ep.emit('error', err);
			ep.emit('movie_material', docs);
		});
	});
};

/**
 * 最近更新
 *
 * @params
 * @return
 */
exports.newUI = function(req, res, next){

	var ep = EventProxy.create('new_movie', 'new_tv_neidi', 'new_tv_oumei', 'new_tv_gangtai', 'new_tv_rihan', 'view_count',
						function (new_movie, new_tv_neidi, new_tv_oumei, new_tv_gangtai, new_tv_rihan, view_count){
		res.render('portal/1.0.1/new', {
			conf: conf,
			description: '',
			keywords: ',html5,nodejs',
			nav: 'new',
			data: {
				view_count: view_count,
				new_movie: new_movie,
				new_tv_neidi: new_tv_neidi,
				new_tv_oumei: new_tv_oumei,
				new_tv_gangtai: new_tv_gangtai,
				new_tv_rihan: new_tv_rihan
			}
		});
	});

	ep.fail(function (err, msg){
		cb(err);
	});

	biz.movie.findByMovie({ TYPE_ID: 'dianying' }, [1, 10], ['UPDATE_TIME DESC'], function (err, docs){
		if(err) return ep.emit('error', err);

		var movie = { docs: docs, materials: [] };

		for(var i in docs){
			if(-1 !== movie.materials.indexOf((docs[i]).MATERIAL_ID_TEXT)) break;
			movie.materials.push((docs[i]).MATERIAL_ID_TEXT);
		}

		ep.emit('new_movie', movie);
	});

	biz.movie.findByMovie({ TYPE_ID: 'dianshi', ZONE_ID: 'neidi' }, [1, 10], ['UPDATE_TIME DESC'], function (err, docs){
		if(err) return ep.emit('error', err);
		ep.emit('new_tv_neidi', docs);
	});

	biz.movie.findByMovie({ TYPE_ID: 'dianshi', ZONE_ID: 'oumei' }, [1, 10], ['UPDATE_TIME DESC'], function (err, docs){
		if(err) return ep.emit('error', err);
		ep.emit('new_tv_oumei', docs);
	});

	biz.movie.findByMovie({ TYPE_ID: 'dianshi', ZONE_ID: 'gangtai' }, [1, 10], ['UPDATE_TIME DESC'], function (err, docs){
		if(err) return ep.emit('error', err);
		ep.emit('new_tv_gangtai', docs);
	});

	biz.movie.findByMovie({ TYPE_ID: 'dianshi', ZONE_ID: 'rihan' }, [1, 10], ['UPDATE_TIME DESC'], function (err, docs){
		if(err) return ep.emit('error', err);
		ep.emit('new_tv_rihan', docs);
	});

	// 人气排行 访问量
	biz.movie.findByMovie(null, [1, 10], ['VIEW_COUNT DESC'], function (err, docs){
		if(err) return ep.emit('error', err);
		ep.emit('view_count', docs);
	});
};