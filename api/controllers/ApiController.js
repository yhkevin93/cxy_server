module.exports = {

	//拉油
	oilChange: function(req, res) {
//		console.log(req)
		
		var current = req.param('current_data');

		var device_id = current[0].dev_id;

		var current_oil = current[0].value;

		User.findOne({
			device_id: device_id
		}).exec(function(err, user) {

			if(err) {
				return res.json(err);
			}

			if(!user) {
				return res.json({
					result: '没有用户'
				})
			}
			
//			console.log(user)

			user.current_oil = current_oil;
			user.save(function(err) {

			})

			return res.json('ok');

		})

	},

}