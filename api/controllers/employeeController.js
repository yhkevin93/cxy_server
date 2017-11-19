var bcrypt = require('bcryptjs');
module.exports = {

	//拉油
	collectionOil: function(req, res) {
		var data = req.allParams();


        //这里是通过餐厅编码来确定拉油商家
		var restaurant_id = data.restaurant_id;

		User.findOne({
			restaurant_id: restaurant_id
		}).exec(function(err, user) {
			if(err) {
				return res.json(err)
			}
			
			if(!user){
				return res.json({
					result: '没有找到相关设备'
				})
			}

			data.oil_user = user.id;
			data.oil_employee = req.session.employee.id;

			var r1 = parseInt(Math.random() * 10);
			var r2 = parseInt(Math.random() * 10);
			var timestamp = new Date().getTime();
			var oil_id =  timestamp + r1.toString() + r2.toString();

			data.oil_id = oil_id;

			Oil.create(data).exec(function(err, oil) {
				if(err) {
					return res.json(err)
				}

				return res.json({
					result: '拉油成功',
					oil: oil
				})
			})
		})

	},
	//修改密码
	updatePassword: function(req, res) {
		var password = req.param('password');

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				if(err) {
//					console.log(err);
					cb(err);
				} else {

					Employee.update({
						phone: req.session.employee.phone
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

}