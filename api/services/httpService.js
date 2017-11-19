 //网络请求工具
 var request = require('request');

 module.exports = {
    //http请求
    /*
     需要参数:url地址
     method:get post
     headers请求头
     * */
 	http: function(options, done) {
 		request({
 			url: options.url,
 			method: options.method,
 			json: true,
 			headers: options.headers
 		}, function(error, response, body) {
 			if(!error && response.statusCode == 200) {
 				done(body);
 			}
 		});
 	}
 }