/* *
 管理员控制器
 所有需要管理员权限的行为
 * */
var passport = require('passport');
var bcrypt = require('bcryptjs');
module.exports = {

	login: function(req, res) {
		req.body.username = req.body.restaurant_id

		passport.authenticate('local', function(err, user, info) {
			if((err) || (!user)) {
				return res.send({
					result: info.result,
					user: user
				});
			}
			req.logIn(user, function(err) {
				if(err) res.send(err);
				req.session.user = user;
				return res.send({
					result: '登录成功',
					user: user
				});
			});

		})(req, res);
	},

	logout: function(req, res) {
		req.logout();
		return res.json({
			result: '退出成功'
		})
	},

	//管理员登录
	adminLogin: function(req, res) {
		
	
		
		var phone = req.param('phone');
		var password = req.param('password');
		//超管
		if(phone == 'yhkevin' && password == 'yh1993') {
			req.session.admin = {
				name: 'yhkevin',
				password: 'yh1993',
				employee_identity: '超级管理员'
			};
			return res.json({
				result: '登录成功',
				employee: {
					name: '颜浩',
					phone:18030409893,
					employee_identity: '超级管理员'
				}
			})
			//其他员工
		} else {

			Employee.findOne({
				phone: phone
			}).exec(function(err, employee) {
				if(err) {
					return res.json(err)
				}

				if(!employee) {
					return res.json({
						result: '没有相关员工'
					})
				}

				bcrypt.compare(password, employee.password, function(err, result) {
					if(!result) {
						return res.json({
							result: '密码错误'
						})
					};

					if(employee.employee_identity != '管理员') {
						return res.json({
							result: '你不是管理员'
						})
					}

					req.session.admin = employee
					return res.json({
						result: '登录成功',
						employee: employee
					})

				})

			})

		}
	},

	//员工登录
	employeeLogin: function(req, res) {
		var phone = req.param('phone');
		var password = req.param('password');

		Employee.findOne({
			phone: phone
		}).exec(function(err, employee) {
			if(err) {
				return res.json(err)
			}

			if(!employee) {
				return res.json({
					result: '没有相关员工'
				})
			}

			bcrypt.compare(password, employee.password, function(err, result) {
				if(!result) {
					return res.json({
						result: '密码错误'
					})
				};

				req.session.employee = employee
				return res.json({
					result: '登录成功',
					employee: employee
				})

			})

		})
	}

};