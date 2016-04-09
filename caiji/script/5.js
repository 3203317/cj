/*!
 * 破晓--科幻--分页
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
html.match(/<a\s.*href=(\"([^<>"\']*)\").*>下一页<\/A>/ig);
result = RegExp.$2;
if(result) result = 'http://www.poxiao.com'+ result;
html = null;