/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcryptjs');
var request = require('request');

module.exports = {

	_config: {
		actions: false,
		shortcuts: false,
		rest: false
	},
	//第一次绑定账号
	binding: function(req, res) {
		var data = req.allParams();

		//鉴权信息和设备ID用户不能修改
		delete data.user_info;
		delete data.restaurant_id;
		//删除余额数据防止造假
		delete data.blance;
		//删除密码以防胡乱修改
		delete data.password;

		data.state = '离线';

		User.update({
			id: req.session.passport.user
		}, data).exec(function(err, update) {
			if(err) {
				return res.json(err);
			}

			return res.json({
				result: '绑定成功',
				user: update[0]
			})
		})

	},

	//用户修改自己信息
	update: function(req, res) {
		var data = req.allParams();
		//鉴权信息和设备ID用户不能修改
		delete data.user_info;
		delete data.restaurant_id;
		//删除余额数据防止造假
		delete data.blance;
		//删除密码以防胡乱修改
		delete data.password;

		User.update({
			id: req.session.passport.user
		}, data).exec(function(err, update) {
			if(err) {
				return res.status(404);
			}

			return res.json({
				result: '修改成功',
				user: update[0]
			})
		})
	},
	//修改密码
	updatePassword: function(req, res) {
		var password = req.param('password');

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				if(err) {
					return res.json({
						result: err
					})
				} else {

					User.update({
						restaurant_id: req.session.user.restaurant_id
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
	//用户读取收油信息
	oilRecord: function(req, res) {

		User.findOne({
			id: req.session.passport.user
		}).populate('oil_record').exec(function(err, user) {

		})
	},

	logout: function(req, res) {
		req.logout();
		return res.json({
			result: '退出成功'
		})
	},
	//用户去读自己油量信息
	oilData: function(req, res) {

		var url = 'http://api.heclouds.com/devices/' + req.session.user.restaurant_id + '/datastreams/w'
		httpService.http({
			url: url,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'api-key': 'zlbf7ZwLetP=TDP=IC7p0JOE740='
			}
		}, function(body) {

			return res.json(body)
		})
	},
	//用户查询自己收油记录
	dealData: function(req, res) {
		var page = req.param('page') ? req.param('page') : 1;
		var skip = (page - 1) * 10;

		Oil.find({
			where: {
				restaurant_id: req.session.user.restaurant_id
			},
			sort: 'createdAt DESC',
			limit: 10,
			skip: skip
		}).exec(function(err, oil) {
			if(err) {
				return res.json(err)
			}

			return res.json(oil);
		})
	},
	//查询拉油统计
	dealCount: function(req, res) {

		var restaurant_id = req.session.user.restaurant_id

		async.series({
			today: function(cb) {
				var today = 0

				timeService.getToday({}, function(day) {

					Oil.find({
						where: {
							restaurant_id: req.session.user.restaurant_id,
							oil_date: {
								'startsWith': day
							}
						}
					}).exec(function(err, oils) {

						oils.forEach(function(oil) {

							today += oil.oil_mass

						})

						cb(null, today)

					})
				})

			},
			week: function(cb) {
				var week = 0;

				timeService.getWeekStart({}, function(start) {

					Oil.find({
						where: {
							restaurant_id: req.session.user.restaurant_id,
							oil_date: {
								'>=': start
							}
						}
					}).exec(function(err, oils) {

						oils.forEach(function(oil) {

							week += oil.oil_mass

						})

						cb(null, week)

					})
				})

			},
			month: function(cb) {
				var month = 0;

				timeService.getMonthStart({}, function(start) {

					Oil.find({
						where: {
							restaurant_id: req.session.user.restaurant_id,
							oil_date: {
								'>=': start
							}
						}
					}).exec(function(err, oils) {

						oils.forEach(function(oil) {

							month += oil.oil_mass

						})

						cb(null, month)

					})
				})

			},
			total: function(cb) {
				var total = 0;

				timeService.getWeekStart({}, function(start) {
					Oil.find({
						where: {
							restaurant_id: req.session.user.restaurant_id,
						}
					}).exec(function(err, oils) {

						oils.forEach(function(oil) {

							total += oil.oil_mass

						})

						cb(null, total)

					})
				})

			},
			一月: function(cb) {
				oilmass(1, restaurant_id, cb)
			},
			二月: function(cb) {
				oilmass(2, restaurant_id, cb)
			},
			三月: function(cb) {
				oilmass(3, restaurant_id, cb)
			},
			四月: function(cb) {
				oilmass(4, restaurant_id, cb)
			},
			五月: function(cb) {
				oilmass(5, restaurant_id, cb)
			},
			六月: function(cb) {
				oilmass(6, restaurant_id, cb)
			},
			七月: function(cb) {
				oilmass(7, restaurant_id, cb)
			},
			八月: function(cb) {
				oilmass(8, restaurant_id, cb)
			},
			九月: function(cb) {
				oilmass(9, restaurant_id, cb)
			},
			十月: function(cb) {
				oilmass(10, restaurant_id, cb)
			},
			十一月: function(cb) {
				oilmass(11, restaurant_id, cb)
			},
			十二月: function(cb) {
				oilmass(12, restaurant_id, cb)
			}

		}, function(err, result) {

			return res.json(result);
		})

	},
	//详细收油订单数据
	oilDetail: function(req, res) {
		var oil_id = req.param('oil_id');

		Oil.findOne({
			oil_id: oil_id
		}).populate('oil_employee').exec(function(err, oil) {
			if(err) {
				return res.json(err)
			}
			return res.json(oil);
		})
	}
};

function oilmass(themonth, restaurant_id, cb) {
	timeService.getMonthDate({
		month: themonth
	}, function(month) {

		Oil.find({
			where: {
				restaurant_id: restaurant_id,
				oil_date: {
					'startsWith': month
				}
			}
		}).exec(function(err, oils) {

			var total = 0;

			oils.forEach(function(oil) {

				total += oil.oil_mass

			})

			cb(null, total)

		})
	})
}