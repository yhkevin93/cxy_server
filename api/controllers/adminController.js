/*
 管理员控制器
 所有需要管理员权限的行为
 * */
var bcrypt = require('bcryptjs');
module.exports = {
	//注册用户账号，需要输入鉴权信息
	signup: function(req, res) {

		User.create(req.allParams()).exec(function(err, user) {
			if(err) {
				return res.json({
					err: err
				})
			}

			return res.json({
				result: '注册成功',
				user: user
			})

		});

	},
	//修改密码
	updatePassword: function(req, res) {
		var password = req.param('password');

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				if(err) {

					cb(err);
				} else {

					Employee.update({
						phone: req.session.admin.phone
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
	//重置用户密码
	resetUserPassword: function(req, res) {
		var restaurant_id = req.param('restaurant_id')

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash('123456', salt, function(err, hash) {
				if(err) {
					return res.json({
						result: err
					})
				} else {
					User.update({
						restaurant_id: restaurant_id
					}, {
						password: hash
					}).exec(function(err, update) {
						if(err) {
//							console.log(err)
							return res.json(err);
						}
//						console.log(update)
						return res.json({
							result: '修改成功',
							user: update
						})
					})

				}
			});
		});
	},
	//根据条件搜索用户信息
	searchUser: function(req, res) {
		var page = req.param('page') ? req.param('page') : 1;
		var skip = (page - 1) * 10;
		//		console.log(req)

		User.find({
			limit: 10,
			skip: skip,
			sort: 'createdAt DESC'
		}).exec(function(err, user) {
			//			console.log(user)
			User.count({}).exec(function(err, count) {

				return res.json({
					user: user,
					count: count

				})
			})
		})
	},

	//注册员工账号
	signupEmployee: function(req, res) {
		Employee.create(req.allParams()).exec(function(err, employee) {
			if(err) {
				return res.json({
					err: err
				})
			}

			return res.json({
				result: '注册成功',
				employee: employee
			})
		})
	},
	//根据条件搜索员工信息
	searchEmployee: function(req, res) {
		var page = req.param('page') ? req.param('page') : 1;
		var skip = (page - 1) * 10;
		//		console.log(req)

		Employee.find({
			limit: 10,
			skip: skip,
			sort: 'createdAt DESC'
		}).exec(function(err, employee) {
			//			console.log(user)
			Employee.count({}).exec(function(err, count) {

				return res.json({
					employee: employee,
					count: count

				})
			})
		})
	},
	//查询具体用户信息
	userInfo: function(req, res) {
		var restaurant_id = req.param('restaurant_id');

		User.findOne({
			restaurant_id: restaurant_id
		}).exec(function(err, user) {
			if(err) {
				return res.json(err)
			}

			return res.send(user)
		})
	},
	//管理员修改用户信息
	updateUserInfo: function(req, res) {
		var data = req.allParams();

		var restaurant_id = data.restaurant_id

		//鉴权信息和设备ID用户不能修改
		delete data.restaurant_id;
		//删除余额数据防止造假
		delete data.blance;
		//删除密码以防胡乱修改
		delete data.password;

		//		console.log(data);

		User.update({
			restaurant_id: restaurant_id
		}, data).exec(function(err, update) {
			if(err) {
				return res.status(404);
			}

			//			console.log(update)

			return res.json({
				result: '修改成功',
				user: update
			})
		})
	},
	//管理员根据区域条件查看所有用户信息
	userList: function(req, res) {
		var page = req.param('page') ? req.param('page') : 1;
		var skip = (page - 1) * 10;
		var area = req.param('area') ? req.param('area') : '四川省';

		User.find({
			where: {
				area: {
					startsWith: area
				}
			},
			sort: 'createdAt DESC',
			limit: 10,
			skip: skip
		}).exec(function(err, user) {
			if(err) {
				return res.json(err)
			}

			return res.json(user);
		})
	},
	UserAreaList: function(req, res) {
		var area = req.param('area') ? req.param('area') : '四川省';

		User.find({
			where: {
				area: {
					startsWith: area
				}
			},
			sort: 'createdAt DESC',
		}).exec(function(err, user) {
			if(err) {
				return res.json(err)
			}

			return res.json(user);
		})
	},
	//根据餐厅名查询用户信息
	searchUserByName: function(req, res) {
		var name = req.param('name');
		var search = '%' + name + '%';

		User.find({
			name: {
				'like': search
			}
		}).exec(function(err, user) {
			if(err) {
				return res.json(err);
			}
			return res.json({
				user: user,
				count: user.length
			});
		})
	},
	//根据用户设备ID查看用户详细信息
	checkUserData: function(req, res) {
		var device_id = req.param('device_id');

		var url = 'http://api.heclouds.com/devices/' + device_id + '/datastreams/w'

		async.series({
			一月: function(cb) {
				oilmass(1, device_id, cb)
			},
			二月: function(cb) {
				oilmass(2, device_id, cb)
			},
			三月: function(cb) {
				oilmass(3, device_id, cb)
			},
			四月: function(cb) {
				oilmass(4, device_id, cb)
			},
			五月: function(cb) {
				oilmass(5, device_id, cb)
			},
			六月: function(cb) {
				oilmass(6, device_id, cb)
			},
			七月: function(cb) {
				oilmass(7, device_id, cb)
			},
			八月: function(cb) {
				oilmass(8, device_id, cb)
			},
			九月: function(cb) {
				oilmass(9, device_id, cb)
			},
			十月: function(cb) {
				oilmass(10, device_id, cb)
			},
			十一月: function(cb) {
				oilmass(11, device_id, cb)
			},
			十二月: function(cb) {
				oilmass(12, device_id, cb)
			},
			total: function(cb) {
				var total = 0;

				Oil.find({
					where: {
						device_id: device_id,
					}
				}).exec(function(err, oils) {

					oils.forEach(function(oil) {

						total += oil.oil_mass

					})

					cb(null, total)

				})
			},
			week: function(cb) {
				var week = 0;

				timeService.getWeekStart({}, function(start) {
					//					console.log('周初' + start)
					Oil.find({
						where: {
							device_id: device_id,
							oil_date: {
								'>': new Date(start)
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
			value: function(cb) {
				httpService.http({
					url: url,
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'api-key': 'zlbf7ZwLetP=TDP=IC7p0JOE740='
					}
				}, function(body) {
					//					console.log(body)
					cb(null, body)
				})
			}

		}, function(err, result) {
			//			console.log(result)
			return res.json(result);
		})

	},
	//管理员首页<-每月拉油量->
	//根据用户设备ID查看用户详细信息
	totaloilmass: function(req, res) {
		var device_id = req.param('device_id');

		async.series({
			一月: function(cb) {
				totaloilmass(1, cb)
			},
			二月: function(cb) {
				totaloilmass(2, cb)
			},
			三月: function(cb) {
				totaloilmass(3, cb)
			},
			四月: function(cb) {
				totaloilmass(4, cb)
			},
			五月: function(cb) {
				totaloilmass(5, cb)
			},
			六月: function(cb) {
				totaloilmass(6, cb)
			},
			七月: function(cb) {
				totaloilmass(7, cb)
			},
			八月: function(cb) {
				totaloilmass(8, cb)
			},
			九月: function(cb) {
				totaloilmass(9, cb)
			},
			十月: function(cb) {
				totaloilmass(10, cb)
			},
			十一月: function(cb) {
				totaloilmass(11, cb)
			},
			十二月: function(cb) {
				totaloilmass(12, cb)
			}

		}, function(err, result) {
			var last = [];

			for(x in result) {
				last.push(result[x]);
//				console.log(last)
			}

			return res.json(last)
		})

	},
	totaloiltime: function(req, res) {
		var device_id = req.param('device_id');

		async.series({
			1: function(cb) {
				totaloiltime(1, cb)
			},
			2: function(cb) {
				totaloiltime(2, cb)
			},
			3: function(cb) {
				totaloiltime(3, cb)
			},
			4: function(cb) {
				totaloiltime(4, cb)
			},
			5: function(cb) {
				totaloiltime(5, cb)
			},
			6: function(cb) {
				totaloiltime(6, cb)
			},
			7: function(cb) {
				totaloiltime(7, cb)
			},
			8: function(cb) {
				totaloiltime(8, cb)
			},
			9: function(cb) {
				totaloiltime(9, cb)
			},
			10: function(cb) {
				totaloiltime(10, cb)
			},
			11: function(cb) {
				totaloiltime(11, cb)
			},
			12: function(cb) {
				totaloiltime(12, cb)
			}

		}, function(err, result) {

			var last = [];

			for(x in result) {
				last.push(result[x]);
//				console.log(last)
			}

			return res.json(last)
		})

	},
	oil: function(req, res) {
		//		Oil.destroy({}).exec(function(){
		//			
		//		})
		//		
		Oil.find({}).populate('oil_user').exec(function(err, oil) {

			User.find({}).populate('oil_record').exec(function(err, user) {
				return res.json({
					oil: oil,
					user: user
				})

				User

			})

		})
	}

};

function oilmass(themonth, device_id, cb) {
	timeService.getMonthDate({
		month: themonth
	}, function(month) {

		Oil.find({
			where: {
				device_id: device_id,
				oil_date: {
					'startsWith': month
				}
			}
		}).exec(function(err, oils) {

			var total = 0;

			oils.forEach(function(oil) {

				total += oil.oil_mass

			})

			cb(null, {
				date: month,
				total: total
			})

		})
	})
}

function totaloilmass(themonth, cb) {
	timeService.getMonthDate({
		month: themonth
	}, function(month) {

		Oil.find({
			where: {
				oil_date: {
					'startsWith': month
				}
			}
		}).exec(function(err, oils) {

			var total = 0;

			oils.forEach(function(oil) {

				total += oil.oil_mass

			})

			cb(null, {
				date: month,
				total: total
			})

		})
	})
}

function totaloiltime(themonth, cb) {
	timeService.getMonthDate({
		month: themonth
	}, function(month) {

		Oil.find({
			where: {
				oil_date: {
					'startsWith': month
				}
			}
		}).exec(function(err, oils) {

			cb(null, {
				date: month,
				time: oils.length
			});

		})
	})
}