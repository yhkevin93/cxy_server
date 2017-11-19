var bcrypt = require('bcryptjs');

module.exports = {
	attributes: {
		username: {
			type: 'string',
			defaultsTo: '暂无'
		},
		//联系电话
		phone: {
			type: 'integer',
			defaultsTo: '0'
		},
		password: {
			type: 'string',
			minLength: 6,
			required: true,
			defaultsTo: '123456'
		},
		//提现记录
		present_record: {
			collection: 'present',
			via: 'present_user'
		},
		//收油记录
		oil_record: {
			collection: 'oil',
			via: 'oil_user'
		},
		//提现余额
		blance: {
			type: 'float',
			defaultsTo: 0
		},
		//餐厅名
		name: {
			type: 'string',
			defaultsTo: '暂无'
		},
		//餐厅编号
		restaurant_id: {
			type: 'integer',
			defaultsTo: 0,
			unique: true
		},
		//地区
		area: {
			type: 'string',
			defaultsTo: '暂无'
		},
		//详细地址
		location: {
			type: 'string',
			defaultsTo: '暂无'
		},
		state: {
			type: 'string',
			enum: ['未注册', '离线', '在线', '故障', '紧急'],
			defaultsTo: '在线'
		},
		//设备id
		device_id: {
			type: 'integer',
			defaultsTo: 0
		},
		//鉴权信息
		auth_info: {
			type: 'string',
			defaultsTo: 0
		},
		//银行卡号
		account_number: {
			type: 'integer',
			defaultsTo: 0
		},
		current_oil: {
			type: 'float',
			defaultsTo: 0
		}

	},
	beforeCreate: function(user, cb) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(user.password, salt, function(err, hash) {
				if(err) {
					//					console.log(err);
					cb(err);
				} else {
					user.password = hash;
					cb();
				}
			});
		});
	}
};