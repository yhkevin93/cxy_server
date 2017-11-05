/*
 管理员控制器
 所有需要管理员权限的行为
 * */

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
	}
};