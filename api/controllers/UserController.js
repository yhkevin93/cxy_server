/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcryptjs');

module.exports = {

	_config: {
		actions: false,
		shortcuts: false,
		rest: false
	},
	//第一次绑定账号
	binding: function(req, res) {
		var data = req.allParams();

		//删除余额数据防止造假
		delete data.blance;
		//删除密码以防胡乱修改
		delete data.password;

		data.state = '离线';

		console.log(data)
		User.update({
			id: req.session.passport.user
		}, data).exec(function(err, update) {
			if(err) {
				return res.status(404);
			}

			return res.json({
				result: '绑定成功',
				user: update
			})
		})

	},

	//用户修改自己信息
	update: function(req, res) {
		var data = req.allParams();

		//删除余额数据防止造假
		delete data.blance;
		//删除密码以防胡乱修改
		delete data.password;

		console.log(data);

		User.update({
			id: req.session.passport.user
		}, data).exec(function(err, update) {
			if(err) {
				return res.status(404);
			}

			return res.json({
				result: '修改成功',
				user: update
			})
		})
	},
	//修改密码
	updatePassword: function(req, res) {
		var password = req.param('password');

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				if(err) {
					console.log(err);
					cb(err);
				} else {

					User.update({
						id: req.session.passport.user
					}, {
						password: hash
					}).exec(function(err, update) {
						if(err) {
							return res.status(404);
						}

						return res.json({
							result: '修改成功',
							user: update
						})
					})

				}
			});
		});
	},

	logout: function(req, res) {
		req.logout();
		return res.json({
			result: '退出成功'
		})
	}
};