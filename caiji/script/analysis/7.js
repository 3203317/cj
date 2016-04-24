/*!
 * caiji
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
// var cheerio = require('cheerio');
// var Spooky = require('spooky');

// var docs = [{
// 	DEPTH: 2,
// 	html: '<html><body></body></html>',
// 	URI: 'http://www.poxiao.com/movie/41006.html'
// }];

// function callback(err, data){
// 	console.log(arguments);
// };

(function(){
	function casperjs(uri, cb){
		var spooky = new Spooky({
			child: {
				transport: 'http'
			}, casper: {
				logLevel: 'debug',
				verbose: true,
				timeout: 1000 * 10,
				pageSettings: {
					// outputEncoding: 'gb2312',
					loadImages: false,
					loadPlugins: false
				}
			}
		}, function (err){
			if(err) cb(err);
			// TODO
			spooky.start(uri, function(){
				// TODO
				var newDoc = {};

				newDoc.INTRO = this.getHTML('p.inner_content');

				newDoc.OTHER = this.evaluate(function(){
					return __utils__.findOne('#button').getAttribute('value');
				});

				// TODO
				this.emit('newDoc', newDoc);
			});

			spooky.run();
		});

		// spooky.on('console', function (line){
		// 	console.log(line);
		// });

		spooky.on('error', function (err, stack){
			cb(err);
		});

		spooky.on('newDoc', function (newDoc){
			cb(null, newDoc);
		});
	}

	function analysis(doc, cb){
		// TODO
		casperjs(doc.URI, function (err, newDoc){
			if(err) return cb(err);

			// TODO
			var $ = cheerio.load(doc.html, { decodeEntities: false });
			// 标题
			newDoc.TITLE = $('#film').find('.detail_pic1').find('>img').attr('alt');
			// 图片
			newDoc.IMG = $('#film').find('.detail_pic1').find('>img').attr('src');
			newDoc.RELEASE_DATE = true;

			cb(null, newDoc);
		});
	}

	(function(){
		var data = [];
		var i = 0;

		function getDoc(){
			return docs[i++];
		}

		function run(){
			var doc = getDoc();
			// TODO
			if(!doc) return callback(null, data);

			// TODO
			if(2 !== doc.DEPTH) return run();
			if(!doc.html) return run();

			// TODO
			analysis(doc, function (err, newDoc){
				if(err) return callback(err);
				// TODO
				data.push(newDoc);
				run();
			});
		}; // FUNC

		run();
	})();
})();