/* *
 管理员控制器
 所有需要管理员权限的行为
 * */
var passport = require('passport');
module.exports = {

	login: function(req, res) {
		req.body.username = req.body.auth_info

		passport.authenticate('local', function(err, user, info) {
			if((err) || (!user)) {
				return res.send({
					message: info.message,
					user: user
				});
			}
			req.logIn(user, function(err) {
				if(err) res.send(err);
				req.session.user = user;
				return res.send({
					result:'登录成功',
					user: user
				});
			});

		})(req, res);
	},

	logout: function(req, res) {
		req.logout();
		return res.json({
			result:'退出成功'
		})
	},

	//超管登录
	adminLogin: function(req, res) {
		var name = req.param('name');
		var password = req.param('password');

		if(name == 'yhkevin' && password == 'yh1993') {
			req.session.admin = {
				name: 'yhkevin',
				password: 'yh1993'
			};
			return res.json({
				result: '登录成功'
			})
		} else {
			return res.json({
				result: '登录错误'
			})
		}
	}

};