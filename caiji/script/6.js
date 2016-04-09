/*!
 * 飘花--动作--分页
 * Copyright(c) 2015 caiji <3203317@qq.com>
 * MIT Licensed
 */
html.match(/<a\s.*href=(\'([^<>"\']*)\').*>下一页<\/A>/ig);
result = RegExp.$2;
if(result) result = 'http://www.piaohua.com/html/dongzuo/'+ result;
html = null;