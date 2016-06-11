/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var path = require('path');
var fs = require('fs');

/**
 * 获取脚本参数
 *
 * @param folder 文件夹名称
 * @param id
 * @return
 */
module.exports = function(folder, id, cb){
	var newPath = path.join(process.cwd(), 'script', folder, id +'.js');

	// 判断文件是否存在
	fs.exists(newPath, function (exists){
		if(!exists) return cb(null);

		// 读取脚本文件
		fs.readFile(newPath, 'utf-8', function (err, script){
			if(err) return cb(err);
			cb(null, script);
		});
	});
};