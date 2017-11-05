 module.exports = {
 	//返回起始和结束页
 	//需要传惨count，总数
 	//current，当前页数
 	getPageInfo(options, done){
 		//num是每页显示数量
 		num = 10
 		
 		var total = Math.ceil(options.count / num);

 		var start
 		var end
 		var n = 5;

 		if(total < n) {
 			start = 1;
 			end = total;
 		} else {

 			var swap = (options.n - 1) / 2;
 			start = (options.current - swap) > 0 ? options.current - swap : 1;
 			end = (options.current + swap) < total ? options.current + swap : total;
 			if(start == 1) {
 				end = n;
 			}
 			if(end == total) {
 				start = total - n + 1;
 			}
 			
 		}
 		return done(start,end)
 	}

 	//num每页显示数量，n显示几个标签，count总数，current当前页
// 	function getPageInfo(count, current, num, n, cb) {
// 		var total = Math.ceil(count / num);
//
// 		var start
// 		var end
//
// 		if(total < n) {
// 			start = 1;
// 			end = total;
// 		} else {
//
// 			var swap = (n - 1) / 2;
// 			start = (current - swap) > 0 ? current - swap : 1;
// 			end = (current + swap) < total ? current + swap : total;
// 			if(start == 1) {
// 				end = n;
// 			}
// 			if(end == total) {
// 				start = total - n + 1;
// 			}
// 		}
// 		cb(start, end)
// 	}

 }