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
 * 检测分页
 *
 * @params
 * @return
 */
exports.vali_page = function(req, res, next){
	var page = util.checkNum(req.params.page);
	if(!page) return res.redirect('/');
	next();
};

(function (exports){
	var s = ['hot', 'rating', 'create', 'release'];

	exports.vali_action = function(req, res, next){
		if(-1 === s.indexOf(req.params.action)) return res.redirect('/');
		next();
	};
})(exports);

/**
 * 检测影片类型
 *
 * @params
 * @return
 */
exports.vali_material = function(req, res, next){
	biz.movie_material.findByZone({ id: req.params.movie_material_id }, function (err, docs){
		if(err) return next(err);
		// 判断是否存在一条记录
		if(!docs || 0 === docs.length) return res.redirect('/');
		req.flash('movie_material', docs[0]);
		next();
	});
};

/**
 *
 * @params
 * @return
 */
exports.materialUI = function(req, res, next){

	// 从flash中获取
	var material = req.flash('movie_material')[0];

	var ep = EventProxy.create('movie_material', 'view_count', 'movies',
						function (movie_material, view_count, movies){
		res.render('portal/1.0.1/material', {
			conf: conf,
			description: '',
			keywords: ',html5,nodejs',
			nav: 'movie',
			params: {
				movie_action: req.params.action || '',
				movie_material_id: material.id,
				movie_material_name: material.TYPE_NAME
			},
			data: {
				movies: movies,
				view_count: view_count,
				movie_material: movie_material
			}
		});
	});

	ep.fail(function (err, msg){
		cb(err);
	});

	biz.movie_material.findByZone(null, function (err, docs){
		if(err) return ep.emit('error', err);
		ep.emit('movie_material', docs);
	});

	// 人气排行 访问量
	biz.movie.findByMovie({ MATERIAL_ID: material.id }, [1, 10], ['VIEW_COUNT DESC'], function (err, docs){
		if(err) return ep.emit('error', err);
		ep.emit('view_count', docs);
	});

	// 根据动作查询
	switch(req.params.action){
		case 'hot':
		case 'rating':
			biz.movie.findByMovie({ MATERIAL_ID: material.id }, [req.params.page || 1, 10], ['VIEW_COUNT DESC'], function (err, docs){
				if(err) return ep.emit('error', err);
				ep.emit('movies', docs);
			});
			break;
		case 'create':
			biz.movie.findByMovie({ MATERIAL_ID: material.id }, [req.params.page || 1, 10], ['CREATE_TIME DESC'], function (err, docs){
				if(err) return ep.emit('error', err);
				ep.emit('movies', docs);
			});
			break;
		case 'release':
			biz.movie.findByMovie({ MATERIAL_ID: material.id }, [req.params.page || 1, 10], ['AGE DESC'], function (err, docs){
				if(err) return ep.emit('error', err);
				ep.emit('movies', docs);
			});
			break;
		default:
			biz.movie.findByMovie({ MATERIAL_ID: material.id }, [req.params.page || 1, 10], ['UPDATE_TIME DESC'], function (err, docs){
				if(err) return ep.emit('error', err);
				ep.emit('movies', docs);
			});
			break;
	}
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